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
    address: {type:String},
    phone: {type:String},
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

var OrdersSchema = new mongoose.Schema({
    shopName: {type: String},
    shopImg: {type: String},
    shopTitle: {type: String},
    shopPrice: {type: String},
    customer: {type: String},
    customerphone: {type: String},
    user: {type: String},
    startaddress: {type:String},
    endaddress: {type:String},
    status: {type: Number, default: 0},
    time:{type:Date,default:Date.now},
    logistics: {type:Array}
});

mongoose.model('User',UsersSchema);
mongoose.model('good',GoodsSchema);
mongoose.model('shop',ShopsSchema);
mongoose.model('order',OrdersSchema);