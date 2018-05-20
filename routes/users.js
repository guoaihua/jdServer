var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var URL = 'http://localhost:3001';
var DEST = 'public/uploads';
var app = express();
var mongoose = require('mongoose');
var multer = require('multer');

var storage = multer.diskStorage({
    destination:DEST,
    filename: function (req, file, cb) {
  		cb(null, file.originalname)
    }
})
var upload = multer({ storage:storage});
require('../config/mongoose.config');

/*使用bodyparder中间件*/
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));



/* GET users listing. */

// 登录状态 0 表示成功 1: 失败

// 登录页面创建session
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

//获取单个详细信息
router.get('/getGoodsInfos', function (req, res, next) {
	var id = req.query.id
    // 在goods库中查询详细资料
    var goodsModel = mongoose.model('good');

	goodsModel.find({_id:id}, function (err, data) {
        if(err){
            console.log(err)
            return
        }
        console.log(data);
        res.send(data);
    })
})

// 获取商店商品信息列表
router.get('/getDetail', function (req, res, next) {
    // body...
	var id = req.query.id;
	console.log(id)
   var shopModel = mongoose.model('shop');
    shopModel.find({_id:id},{_id:1,shopName:1, user:1},function (err, data) {
		if(err){
			console.log(err)
			return
		}
		console.log(data[0]+"1313")
		// 在pics库中查询详细资料
        var goodsModel = mongoose.model('good');

        goodsModel.find({user:data[0].user},{imgSrc:1}, function (err, data) {
            if(err){
                console.log(err)
                return
            }
            res.send(data);
        })
    })
})

// 获取所有商店名称
router.get('/getShops', function (req, res, next) {
	// body...
   var shopModel = mongoose.model('shop');
   shopModel.find({},{_id:1,shopName:1},function (err, data) {
	   console.log(data)
	   res.send(data)
   })
})

// 商家店名修改
router.get('/changeName', function (req, res, next) {
	var shopName = req.query.shopName
    // 通过用户名在数据库查询
    var shopModel = mongoose.model('shop');

    shopModel.find({shopName: shopName},function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        if(!!data[0]){
        	res.send({status: 1, infos: "更改失败，店名已存在"})
        	return
		}
		var shop = new shopModel({
			user: req.session.username,
			shopName: shopName
		})

		shop.save(function (err, data) {
			if(err) {
				return
			}
			res.send({
                status: 0, infos: "更改成功"
			})
        })
    })

})

// 获取商家商品信息
router.get('/getGoods', function (req, res, next) {
	console.log(req.query.user, req.body, req.params)
	var user = req.query.user;
	// 通过用户名在数据库查询
    var goodsModel = mongoose.model('good');

    goodsModel.find({user: user},{time:1, name:1, price:1, _id:0},function (err, data) {
		if (err) {
			console.log(err)
			return
		}
		console.log(data)
		res.send(data);
    })
	
})

// 上传商品信息
router.post('/addGoods',upload.single('avatar'), function (req, res, next) {
    var clientData = JSON.parse(req.query.data);
	console.log(req.session.username);
	// 图片信息保存在图片表中，每个表存储带上用户的名字
	var goodsModel = mongoose.model('good');
	var  good = new goodsModel({
		name: clientData.name,
		price: clientData.price,
		title: clientData.title,
		address: clientData.address,
		imgSrc: URL+'/uploads/'+req.file.filename,
		user: req.session.username
	});
	good.save(function (err, data) {
		if(err){
			console.log(err)
		}
		console.log(data)
    })
	res.send({
		status: 0,
		infos: '上传成功'
	})
})

// 创建订单
router.post('/createOrder', function (req, res, next) {
    console.log(req.query.form, req.body.params);
    var orders = req.body.params.orders;
    var orderModel = mongoose.model('order');
    orders.forEach(function (item) {
    	console.log(item.goodsInfos.name)
        var order = new orderModel({
            shopName: item.goodsInfos.name,
            shopImg: item.goodsInfos.imgSrc,
            shopTitle: item.goodsInfos.title,
            shopPrice: item.goodsInfos.price,
            customer: item.customer.user,
            customerphone: item.customer.phone,
            user: item.goodsInfos.user,
            startaddress: item.goodsInfos.address,
            endaddress: item.customer.address,
            logistics: [{
            	time: Date.now(),
				infos: "卖家已发货"
			}]
        })
        order.save(function (err , data) {
			if(err){
				console.log(err)
				return
			}
        })
	})
    res.send({
        status: 0,
        infos: "提交成功"
    })

})

// 获取订单状态
router.get('/getOrderStatus', function (req, res) {
	console.log(req.query.user)
	// 通过客户的用户名查询订单消息
	var cutomer = req.query.user
    var orderModel = mongoose.model('order');
    orderModel.find({
		customer: cutomer
	}, {_id:0, status:1},function (err, data) {
		if(err){
			return
		}
		res.send(data)
    })
})

router.get('/getOrders', function (req, res) {
    console.log(req.query.user)
    // 通过客户的用户名查询订单消息
    var cutomer = req.query.user
    var orderModel = mongoose.model('order');
    orderModel.find({
        customer: cutomer
    },function (err, data) {
        if(err){
            return
        }
        res.send(data)
    })
})

// 通过sid查询订单信息
router.get('/getOrderInfos', function (req, res) {
    console.log(req.query.sid)
    // 通过客户的用户名查询订单消息
    var sid = req.query.sid
    var orderModel = mongoose.model('order');
    orderModel.find({
        _id: sid
    },function (err, data) {
        if(err){
            return
        }
        res.send(data[0])
    })
})
// 通过sid修改订单信息
router.get('/changeOrder', function (req, res) {
    console.log(req.query.sid, req.query.infos)
    // 通过客户的用户名查询订单消息
    var sid = req.query.sid
    var orderModel = mongoose.model('order');
    orderModel.findByIdAndUpdate({
        _id: sid
    },{$push: {
    	logistics: {
    		time: Date.now(),
			infos: req.query.infos
		}
		}},function (err, data) {
        if(err){
            return
        }
        res.send({
			status: 0,
			infos: "更新成功"
		})
    })
})
module.exports = router;


