//Default modules
const express = require('express');
var fetch = require('node-fetch');
const oscarData = require(__rootdir + '/oscar_data.json');

const category = express.Router({mergeParams : true});        //mergeParams lets chained router calls maintain their parameters and queries

//The various API customizations. More to come but the idea is here
//  If this gets too large or complex, we can create a new route to simplify things
category.get('/:category', getList);
category.get('/:category/:year', getList);
category.get('/:category/:year/:winner', getList);

async function getList(req, res) {
    //Remove after testing ----------------
    console.log(req.params);        
    console.log(req.query);                 
    console.log(req);
    //(or make log output more useful)-----

    //Inputs
    var category = (req.params.category).toUpperCase();   //The toUpperCase() can be removed once we force input via buttons or something
    var year = req.params.year;                           //Parameters look like /something/something/parameter
    var isWinner = req.query.winner;                      //Queries look like /something/?queryID=queryValue
    //Output
    var json = {};


    console.log("Requested category: " + category);

    //Comb through oscar_data until something matches URL criteria
    for(var i = (oscarData.length - 1); i >= 0 ; i--) {
      var movie = oscarData[i];     //Helps readability

      if(movie.category == category && 
        (year == undefined || movie.year_film == year) && 
        (isWinner == undefined || movie.winner == isWinner)) {    

        //This will be rewritten once we can make IMDB -> TMDB API calls  
        var title = movie.film;                                 //You don't need to format the ID as a string even though that's what it is in the json!
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
module.exports = category;        //Export this file as a module so it can be called elsewhere