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
	var webHeader = document.createElement('h1');
	webHeader.textContent = category;
	document.getElementsByTagName('body')[0].appendChild(webHeader);
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
			var title = document.createElement('h2');
			title.setAttribute("id", "title");
			var poster = document.createElement('img');
			var movieLink = document.createElement('a');
			var description = document.createElement('p');
			description.setAttribute("id", "description");

			//insert data into html elements
			title.textContent = movieData[index].title;
			poster.setAttribute('src', movieData[index].posterURL);
			poster.setAttribute('height', 370);
			poster.setAttribute('width', 250);
			movieLink.textContent = movieData[index].imdbLink;
			movieLink.setAttribute('href', movieData[index].imdbLink)
			description.textContent = movieData[index].description;



			movieListContainer.appendChild(title);
			movieListContainer.appendChild(poster);
			movieListContainer.appendChild(document.createElement('br'));
			movieListContainer.appendChild(movieLink);
			movieListContainer.appendChild(document.createElement('br'));
			movieListContainer.appendChild(description);
			movieListContainer.appendChild(document.createElement('br'));
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