/* I pretty much just copied this from the REST with Express tutorial */
// @ts-check

/* Importing modules */
var express = require("express");
var bodyParser = require("body-parser");
var server = require("./index.js");
var app = express();
var path = require("path");
var router = express.Router();
/*Setting default port if hosting service cannot provide one */
var PORT = process.env.PORT || 3000;


app.use(bodyParser.json());                             //This lets the app parse json and html properly
app.use(bodyParser.urlencoded({ extended: true }));

server(app);

app.use(express.static('routes/html/'));                //This allows CSS to work

/* Output this to the console to show the user what port to connect to if running locally */ 
var host = app.listen(PORT, function () {
    console.log("App running on port: ", PORT);
});