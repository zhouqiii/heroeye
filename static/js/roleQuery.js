function delet() {
	$(".main_right").html('');
}
layui.use(['element', 'table', 'form'], function () {
	var element = layui.element;
	var table = layui.table;
	var form = layui.form;
	element.init();
})
//获取大区
onarea()
function onarea() {
	$.ajax({
		type: "get",
		url: "../getArea",
		async: true,
		success: function (json) {
			for (var i = 0; i < json.rows.length; i++) {
				$(".left_content").append("<input type='checkbox' value=" + json.rows[i].areaId + " onclick='checboxs(this)' />" + "<span>" + json.rows[i].areaName + "</span>")
			}
			$(".left_content input").eq(0).prop("checked", true)
			checboxs()
		}
	});
}
//获取服务器

function checboxs(obj) {
	var areaid
	if (obj == undefined) {
		areaid = $(".left_content input").eq(0).val();
		$(".right_content").empty()
		$.ajax({
			type: "get",
			url: "../getServerListNoPage",
			async: true,
			data: {
				pId: areaid
			},
			success: function (json) {
				for (var i = 0; i < json.rows.length; i++) {
					$(".right_content").append("<input type='checkbox' checked='checked' value=" + json.rows[i].serverId + " />" + "<span>" + json.rows[i].serverName + "</span>")
				}
			}
		});
	}
	if ($(obj).is(":checked") == true) {
		$(obj).siblings().removeAttr("checked")
		$(".right_content").empty()
		areaid = $(obj).val();
		$.ajax({
			type: "get",
			url: "../getServerListNoPage",
			async: true,
			data: {
				pId: areaid
			},
			success: function (json) {
				for (var i = 0; i < json.rows.length; i++) {
					$(".right_content").append("<input type='checkbox' checked='checked' value=" + json.rows[i].serverId + " />" + "<span>" + json.rows[i].serverName + "</span>")
				}
			}
		});
	} else {
		$(obj).prop("checked", true)
	}
}
//选择下拉触发
function selects(ob) {
	var value = $(ob).val();
	if (value == 0) {
		$(".right_content").empty()
		$.ajax({
			type: "get",
			url: "../getServerListNoPage",
			async: true,
			success: function (json) {
				for (var i = 0; i < json.rows.length; i++) {
					$(".right_content").append("<input type='checkbox' checked='checked' value=" + json.rows[i].serverId + " />" + "<span>" + json.rows[i].serverName + "</span>")
				}
			}
		});
		$(".left_content input").prop("disabled", true);
		$(".right_content input").prop("disabled", true);
		$(".left_content input").prop("checked", true);
		$(".right_content input").prop("checked", true);
	} else {
		$(".right_content").empty()
		var areaid = $(".left_content input").eq(0).val();
		$.ajax({
			type: "get",
			url: "../getServerListNoPage",
			async: true,
			data: {
				pId: areaid
			},
			success: function (json) {
				for (var i = 0; i < json.rows.length; i++) {
					$(".right_content").append("<input type='checkbox' checked='checked' value=" + json.rows[i].serverId + " />" + "<span>" + json.rows[i].serverName + "</span>")
				}
			}
		});
		$(".left_content input").prop("disabled", false);
		$(".right_content input").prop("disabled", false);
		$(".left_content input").eq(0).prop("checked", true).siblings().prop("checked", false);
		console.log($(".right_content input").eq(0))
		$(".right_content input").eq(0).prop("checked", true).siblings().prop("checked", false);
	}
}
// 发送指令
function postsend() {
	
	$("body").mLoading("show")
	var server = $(".right_content input");
	var arr = [];
	for (var i = 0; i < server.length; i++) {
		if (server[i].checked == true) {
			arr.push(server[i].value)
		}
	}
	var jsons = arr.join(',');//区服
	var yes = $("#yesorno").val();//简略查询
	var account = $("#account").val()//账号ID
	var roleid = $("#roleID").val()//角色ID
	var rolename = $("#roleName").val()//角色名
	$.ajax({
		type: "get",
		url: "../postSendRoleInfo",
		async: true,
		data: {
			serverId: jsons,
			checkType: yes,
			userId: account,
			roleId: roleid,
			roleName: rolename
		},
		success: function (json) {

			$("body").mLoading("hide")
			alert(json.message)
			
			// $(".main_right").text(json.data)
			var data = json.data
			var playerUidnew = data.userUid;
			var playerNamenew = data.playerName;
			var playerAccountnew = data.playerAccount;
			var playerLevelnew = data.playerLevel;
			var registerTimenew = data.registerTime;
			var areaServernew = data.areaServer;
			var onLinenew = data.onLine;
			var punishnew = data.punish;
			var punishLoginnew = data.punishLogin;
			var punishKicknew = data.punishKick;
			
			
			
			
			$("#pui").val(playerUidnew)
			$("#pname").val(playerNamenew)
			$("#pacc").val(playerAccountnew)
			$("#pleve").val(playerLevelnew)
			$("#pti").val(registerTimenew)
			$("#paer").val(areaServernew)
			// $("#plin").val()
			if(onLinenew == 1){
				$("#plin").val('在线')
				// return false
			}else if(onLinenew == 0){
				$("#plin").val('不在线')
				// return false
			}
			if(punishnew== 0){
				$("#chuli").val("未处罚")
				return false
			}else if (punishnew== 1 && punishLoginnew == null && punishKicknew==null){
				$("#chuli").val("已存在处罚列表")
				$("#add-punish-btn").removeAttr("onclick")
				return false
			} else if(punishnew== 1 && punishLoginnew == 1 && punishKicknew!=1){
				$("#chuli").val("禁止登录")
				$("#add-punish-btn").removeAttr("onclick")
				return false
			}
			else if(punishnew== 1 && punishKicknew == 1 && punishLoginnew!=1){
				$("#chuli").val("被踢下线")
				$("#add-punish-btn").removeAttr("onclick")
				return false
			}
			else if(punishnew== 1 && punishKicknew == 1 && punishLoginnew == 1){
				$("#chuli").val("禁止登录--被踢下线")
				$("#add-punish-btn").removeAttr('onclick')
				return false
			}
			// $("#chuli").val(punishnew)
			// $("#chuli").val(punishLoginnew)
			// $("#chuli").val(punishKicknew)
			
			
	}
	
	})
	
}


// addpunishdd()
	function addpunishdd(){
		// $(".layui-btn").click(function(data){
			var cppui = $("#pui").val()
			var cppanme =$("#pname").val()
			var cpacc =$("#pacc").val()
			var cppleve =$("#pleve").val()
			var cppti =$("#pti").val()
			var cppaer =$("#paer").val()
			// var unline 
			// if($("#plin").val('在线')){
			// 	unline = 1
			// }else if($("#plin").val('不在线')){
			// 	unline = 0
			// }
			// form.render('select');
			
			// var cppui =$("#plin").val()
		
		$.ajax({
			type: "post",
			url: "../addPunish",
			async: true,
			data: {
				playerUid: cppui,
				playerName: cpacc,
				playerNumber: cppanme,
				server:cppaer,
				
			},
			success: function (e) {
				  
				alert(e.message)
				$("body").mLoading("hide")
				
				tableIns.reload()
				localhost.reload()
				// e.stopPropagation();
			}
		
			})
			localhost.reload()
			layer.closeAll();
		return false //阻止表单跳转

	// })
	}
		
	
	
function addemaillist(){
	var exp = new Date();
exp.setTime(exp.getTime() + 60 * 20);//过期时间 2分钟

	$.cookie('the_cookie_pname', $("#pname").val(), { expires: exp, path: '/' });
	$.cookie('the_cookie_pacc',$("#pacc").val(), { expires: exp, path: '/' });
	location.href="emailList.html";
	
	// console.log($("#pname").val())
	// console.log($("#pacc").val())
}

  
