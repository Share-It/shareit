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
          url:"https://api.spotify.com/v1/search?q=" + encodeURIComponent(pageReq) + "&type=track&limit=50"
        })
        .done(function(data){
          console.log(data);
          var group = $('<div class="group"></div>')
            $.each(data,function(index, response){
              console.log(response.items);
              $.each(response.items,function(i, r){
                console.log(response.items[i]);
                var subgroup = $('<div class="subgroup"></div>')
                //track name
                subgroup.append($('<h3></h3>').text(response.items[i].name));
                //track artist
                subgroup.append($('<h4></h4>').text(response.items[i].artists[0].name));
                //track album
                subgroup.append($('<h6></h6>').text(response.items[i].album.name));
                //track ID
                subgroup.append($('<p></p>').text(response.items[i].id));
                //track URI
                subgroup.append($('<p></p>').text(response.items[i].uri));
                //track preview URI
                subgroup.append($('<audio controls><source /></audio>').attr('src',response.items[i].preview_url));
                //horizontal line
                subgroup.append($('<hr>') );
                //append subgroups to group
                group.append(subgroup);
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
