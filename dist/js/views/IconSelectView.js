(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('views/IconSelectView', ['views/ProtoView', 'collectionViews/SectionsCollectionView', 'collections/SectionsCollection', 'collectionViews/FiltersCollectionView', 'collections/FiltersCollection', 'fileupload', 'underscore', 'jquery', 'helpers'], function(ProtoView, SectionsCollectionView, SectionsCollection, FiltersCollectionView, FiltersCollection, fileupload, _, $, helpers) {
    var IconSelectView;
    IconSelectView = (function(_super) {
      __extends(IconSelectView, _super);

      function IconSelectView() {
        return IconSelectView.__super__.constructor.apply(this, arguments);
      }

      IconSelectView.prototype.template = '#icon-select-view-template';

      IconSelectView.prototype.className = '';

      IconSelectView.prototype.events = {
        'keyup': 'debouncedFilter',
        'click #js-add-effects': 'toggleEffects',
        'click #js-next': 'next',
        'click #js-prev': 'prev',
        'click #js-page': 'loadPage'
      };

      IconSelectView.prototype.initialize = function(o) {
        this.o = o != null ? o : {};
        this.paginationTemplate = _.template(helpers.unescape($("#pagination-template").text()));
        this.buttonCounterTemplate = _.template(helpers.unescape($("#button-counter-template").text()));
        this.bindModelEvents();
        this.debouncedFilter = _.debounce(this.filter, 250);
        IconSelectView.__super__.initialize.apply(this, arguments);
        this.sectionsCollection.on('afterFetch', _.bind(this.renderPagination, this));
        return this;
      };

      IconSelectView.prototype.next = function() {
        this.changePageNoty();
        return _.defer((function(_this) {
          return function() {
            return _this.sectionsCollection.nextPage();
          };
        })(this));
      };

      IconSelectView.prototype.prev = function() {
        this.changePageNoty();
        return _.defer((function(_this) {
          return function() {
            return _this.sectionsCollection.prevPage();
          };
        })(this));
      };

      IconSelectView.prototype.scrollTop = function() {
        return App.$bodyHtml.animate({
          'scrollTop': this.$el.position().top
        });
      };

      IconSelectView.prototype.showLoader = function() {
        return helpers.showLoaderLine('is-long').setLoaderLineProgress(100);
      };

      IconSelectView.prototype.changePageNoty = function() {
        this.showLoader();
        return this.scrollTop();
      };

      IconSelectView.prototype.loadPage = function(e) {
        this.changePageNoty();
        return this.sectionsCollection.loadPage(parseInt($(e.target).text(), 10) || 0);
      };

      IconSelectView.prototype.toggleEffects = function() {
        this.$('#js-filter-block').show().addClass('animated fadeInDown').find('#js-filters-place').trigger('show');
        return this.$el.addClass('is-filter-show');
      };

      IconSelectView.prototype.filter = function(e) {
        return App.vent.trigger('icon-select-filter:change', $.trim($(e.target).val()));
      };

      IconSelectView.prototype.bindModelEvents = function() {
        return this.model.on('change:selectedCounter', _.bind(this.renderButton, this));
      };

      IconSelectView.prototype.render = function() {
        IconSelectView.__super__.render.apply(this, arguments);
        this.renderView();
        this.$paginationPlace = this.$('#js-pagination-place');
        this.renderButton();
        this.initFileUpload();
        return this;
      };

      IconSelectView.prototype.renderPagination = function() {
        helpers.hideLoaderLine('is-long');
        this.checkSelectedSections();
        App.router.navigate(this.sectionsCollection.options.page !== 0 ? "#/page-" + this.sectionsCollection.options.page : "#/page-loaded");
        return _.defer((function(_this) {
          return function() {
            return _this.$paginationPlace.html(_this.paginationTemplate(_this.sectionsCollection.pageInfo()));
          };
        })(this));
      };

      IconSelectView.prototype.renderView = function() {
        this.filtersCollectionView = new FiltersCollectionView({
          collection: new FiltersCollection,
          isRender: true,
          $el: this.$('#js-filters-place')
        });
        this.filtersCollectionView.collection.fetch().then((function(_this) {
          return function() {
            return _this.filtersCollectionView.collection.addSvgFilters();
          };
        })(this));
        this.sectionsCollection = new SectionsCollection({
          isPaginated: true,
          pageNum: this.o.pageNum
        });
        return this.sectionsCollection.fetch().then((function(_this) {
          return function() {
            if (_this.isClosed) {
              return;
            }
            return _this.$('#js-loader').fadeOut('fast', function() {
              _this.sectionsCollection.generateSvgData();
              _this.sectionsCollectionView = new SectionsCollectionView({
                collection: _this.sectionsCollection,
                isRender: true,
                $el: _this.$('#js-section-collections-place')
              });
              _this.renderPagination();
              App.sectionsCollectionView = _this.sectionsCollectionView;
              _this.model.sectionsView = _this.sectionsCollectionView;
              _this.isFooterVisible || _this.showFooter();
              return _this;
            });
          };
        })(this));
      };

      IconSelectView.prototype.showFooter = function() {
        _.defer((function(_this) {
          return function() {
            App.$footer.removeClass('h-gm').addClass('animated fadeInDown');
            return _this.isFooterVisible = false;
          };
        })(this));
        return this;
      };

      IconSelectView.prototype.hideFooter = function() {
        return App.$footer.addClass('h-gm');
      };

      IconSelectView.prototype.renderButton = function() {
        return this.$('#js-counter-btn-place').html(this.buttonCounterTemplate(this.model.toJSON()));
      };

      IconSelectView.prototype.initFileUpload = function() {
        return this.$('#fileupload').fileupload({
          url: '/file-upload',
          acceptFileTypes: /(\.|\/)(svg)$/i,
          dataType: 'text',
          limitMultiFileUploads: 999,
          add: (function(_this) {
            return function(e, data) {
              _this.filesDropped = data.originalFiles.length;
              _this.filesLoaded = 0;
              return data.submit();
            };
          })(this),
          done: (function(_this) {
            return function(e, data) {
              _this.filesLoaded++;
              _this.parseFile(data.result);
              return _this.filesLoaded === _this.filesDropped && _this.finishFilesLoading();
            };
          })(this),
          error: function(e, data) {
            return App.notifier.show({
              text: 'loading error',
              type: 'error'
            });
          },
          progressall: (function(_this) {
            return function(e, data) {
              var progress;
              progress = parseInt(data.loaded / data.total * 100, 10);
              return App.$loadingLine.css({
                'width': "" + progress + "%"
              });
            };
          })(this)
        });
      };

      IconSelectView.prototype.finishFilesLoading = function() {
        return setTimeout((function(_this) {
          return function() {
            return App.$loadingLine.fadeOut(100, function() {
              App.$loadingLine.width("0%");
              return App.$loadingLine.show();
            });
          };
        })(this), 2000);
      };

      IconSelectView.prototype.parseFile = function(file) {
        var i, icon, parsedFile, sectionNames, sections, _i, _len, _name;
        parsedFile = file.match(/(data\-iconmelon\s?=\s?\")(.+?)\"/gi);
        sections = {};
        sectionNames = [];
        for (i = _i = 0, _len = parsedFile.length; _i < _len; i = ++_i) {
          icon = parsedFile[i];
          icon = icon.split('data-iconmelon')[1].replace(/[\"\=]/gi, '');
          icon = icon.split(':');
          if (sections[_name = icon[0]] == null) {
            sections[_name] = [];
          }
          sections[icon[0]].push(icon[1]);
          sectionNames.push(icon[0]);
        }
        return this.checkLoadedIcons(sections, _.uniq(sectionNames));
      };

      IconSelectView.prototype.checkSelectedSections = function() {
        var i, icon, icons, j, section, sectionName, sections, _i, _len, _name, _ref, _results;
        sections = {};
        _ref = App.iconsSelected;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          icon = _ref[i];
          icon = icon.split(':');
          if (sections[_name = icon[0]] == null) {
            sections[_name] = [];
          }
          sections[icon[0]].push(icon[1]);
        }
        _results = [];
        for (sectionName in sections) {
          icons = sections[sectionName];
          _results.push((function() {
            var _j, _len1, _results1;
            _results1 = [];
            for (i = _j = 0, _len1 = icons.length; _j < _len1; i = ++_j) {
              icon = icons[i];
              _results1.push((function() {
                var _k, _len2, _ref1, _ref2, _ref3, _results2;
                _ref1 = this.sectionsCollection.where({
                  'name': sectionName
                });
                _results2 = [];
                for (j = _k = 0, _len2 = _ref1.length; _k < _len2; j = ++_k) {
                  section = _ref1[j];
                  _results2.push((_ref2 = section.iconsCollection.where({
                    'hash': icon
                  })) != null ? (_ref3 = _ref2[0]) != null ? _ref3.set('isSelected', true) : void 0 : void 0);
                }
                return _results2;
              }).call(this));
            }
            return _results1;
          }).call(this));
        }
        return _results;
      };

      IconSelectView.prototype.checkLoadedIcons = function(sections, sectionNames) {
        return this.loadSections(sectionNames).then((function(_this) {
          return function() {
            var filter, i, icon, icons, j, sectionModel, sectionModels, sectionName, _results;
            _results = [];
            for (sectionName in sections) {
              icons = sections[sectionName];
              if (sectionName !== 'filter') {
                sectionModels = _this.sectionsCollectionView.collection.where({
                  'name': sectionName
                });
                _results.push((function() {
                  var _i, _len, _results1;
                  _results1 = [];
                  for (i = _i = 0, _len = sectionModels.length; _i < _len; i = ++_i) {
                    sectionModel = sectionModels[i];
                    _results1.push((function() {
                      var _j, _len1, _ref, _ref1, _results2;
                      _results2 = [];
                      for (j = _j = 0, _len1 = icons.length; _j < _len1; j = ++_j) {
                        icon = icons[j];
                        _results2.push((_ref = sectionModel.iconsCollection.where({
                          'hash': icon
                        })) != null ? (_ref1 = _ref[0]) != null ? _ref1.select() : void 0 : void 0);
                      }
                      return _results2;
                    })());
                  }
                  return _results1;
                })());
              } else {
                _results.push((function() {
                  var _i, _len, _ref, _ref1, _results1;
                  _results1 = [];
                  for (i = _i = 0, _len = icons.length; _i < _len; i = ++_i) {
                    filter = icons[i];
                    _results1.push((_ref = this.filtersCollectionView.collection.where({
                      'hash': filter
                    })) != null ? (_ref1 = _ref[0]) != null ? _ref1.set('isSelected', true) : void 0 : void 0);
                  }
                  return _results1;
                }).call(_this));
              }
            }
            return _results;
          };
        })(this));
      };

      IconSelectView.prototype.loadSections = function(sectionNames) {
        return this.sectionsCollection.fetch({
          sectionNames: sectionNames
        }).then((function(_this) {
          return function() {
            _this.sectionsCollection.generateSvgData();
            _this.sectionsCollection.options.page = 0;
            _this.sectionsCollection.options.sectionNames = null;
            return _this.renderPagination();
          };
        })(this));
      };

      IconSelectView.prototype.teardown = function() {
        var _ref;
        helpers.hideLoaderLine('is-long');
        if ((_ref = this.sectionsCollectionView) != null) {
          _ref.teardown();
        }
        this.hideFooter();
        return IconSelectView.__super__.teardown.apply(this, arguments);
      };

      return IconSelectView;

    })(ProtoView);
    return IconSelectView;
  });

}).call(this);
