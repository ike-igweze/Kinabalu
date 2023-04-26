const mongoose = require("mongoose"); 
const mongoDB = "mongodb+srv://ike:Passw0rd2023@cluster0.kl8m9xm.mongodb.net/Uni"; 
mongoose.connect(mongoDB, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    
}); 
    
const db = mongoose.connection; 

db.on("error", console.error.bind(console, "connection error:")); 
db.once("open", function () { 
    console.log("Connected successfully to MongoDB!"); 
}); 
module.exports = mongoose;