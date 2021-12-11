//TODO: Handle API call failures and populate code with various HTTP response codes

//Default modules
const express = require('express');
var fetch = require('node-fetch');
const index = require('../index');
const oscarData = require(__rootdir + '/oscar_data.json');
const getData = require('./getData.js');
const results = express.Router({mergeParams : true});        //mergeParams lets chained router calls maintain their parameters and queries
//New Code: variable for data
var storedData;


/* API SELECTIONS:
    CATEGORY
    YEAR
    WINNER
*/
results.get('/', async (req,res) => {
  res.sendFile(__dirname + '/results.html');
  var category = req.query.category;
  var year = req.query.year;
  var isWinner = req.query.winner;
  
  console.log("Fetching data with parameters:");
  console.log(category);
  console.log(year);
  console.log(isWinner);
  
  data = await getData(category, year, isWinner);
  //New Code: store data into variable
  storedData = data;
  return data;
});

module.exports = results;