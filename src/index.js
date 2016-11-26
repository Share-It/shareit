;(function(window, $) {

  "use strict";

  // HIDESHARE PUBLIC CLASS DEFINITION
  // =================================

  var Hideshare = function (elem, options) {
    this.elem = elem;
    this.$elem = $(elem);
    this.options = options;
  };

  Hideshare.prototype = {
    defaults: {
      link: document.URL,
      title: document.title,
      description: '',
      media: null,
      facebook: true,
      twitter: true,
      pinterest: true,
      googleplus: true,
      linkedin: true,
      position: "bottom",
      speed: 100
    },

    init: function() {
      this.config = $.extend({}, this.defaults, this.options);
      this.wrapHideshare();
      return this;
    },

    wrapHideshare: function() {
      var output = output,
          width = this.$elem.outerWidth(),
          height = this.$elem.outerHeight(),
          liWidth = 0,
          placement = this.config.position,
          transition = this.config.speed,
          shareTitle = this.config.title,
          shareLink = this.config.link,
          shareMedia = this.config.media,
          shareDescription = this.config.description,
          facebookTemplate = '<li><a class="hideshare-facebook" href="#"><i class="fa fa-facebook-square fa-2x"></i><span>Facebook</span></a></li>',
          twitterTemplate = '<li><a class="hideshare-twitter" href="#"><i class="fa fa-twitter-square fa-2x"></i><span>Twitter</span></a></li>',
          pinterestTemplate = '<li><a class="hideshare-pinterest" href="#" data-pin-do="buttonPin" data-pin-config="above"><i class="fa fa-pinterest-square fa-2x"></i><span>Pinterest</span></a></li>',
          googleplusTemplate = '<li><a class="hideshare-google-plus" href="#"><i class="fa fa-google-plus-square fa-2x"></i><span>Google Plus</span></a></li>',
          linkedinTemplate = '<li><a class="hideshare-linkedin" href="#"><i class="fa fa-linkedin-square fa-2x"></i><span>Linked In</span></a></li>';

      if (this.config.facebook) {
        output = facebookTemplate;
        liWidth += 40;
      } else {
        output = "";
        liWidth = liWidth;
      }
      if (this.config.twitter) {
        output += twitterTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.pinterest) {
        output += pinterestTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.googleplus) {
        output += googleplusTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.linkedin) {
        output += linkedinTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (liWidth < width) {
        liWidth = width;
      }

      // Construct sharing list
      var hideshareList = '<ul class="hideshare-list" style="display: none; width: ' + liWidth + 'px' + '">' + output + '</ul>';

      // Wrap button
      this.$elem.addClass("hideshare-btn").wrap("<div class='hideshare-wrap' style='width:" + width + "px; height:" + height + "px;' />");
      this.$wrap = this.$elem.parent();

      // Insert sharing button list
      $(hideshareList).insertAfter(this.$elem);

      // Get placement of share buttons
      var getPlacement = function(placement, width, height, speed, $wrap) {

        var styles = {};

        if (placement === "right") {
          styles = {
            "left"    : width + 10 + "px",
            "right"   : -(width + 10) + "px",
            "opacity" : "toggle"
          };
        } else if (placement === "left") {
          styles = {
            "left"    : -(width + 10) + "px",
            "right"   : width + 10 + "px",
            "opacity" : "toggle"
          };
        } else if (placement === "top") {
          styles = {
            "top"     : -(height + 10) + "px",
            "bottom"  : height + 10 + "px",
            "opacity" : "toggle"
          };
        } else /* placement === "bottom" */ {
          styles = {
            "top"     : height + 10 + "px",
            "bottom"  : -(height + 10) + "px",
            "left"    : "0px",
            "opacity" : "toggle"
          };
        }

        $wrap.find(".hideshare-list").animate(styles, speed).addClass("shown");
      };

      // Return to original position
      var returnPlacement = function(speed, $wrap) {
        var styles = {
          "top"     : "0px",
          "left"    : "0px",
          "opacity" : "toggle"
        };

        $wrap.find(".hideshare-list").animate(styles, speed).removeClass("shown");
      };

      // Toggle sharing on button click
      this.$elem.click(function(e) {
        var $wrap = $(e.currentTarget).parent();
        var list = $wrap.find(".hideshare-list");
        if (list.hasClass("shown")){
          returnPlacement(transition, $wrap);
        } else {
          getPlacement(placement, width, height, transition, $wrap);
        }
        return false;
      });


      // SHARING FUNCTIONS
      var shareFacebook = function() {
        window.open('//www.facebook.com/share.php?m2w&s=100&p[url]=' + encodeURIComponent(shareLink) + '&p[images][0]=' + encodeURIComponent(shareMedia) + '&p[title]=' + encodeURIComponent(shareTitle) + '&p[summary]=' + encodeURIComponent(shareDescription),'Facebook','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareTwitter = function() {
        window.open('https://twitter.com/intent/tweet?original_referer=' + encodeURIComponent(shareLink) + '&text=' + encodeURIComponent(shareTitle) + '%20' + encodeURIComponent(shareLink),'Twitter','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var sharePinterest = function() {
        window.open('//pinterest.com/pin/create/button/?url=' + encodeURIComponent(shareLink) + '&media=' + encodeURIComponent(shareMedia) + '&description=' + encodeURIComponent(shareTitle),'Pinterest','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareGooglePlus = function() {
        window.open('//plus.google.com/share?url=' + encodeURIComponent(shareLink),'GooglePlus','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareLinkedIn = function() {
        window.open('//www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(shareLink) + '&title=' + encodeURIComponent(shareTitle) + '&source=' + encodeURIComponent(shareLink),'LinkedIn','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };


      this.$wrap.find(".hideshare-facebook").click(function() {
        shareFacebook();
        return false;
      });

      this.$wrap.find(".hideshare-twitter").click(function() {
        shareTwitter();
        return false;
      });

      this.$wrap.find(".hideshare-pinterest").click(function() {
        sharePinterest();
        return false;
      });

      this.$wrap.find(".hideshare-google-plus").click(function() {
        shareGooglePlus();
        return false;
      });

      this.$wrap.find(".hideshare-linkedin").click(function() {
        shareLinkedIn();
        return false;
      });

    }
  };

  Hideshare.defaults = Hideshare.prototype.defaults;

  $.fn.hideshare = function(options) {
    return this.each(function() {
      new Hideshare(this, options).init();
    });
  };

/*------------------------------*/

var client_id = 'a545b9c515e14ff6b50077bac02b38f8'; // Your client id
var client_secret = '0df608227b36427e890afb56d21ac2e2'; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri
$(function(){

function loadIt(e) {
  e.preventDefault();

  var pageReq = $('.pageReq').val();
    if (pageReq == '' || typeof pageReq == null || typeof pageReq == undefined) {
      alert('Don\'t forget to enter your character!')
    } else {
      $.ajax(
        {
          url:"https://api.spotify.com/v1/search?q=" + encodeURIComponent(pageReq) + "&type=track&limit=10"
        })
        .done(function(data){
          console.log(data);
          var group = $('<div class="group"></div>')
            $.each(data,function(index, response){
              $.each(response.items,function(i, r){
                console.log(response.items[i]);
                var subgroup = $('<div class="subgroup"></div>')
                //track name
                subgroup.append($('<h3 class="track-name"></h3>').text(response.items[i].name));
                //track artist
                subgroup.append($('<h4 class="track-artist"></h4>').text(response.items[i].artists[0].name));
                //track album
                subgroup.append($('<h5 class="track-album"></h5>').text(response.items[i].album.name));
                // //track ID
                // subgroup.append($('<p></p>').text(response.items[i].id));
                // //track URI
                // subgroup.append($('<p></p>').text(response.items[i].uri));
                //track preview URI
                subgroup.append($('<audio controls><source /></audio>').attr('src',response.items[i].preview_url));
                //sharing
                var shareLink = response.items[i].external_urls.spotify;
                // subgroup.append($('<a target="_blank"></a>').attr('href', response.items[i].external_urls.spotify).text('open on spotify'));

                // Keep a reference to the element we're creating so that we can use it later
                var shareElement = $('<a class="share share-'+i+'"></a>').attr('href', '#').text('#SHAREit');
                // Add it to its container immediately
                subgroup.append(shareElement);
                //horizontal line
                subgroup.append($('<hr>') );
                //sharing
                var shareLink = response.items[i].external_urls.spotify;
                // subgroup.append($('<a target="_blank"></a>').attr('href', response.items[i].external_urls.spotify).text('open on spotify'));
                $(document).ready(function() {
                  $(".share").hideshare({
                    link: shareLink, // Link to URL defaults to document.URL
                    title: "", // Title for social post defaults to document.title
                    media: "", // Link to image file defaults to null
                    facebook: true, // Turns on Facebook sharing
                    twitter: true, // Turns on Twitter sharing
                    pinterest: true, // Turns on Pinterest sharing
                    googleplus: true, // Turns on Google Plus sharing
                    linkedin: false, // Turns on LinkedIn sharing
                    position: "top", // Options: Top, Bottom, Left, Right
                    speed: 50 // Speed of transition
                  });
                });
                subgroup.append($('<a class="share"></a>').attr('href', '#').text('#SHAREit'));
                //horizontal line
                subgroup.append($('<hr>') );
                //append subgroups to group
                group.append(subgroup);

                // Only once we've actually got our subgroup appended to the
                // overall then are we free to run the plugin. This is a problem
                // with this plugin so this is a workaround.
                shareElement.hideshare({
                  link: shareLink, // shareLink, // Link to URL defaults to document.URL
                  title: "", // Title for social post defaults to document.title
                  media: "", // Link to image file defaults to null
                  facebook: true, // Turns on Facebook sharing
                  twitter: true, // Turns on Twitter sharing
                  pinterest: true, // Turns on Pinterest sharing
                  googleplus: true, // Turns on Google Plus sharing
                  linkedin: false, // Turns on LinkedIn sharing
                  position: "Right", // Options: Top, Bottom, Left, Right
                  speed: 50 // Speed of transition
                })
              });
            })
          $(".content").empty().append(group);
        })
        .fail(function(err){
        // the error codes are listed on the dev site
          console.log(err);
          alert("Uh oh! We've got some errors here! Please try again later. We promise we'll fix it", err)
        })
      }

    }

  $('.search').on("submit", loadIt);
  window.Hideshare = Hideshare;

})(window, jQuery);
});
