// require body-parser middleware
const bodyParser = require("body-parser");

const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = function (app) {

  //connect to database using details in the dbconfig file
  const mongoose = require("../config/dbconfig");
  
  //create an instance of user based on model
  const User = require("../models/user");

  //To serve static files from current location, determine parent directory
  const path = require("path");
  const parentDirectory = path.dirname(__dirname);

  // use body-parser middleware
  app.use(bodyParser.urlencoded({ extended: true }));

  //All routes related to http://localhost:3000/users/..

  app.get("/users/adduser", async (req, res) => {
    res.sendFile(parentDirectory + "/public/html/users/adduser.html");
  });

  app.post("/users/adduser", async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        userforename: req.body.userforename,
        usersurname: req.body.usersurname,
        useraddress: req.body.useraddress,
      });

      await newUser.save();

      console.log("New user saved in database.");
      res.sendFile(parentDirectory + "/public/html/users/adduser.html");
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });


  app.get("/users/getusers", async (req, res) => {
    res.send("See all users in console.log!");
    try {
      const findAllUsersQry = await User.find({});
      console.log(findAllUsersQry);
    } catch (err) {
      console.error(err);
    }
  });
};
