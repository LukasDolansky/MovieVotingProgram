const express = require('express');
const results = require('../results/results.js');

const sort = express.Router();

//Show movie data based on Oscar category

sort.use(function(req, res, next) {
    var queries = req.query;
    var newQueries = {};
    var needsRedirect = false;
    console.log("Old URL: " + req.url);
    console.log(queries);
    console.log(req.url);
    for(key in queries) {
      if(queries[key] != '') {
        needsRedirect = true;
        newQueries[key] = queries[key];
      }
    }
    if(needsRedirect == true) {
      newURL = "/?"
      for(key in newQueries) {
        newURL += key + "=" + newQueries[key] + "&";
      }
      newURL = newURL.substring(0, newURL.length - 1);
      req.url = "/results" + newURL;
      res.query = newQueries;
      console.log(req.url);
      res.redirect(301, "/home/results/" + newURL);
    }
    else{
        next();
    }
});

module.exports = sort;