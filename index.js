var path = require('path');
//Must be node-fetch v2
global.__rootdir = __dirname;
var htmlData = __rootdir + '/routes/html/';   //__dirname : It will resolve to your project folder.
const api = require('./routes/api/api.js');

//This will handle changes to the url.
var appRouter = function (app) {

  app.get('/',function(req,res){        // Use this syntax to handle redirects to other areas (Not super important but makes you feel smart)
    res.redirect('home');              // Note how you don't need to show the desired file, just change the url
  });

  app.get('/home',function(req,res){                    // Use this syntax for showing an html file as a web page.      
    res.sendFile(path.join(htmlData + 'index.html'));     // Note that all you need to change is the first argument of the .get()
  });                                                     // and the last argument of the .join()

  app.get('/results',function(req,res){
    res.sendFile(path.join(htmlData + 'results.html'));
    
  });

  app.use('/api', api);             //This begins the routing for API requests - see /routes/api/api.js for the next step
}

module.exports = appRouter;