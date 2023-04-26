module.exports = function (app) {
  const passport = require("passport");
  const User = require("../models/user");

  passport.use(User.createStrategy());
  passport.serializeUser(User.serializeUser());

  passport.deserializeUser(User.deserializeUser());

  checkAuth = (req, res, next) => {
    // passport adds this to the request object
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  };

  app.get("/register", (req, res) => {
    console.log(`Authenticated at /register: ${req.isAuthenticated()}`);
    res.render("register");
  });

  app.post("/register", (req, res) => {
    // Creates and saves a new user with a salt and hashed password
    User.register(
      new User({ username: req.body.username }),
      req.body.password,
      function (err, user) {
        if (err) {
          console.log(err);
          return res.render("register");
        } else {
          passport.authenticate("local")(req, res, function () {
            console.log(`Authenticated: ${req.isAuthenticated()}`);
            res.redirect("/protectedroute1");
          });
        }
      }
    );
  });

  app.get("/login", (req, res) => {
    console.log(`Authenticated at /login: ${req.isAuthenticated()}`);
    res.render("login");
  });

  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/protectedroute1",
      failureRedirect: "/login",
    })
  );

  app.get("/protectedroute1", checkAuth, (req, res) => {
    console.log(`Authenticated at /protectedroute1: ${req.isAuthenticated()}`);
    res.render("protectedroute1");
  });

  app.get("/protectedroute2", checkAuth, (req, res) => {
    console.log(`Authenticated at /protectedroute2: ${req.isAuthenticated()}`);
    res.render("protectedroute2");
  });

  app.get("/logout", (req, res) => {
    console.log(`Authenticated at /logout: ${req.isAuthenticated()}`);
    req.logout((err) => {
      if (err) {
        console.log(err);
        return next(err);
      } else {
        console.log("User has been logged out");
        console.log(`Authenticated at /logout: ${req.isAuthenticated()}`);
        res.redirect("/login");
      }
    });
  });
};
