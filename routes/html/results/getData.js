var fetch = require('node-fetch');

async function getData(category, year, isWinner) {
    const apiBase = 'http://localhost:3000/api/sort/?';
    var thisCategory = '';
    var thisYear = '';
    var thisIsWinner = '';
  
    if(category != undefined) {
      thisCategory = 'category=' + category + '&';
    }
    if(year != undefined) {
      thisYear = 'year=' + year + '&';
    }
    if(isWinner != undefined) {
      thisIsWinner = 'winner' + isWinner;
    }
  
    var apiURL = apiBase + thisCategory + thisYear + thisIsWinner;
    
    var testData = await fetch(apiURL)
    .then(async testData => {
      testData = await testData.json();
      return testData;
    });
    return testData;
  }

  module.exports = getData;        