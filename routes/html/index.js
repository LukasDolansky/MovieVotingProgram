const express = require('express');
const sort = require('./sort/sort.js');
const results = require('./results/results.js');
const index = express.Router();

//Show movie data based on Oscar category
index.use('/sort', sort);

index.use('/results', results);

index.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})




module.exports = index;