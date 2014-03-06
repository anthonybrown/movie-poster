$(function(){
	// put the cursor in the form
	// for usability
	$('#term').focus();

	$('#term').focus(function(){
		var full = $("#poster").has("img").length ? true : false;
		if(full == false){
			$('#poster').empty();
		}
	});

	var getPoster = function(){

      var film = $('#term').val();

			if(film == ''){

				$('#poster').html(
				  "<h2 class='loading'>Form cannot be left empty<br />Please enter a title.</h2>"
				  );

			} else {


				$.getJSON("http://api.themoviedb.org/3/configuration/search/movie?api_key=1b3db3672d28f049a0e3f0237eeae403&query=" +
				    $('#term').val()
				    + "&callback=?",
				      function(json) {
					      console.log(json);
					      console.log(json.results);
					  if (json != "Nothing found."){
			   			$('#poster').html('<h2 class="loading">Here\'s your poster!</h2><img id="thePoster" src=' +
			   			  json.results.poster_path+' />');
			   		} else {
			   			$.getJSON("http://api.themoviedb.org/3/search/movie?api_key=1b3db3672d28f049a0e3f0237eeae403&query=/goonies&callback=?", function(json) {
			   				console.log(json);
			   				$('#poster').html('<h2 class="loading">I\'m afraid nothing was found for that search,Here is the best movie ever though!</h2><img id="thePoster" src=' + json[0].posters[5].image.url + ' />');
			   			});
			   		}
			 	});

		 	}

        return false;
	}

	$('#search').click(getPoster);
	$('#term').keyup(function(event){
	    if(event.keyCode == 13){
	        getPoster();
	    }
	});

});
//				$('#poster').html("<h2 class='loading'>Your poster is on its way!</h2>");
//          //var api_key = '1b3db3672d28f049a0e3f0237eeae403';
//
//				  $.getJSON('http://api.themoviedb.org/3/search/movie?api_key=1b3db3672d28f049a0e3f0237eeae403&query=' +
//				      document.getElementById('term').value + '&callback=?', function(json) {
//				        if (json.total_results > 0) {
//				          content = '';
//
//				          for (i=0; i < json.total_results; i++) {
//				            url = json.total_results[i].poster_path;
//				            content += '';
//				          }
//
//				          $('#poster').html(content);
//				        } else {
//				          $('#poster').html('<h2>Not found!</h2>');
//				        }
//				      });
