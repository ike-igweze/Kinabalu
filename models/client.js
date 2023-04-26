const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const ClientSchema = new mongoose.Schema({
  username: String,
  category: Boolean, // 16 digits (first 12 digits hashed)
  account_status: String,
  account_balance: Number,
  card_number: Number,
  card_type: String,
  credit_card_type: String,
  card_cvv: Number, // to be hashed
  notification_preference: String,
});

//instantiate an instance of the client model
const Client = mongoose.model("sysusers", ClientSchema);

ClientSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", ClientSchema);
