(function(){var e={}.hasOwnProperty,t=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t};define("models/FilterModel",["models/ProtoModel"],function(e){var n,r;return n=function(e){function n(){return r=n.__super__.constructor.apply(this,arguments),r}return t(n,e),n.prototype.defaults={iconHash:"tick-icon"},n.prototype.toggleSelected=function(){return this.toggleAttr("isSelected")},n}(e),n})}).call(this);