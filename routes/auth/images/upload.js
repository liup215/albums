var express = require('express');
var router = express.Router();
var http = require('http');
var querystring = require('querystring');  


router.get('/',function(req,res,next) {
	res.render('images/upload',{});
})

router.post('/',function(req,res,next) {
	var boundaryKey = Math.random().toString(16);
	var authorization = req.get('authorization');
	
	var options = {  
	   host: '59.110.160.110',  
	   port: '9990',  
	   path: '/auth/upload',
	   method:'POST',
	   headers: {  
	        'authorization':authorization,
	        'Content-Type':'multipart/form-data;boundary=----'+boundaryKey
	   }
	}

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
      var request = http.request(options,function(response) {
    	var resData = '';
    	response.on('data',function(data) {
    		resData += data;
    	});
    	response.on('end',function() {
    		console.log(resData);
    		res.send(resData);
    	});
    	response.on('error',function(error) {
    		
    	})
    })

    //上传文件
    
    request.write('-------------------------'+boundaryKey);
    request.write("Content-Disposition: form-data; name='" + post_file.fieldname + "'; filename='" + post_file.filename + "'");
    request.write("Content-Type:image/"+ post_file.mimetype);
    request.write('\r\n');
    request.write(post_file.file_data);
    request.write("-----------------------"+boundaryKey+"--");

    //上传数据
    for(var key in post_data){
    	var boundaryKey = Math.random().toString(16);
    	request.write('-------------------------'+boundaryKey);
    	request.write("Content-Disposition: form-data; name=''"+key);
    	request.write('\r\n');
    	request.write(post_data[key]);
    }
    request.end();
    });
    
})
module.exports = router;