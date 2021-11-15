var path = require('path');

var appRouter = function (app) {
  //Redirect to /home
  app.get('/',function(req,res){
    res.redirect('/home');
  });
  //Index page of site
  app.get('/home',function(req,res){
    res.sendFile(path.join(__dirname+'../public/index.html'));
    //__dirname : It will resolve to your project folder.
  });
  //Testing url navigation
  app.get('/newpage',function(req,res){
    res.sendFile(path.join(__dirname+'../public/newpage.html'));
    //__dirname : It will resolve to your project folder.
  });
  app.get("/API", function(req, res) {
    res.status(200).send("Welcome to our rest API (under construction).");
    console.log("Great success!");
  });

  }
  
  module.exports = appRouter;