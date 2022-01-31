const path = require("path");
const hbs = require("hbs");
const express = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

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
    name: "Avinash Dhanani",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
    name: "Avinash Dhanani",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    helpText: "avinashdhanani1@gmail.com",
    name: "Avinash Dhanani",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Avinash Dhanani",
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
    name: "Avinash Dhanani",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("server is up on port " + port);
});
