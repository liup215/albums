
layui.use(['jquery','form','layer'],function(){
	var $ = layui.jquery;
    var form = layui.form;
    var layer = layui.layer;

    var albumInsert = {
    	albumInfoData:{}
    }

    albumInsert.close = function() {
    	var index = parent.layer.getFrameIndex(window.name);
        parent.layer.close(index);
    }

    albumInsert.clearData = function() {
    	this.albumInfoData = {}
    }

    albumInsert.set = function (key, value) {
        this.albumInfoData[key] = (typeof value == "undefined") ? $("#" + key).val() : value;
        return this;
    }

    /**
     * 设置对话框中的数据
     *
     * @param key 数据的名称
     * @param val 数据的具体值
     */
    albumInsert.get = function (key) {
        return $("#" + key).val();
    }

    /**
     * 收集数据
     */
    albumInsert.collectData = function () {
        this.set('album');
        this.albumInfoData.username = localStorage.getItem('username');
    }

    form.on('submit(addSubmit)',function() {
    	albumInsert.clearData();
    	albumInsert.collectData();
    	
    	if(albumInsert.albumInfoData.album!=""){
    		$.ajax({
	    		url:'/managealbum/insert',
	    		data:albumInsert.albumInfoData,
	    		type:'POST',
	    		success:function(data) {
	    			if(data.status==0){
	    				layer.msg(data.statusDescription);
	    				setTimeout("parent.location.reload()",1000);
	    			}else{
	    				layer.msg(JSON.stringify(data));
	    			}
	    		},
	    		beforeSend:function(request) {
	    			request.setRequestHeader('authorization','Bearer '+localStorage.getItem('token'));
	    		},
	    		dataType:'json'
	    	})

    	}else{
			layer.msg('请填写相册名称')
    	}

    	
    })

    $("#cancel").on('click',function() {
    	albumInsert.close();
    })
})