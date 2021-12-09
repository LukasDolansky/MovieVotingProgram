var path = require('path');
//Must be node-fetch v2
global.__rootdir = __dirname;
var htmlData = __rootdir + '/routes/html/';   //__dirname : It will resolve to your project folder.
const api = require('./routes/api/api.js');
const html = require('./routes/html/index.js');
//This will handle changes to the url.
var appRouter = function (app) {

  app.get('/',function(req,res){        // Use this syntax to handle redirects to other areas (Not super important but makes you feel smart)
    res.redirect('home');              // Note how you don't need to show the desired file, just change the url
  });

  app.use('/home', html);           //This begins the routing for the front-end gui - see /routes/html                                          

  app.use('/api', api);             //This begins the routing for API requests - see /routes/api/api.js for the next step
}

module.exports = appRouter;