var express = require('express');
var router = express.Router();
var http = require('http');
var querystring = require('querystring'); 
  
// 用于请求的选项  
var options = {  
   host: '59.110.160.110',  
   port: '9990',  
   path: '/login',
   method:'POST',
   json:true,
   headers:{
   	'Accept': 'application/json;version=2.0',
    'Content-Type': 'application/json'
   }
};   

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/',function(req,res,next) {

	var post_data = JSON.stringify({
         username : req.body.username,
         password : req.body.password
	});

	var reqs = http.request(options, function(response) {
		response.on('data',function(data) {
			res.send(data);
		});
		response.on('error',function(error) {
			res.send(error);
		})
	});
	reqs.write(post_data+"\n")
	reqs.end();
})

module.exports = router;