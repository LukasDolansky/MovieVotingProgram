var appRouter = function (app) {
    app.get("/", function(req, res) {
      res.status(200).send("Welcome to our rest API (under construction).");
      console.log("Great success!");
    });
  }
  
  module.exports = appRouter;