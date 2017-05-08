/*Genius Get Search Results*/
var GS_Search_URL = 'https://genius-proxy.glitch.me/search';

function getGeniusSearchData (searchTerm, callback) {
	var request = {
		q: searchTerm
	};
	$.ajax({
		url: GS_Search_URL,
		method: 'GET',
		data: request,
		//jsonp: "callback",
		dataType: "json",
		success: function(response){
			console.log(response);
			callback(response);
		}
	});
}

function displayGeniusSearchData (data) {
	var resultElement = '';
	if (data.response.hits) {
		data.response.hits.forEach(function(item) {
			resultElement += 
			'<li><img class="thumbnail" src="' + item.result.song_art_image_thumbnail_url + '">' + 
			'<p>' + item.result.full_title + '</p></li>' + '<div class="thisSongId hidden">' + item.result.id
			+ '</div>';
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
    $(".search-results-container").removeClass('hidden');
    var userSearchTerm = $(this).find('.js-query').val();
    getGeniusSearchData (userSearchTerm, displayGeniusSearchData);
  });
}

$(function(){watchSubmit();});

/*Genius Get Song Lyrics*/
var GS_Song_URL = 'https://genius-proxy.glitch.me/song';

function getGeniusSongData (songId, callback) {
	var request = {
		id: songId
	};
	$.ajax({
		url: GS_Song_URL,
		method: 'GET',
		data: request,
		//jsonp: "callback",
		dataType: "json",
		success: function(response){
			console.log(response);
			callback(response);
		}
	});
}

function displayGeniusSongData (data) {
	var resultElement = '';
	if (data.response) {
		'<p>' + data.response.song.description.html + '</p>';
		} 
	else {
		resultElement += '<p>No results</p>';
	}
	$('.js-orig-lyrics').html(resultElement);
}
function watchSelection() {
  $('.js-search-results').on('click', 'li', (function(e) {
    e.preventDefault();
    $(".search-results-container").addClass('hidden');
    $(".js-orig-lyrics").removeClass('hidden');
    var songId = $(this).find('.thisSongId').val();
    getGeniusSongData (songId, displayGeniusSongData);
  }));
}

$(function(){watchSelection();});



/*Yandex Get List of Languages*/
function getListLangs (callback) {
var getLangSettings = {
  url: "https://translate.yandex.net/api/v1.5/tr.json/getLangs?",
  key: "trnsl.1.1.20170502T035123Z.42da7472a927a423.30098ed9aeffb741e96cc5613005d8db93c70188",
  ui: "en",
  callback: "jsonp",
  method: "GET",
 }
$.ajax(getLangSettings);
}

function displayListLangs (data) {
	var resultElement = '';
	if (data.langs) {
		var keys = Object.keys(data.langs);
		keys.forEach(function(key) {
			resultElement += 
			'<option value="' + key + '">' + data.langs[key] + '</option>';
		}); 
	}
	$('.js-choose-lang').html(resultElement);
}

/*Yandex Detect Language of Input*/
function detectInputLang (callback) {
var detectLangSettings = {
  "url": "https://translate.yandex.net/api/v1.5/tr.json/detect?key=trnsl.1.1.20170502T035123Z.42da7472a927a423.30098ed9aeffb741e96cc5613005d8db93c70188&text=Guten%20Tag%2C%20Ich%20heisse%20Jessica.&hint=en%2Ces&callback=jsonp",
  "method": "GET",
}
$.ajax(detectLangSettings);
};
/* No need to detect. The Translate code will do that. Whatever language is Selected needs
to be fed into the lang parameter of the translate code. the options paramater with value 1 will
detect and report out the input language code if necessary. The lyrics we want translated needs
to be put in the 'text' parameter of the translate code.

Questions:
How do I navigate through a jsonp function? When displaying the keys/values, how do I call them? 
See above 'jsonp.langs.Object.keys'
Do I want translations returned as text or html? Return simple text. What is the difference?
My callback function is just called jsonp. That doesn't make sense. Is it supposed to be a function?
*/















