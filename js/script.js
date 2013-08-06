$(document).ready(function(){
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
			
				$('#poster').html("<h2 class='loading'>Ha, I didn't forget to add the form validation!<br> Enter something please.</h2>");
				
			} else {
		
				$('#poster').html("<h2 class='loading'>Your poster is on its way!</h2>");
			
				$.getJSON("http://api.themoviedb.org/2.1/Movie.search/en/json/23afca60ebf72f8d88cdcae2c4f31866/" + film + "?callback=?", function(json) {
					console.log(json);
					if (json != "Nothing found."){
			   			$('#poster').html('<h2 class="loading">Well looky here, I think this is what you are looking for!</h2><img id="thePoster" src=' + json[0].posters[5].image.url + ' />');
			   		} else {
			   			$.getJSON("http://api.themoviedb.org/2.1/Movie.search/en/json/23afca60ebf72f8d88cdcae2c4f31866/goonies?callback=?", function(json) {
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