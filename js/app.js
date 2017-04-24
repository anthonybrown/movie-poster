'use strict';

$(function(){
	//This is to remove the validation message if no poster image is present
	$('#term').focus(function() {
		var full = $('#poster').has("img").length ? true: false;
		if (full == false) {
			$('#poster').empty();
		}

	});
  // cache some shit
	var api_key = "1b3db3672d28f049a0e3f0237eeae403";
	var baseimg = "http://image.tmdb.org/t/p/w500";

	//function definition
	var getPoster = function(e){
    // this gets rid of the warning about using return false
	  e.preventDefault();

		var film = $('#term').val();

		if (film == '') {
			$('#poster').html("<h2 class='loading'>Please enter a seach.</h2>");
		} else {
			$('#poster').html("<h2 class='loading'>Seaching your query!</h2>");

			$.getJSON("https://api.themoviedb.org/3/search/movie?query=" +
			    escape(film)  +
			      "&api_key=" +
			      api_key     +
			      "&callback=?",
				function(json) {
				// console.log(json);
				// console.log(json.results[0].poster_path);
					if (json.total_results) {
						$('#poster').html(
						  '<h2 class="loading"> We found you your poster.</h2><img id="thePoster" src=' +
						      baseimg + json.results[0].poster_path + ' />');
					} else {
						$.getJSON("http://api.themoviedb.org/3/search/movie?query=goonies&api_key=" +
						  api_key,
							function(json){
								$('#poster').html(
								  '<h2 class="loading">Sorry, nothing was found for that search. Perhaps you were looking for The Goonies?</h2><img id="thePoster" src='+
								  baseimg +
								  json.results[0].poster_path +'/>');
              });
          }
			});
		}
    // this throws a warning now lol
		//return false;
	}

	$('#fetch form').on('submit', getPoster);
});
