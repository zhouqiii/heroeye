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
		url:"../getArea.action",
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
			url:"../getServerListNoPage.action",
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
	}
	if($(obj).is(":checked") == true){
		$(obj).siblings().removeAttr("checked")
		$(".right_content").empty()
		areaid = $(obj).val();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage.action",
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
			url:"../getServerListNoPage.action",
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
			url:"../getServerListNoPage.action",
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
	for(var i = 0;i<server.length;i++){
		if(server[i].checked == true){
			arr.push(server[i].value)
		}
	}
	var jsons = arr.join(',');//区服
	var yes = $("#yesorno").val();//是否禁止登录
	var account = $("#account").val()//账号ID
	var roleid = $("#roleID").val()//角色ID
	var rolename = $("#roleName").val()//角色名
	$.ajax({
		type:"get",
		url:"../postSendBanChat.action",
		async:true,
		data:{
			serverId:jsons,
			operation:yes,
			userId:account,
			roleId:roleid,
			roleName:rolename
		},
		success:function(json){
			$("body").mLoading("hide")
			$(".main_right").text(json.message)
		}
	});
}
