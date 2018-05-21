var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var URL = 'http://localhost:3001';
var app = express();
var mongoose = require('mongoose');

require('../config/mongoose.config');

/*使用bodyparder中间件*/
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function (req, res) {
    var clientData = JSON.parse(req.query.form);

    console.log(clientData);
    // 获取model
    var userModel = mongoose.model('User');
    userModel.find({user: clientData.user},function (err, data) {
        if(err){
            console.log(err)
        }
        console.log(data, data[0])

        if(!data[0]){
            res.send({
                status: 2,
                info: "用户名不存在"
            })
            return
        }
        if(data[0].password === clientData.pw){
            if(!req.session.username){
                req.session.username = clientData.user;
            }
            console.log("111"+req.session.username);
            res.json({ret_code: 0, ret_msg: '登录成功',userInfos:data[0]});
        }else {
            res.send({
                status: 1,
                info: '用户名与密码不匹配'
            })
        }
    })


})

// 页面注册
router.get('/register', function (req, res) {
    var clientData = JSON.parse(req.query.form);
    // 获取model
    var userModel = mongoose.model('User');

    userModel.find({user:clientData.user},function (err, data) {
        if(err){
            console.log(err)
        }
        console.log(data[0], !!data[0])
        if(!data[0]){
            var user = new userModel({
                user: clientData.user,
                address: clientData.address,
                phone: clientData.phone,
                password: clientData.pw
            });

            user.save(function (err) {
                if(err){
                    console.log(err);
                    res.send({status:1, info: "数据库存储失败"})
                }else {
                    res.send({status:0, info: "成功"})
                }
            })
        }else {
            res.send({
                status:2,
                info: "用户名已存在，请重新输入"
            })
        }
    })

})


module.exports = router;
