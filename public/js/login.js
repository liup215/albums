layui.use(["jquery","form","element"],function () {
	// body...
	var $ = layui.jquery;
	var form = layui.form,
	element = layui.element,
    Albums = Albums = {
		basePath:'',
		albumsUrl:'http://59.110.160.110:9990/'
	};

	var Album = {
		authInfoData:{}
	};
	Album.clearData = function(key) {
		this.authInfoData = {};
	}

	Album.set = function (key, value) {
        this.authInfoData[key] = (typeof value == "undefined") ? $("#" + key).val() : value;
        return this;
    }

    Album.collectData = function () {
        this.set('username').set('password');
    }

	form.on("submit(login)",function(data) {
		$.ajax({
			url:Albums.basePath+"/login",
			data:data.field,
			type:"POST",
			success:function(resData) {
				var json = JSON.parse(resData);
				if(json.token!=null){
					localStorage.setItem('token',json.token);
					localStorage.setItem('expire',json.expire);
					localStorage.setItem('username',data.field.username);
					// $.cookie("token",json.token);
					document.cookie="token"+ "=" +json.token

					window.location.href = "/index";
				}
			},
			error:function() {
				alert("服务器发生未知错误！！！")
			},
		})
	})

	form.on("submit(signup)",function(data) {
		var url = Albums.basePath + "/signup";
		$.ajax({
			url:url,
			data:data.field,
			type:"POST",
			success:function(aa) {
				alert(JSON.stringify(aa))
			},
			error:function() {
				alert("注册失败")
			},
			dataType:'json'
		})

	})
})