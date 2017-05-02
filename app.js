var Genius_Search_URL = "https://api.genius.com/search";
 function getGeniusData (searchTerm, callback) {
	var settings = {
		q: searchTerm,
		url: Genius_Search_URL,
		method: "GET",
		dataType: "json",
		headers: {
	    	authorization: "Bearer 8-Ko3WalCfgafFx5d7XL69kx7PkHhvuBUOeF07wQEXFPNvgIWDkp83aitNN-0BNl",
	    	
  }
}
	$.ajax(settings);
}

/* function getGeniusData (searchTerm, callback) {
	var settings = {
		async: true,
		CrossDomain: true,
		q: searchTerm,
		url: Genius_Search_URL,
		method: "GET",
		dataType: "json",
  }
	$.ajax(settings);
} */

function displayGeniusData (data) {
	var resultElement = '';
	if (response.hits) {
		response.hits.forEach(function(item) {
			resultElement += 
			'<li><a href="' + response.hits.result.url + '"' + 'target="_blank" >' + '<img src="' + response.hits.result.song_art_image_thumbnail_url + '">' + 
			'<p>' + response.hits.result.fulltitle + '</p>' + '</a></li>';
		}); 
	}
	else {
		resultElement += '<p>No results</p>';
	}
	$('.js-search-results').html(resultElement);
}
function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var userSearchTerm = $(this).find('.js-query').val();
    getGeniusData (userSearchTerm, displayGeniusData);
  });
}

$(function(){watchSubmit();});