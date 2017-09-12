/**
 * Created by Administrator on 2017/8/23.
 */
layui.use(['flow','jquery','element','layer'], function(){
    window.$ = layui.jquery;
    var flow = layui.flow,  
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
                    $('#albums').append("<a class='album_option' id='"+ item +"' href='#'><i class='layui-icon' style='color: #D3D3D3;'>&#xe622; "+item+"</i></a>")
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
    user.album = albums[0];
    
    $.ajax({
        url:'/download',
        type:'POST',
        data:user,
        success:function(data) {
            if(data.status==0){
                var images = data.data;
                $("#albumOption").html(user.album+"<span class='layui-nav-more'></span>");
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
    
    flow.lazyimg();
    layer.photos({
        photos:"#photoContainer",
        closeBtn:1,
        btnAlign:'c', 
        btn:["<i class='layui-icon'>&#xe640;</i>","<i class='layui-icon'>&#xe642;</i>","<i class='layui-icon'>&#xe61e;</i>"],
        anim:0
    })

    $('#insert').on('click',function() {
        layer.open({
            type:2,
            content:'/managealbum/insert',
            title:'相册添加',
            area:['500px','full'],
            fix:false,
            maxmin:true
        })
    })

    $('.album_option').on('click',function() {
        layer.open({
            type:2,
            content:'/managealbum/option?album='+$(this).attr('id'),
            title:'请选择操作',
            area:['500px','full'],
            fix:false,
            maxmin:true
        })
    })

    $("#img_search").on('click',function() {
        layer.msg("这里搜索图片");
    })

    $("#img_add").on('click',function() {
        layer.msg("这里添加图片");
    })

    $("#img_share").on('click',function() {
        layer.msg("这里分享图片");
    })

});