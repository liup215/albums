var express = require('express');
var router = express.Router();
var http = require('http');
var querystring = require('querystring');  

router.post('/',function(req,res,next) {
	var post_data = querystring.stringify({
		username : req.body.username
	})

	var authorization = req.get('authorization');

	var options = {  
	   host: '59.110.160.110',  
	   port: '9990',  
	   path: '/auth/managealbum/get',
	   method:'POST',
	   headers: {  
	        'Content-Type': 'application/x-www-form-urlencoded',
	        'authorization':authorization
	   }
	}

	var request = http.request(options,function(response) {
		response.on('data',function(data) {
			console.log('333')
			res.send(data);	
		});
		response.on('error',function(error) {
			console.log(error.message);
		})
	})

	request.write(post_data);
	request.end();
})

module.exports = router;