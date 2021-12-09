//TODO: Handle API call failures and populate code with various HTTP response codes

//Default modules
const express = require('express');
var fetch = require('node-fetch');
const index = require('../index');
const oscarData = require(__rootdir + '/oscar_data.json');

const results = express.Router({mergeParams : true});        //mergeParams lets chained router calls maintain their parameters and queries

/* API SELECTIONS:
    CATEGORY
    YEAR
    WINNER
*/
results.get('/', (req,res) => {
  res.sendFile(__dirname + '/results.html');
  var category = req.query.category;
  var year = req.query.year;
  var isWinner = req.query.isWinner;

  getData(category, year, isWinner);
});

async function getData(category, year, isWinner) {
  var testData = await fetch('http://localhost:3000/api/sort/?year=2019&category=VISUAL%20EFFECTS')
  .then(async testData => {
    testData = await testData.json();
    return testData;
  });
  return testData;
}

module.exports = results;
module.exports = getData;        //Export this file as a module so it can be called elsewhere