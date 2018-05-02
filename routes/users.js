var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var URL = 'http://localhost:3001';
var app = express();

/*使用bodyparder中间件*/
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));



/* GET users listing. */
router.get('*', function(req, res, next) {
	if(req.session) {
        next();
	}else{
		res.send({status: "fail"});
	}
});

router.get('/login', function (req, res) {
		var data = JSON.parse(req.query.form);
    	if(!req.session.username){
            req.session.username = data.user;
            console.log(req.session);
            res.json({ret_code: 0, ret_msg: '登录成功',ret_name:req.session.username});
		}else{
            console.log(req.session);
            res.json({ret_code: 0, ret_msg: '登录成功'});
		}

})
router.get('/slide_imgs', function(req, res, next){
	console.log(req.session);
	if(req.session.username){
		console.log(11111);
        var imgs = [
            {src: URL+'/images/slide_imgs/bg1.jpg'},
            {src: URL+'/images/slide_imgs/bg1.jpg'},
            {src: URL+'/images/slide_imgs/bg1.jpg'}
        ]
        res.send(imgs)
	}else {
		res.send({status: 0})
	}

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

