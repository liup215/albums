
layui.use(['jquery','form','layer'],function(){
	var $ = layui.jquery;
    var form = layui.form;
    var layer = layui.layer;

    var option = {
        user:{
            username:localStorage.getItem('username')
        }
    }

    option.close = function() {
    	var index = parent.layer.getFrameIndex(window.name);
        parent.layer.close(index);
    }
    /**
     * 设置对话框中的数据
     *
     * @param key 数据的名称
     * @param val 数据的具体值
     */

    form.on('submit(addSubmit)',function(data) {
        option.user.album = $('#album').val();
    	if(data.field.option=='open'){
            $.ajax({
                url:'/image/download',
                type:'POST',
                data:option.user,
                success:function(data) {
                    if(data.status==0){
                        parent.$("#photoContainer").empty();
                        var images = data.data;
                        parent.$("#albumOption").html(option.user.album+"<span class='layui-nav-more'></span>");
                        layui.each(images,function(index,item) {
                            image = "<div class='layui-col-lg1 layui-col-md2 layui-col-sm3 layui-col-xs6' style='padding:0.1%'><div ><img layer-src='http://"+item.url+"' src='http://"+item.url+"' style='width: 100%;'><div class='layui-col-md12'>"+item.filename+"</div></div></div>";
                            parent.$("#photoContainer").append(image);
                        })

                    }else{
                        window.location.href = "/login"
                    }
                    
                    option.close();
                },
                beforeSend:function(request) {
                    request.setRequestHeader('authorization','Bearer '+localStorage.getItem('token'));
                },
                dataType:'json',
                async:false
            })
    	}else if(data.field.option=='delete'){
            layer.open({
                title:"提示",
                content:"确认删除相册"+option.user.album+"?",
                btn:['确认','取消'],
                yes:function(index,layero) {
                    $.ajax({
                        url:'/managealbum/delete',
                        data:option.user,
                        type:'POST',
                        success:function(data) {
                            if(data.status==0){
                                parent.window.location.reload();
                            }else{
                                parent.window.location.href='/login';
                            }
                        },
                        beforeSend:function(request) {
                            request.setRequestHeader('authorization','Bearer '+localStorage.getItem('token'));
                        },
                        dataType:'json'
                    })
                },
                function(index,layero) {
                    option.close();
                }
            })
        }
    })

    $("#cancel").on('click',function() {
    	option.close();
    })
})