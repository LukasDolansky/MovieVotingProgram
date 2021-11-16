const { response } = require('express');
const request = require("request");
var path = require('path');
//Must be node-fetch v2
var fetch = require('node-fetch');
var appRouter = function (app) {

  //Redirect to /home
  app.get('/',function(req,res){
    res.redirect('/home');
  });
  //Index page of site
  app.get('/home',function(req,res){
    res.sendFile(path.join(__dirname+'/../public/index.html'));
    //__dirname : It will resolve to your project folder.
  });
  //Testing url navigation
  app.get('/newpage',function(req,res){
    res.sendFile(path.join(__dirname+'/../public/newpage.html'));
    //__dirname : It will resolve to your project folder.
  });

  //Testing API call - please help
  //TODO: Figure out how to manipulate data
  //TODO: Make code cleaner - understand syntax better
  app.get("/api", async function(req, res) {
    let api_url = "https://api.themoviedb.org/3/movie/550?api_key=6221e0ed54d6b02887581e40fa35381a";    //May want to store API key in hidden file for security
    let json = null;                                                                                    //Not sure why this variable is even used
    const response = await fetch(api_url)                                                               //The glorious fetch()
      .then((response) => json = response.json())                                                       //Parse result into json (probably not needed)
      .catch((err) => console.log(err));                                                                //Output error if one occurs
    console.log(json);                                                                                  //Output json data to console (probably not needed)
    res.json(response);                                                                                 //Response of this API call
  });

  }
  
  module.exports = appRouter;