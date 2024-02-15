const express = require("express");
const hbs = require("hbs");
//var expressHbs=require('express-handlebars');
//const Handlebars = require('handlebars');
//const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const path = require("path");

const app = express();
const weatherData = require("./utils/weatherData");

const port = process.env.PORT || 3000;

//const publicPath = path.join(__dirname, "../public");

//const viewsPath = path.join(__dirname, "../templates");

//const partialsPath = path.join(__dirname, "../templates/partials");

 // to use hbs in layout
app.set('view engine', '.hbs');
//app.set("views", viewsPath);
hbs.registerPartials("partials");
app.use(express.static("views"));

app.get("/", (req, res) => {
  res.render("index", { title: "Weather App" });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("Address is required");
  }
  weatherData(req.query.address, (error, result) => {
    if (error) {
      return res.send(error);
    }

    res.send(result);
  });
});

app.get("*", (req, res) => {
  res.render("401", { title: "Page not found" });
});

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});