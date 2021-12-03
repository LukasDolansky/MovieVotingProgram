/*  This is the root of an API call. Here we can probably make a call to this a 
    simple display of the documentation for the API itself. Otherwise, it will serve to route various 
    customizations of the API call.

    TODO: Find out how to get IMDB ID to get data from TMDB API
*/
const express = require('express');
var fetch = require('node-fetch');
const category = require('./categories/categories.js');

const api = express.Router();

//Show movie data based on Oscar category
api.use('/categories', category);


//Discard this after testing is done--------------------------------------------
api.get('/test', testFunction);
async function testFunction(req, res) {
    let base = "https://api.themoviedb.org/3/movie/";    
    let key = "?api_key=6221e0ed54d6b02887581e40fa35381a"; // '?' needed for the API query syntax
    let movie = req.params.movie;
    console.log(req.params);
    let api_url = base + movie + key;
    let json = null;

    console.log("Attempting API call for movie ID: " + movie);
    let data = await fetch(api_url)
      .then((data) => {
        console.log("success!");
        return json = data.json();
      })
      .catch((err) => console.log(err))
    res.json(data);
}
//----------------------------------------------------------------------------------


module.exports = api;