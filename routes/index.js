var express = require('express');
var router = express.Router();

router.get('/',function (req, res, next) {
	// body...
	res.redirect("/index");
})

/* GET home page. */
router.get('/index', function(req, res, next) {
  var token = req.cookies.token;
  if(!token){
  	res.redirect("/login");
  }

  var auth = {
  	isLogin:true,
  	user:{
  		avator:"http://t.cn/RCzsdCq",
  		name:"Albums"
  	},
  }

  res.render('index',{auth:auth});
});

module.exports = router;
