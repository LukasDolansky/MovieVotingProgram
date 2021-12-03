const express = require('express');
var fetch = require('node-fetch');
const oscarData = require(__rootdir + '/oscar_data.json');

const year = express.Router();

year.get('/:year', getList);

async function getList(req, res) {
    console.log(req);
    const film = "film";
    const name = "name";
    const year = "year_film";
    const winner = "winner";

    var category = ((req.params.category).toString()).toUpperCase();
    var json = {};


    console.log("Requested category: " + category);

    for(var i = (oscarData.length - 1); i >= 0 ; i--) {
        var movie = oscarData[i];
        if(movie.category == category && movie.year == req) {
        var title = movie.film;
        var nomineeName = movie.name;
        var releaseYear = movie.year_film;
        var awardCategory = movie.category;
        var awardWinner = movie.winner;
        console.log("Adding movie: " + title);
        json[title] = 
          {
            "title": title,
            "year": releaseYear,
            "name": nomineeName,
            "category": awardCategory,
            "winner": awardWinner
          };
      }
    }
    res.json(json);
}

module.exports = year;