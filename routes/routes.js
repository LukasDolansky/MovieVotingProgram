const express = require('express');
const request = require("request");
var path = require('path');
//Must be node-fetch v2
var fetch = require('node-fetch');
var htmlData = __dirname + '/../html/';   //__dirname : It will resolve to your project folder.

//This will handle changes to the url.
var appRouter = function (app) {

  //Not sure exactly what this does but it makes CSS work
  app.use(express.static('html'));

  app.get('/',function(req,res){        // Use this syntax to handle redirects to other areas (Not super important but makes you feel smart)
    res.redirect('/home');              // Note how you don't need to show the desired file, just change the url
  });

  app.get('/home',function(req,res){                    // Use this syntax for showing an html file as a web page.      
    res.sendFile(path.join(htmlData + 'index.html'));     // Note that all you need to change is the first argument of the .get()
  });                                                     // and the last argument of the .join()

  app.get('/results',function(req,res){
    res.sendFile(path.join(htmlData + 'results.html'));
    
  });

  //Testing API call
  //TODO: Figure out how to manipulate data
  //TODO: Make code cleaner - understand syntax better
  app.get("/api", async function(req, res) {
    let api_url = "https://api.themoviedb.org/3/movie/550?api_key=6221e0ed54d6b02887581e40fa35381a";    //May want to store API key in hidden file for security
    let json = null;                                                                                    //Not sure why this variable is even used
    const data = await fetch(api_url)                                                               //The glorious fetch()
      .then((data) => json = data.json())                                                       //Parse result into json (probably not needed)
      .catch((err) => console.log(err));                                                                //Output error if one occurs
    console.log(json);                                                                                  //Output json data to console (probably not needed)
    res.json(data);                                                                                 //Response of this API call
  });
  }
  
  module.exports = appRouter;