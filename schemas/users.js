var mongoose = require('mongoose')

var Users = new mongoose.Schema({
    name:{ type:String},
    password:{type:String},
    time:{type:Date,default:Date.now}
});

module.exports = Users;

