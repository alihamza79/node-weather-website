const path = require("path");
const express = require("express");
const geoCode = require("./utils/geo-code");
const forecast = require("./utils/forecast");
const hbs = require("hbs");
const app = express();

// Setup Paths
const directoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup up static directory to serve
app.use(express.static(directoryPath));

// Setup Handel bar and location to views
hbs.registerPartials(partialPath);
app.set("view engine", "hbs");
app.set("views", viewPath);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather Page",
    name: "Ali Hamza",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Ali Hamza",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Ali Hamza",
    helpText: "This is some help text...",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404-page", {
    message: "Help article not found",
    name: "Ali Hamza",
    title: "404 Page",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You should provide address property ! " });
  }
  geoCode(req.query.address, (error, { latitude, longitude, place } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(longitude, latitude, (error, weather) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        weather: weather,
        location: place,
        address: req.query.address,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("404-page", {
    message: "Page not found",
    name: "Ali Hamza",
    title: "404 Page",
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000...");
});
