var express = require('express');
var router = express.Router();
var http = require('http');
var querystring = require('querystring');  

var options = {  
   host: '59.110.160.110',  
   port: '9990',  
   path: '/signup',
   method:'POST',
   headers: {  
        "Content-Type": 'application/x-www-form-urlencoded',  
    }
};

router.post('/',function(req,res,next) {
	console.log("开始注册")
	var post_data = querystring.stringify({
		username:req.body.username,
		password:req.body.password
	});
	console.log(post_data);

	// 用于请求的选项  
	var options = {  
	   host: '59.110.160.110',  
	   port: '9990',  
	   path: '/signup',
	   method:'POST',
	   headers: {  
	        "Content-Type": 'application/x-www-form-urlencoded',  
	    }
	};
	var reqs = http.request(options,function(response) {
		response.on('data',function(data) {
			res.send(data);
		}),
		response.on('error',function(error) {
			console.log(error.message);
		})
	})

	reqs.write(post_data);
	reqs.end();
})

module.exports = router;