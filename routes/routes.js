const { response } = require('express');
const request = require("request");
var path = require('path');
const fetch = () => import('node-fetch').then(({default: fetch}) => fetch());
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
  app.get("/api", async function(req, res) {
    let api_url = `https://api.themoviedb.org/3/movie/550?api_key=6221e0ed54d6b02887581e40fa35381a`
    const response = await fetch('https://api.themoviedb.org/3/movie/550?api_key=6221e0ed54d6b02887581e40fa35381a');
    const json = await response.json();
    console.log(response);
  });

  }
  
  module.exports = appRouter;