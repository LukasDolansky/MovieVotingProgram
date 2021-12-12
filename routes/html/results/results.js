//TODO: Handle API call failures and populate code with various HTTP response codes

//Default modules
const express = require('express');
var fetch = require('node-fetch');
const index = require('../index');
const results = express.Router({mergeParams : true});        //mergeParams lets chained router calls maintain their parameters and queries
//New Code: variable for data
var storedData;

results.get('/', async (req,res) => {
  res.sendFile(__dirname + '/results.html');
});

module.exports = results;