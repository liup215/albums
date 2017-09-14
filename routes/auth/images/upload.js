var express = require('express');
var router = express.Router();
var http = require('http');
var querystring = require('querystring');  


router.get('/',function(req,res,next) {
    res.setHeader("Access-Control-Allow-Origin","*");
	res.render('images/upload',{});
})

router.post('/',function(req,res,next) {
	console.log(req);
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
		   host: '59.110.160.110',  
		   port: '9990',  
		   path: '/auth/upload',
		   method:'POST',
		   headers: {  
		        'authorization':authorization,
		        'content-type':'multipart/form-data; boundary='+boundary,
		        'x-requested-with': 'XMLHttpRequest',
		        accept: '*/*',
		   }
		}
        var request = http.request(options,function(response) {
            var resData = '';
            response.on('data',function(data) {
                resData += data;
            });
            response.on('end',function() {
                res.send(resData);
            });
            response.on('error',function(error) {
                
            })
        })

        var body = "";
        body += "--"+boundary+"\r\n";
        body += "Content-Disposition: form-data; name='" + post_file.fieldname + "'; filename='" + post_file.filename + "'\r\n";
        body += "Content-Type:"+ post_file.mimetype+"\r\n";
        body += "\r\n";
        body += post_file.file+"\r\n";

        for(var key in post_data){
            body+="--"+boundary+"\r\n";
            body+="Content-Disposition: form-data; name='"+key+"'\r\n";
            body+='\r\n';
            body+=post_data[key]+"\r\n";
        }

        body += "--"+boundary+"--";
        console.log(body);

        // //上传文件  
        request.write(body);
        request.end();            
    })   
})
module.exports = router;