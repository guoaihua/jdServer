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



/* GET users listing. */

// 登录状态 0 表示成功 1: 失败

// 登录页面创建session
router.get('/login', function (req, res) {
		var clientData = JSON.parse(req.query.form);

		// 获取model
		var userModel = mongoose.model('User');
		userModel.find({name: clientData.user},function (err, data) {
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
                    console.log(req.session);
                    res.json({ret_code: 0, ret_msg: '登录成功',ret_name:req.session.username});
                }else{
                    console.log(req.session);
                    res.json({ret_code: 0, ret_msg: '登录成功',ret_name:req.session.username});
                }
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

    userModel.find({name:clientData.user},function (err, data) {
		if(err){
			console.log(err)
		}
		console.log(data[0], !!data[0])
		if(!data[0]){
			var user = new userModel({
				name: clientData.user,
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

router.get('/slide_imgs', function(req, res, next){
        var imgs = [
            {src: URL+'/images/slide_imgs/bg1.jpg'},
            {src: URL+'/images/slide_imgs/bg1.jpg'},
            {src: URL+'/images/slide_imgs/bg1.jpg'}
        ]
        res.send(imgs)
})

router.get('/list_imgs', function(req, res, next){

  var items = [
  			{ banner: URL+'/images/pics.jpg',
  			imgs: [
		            {imgSrc: URL+'/images/list_imgs/imgs.jpg', title: '儿童装'},
		            {imgSrc: URL+'/images/list_imgs/imgs.jpg', title: '男装'},
		            {imgSrc: URL+'/images/list_imgs/imgs.jpg', title: '女装'},
		            {imgSrc: URL+'/images/list_imgs/imgs.jpg', title: '春装'},
		            {imgSrc: URL+'/images/list_imgs/imgs.jpg', title: '夏装'},
		            {imgSrc: URL+'/images/list_imgs/imgs.jpg', title: '秋装'},
		            {imgSrc: URL+'/images/list_imgs/imgs.jpg', title: '冬装'},
		            {imgSrc: URL+'/images/list_imgs/imgs.jpg', title: '春夏秋冬装'},
		            {imgSrc: URL+'/images/list_imgs/imgs.jpg', title: '夏装'},
		            {imgSrc: URL+'/images/list_imgs/imgs.jpg', title: '秋装'},
		            {imgSrc: URL+'/images/list_imgs/imgs.jpg', title: '冬装'},
		            {imgSrc: URL+'/images/list_imgs/imgs.jpg', title: '春夏秋冬装'}
     			 ]
			}
     	 ]
  res.send(items);
});

router.get('/class_names', function (req, res, next) {
	// body...
	var names = [
		{
			"name": "春装",
			"id": "0"
		},
				{
			"name": "春装",
			"id": "1"
		},
			{
			"name": "春装",
			"id": "2"  
		},
				{
			"name": "春装",
			"id": "3"
		},
				{
			"name": "春装",
			"id": "4"
		},
			{
			"name": "春装",
			"id": "5"  
		},
				{
			"name": "春装",
			"id": "6"
		},
				{
			"name": "春装",
			"id": "7"
		},
			{
			"name": "春装",
			"id": "8"  
		},			{
			"name": "春装",
			"id": "9"  
		},
				{
			"name": "春装",
			"id": "10"
		},
				{
			"name": "春装",
			"id": "11"
		},
			{
			"name": "春装",
			"id": "12"  
		}
	]
	res.send(names)
})
module.exports = router;

