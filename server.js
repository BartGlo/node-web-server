const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + "/views/partials");

app.set("view engine", "hbs");

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("Unable to append to server log.");
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render("maintenance.hbs");
});
app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => new Date().getFullYear());

hbs.registerHelper("screamIt", text => text.toUpperCase());

app.get("/", (req, res) => {
  //   res.send("<h1>Hello Express!!!</h1>");
  //   res.send({ name: "Andrew", likes: ["games", "technology"] });
  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMessage: "Welcome human being!"
  });
});

app.get("/about", (req, res) => {
  //   res.send("About Page");
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get("/bad", (req, res) => {
  res.send({ errorMessage: "Unable to fulfill request" });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
