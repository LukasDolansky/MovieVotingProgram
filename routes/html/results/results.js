//TODO: Handle API call failures and populate code with various HTTP response codes

//Default modules
const express = require('express');
var fetch = require('node-fetch');
const index = require('../index');
var URL = require('url');
const { nextTick } = require('process');
const results = express.Router({mergeParams : true});        //mergeParams lets chained router calls maintain their parameters and queries

results.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/results.html');
})

/* Save this for later
function parseQueries(req, res, next) {
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
    console.log("New URL: " + newURL);
    req.url = newURL;
    return next();
  }
}
*/
/*
results.post('/', (req, res, next) => {
  const form = document.querySelector('form')
  form.addEventListener('submit', event => {
  // submit event detected
    console.log(form.elements[0]);

  event.preventDefault()
  })
  console.log(form.elements[0]);

})
*/
module.exports = results;