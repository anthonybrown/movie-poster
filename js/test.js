$(function(){
  // body...
  var apiKey = '1b3db3672d28f049a0e3f0237eeae403';

  $(function() {
    $.ajax({
        url: 'http://api.themoviedb.org/3/search/movie?api_key='+ apiKey + '&query=fight+club'
      , dataType: 'jsonp'
      , jsonpCallback: 'testing'
    }).error(function() {
        console.log('error')
    }).done(function(response) {
        for (var i = 0, len = response.results.length; i < len; i++) {
          $('#poster').append('<li>' + response.results[i].title + '</li>');
        }
    });
  });
}(window, jQuery));

