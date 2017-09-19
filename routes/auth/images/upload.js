var express = require('express');
var router = express.Router();
var http = require('http');
var querystring = require('querystring');
var request = require('request');  


router.get('/',function(req,res,next) {
    res.setHeader("Access-Control-Allow-Origin","*");
	res.render('images/upload',{});
})

router.post('/',function(req,res,next) {
	var post_data = {};
	var busboy = req.busboy;
	busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      post_data[fieldname] = val;
    });
    var post_file = {};
    busboy.on('file',function(fieldname, file, filename, encoding, mimetype) {
    	post_file.fieldname = fieldname;
    	post_file.filename = filename;
    	post_file.mimetype = mimetype;
    	post_file.encoding = encoding;
    	var file_data = '';
    	file.on('data', function(data) {
			file_data += data; 
		});
		file.on('end', function() {
			post_file.file = file_data;
		});
    })

    busboy.on('finish', function() {
    	var boundary = "-------------------------"+Math.random().toString(16);
		var authorization = req.get('authorization');

        var options = {  
            url:'http://59.110.160.110:9990/auth/upload',
            headers: {  
                'authorization':authorization,
            },
            formData:{
                username:post_data.username,
                album:post_data.album,
                images:{
                    value:Buffer.from(post_data.file),
                    options:{
                        filename:post_file.filename,
                        contentType:post_file.mimetype
                    }
                    
                }
            }
        }

        var r = request.post(options,function(error,response,body) {
            if (!error && response.statusCode == 200) {
                // var info = JSON.parse(body);
                res.send(body);
            }
        });
         
    })   
})
module.exports = router;