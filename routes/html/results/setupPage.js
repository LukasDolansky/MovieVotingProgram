/* API SELECTIONS:
    CATEGORY
    YEAR
    WINNER
*/
function setupWebPage() {
	setTitle();
	getInformation();
}

function setTitle() {
	var urlSearchParams = new URLSearchParams(window.location.search);
	var category = urlSearchParams.get('category');
	year = urlSearchParams.get('year');
	var webHeader = document.createElement('h1');
	var hr = document.createElement('hr');
	webHeader.setAttribute("id", "category-header");

	//I'm sorry for this
	if (urlSearchParams.get('winner') != null) {
		if(urlSearchParams.get('category') == null) {
		webHeader.textContent = "WINNERS - " + year;
		} else if (urlSearchParams.get("year") == null) {
			webHeader.textContent = category + " WINNERS";
		} else {
			webHeader.textContent = category + " WINNER - " + year;
		}
	} else {
		if(urlSearchParams.get('category') == null) {
		webHeader.textContent = "NOMINATED MOVIES - " + year;
		} else if (urlSearchParams.get("year") == null) {
			webHeader.textContent = "ALL " + category + " NOMINEES";
		} else {
			webHeader.textContent = category + " NOMINEES - " + year;
		}
	}
	
	document.getElementsByTagName('body')[0].appendChild(webHeader);
	document.getElementsByTagName('body')[0].appendChild(hr);
}

async function getInformation() {
	var urlSearchParams = new URLSearchParams(window.location.search);
	var category; // = urlSearchParams.get('category');
	var year; //= urlSearchParams.get('year');
	var winner; // = urlSearchParams.get('winner');
	if (urlSearchParams.get('category') != null) {
		category = urlSearchParams.get('category');
	}
	if (urlSearchParams.get('year') != null) {
		year = urlSearchParams.get('year');
	}
	if (urlSearchParams.get('winner') != null) {
		winner = urlSearchParams.get('winner');

	}
	movieListContainer = document.createElement('div');
	movieListContainer.setAttribute("class", "movie-data");

	document.getElementsByTagName('body')[0].appendChild(movieListContainer);

	

	var movieData = await getData(category, year, winner);
	//This while loop goes through the api data and put them in html elements
	var k = 1;
	var index = 0;
	while (k <= Object.keys(movieData).length) {
		console.log(movieData[k] != undefined);
		if (movieData[index] != undefined) {

			var movTitle = movieData[index].title;
			var rating = "TMDB Rating: " + movieData[index].rating + " / 10";
			var winResult = "Won Award: ";
			var movDesc = movieData[index].description;
			var movLink = movieData[index].imdbLink;
			var posterURL = movieData[index].posterURL;

			if(movieData[index].winner == "True") {
				winResult += "Yes";
			} else {
				winResult += "No";
			}


			movieContainer = document.createElement('div');
			movieListContainer.appendChild(movieContainer);
			movieContainer.setAttribute("class", "movie_container");
			movieContainer.setAttribute("id", movTitle+"_Container");

			posterContainer = document.createElement('div');
			posterContainer.setAttribute("class", "poster_container");
			posterContainer.setAttribute("id", movTitle+"_Poster_Container");
			posterContainer.setAttribute('height', 370);
			posterContainer.setAttribute('width', 250);

			var title = document.createElement('h2');
			title.setAttribute("class", "title");
			title.setAttribute("id", movTitle + " _Title");
			var rating_winner = document.createElement('h3');
			rating_winner.setAttribute("class", "rating");
			rating_winner.setAttribute("id", movTitle + "_Rating");
			var poster = document.createElement('img');
			poster.setAttribute("class", "poster_img");
			poster.setAttribute("id", movTitle +"_Poster");
	
			var description = document.createElement('h4');
			description.setAttribute("class", "description");
			description.setAttribute("id", movTitle+"_Description");

			//insert data into html elements
			title.textContent = movTitle;
			rating_winner.textContent = rating + " | " + winResult;
			poster.setAttribute('src', posterURL);
			poster.setAttribute('height', 370);
			poster.setAttribute('width', 250);
			description.textContent = movieData[index].description;

			//Insert html elements into page
			movieContainer.appendChild(title);
			posterContainer.appendChild(poster);
			movieContainer.appendChild(posterContainer);
			movieContainer.appendChild(rating_winner);
			movieContainer.appendChild(document.createElement('br'));
			movieContainer.appendChild(description);
			movieContainer.appendChild(document.createElement('br'));

			//Embed IMDB Link into relevant elements
			var posterElement = document.getElementById(movTitle+"_Poster").parentElement;
			var imgEl = posterElement.innerHTML;
			posterElement.innerHTML = "<a href='"+ movLink + "'>" + imgEl + "</a'";
			k++;
		}
		index = index + 1;
	}
	removeLoader();
}

async function getData(category, year, isWinner) {
	var apiBase = ""
	if (window.location.hostname == "localhost") {
		apiBase = "http://localhost:3000/api/sort/?";
	} else {
		apiBase = 'https://movie-voting-program.herokuapp.com/api/sort?';
	}
	var thisCategory = '';
	var thisYear = '';
	var thisIsWinner = '';

	if (category != undefined) {
		thisCategory = 'category=' + category + '&';
	}
	if (year != undefined) {
		thisYear = 'year=' + year + '&';
	}
	if (isWinner != undefined) {
		thisIsWinner = 'winner=' + isWinner;
	}

	var apiURL = apiBase + thisCategory + thisYear + thisIsWinner;

	var testData = await fetch(apiURL)
		.then(async testData => {
			testData = await testData.json();
			console.log(testData);
			return testData;
		});
	return testData;
}

function removeLoader() {
	var loader = document.getElementById("loader");
	loader.remove();
}