const mongoose = require("mongoose"),

  passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({

    username: {type: String,
      required: true
      },
    password: {type: String,
      required: true
      },

    forname: {type: String,
      required: true
      },
    surname: {type: String,
      required: true
      },

    //address: String,
    role: {type: String,
      required: true
    },
    



});

//instantiate an instance of the user model
const User = mongoose.model('sysusers',UserSchema);

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
