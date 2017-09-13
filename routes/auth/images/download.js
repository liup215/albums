var express = require('express');
var router = express.Router();
var http = require('http');
var querystring = require('querystring');  

router.post('/',function(req,res,next) {
	var post_data = querystring.stringify({
		username : req.body.username,
		album:req.body.album
	})

	var authorization = req.get('authorization');

	var options = {  
	   host: '59.110.160.110',  
	   port: '9990',  
	   path: '/auth/download',
	   method:'POST',
	   headers: {  
	        'Content-Type': 'application/x-www-form-urlencoded',
	        'authorization':authorization
	   }
	}

	var imgs = '';
	var downloadRequest = http.request(options,function(response) {
		response.on('data',function(data) {
			imgs+=data;
		});
		response.on('error',function(error) {
			console.log(error.message);
		});
		response.on('end',function() {
			console.log(imgs)
			res.send(imgs);
		})
	})

	downloadRequest.write(post_data);
	downloadRequest.end();
	
})
module.exports = router;