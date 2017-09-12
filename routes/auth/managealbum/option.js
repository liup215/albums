var express = require('express');
var router = express.Router();
var http = require('http');
var querystring = require('querystring');  

router.get('/',function(req,res,next) {
	var album = req.query.album;
	res.render('album/option',{album:album});
})

module.exports = router;