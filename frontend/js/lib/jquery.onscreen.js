(function(a){a.fn.onScreen=function(b){var c=a.extend({container:window,direction:"vertical",toggleClass:null,doIn:null,doOut:null,tolerance:0,throttle:null,lazyAttr:null,lazyPlaceholder:"data:image/gif;base64,R0lGODlhEAAFAIAAAP///////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCQAAACwAAAAAEAAFAAACCIyPqcvtD00BACH5BAkJAAIALAAAAAAQAAUAgfT29Pz6/P///wAAAAIQTGCiywKPmjxUNhjtMlWrAgAh+QQJCQAFACwAAAAAEAAFAIK8urzc2tzEwsS8vrzc3tz///8AAAAAAAADFEiyUf6wCEBHvLPemIHdTzCMDegkACH5BAkJAAYALAAAAAAQAAUAgoSChLS2tIyKjLy+vIyOjMTCxP///wAAAAMUWCQ09jAaAiqQmFosdeXRUAkBCCUAIfkECQkACAAsAAAAABAABQCDvLq83N7c3Nrc9Pb0xMLE/P78vL68/Pr8////AAAAAAAAAAAAAAAAAAAAAAAAAAAABCEwkCnKGbegvQn4RjGMx8F1HxBi5Il4oEiap2DcVYlpZwQAIfkECQkACAAsAAAAABAABQCDvLq85OLkxMLE9Pb0vL685ObkxMbE/Pr8////AAAAAAAAAAAAAAAAAAAAAAAAAAAABCDwnCGHEcIMxPn4VAGMQNBx0zQEZHkiYNiap5RaBKG9EQAh+QQJCQAJACwAAAAAEAAFAIOEgoTMysyMjozs6uyUlpSMiozMzsyUkpTs7uz///8AAAAAAAAAAAAAAAAAAAAAAAAEGTBJiYgoBM09DfhAwHEeKI4dGKLTIHzCwEUAIfkECQkACAAsAAAAABAABQCDvLq85OLkxMLE9Pb0vL685ObkxMbE/Pr8////AAAAAAAAAAAAAAAAAAAAAAAAAAAABCAQSTmMEGaco8+UBSACwWBqHxKOJYd+q1iaXFoRRMbtEQAh+QQJCQAIACwAAAAAEAAFAIO8urzc3tzc2tz09vTEwsT8/vy8vrz8+vz///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAEIhBJWc6wJZAtJh3gcRBAaXiIZV2kiRbgNZbA6VXiUAhGL0QAIfkECQkABgAsAAAAABAABQCChIKEtLa0jIqMvL68jI6MxMLE////AAAAAxRoumxFgoxGCbiANos145e3DJcQJAAh+QQJCQAFACwAAAAAEAAFAIK8urzc2tzEwsS8vrzc3tz///8AAAAAAAADFFi6XCQwtCmAHbPVm9kGWKcEQxkkACH5BAkJAAIALAAAAAAQAAUAgfT29Pz6/P///wAAAAIRlI8SAZsPYnuJMUCRnNksWwAAOw==",debug:false},b);return this.each(function(){var e=false;var d;var s;var x=a(this);var r;var m;var i;var v;var q;var k;var o;var g;var h;function w(){if(c.container==window){return g<v-c.tolerance&&d<(g+k)-c.tolerance&&!e;}else{return g<m-c.tolerance&&g>(-k)+c.tolerance&&!e;}}function j(){if(c.container==window){return g+k<d&&e||g>v&&e;}else{return g>m-c.tolerance&&e||-k+c.tolerance>g&&e;}}function u(){if(c.container==window){return h<q-c.tolerance&&s<(h+o)-c.tolerance&&!e;}else{return h<i-c.tolerance&&h>(-o)+c.tolerance&&!e;}}function n(){if(c.container==window){return h+o<s&&e||h>q&&e;}else{return h>i-c.tolerance&&e||-o+c.tolerance>h&&e;}}function l(){if(c.direction=="vertical"){return w();}else{if(c.direction=="horizontal"){return u();}}}function t(){if(c.direction=="vertical"){return j();}else{if(c.direction=="horizontal"){return n();}}}function f(B,C,y){var D,A,z;return function(){A=arguments;z=true;y=y||this;if(!D){(function(){if(z){B.apply(y,A);z=false;D=setTimeout(arguments.callee,C);}else{D=null;}})();}};}function p(){if(c.container!=window){if(a(c.container).css("position")=="static"){a(c.container).css("position","relative");}}r=a(c.container);m=r.height();i=r.width();v=r.scrollTop()+m;q=r.scrollLeft()+i;k=x.outerHeight(true);o=x.outerWidth(true);if(c.container==window){g=x.offset().top;h=x.offset().left;}else{g=x.position().top;h=x.position().left;}d=r.scrollTop();s=r.scrollLeft();if(c.debug){console.log("Container: "+c.container+"\nWidth: "+m+"\nHeight: "+i+"\nBottom: "+v+"\nRight: "+q);console.log("Matched element: "+(typeof(x.attr("class"))!="undefined"?x.prop("tagName").toLowerCase()+"."+x.attr("class"):x.prop("tagName").toLowerCase())+"\nLeft: "+h+"\nTop: "+g+"\nWidth: "+o+"\nHeight: "+k);}if(l()){if(c.toggleClass){x.addClass(c.toggleClass);}if(typeof(c.doIn)=="function"){c.doIn.call(x[0]);}if(c.lazyAttr&&x.prop("tagName")==="IMG"){lazyImg=x.attr(c.lazyAttr);x.css({background:"url("+c.lazyPlaceholder+") center center no-repeat","min-height":"5px","min-width":"16px"});x.prop("src",lazyImg);}e=true;}else{if(t()){if(c.toggleClass){x.removeClass(c.toggleClass);}if(typeof(c.doOut)=="function"){c.doOut.call(x[0]);}e=false;}}}p();p=(c.throttle)?f(p,c.throttle):p;a(c.container).on("scroll",p).on("resize",p).on("load",p);if(typeof module==="object"&&module&&typeof module.exports==="object"){module.exports=jQuery;}else{if(typeof define==="function"&&define.amd){define("jquery-onscreen",[],function(){return jQuery;});}}});};})(jQuery);