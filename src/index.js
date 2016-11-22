$(function() {
  function loadIt(e) {
    var linkID = $('#linkID').val();
    if(typeof linkID == 'undefined' || linkID == '' || linkID == null) {
      alert('Please Try Again')
    } else {
      console.log(linkID);
    }
    $.ajax({
    url:"https://api.spotify.com/v1/search?q=" + encodeURIComponent(linkID) + "&type=track,artist&limit=20"
    }).then(function(response) {

    var holder = $('<div class="holders"></div>');
    console.log(response);

    })
  }
  $('#send').on('click', loadIt);

})
