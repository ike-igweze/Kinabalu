// require body-parser middleware
const bodyParser = require("body-parser");

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
    res.sendFile(parentDirectory + "/public/html/users/adduser.html");
    //save a new user with the name 'Hello World' when route is requested

    //create an instance of User
    const NewUser = new User({
      username: req.body.username,
    //   category: req.body.password,
      userforename: req.body.userforename,
      usersurname: req.body.usersurname,
      useraddress: req.body.useraddress,
    });

    try {
      await NewUser.save();
      console.log("New user saved in database.");
    } catch (err) {
      console.error(err);
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
