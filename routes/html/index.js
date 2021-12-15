const express = require('express');
const results = require('./results/results.js');

const index = express.Router();

//Show movie data based on Oscar category
index.use('/results', results);

index.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})




module.exports = index;