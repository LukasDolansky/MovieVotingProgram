/* I pretty much just copied this from the REST with Express tutorial */
// @ts-check

/* Importing modules */
var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var app = express();
var path = require("path");
var router = express.Router();
/*Setting default port if hosting service cannot provide one */
var PORT = process.env.PORT || 3000;

/*I forget what this does. Maybe handling json and html? */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Run the routes script */
routes(app);

/* Output this to the console to show the user what port to connect to if running locally */ 
var server = app.listen(PORT, function () {
    console.log("app running on port.", PORT);
});