
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
				$(".left_content").append("<input type='checkbox' value="+json.rows[i].areaId+" onclick='checboxs(this)' />"+"<span>"+json.rows[i].areaName+"</span>");
				$(".left_content1").append("<input type='checkbox' value="+json.rows[i].areaId+" onclick='checboxs(this)' />"+"<span>"+json.rows[i].areaName+"</span>");
				$(".left_content2").append("<input type='checkbox' value="+json.rows[i].areaId+" onclick='checboxs(this)' />"+"<span>"+json.rows[i].areaName+"</span>");
				$(".left_content3").append("<input type='checkbox' value="+json.rows[i].areaId+" onclick='checboxs(this)' />"+"<span>"+json.rows[i].areaName+"</span>");
				$(".left_content4").append("<input type='checkbox' value="+json.rows[i].areaId+" onclick='checboxs(this)' />"+"<span>"+json.rows[i].areaName+"</span>");
				$(".left_content5").append("<input type='checkbox' value="+json.rows[i].areaId+" onclick='checboxs(this)' />"+"<span>"+json.rows[i].areaName+"</span>");
				$(".left_content6").append("<input type='checkbox' value="+json.rows[i].areaId+" onclick='checboxs(this)' />"+"<span>"+json.rows[i].areaName+"</span>");
				$(".left_content7").append("<input type='checkbox' value="+json.rows[i].areaId+" onclick='checboxs(this)' />"+"<span>"+json.rows[i].areaName+"</span>");
			}
			$(".left_content input").eq(0).prop("checked",true);
			$(".left_content1 input").eq(0).prop("checked",true);
			$(".left_content2 input").eq(0).prop("checked",true);
			$(".left_content3 input").eq(0).prop("checked",true);
			$(".left_content4 input").eq(0).prop("checked",true);
			$(".left_content5 input").eq(0).prop("checked",true);
			$(".left_content6 input").eq(0).prop("checked",true);
			$(".left_content7 input").eq(0).prop("checked",true);
			checboxs()
		}
	});
}
//获取服务器

function checboxs(obj){
	var areaid
	if(obj == undefined){
		areaid = $(".left_content input").eq(0).val();
		$(".right_content").empty();
		$(".right_content1").empty();
		$(".right_content2").empty();
		$(".right_content3").empty();
		$(".right_content4").empty();
		$(".right_content5").empty();
		$(".right_content6").empty();
		$(".right_content7").empty();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage",
			async:true,
			data:{
				pId:areaid
			},
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
					$(".right_content1").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
					$(".right_content2").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
					$(".right_content3").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
					$(".right_content4").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
					$(".right_content5").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
					$(".right_content6").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
					$(".right_content7").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
	}
	if($(obj).is(":checked") == true){
		$(obj).siblings().removeAttr("checked");
		$(".right_content").empty();
		$(".right_content1").empty();
		$(".right_content2").empty();
		$(".right_content3").empty();
		$(".right_content4").empty();
		$(".right_content5").empty();
		$(".right_content6").empty();
		$(".right_content7").empty();
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
					$(".right_content").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
					$(".right_content1").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
					$(".right_content2").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
					$(".right_content3").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
					$(".right_content4").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
					$(".right_content5").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
					$(".right_content6").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
					$(".right_content7").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
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
		$(".right_content").empty();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage",
			async:true,
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content input").prop("disabled",true);
		$(".right_content input").prop("disabled",true);
		$(".left_content input").prop("checked",true);
		$(".right_content input").prop("checked",true);
	}else{
		$(".right_content").empty();
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
					$(".right_content").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content input").prop("disabled",false);
		$(".right_content input").prop("disabled",false);
		$(".left_content input").eq(0).prop("checked",true).siblings().prop("checked",false);
		$(".right_content input").eq(0).prop("checked",true).siblings().prop("checked",false);
	}
}
//跨服开关获取区服
function select1(ob){
	var value = $(ob).val();
	if(value == 0){
		$(".right_content1").empty();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage",
			async:true,
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content1").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content1 input").prop("disabled",true);
		$(".right_content1 input").prop("disabled",true);
		$(".left_content1 input").prop("checked",true);
		$(".right_content1 input").prop("checked",true);
	}else{
		$(".right_content1").empty();
		var areaid = $(".left_content1 input").eq(0).val();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage",
			async:true,
			data:{
				pId:areaid
			},
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content1").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content1 input").prop("disabled",false);
		$(".right_content1 input").prop("disabled",false);
		$(".left_content1 input").eq(0).prop("checked",true).siblings().prop("checked",false);
		$(".right_content1 input").eq(0).prop("checked",true).siblings().prop("checked",false);
	}
}
//跨服pk开关
function select2(ob){
	var value = $(ob).val();
	if(value == 0){
		$(".right_content2").empty();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage",
			async:true,
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content2").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content2 input").prop("disabled",true);
		$(".right_content2 input").prop("disabled",true);
		$(".left_content2 input").prop("checked",true);
		$(".right_content2 input").prop("checked",true);
	}else{
		$(".right_content2").empty();
		var areaid = $(".left_content2 input").eq(0).val();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage",
			async:true,
			data:{
				pId:areaid
			},
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content2").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content2 input").prop("disabled",false);
		$(".right_content2 input").prop("disabled",false);
		$(".left_content2 input").eq(0).prop("checked",true).siblings().prop("checked",false);
		$(".right_content2 input").eq(0).prop("checked",true).siblings().prop("checked",false);
	}
}
//提出军团长获取区服
function select3(ob){
	var value = $(ob).val();
	if(value == 0){
		$(".right_content3").empty();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage",
			async:true,
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content3").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content3 input").prop("disabled",true);
		$(".right_content3 input").prop("disabled",true);
		$(".left_content3 input").prop("checked",true);
		$(".right_content3 input").prop("checked",true);
	}else{
		$(".right_content3").empty();
		var areaid = $(".left_content3 input").eq(0).val();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage",
			async:true,
			data:{
				pId:areaid
			},
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content3").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content3 input").prop("disabled",false);
		$(".right_content3 input").prop("disabled",false);
		$(".left_content3 input").eq(0).prop("checked",true).siblings().prop("checked",false);
		$(".right_content3 input").eq(0).prop("checked",true).siblings().prop("checked",false);
	}
}
//删除物品获取区服
function select4(ob){
	var value = $(ob).val();
	if(value == 0){
		$(".right_content4").empty();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage",
			async:true,
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content4").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content4 input").prop("disabled",true);
		$(".right_content4 input").prop("disabled",true);
		$(".left_content4 input").prop("checked",true);
		$(".right_content4 input").prop("checked",true);
	}else{
		$(".right_content4").empty();
		var areaid = $(".left_content4 input").eq(0).val();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage",
			async:true,
			data:{
				pId:areaid
			},
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content4").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content4 input").prop("disabled",false);
		$(".right_content4 input").prop("disabled",false);
		$(".left_content4 input").eq(0).prop("checked",true).siblings().prop("checked",false);
		$(".right_content4 input").eq(0).prop("checked",true).siblings().prop("checked",false);
	}
}
//重新载入表格获取区服
function select5(ob){
	var value = $(ob).val();
	if(value == 0){
		$(".right_content5").empty();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage",
			async:true,
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content5").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content5 input").prop("disabled",true);
		$(".right_content5 input").prop("disabled",true);
		$(".left_content5 input").prop("checked",true);
		$(".right_content5 input").prop("checked",true);
	}else{
		$(".right_content5").empty();
		var areaid = $(".left_content5 input").eq(0).val();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage",
			async:true,
			data:{
				pId:areaid
			},
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content5").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content5 input").prop("disabled",false);
		$(".right_content5 input").prop("disabled",false);
		$(".left_content5 input").eq(0).prop("checked",true).siblings().prop("checked",false);
		$(".right_content5 input").eq(0).prop("checked",true).siblings().prop("checked",false);
	}
}
//批量发奖获取区服
function select6(ob){
	var value = $(ob).val();
	if(value == 0){
		$(".right_content6").empty();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage",
			async:true,
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content6").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content6 input").prop("disabled",true);
		$(".right_content6 input").prop("disabled",true);
		$(".left_content6 input").prop("checked",true);
		$(".right_content6 input").prop("checked",true);
	}else{
		$(".right_content6").empty();
		var areaid = $(".left_content6 input").eq(0).val();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage",
			async:true,
			data:{
				pId:areaid
			},
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content6").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content6 input").prop("disabled",false);
		$(".right_content6 input").prop("disabled",false);
		$(".left_content6 input").eq(0).prop("checked",true).siblings().prop("checked",false);
		$(".right_content6 input").eq(0).prop("checked",true).siblings().prop("checked",false);
	}
}
//清除缓存获取区服
function select7(ob){
	var value = $(ob).val();
	if(value == 0){
		$(".right_content7").empty();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage",
			async:true,
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content7").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content7 input").prop("disabled",true);
		$(".right_content7 input").prop("disabled",true);
		$(".left_content7 input").prop("checked",true);
		$(".right_content7 input").prop("checked",true);
	}else{
		$(".right_content7").empty();
		var areaid = $(".left_content7 input").eq(0).val();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage",
			async:true,
			data:{
				pId:areaid
			},
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content7").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content7 input").prop("disabled",false);
		$(".right_content7 input").prop("disabled",false);
		$(".left_content7 input").eq(0).prop("checked",true).siblings().prop("checked",false);
		$(".right_content7 input").eq(0).prop("checked",true).siblings().prop("checked",false);
	}
}
//发送设置主播账号指令
function postsend(){
	$("body").mLoading("show");
	var server = $(".right_content input");
	var arr = [];
	for(var i = 0;i<server.length;i++){
		if(server[i].checked == true){
			arr.push(server[i].value)
		}
	}
	var jsons = arr.join(',');
	var account = $("#accountID").val();
	$.ajax({
		type:"get",
		url:"../postSendRadioHost",
		async:true,
		data:{
			serverId:jsons,
			userId:account
		},
		success:function(json){
			$("body").mLoading("hide");
			$(".main_right").text(json.message)
		}
	});
}
//发送跨服开关指令
function postsend1(){
	$("body").mLoading("show");
	var server = $(".right_content1 input");
	var arr = [];
	for(var i = 0;i<server.length;i++){
		if(server[i].checked == true){
			arr.push(server[i].value)
		}
	}
	var jsons = arr.join(',');
	var open = $("#open").val();
	$.ajax({
		type:"get",
		url:"../postSendCross",
		async:true,
		data:{
			serverId:jsons,
			isOpen:open
		},
		success:function(json){
			$("body").mLoading("hide");
			$(".main_right1").text(json.message)
		}
	});
}
//发送跨服PK开关指令
function postsend2(){
	$("body").mLoading("show");
	var server = $(".right_content2 input");
	var arr = [];
	for(var i = 0;i<server.length;i++){
		if(server[i].checked == true){
			arr.push(server[i].value)
		}
	}
	var jsons = arr.join(',');
	var open = $("#open2").val();
	$.ajax({
		type:"get",
		url:"../postSendCrossPK",
		async:true,
		data:{
			serverId:jsons,
			isOpen:open
		},
		success:function(json){
			$("body").mLoading("hide");
			$(".main_right2").text(json.message)
		}
	});
}
//发送踢出军团长指令
function postsend3(){
	$("body").mLoading("show");
	var server = $(".right_content3 input");
	var arr = [];
	for(var i = 0;i<server.length;i++){
		if(server[i].checked == true){
			arr.push(server[i].value)
		}
	}
	var jsons = arr.join(',');
	var guid = $("#GUID").val();
	$.ajax({
		type:"get",
		url:"../postSendKickOutChief",
		async:true,
		data:{
			serverId:jsons,
			legionGuid:guid
		},
		success:function(json){
			$("body").mLoading("hide");
			$(".main_right3").text(json.message)
		}
	});
}
//发送删除物品指令
function postsend4(){
	$("body").mLoading("show");
	var server = $(".right_content4 input");
	var arr = [];
	for(var i = 0;i<server.length;i++){
		if(server[i].checked == true){
			arr.push(server[i].value)
		}
	}
	var jsons = arr.join(',');
	var roleid = $("#roleId").val();
	var type = $("#knapsack_type").val();
	var start = $("#start_lattice").val();
	var end = $("#end_lattice").val();
	$.ajax({
		type:"get",
		url:"../postSendDelItem",
		async:true,
		data:{
			serverId:jsons,
			roleId:roleid,
			bagType:type,
			bagSlotBegin:start,
			bagSlotEnd:end
		},
		success:function(json){
			$("body").mLoading("hide");
			$(".main_right4").text(json.message)
		}
	});
}

//重新载入表格
function postsend5(){
	$("body").mLoading("show");
	var server = $(".right_content5 input");
	var arr = [];
	for(var i = 0;i<server.length;i++){
		if(server[i].checked == true){
			arr.push(server[i].value)
		}
	}
	var jsons = arr.join(',');
	$.ajax({
		type:"get",
		url:"../postSendReloadCsv",
		async:true,
		data:{
			serverId:jsons,
		},
		success:function(json){
			$("body").mLoading("hide");
			$(".main_right5").text(json.message)
		}
	});
}
//附件邮件
function postsend6(){
	$("body").mLoading("show");
	var server = $(".right_content6 input");
	var arr = [];
	for(var i = 0;i<server.length;i++){
		if(server[i].checked == true){
			arr.push(server[i].value)
		}
	}
	var jsons = arr.join(',');
	var title = $("#email_title").val();
	var content = $("#email_content").val();
	$.ajax({
		type:"get",
		url:"../postSendRoleReward",
		async:true,
		data:{
			serverId:jsons,
			emailTitle:title,
			emailContent:content
		},
		success:function(json){
			$("body").mLoading("hide");
			$(".form_bottom").text(json.message)
		}
	});
}

//发送清除玩家缓存指令
function postsend7(){
	$("body").mLoading("show");
	var server = $(".right_content7 input");
	var arr = [];
	for(var i = 0;i<server.length;i++){
		if(server[i].checked == true){
			arr.push(server[i].value)
		}
	}
	var jsons = arr.join(',');
	var roles = $("#roles").val();
	$.ajax({
		type:"get",
		url:"../postSendDelCache",
		async:true,
		data:{
			serverId:jsons,
			roleId:roles
		},
		success:function(json){
			$("body").mLoading("hide");
			$(".main_right7").text(json.message)
		}
	});
}
function delet(){
	$(".main_right").html('');
}
function delet1(){
	$(".main_right1").html('');
}
function delet2(){
	$(".main_right2").html('');
}
function delet3(){
	$(".main_right3").html('');
}
function delet4(){
	$(".main_right4").html('');
}
function delet5(){
	$(".main_right5").html('');
}
function delet6(){
	$(".form_bottom").html('');
}
function delet7(){
	$(".main_right7").html('');
}
