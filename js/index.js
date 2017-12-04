/*
This is derived from 
http://jsfiddle.net/ianclark001/rkocah23/
*/

(function(document, history, location) {
  var HISTORY_SUPPORT = false;//!!(history && history.pushState);

  var url = {
    //"0001": "https://uptight-property.surge.sh/",
    "0001": "https://srbberlin.surge.sh/sites/srb",
    "0002": "https://srbberlin.surge.sh/sites/lena",
    "0003": "https://srbberlin.surge.sh/sites/braunisch",
    "0004": "https://srbberlin.surge.sh/sites/sharpworks",
    "0005": "https://srbberlin.surge.sh/sites/tdm",
    "0006": "https://srbberlin.surge.sh/sites/tribute"
  }
  
  var lWidth;
  
  $(".pres-navi").on("click", function (e) {
    if (lWidth >= 817) {
      var parent = $('#PRES').parent();
      $('#PRES').remove();
      parent.append($('<embed id="PRES" src=' + url[e.target.id] + ' />'));
    }
  });

  var anchorScrolls = {
    ANCHOR_REGEX: /^#[^ ]+$/,

    ress: function () {
      $("#MAIN").css("padding-top", $("#Nav").height());
      lWidth = $("#ALL").width();
      if (lWidth < 817) {
         $.each($(".pres-navi"), function() {
           this.parentElement.target = '_blank';
           this.parentElement.href = url[this.id]
         })
      }
      else {
         //$.each($(".pres-navi"), function() {
         //  this.parentElement.target = '';
         //  this.parentElement.href = "#projects"
         //});
      }
    },
 
    init: function() {
      this.ress();
      this.scrollToCurrent();
      $(window).on('hashchange', $.proxy(this, 'scrollToCurrent'));
      $(window).on("resize", $.proxy(this, 'ress'));
      $(window).on("load", $.proxy(this, 'ress'));
      $('body').on('click', 'a', $.proxy(this, 'delegateAnchors'));
    },

    getFixedOffset: function() {
      return $("#Nav").height() + 50;
    },

    scrollIfAnchor: function(href, pushToHistory) {
      var notExtern = this.ANCHOR_REGEX.test(href), match, anchorOffset;

      if(!notExtern) {
        match = document.getElementById("MAIN");
      }
      else {
        match = document.getElementById(href.slice(1));
      }

      if(match) {
        anchorOffset = $(match).offset().top - this.getFixedOffset();
        $('html, body').animate({ scrollTop: anchorOffset});
        if(HISTORY_SUPPORT && pushToHistory) {
          history.pushState({}, document.title, location.pathname + href);
        }
      }

      return notExtern;
    },
    
    scrollToCurrent: function(e) { 
      if(this.scrollIfAnchor(window.location.hash) && e) {
      	e.preventDefault();
      }
    },

    delegateAnchors: function(e) {
      var target = e.currentTarget;
      
      if(this.scrollIfAnchor(target.getAttribute('href'), true)) {
        e.preventDefault();
      }
    }
  };

  $(document).ready($.proxy(anchorScrolls, 'init'));

})(window.document, window.history, window.location);