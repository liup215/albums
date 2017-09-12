/**
 * Created by Administrator on 2017/8/23.
 */
layui.use(['flow','jquery','element','layer'], function(){
    var flow = layui.flow,
    $ = layui.jquery,
    element = layui.element,
    layer = layui.layer,
    Albums = {
        bathPath:'',
        albumsUrl:'http://59.110.160.110:9990/'
    };

    var albums = null;
    var user = {
        username:localStorage.getItem('username')
    }

    //获取相册 
    $.ajax({
        url:"/managealbum/get",
        type:'POST',
        data:user,
        success:function (data) {
            // body...
            if(data.status==0){
                albums = data.data
                layui.each(albums,function(index,item) {
                    $('#albums').append("<a href='#'><i class='layui-icon' style='color: #D3D3D3;'>&#xe622; "+item+"</i></a>")
                });
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
    
    //获取相册对应的图片
    user.album = albums[0]
    $.ajax({
        url:'/download',
        type:'POST',
        data:user,
        success:function(data) {
            if(data.status==0){
                var images = data.data;
                layui.each(images,function(index,item) {
                    image = "<div class='layui-col-lg1 layui-col-md2 layui-col-sm3 layui-col-xs6' style='padding:0.1%'><div ><img layer-src='http://"+item.url+"' src='http://"+item.url+"' style='width: 100%;'><div class='layui-col-md12'>"+item.filename+"</div></div></div>";
                    $("#photoContainer").append(image);
                })
            }else{
                window.location.href = "/login"
            }
            
        },
        beforeSend:function(request) {
            request.setRequestHeader('authorization','Bearer '+localStorage.getItem('token'));
        },
        dataType:'json',
        async:false
    })

    // var img1 = "<div class='layui-col-lg1 layui-col-md2 layui-col-sm3 layui-col-xs6' style='padding:0.1%'><div ><img layer-src='images/photo.jpg' src='images/photo2.jpg' style='width: 100%;'><div class='layui-col-md12'>这是我老婆</div></div></div>"
    // var img2 = "<div class='layui-col-lg1 layui-col-md2 layui-col-sm3 layui-col-xs6' style='padding:0.1%'><div ><img layer-src='images/photo2.jpg' src='images/photo2.jpg' style='width: 100%;'><div class='layui-col-md12'>这是我老婆</div></div></div>"

    // for(var i=0;i<40;i++){
    //     $("#photoContainer").append(img1);
    //     $("#photoContainer").append(img2);

    // }
    
    flow.lazyimg();
    layer.photos({
        photos:"#photoContainer",
        closeBtn:1,
        btnAlign:'c', 
        btn:["<i class='layui-icon'>&#xe640;</i>","<i class='layui-icon'>&#xe642;</i>","<i class='layui-icon'>&#xe61e;</i>"],
        anim:0
    })
});