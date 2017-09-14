layui.use(['jquery','element','form','layer','upload'],function() {
	var $ = layui.jquery,
		element = layui.element,
		form = layui.form,
		layer = layui.layer,
		upload = layui.upload;
	$(document).ajaxSend(function(e,xhr,options) {
		xhr.setRequestHeader('authorization','Bearer '+localStorage.getItem('token'));
	})

	var user = {
		username:localStorage.getItem('username'),
	}

	$.ajax({
		url:"/managealbum/get",
        type:'POST',
        data:user,
        success:function (data) {
            // body...
            if(data.status==0){
                var albums = data.data
                if(albums.length==0){
                	layer.msg("暂时没有相册，请先添加");
                	parent.location.href='/index';
                }
                layui.each(albums,function(index,item) {
                	dom = "<option value = '"+ item +"'>" + item + "</option>";
                	$("#album").append(dom);
                });
                user.album = albums[0];
                form.render('select','form');
            }else{
                window.location.href="/login"
            }
            
        },
        beforeSend:function(request) {
            request.setRequestHeader('authorization','Bearer '+localStorage.getItem('token'));
        },
        dataType:'json',
        async:false
	})

	form.on('select(album)',function(data) {
		user.album = data.value;
	})
	upload.render({
		elem:'#files',
		url:'/image/upload',
		data:user,
		auto:false,
		bindAction:'#upload',
		field:'images',
		multiple:'ture',
		done:function(res) {
			if(res.status==0){
				alert(JSON.stringify(res));
				// parent.location.href = '/index';
			}else{
				layer.msg(res.data);
			}
		}
	})
})