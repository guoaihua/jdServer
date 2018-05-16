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
    user:{ type:String},
    password:{type:String},
    time:{type:Date,default:Date.now}
});

var GoodsSchema = new mongoose.Schema({
    name: {type: String},
    price: {type: String},
    title: {type: String},
    address: {type: String},
    imgSrc:{ type: String},
    user: {type: String},
    time:{type:Date,default:Date.now}
});

var ShopsSchema = new mongoose.Schema({
    shopName: {type: String},
    user: {type: String},
    time:{type:Date,default:Date.now}
});

mongoose.model('User',UsersSchema);
mongoose.model('good',GoodsSchema);
mongoose.model('shop',ShopsSchema);
