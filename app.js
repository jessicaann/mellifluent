//var YT_Search_URL = 'https://www.googleapis.com/youtube/v3/search';
//var YT_Video_Watch = 'https://www.youtube.com/watch?v='
var GS_Search_URL = 'https://genius-proxy.glitch.me/search';

function getYouTubeData (searchTerm, callback) {
	var request = {
		q: "Glass Animals"
	};
	$.ajax({
		url: GS_Search_URL,
		method: 'GET',
		data: request,
		//jsonp: "callback",
		dataType: "json",
		success: function(response){
			console.log(response);
		}
	});
}

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
	if (jsonp.langs) {
		jsonp.langs.forEach(function(item) {
			resultElement += 
			'<option value="' + langs.Object.keys[0] + '">' + langs.Object.value[0] + '</option>';
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
Do I want translations returned as text or html? What is the difference?
My callback function is just called jsonp. That doesn't make sense. Is it supposed to be a function?
*/















