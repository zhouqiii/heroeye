function delet(){
    $(".main_right").html('');
}
layui.use(['element', 'table', 'form'], function() {
    var element = layui.element;
    var table = layui.table;
    var form = layui.form;
    element.init();
})
//获取大区
onarea()
function onarea(){
    $.ajax({
        type:"get",
        url:"../getArea",
        async:true,
        success:function(json){
            for(var i = 0;i<json.rows.length;i++){
                $(".left_content").append("<input type='checkbox' value="+json.rows[i].areaId+" onclick='checboxs(this)' />"+"<span>"+json.rows[i].areaName+"</span>")
            }
            $(".left_content input").eq(0).prop("checked",true)
            checboxs()
        }
    });
}
//获取服务器

function checboxs(obj){
    var areaid
    if(obj == undefined){
        areaid = $(".left_content input").eq(0).val();
        $(".right_content").empty()
        $.ajax({
            type:"get",
            url:"../getServerListNoPage",
            async:true,
            data:{
                pId:areaid
            },
            success:function(json){
                for(var i = 0;i<json.rows.length;i++){
                    $(".right_content").append("<input type='checkbox' checked='checked' id="+json.rows[i].serverName+" value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>")
                }
            }
        });
    }
    if($(obj).is(":checked") == true){
        $(obj).siblings().removeAttr("checked")
        $(".right_content").empty()
        areaid = $(obj).val();
        $.ajax({
            type:"get",
            url:"../getServerListNoPage",
            async:true,
            data:{
                pId:areaid
            },
            success:function(json){
                for(var i = 0;i<json.rows.length;i++){
                    $(".right_content").append("<input type='checkbox' checked='checked' id="+json.rows[i].serverName+" value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>")
                }
            }
        });
    }else{
        $(obj).prop("checked",true)
    }
}
//选择下拉触发
function selects(ob){
    var value = $(ob).val();
    if(value == 0){
        $(".right_content").empty()
        $.ajax({
            type:"get",
            url:"../getServerListNoPage",
            async:true,
            success:function(json){
                for(var i = 0;i<json.rows.length;i++){
                    $(".right_content").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>")
                }
            }
        });
        $(".left_content input").prop("disabled",true);
        $(".right_content input").prop("disabled",true);
        $(".left_content input").prop("checked",true);
        $(".right_content input").prop("checked",true);
    }else{
        $(".right_content").empty()
        var areaid = $(".left_content input").eq(0).val();
        $.ajax({
            type:"get",
            url:"../getServerListNoPage",
            async:true,
            data:{
                pId:areaid
            },
            success:function(json){
                for(var i = 0;i<json.rows.length;i++){
                    $(".right_content").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>")
                }
            }
        });
        $(".left_content input").prop("disabled",false);
        $(".right_content input").prop("disabled",false);
        $(".left_content input").eq(0).prop("checked",true).siblings().prop("checked",false);
        console.log($(".right_content input").eq(0))
        $(".right_content input").eq(0).prop("checked",true).siblings().prop("checked",false);
    }
}
//发送指令
function postsend(){
    $("body").mLoading("show")
    var server = $(".right_content input");
    var arr = [];
    var arr1 = [];
    for(var i = 0;i<server.length;i++){
        if(server[i].checked == true){
            arr.push(server[i].value)
            arr1.push(server[i].id)
        }
    }
    var jsons = arr.join(',');//区服
    var jsons1 = arr1.join(',');//区服名称
    var account = $("#roleID").val()//账号ID
    var money = $("#money").val()//金额
    $.ajax({
        type:"get",
        url:"../supplySheet",
        async:true,
        data:{
            serverId:jsons,
            serverName:jsons1,
            userId:account,
            money:money
        },
        success:function(json){
            $("body").mLoading("hide")
            $(".main_right").text(json.message)
        }
    });
}
