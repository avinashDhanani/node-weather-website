const path = require("path");
const hbs = require("hbs");
const express = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlerbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "avinash dhanani",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
    name: "avinash dhanani",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    helpText: "this is some helpful text",
    name: "avinash dhanani",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "avinash dhanani",
    errorMessage: "help artical not found",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide address",
    });
  }
  geocode(req.query.address, (error, data) => {
    if (error) {
      res.send({
        error: error,
      });
      return console.log(error);
    }

    forecast(data, (error, forecastData) => {
      if (error) {
        res.send({
          error: error,
        });
      }
      return res.send({
        cityName: forecastData.location,
        temperature: forecastData.temperature,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    product: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "avinash dhanani",
    errorMessage: "Page not found.",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
