/*  This is the root of an API call. Here we can probably make a call to this a 
    simple display of the documentation for the API itself. Otherwise, it will serve to route various 
    customizations of the API call.

    TODO: Find out how to get IMDB ID to get data from TMDB API
*/
const express = require('express');
var fetch = require('node-fetch');
const sort = require('./sort/sort.js');

const api = express.Router();

//Show movie data based on Oscar category
api.use('/sort', sort);

api.get('/', (req, res) => {
    res.status(200).sendFile(__dirname + "/api.html");
})

module.exports = api;