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
                //horizontal line
                // subgroup.append($('<hr>') );
                //sharing
                var shareLink = response.items[i].external_urls.spotify;
                // subgroup.append($('<a target="_blank"></a>').attr('href', response.items[i].external_urls.spotify).text('open on spotify'));

                // Keep a reference to the element we're creating so that we can use it later
                var shareElement = $('<a class="share share-'+i+'"></a>').attr('href', '#').text("SHAREit");
                // Add it to its container immediately
                subgroup.append(shareElement);
                //horizontal line

                // subgroup.append($('<hr>') );
                //append subgroups to group
                group.append(subgroup);

                // Only once we've actually got our subgroup appended to the
                // overall tree are we free to run the plugin. This is a problem
                // with this plugin so this is a workaround.
                shareElement.hideshare({
                  link: shareLink,// shareLink, // Link to URL defaults to document.URL
                  title: "", // Title for social post defaults to document.title
                  media: "", // Link to image file defaults to null
                  facebook: true, // Turns on Facebook sharing
                  twitter: true, // Turns on Twitter sharing
                  pinterest: true, // Turns on Pinterest sharing
                  googleplus: true, // Turns on Google Plus sharing
                  linkedin: false, // Turns on LinkedIn sharing
                  position: "left", // Options: Top, Bottom, Left, Right
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
});
