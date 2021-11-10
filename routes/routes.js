var appRouter = function (app) {
  /* If a GET request wants to access the root of the URl, do this */
    app.get("/", function(req, res) {
      res.status(200).send("Welcome to our rest API (under construction).");
      console.log("Great success!");
    });
  }
  
  
  module.exports = appRouter;