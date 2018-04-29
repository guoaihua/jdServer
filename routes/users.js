var express = require('express');
var router = express.Router();

  var URL = 'http://localhost:3000'
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/slide_imgs', function(req, res, next){
  var imgs = [
  	    {src: URL+'/images/slide_imgs/bg1.jpg'},
  	   	{src: URL+'/images/slide_imgs/bg1.jpg'},
  	   	{src: URL+'/images/slide_imgs/bg1.jpg'},
  ]
  res.send(imgs)
})

router.get('/list_imgs', function(req, res, next){
  var URL = 'http://localhost:3000'



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
	var names = ["春装","春装","春装","春装","春装","春装","春装","春装","春装","春装","春装","春装","春装","春装"]
	res.send(names)
})
module.exports = router;

