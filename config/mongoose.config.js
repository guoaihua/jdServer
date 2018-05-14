var mongoose = require('mongoose');
var url = 'mongodb://localhost/test';

mongoose.connect(url, function (error) {
    if (error) {
        console.log(error)
    }else{
        console.log('数据库连接成功！')
    }
});

var UsersSchema = new mongoose.Schema({
    name:{ type:String},
    password:{type:String},
    time:{type:Date,default:Date.now}
});

mongoose.model('User',UsersSchema);
