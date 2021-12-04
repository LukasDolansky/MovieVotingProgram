const express = require('express');
var fetch = require('node-fetch');
const oscarData = require(__rootdir + '/oscar_data.json');

const category = express.Router({mergeParams : true});

category.get('/:category', getList);
category.get('/:category/:year', getList);
category.get('/:category/:year/:winner', getList);

async function getList(req, res) {
    console.log(req.params);
    console.log(req.query);
    console.log(req);
    var category = ((req.params.category).toString()).toUpperCase();
    var year = req.params.year;
    var isWinner = req.query.winner;
    var json = {};


    console.log("Requested category: " + category);

    for(var i = (oscarData.length - 1); i >= 0 ; i--) {
      var movie = oscarData[i];
      if(movie.category == category && 
        (year == undefined || movie.year_film == year) && 
        (isWinner == undefined || movie.winner == isWinner)) {

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
module.exports = category;