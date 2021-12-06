//TODO: Handle API call failures and populate code with various HTTP response codes

//Default modules
const express = require('express');
var fetch = require('node-fetch');
const api = require('../api');
const oscarData = require(__rootdir + '/oscar_data.json');

const sort = express.Router({mergeParams : true});        //mergeParams lets chained router calls maintain their parameters and queries

/* API SELECTIONS:
    CATEGORY
    YEAR
    WINNER
*/
sort.get('/', getList);

async function getList(req, res, next) {
    //Inputs
    var category = req.query.category; 
    var year = req.query.year;                           
    var isWinner = req.query.winner;                      
    //Output
    res.setHeader('Content-Type', 'application/json');
    var movieData = {};

    //Handle no input
    if(category == undefined && year == undefined && isWinner == undefined) {
      console.log("GET request with no parameters specified, redirecting to API home...");
      res.redirect('/api');
      return;
    }

    console.log("GET request parameters:");
    console.log("Category: " + category);
    console.log("Year: " + year);
    console.log("Winner: " + isWinner);

    //Comb through oscar_data until something matches URL criteria
    for(var i = (oscarData.length - 1); i >= 0 ; i--) {
      var movie = oscarData[i];     //Helps readability

      if((category == undefined || movie.category == category) && 
        (year == undefined || movie.year_film == year) && 
        (isWinner == undefined || movie.winner == isWinner)) {    

        //This will be rewritten once we can make IMDB -> TMDB API calls  
        var title = movie.film;                                 //You don't need to format the ID as a string even though that's what it is in the json!
        var nomineeName = movie.name;
        var releaseYear = movie.year_film;
        var ceremonyYear = movie.year_ceremony;              
        var awardCategory = movie.category;
        var awardWinner = movie.winner;

        console.log("Getting IMDB ID for movie: " + title + "...");

        var IMDB_ID = await getIMDB_ID(title, releaseYear, ceremonyYear);
        console.log("Movie found with ID: " + IMDB_ID);
        if(IMDB_ID == undefined) {continue;}
        console.log("Getting TMDB ID...")
        var TMDB_ID = await getTMDB_ID(IMDB_ID);
        console.log("TMDB ID found: " + TMDB_ID);
        console.log("Getting movie data from TMDB...");
        var movieJSON = await getMovieData(TMDB_ID);
        console.log


        movieData[movieJSON.title] = {
          "Movie": movieJSON.title
        }

      }
    }
    console.log(movieData);
    console.log(Object.keys(movieData).length)
    res.status(200).json(movieData);
}

//TODO: Uses OMDB API to get IMDB ID 
async function getIMDB_ID(movieName, movieReleaseYear, movieCeremonyYear) {
  const apiKey = "1f6dc1cf&t";
  const apiBase = "https://www.omdbapi.com/?apikey=" + apiKey;
  //Inputs
  var movie = "&t=" + movieName;
  var movieRelease = "&y=" + movieReleaseYear;
  var movieCeremony = "&y=" + movieCeremonyYear;
  //Output
  var movieID;

  //Skips awards for individuals not associated with a movie
  if(movieName == undefined) {
    return;
  }

  apiURL_1 = apiBase + movie + movieRelease;        //For some reason, no one can get it straight whether or not a movie
  apiURL_2 = apiBase + movie + movieCeremony;       //released on its release year or its ceremony year. We have to try both

  //Remove after testing------------------
  console.log(movieName);

  var request = await fetch(apiURL_1)                                     //Try the release year
    .then(async(request) => {
      request = await request.json();
      if(request.Awards == "N/A" || request.hasOwnProperty('Error')) {    //Not the right film or no film found
        request = await fetch(apiURL_2)                                   //Try Oscar ceremony year
          .then(async(request) => {
            request = await request.json();
            movieID = request.imdbID;
          })
      } else {
        movieID = request.imdbID;
      }
    })

  return movieID;
}

async function getTMDB_ID(IMDB_ID) {
    let base = "https://api.themoviedb.org/3/find/";    
    let key = "?api_key=6221e0ed54d6b02887581e40fa35381a"; // '?' needed for the API query syntax
    let movie = IMDB_ID;
    let api_url = base + IMDB_ID + key + "&language=en-US&external_source=imdb_id";
    let TMDB_ID = null;

    console.log(api_url);
    let request = await fetch(api_url)
      .then(async(request) => {
        let json = await request.json();
        console.log(json);
        TMDB_ID = json.movie_results.id;
      })
      .catch((err) => console.log(err))
    return TMDB_ID;
}

async function getMovieData(TMDB_ID) {
  let base = "https://api.themoviedb.org/3/movie/";    
  let key = "?api_key=6221e0ed54d6b02887581e40fa35381a"; // '?' needed for the API query syntax
  let movie = TMDB_ID;
  let api_url = base + movie + key;
  let json = null;

  console.log(api_url);

  let request = await fetch(api_url)
    .then(async(request) => {
      json = await request.json();
      console.log(json);
      return json;
    })
    .catch((err) => console.log(err))
}
module.exports = sort;        //Export this file as a module so it can be called elsewhere