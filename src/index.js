var client_id = 'a545b9c515e14ff6b50077bac02b38f8'; // Your client id
var client_secret = '0df608227b36427e890afb56d21ac2e2'; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

function loadIt(e) {
  e.preventDefault();

  var pageReq = $('.pageReq').val();
    if (pageReq == '' || typeof pageReq == null || typeof pageReq == undefined) {
      alert('Don\'t forget to enter your character!')
    } else {
      $.ajax(
        {
          url:"https://api.spotify.com/v1/search?q=" + encodeURIComponent(pageReq) + "&type=track,artist&limit=50"
        })
        .done(function(data){
          // console.log(spotify);
          var group = $('<div class="group"></div>')

          if (data.artists.length === "undefined" && data.tracks.length === "undefined") {
            alert ('Sorry we can\'t find any artists or tracks by that name!')
          } else {
            $.each(data,function(index, res){
              console.log(res.items);
              //artist image
              // group.append($('<img class="character-photo"/>').attr('src',res.thumbnail.path + "/detail." + res.thumbnail.extension));
              //artist name
              // group.append($('<a class="name" target="_blank"></a>').attr('href', res.urls[0].url).text(res.name));
              //artist ID
              // group.append($('<p class="credit"></p>').text('Data provided by Marvel. © 2016 MARVEL'));
              //artist URI
              // group.append($('<p class="description"></p>').text(res.description));

              //track ame
            //   group.append($('<p class="available"></p>').text('Comics available: ' + res.comics.available));
            //   //"Your Comic:"
            //   group.append($('<h3 class="yourcomic"></h3>').text('Your comic: '));
            //   //horizontal line
            //   group.append($('<hr>'));
            //
            })
            $('.content').empty().append(group);
          }
        })
        .fail(function(err){
        // the error codes are listed on the dev site
          console.log(err);
          alert("Uh oh! We've got some errors here! Please try again later. We promise we'll fix it", err)
        })
      }
    }
  $('.search').on("submit", loadIt);
