var mongoose = require('mongoose');

//schema
var userSchema = new mongoose.Schema({
    "name" : String,
    "pwd" : String
});

//model
var User = mongoose.model("User",userSchema);
//User.create({'name':'admin','pwd':'admin'});

module.exports = User;
