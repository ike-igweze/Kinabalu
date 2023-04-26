const express = require("express");
const app = express();
const port = 3000;

//static assets
app.use(express.static("public"));

//enables transfer of post data from html forms
app.use(express.urlencoded({ extended: true }));

//views engine middleware
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//mongodb ORM middleware
const mongoose = require("./config/dbconfig");

//session-based authorisation middleware
const session = require("express-session");
app.use(
  session({
    secret: "randomisedtext",
    resave: false,
    saveUninitialized: false,
  })
);

//authentication middleware
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

//endpoint definitions
require("./routes/routes")(app);
require("./routes/userroutes")(app);
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
