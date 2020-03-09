function delet() {
	$(".main_bottom").html('');
}
today()
//设置默认时间
function today() {
	var today = new Date();
	var y = today.getFullYear();
	var m = today.getMonth() + 1;
	var d = today.getDate();
	var a = today.getHours();
	var b = today.getMinutes();
	var c = today.getSeconds();
	if(m >= 1 && m < 10) {
		m = "0" + m
	}
	if(d >= 1 && d < 10) {
		d = "0" + d
	}
	if(a >= 1 && a < 10) {
		a = "0" + a
	}
	if(b >= 1 && b < 10) {
		b = "0" + b
	}
	if(c >= 1 && c < 10) {
		c = "0" + c
	}
	old = y + "-" + m + "-" + d + " " + a + ":" + b + ":" + c;
	var newtoday = new Date();
	var newy = newtoday.getFullYear();
	var newm = newtoday.getMonth() + 1;
	var newd = newtoday.getDate();
	var newa = today.getHours();
	var newb = today.getMinutes();
	var newc = today.getSeconds();
	if(newm >= 1 && newm < 10) {
		newm = "0" + newm
	}
	if(newd >= 1 && newd < 10) {
		newd = "0" + newd
	}
	if(newa >= 1 && newa < 10) {
		newa = "0" + newa
	}
	if(newb >= 1 && newb < 10) {
		newb = "0" + newb
	}
	if(newc >= 1 && newc < 10) {
		newc = "0" + newc
	}
	newtime = newy + "-" + newm + "-" + newd + " " + newa + ":" + newb + ":" + newc;
}
var times = old + "~" + newtime;
layui.use(['element', 'table', 'form', 'laydate'], function() {
	var element = layui.element;
	var table = layui.table;
	var form = layui.form;
	var laydate = layui.laydate;
	element.init();
	//日历配置
	var now = new Date();
	laydate.render({
		elem: '#seltime',
		type: 'datetime', //日期可选时分秒
		range: '~', //日期范围选择
		lang: 'en', //国际化
		format: 'yyyy-MM-dd HH:mm:ss',
		theme: 'riqi', //自定义类名
		value: old + ' ~ ' + newtime,
		//		max: 'now',
		trigger: 'click',
		done: function(res) {
			times = res
		}
	});
})
//获取大区
onarea()

function onarea() {

	$.ajax({
		type: "get",
		url: "../getArea.action",
		async: true,
		success: function(json) {
			for(var i = 0; i < json.rows.length; i++) {
				$(".left_content").append("<div><input type='checkbox' value=" + json.rows[i].areaId + " onclick='checboxs(this)' />" + "<span>" + json.rows[i].areaName + "</span></div>")
			}
			$(".left_content input").eq(0).prop("checked", true)
			checboxs()
		}
	});
}

//获取服务器

function checboxs(obj) {
	var areaid
	if(obj == undefined) {
		areaid = $(".left_content input").eq(0).val();
		$(".right_content").empty()
		$.ajax({
			type: "get",
			url: "../getServerListNoPage.action",
			async: true,
			data: {
				pId: areaid
			},
			success: function(json) {
				for(var i = 0; i < json.rows.length; i++) {
					$(".right_content").append("<div><input type='checkbox' checked='checked' value=" + json.rows[i].serverId + " />" + "<span>" + json.rows[i].serverName + "</span></div>")
				}
			}
		});
	}
	if($(obj).is(":checked") == true) {
        for(var i=0;i<($(".left_content input").length);i++){
            $(".left_content input").eq(i).prop("checked", false)
        }
        $(obj)[0].checked=true
		$(".right_content").empty()
		areaid = $(obj).val();
		$.ajax({
			type: "get",
			url: "../getServerListNoPage.action",
			async: true,
			data: {
				pId: areaid
			},
			success: function(json) {
				for(var i = 0; i < json.rows.length; i++) {
					$(".right_content").append("<div><input type='checkbox' checked='checked' value=" + json.rows[i].serverId + " />" + "<span>" + json.rows[i].serverName + "</span></div>")
				}
			}
		});
	} else {
		$(obj).prop("checked", true)
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
					$(".right_content").append("<div><input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span></div>")
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
					$(".right_content").append("<div><input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span></div>")
				}
			}
		});
		$(".left_content input").prop("disabled",false);
		$(".right_content input").prop("disabled",false);
		for(var i=0;i<($(".left_content input").length);i++){
            $(".left_content input").eq(i).prop("checked", false)
		}
		$(".left_content input").eq(0).prop("checked", true)
		$(".right_content input").eq(0).prop("checked", true).siblings().prop("checked", false);
	}
}
//发送指令
function postsend() {
	var server = $(".right_content input");
	var arr = [];
	if(server.length <= 0) {
		alert("请选择服务器")
	}
	for(var i = 0; i < server.length; i++) {
		if(server[i].checked == true) {
			arr.push(server[i].value)
		}
	}
	var jsons = arr.join(','); //服务器
	var notice = $("#noticeID").val();//公告ID
	var interval = $("#emailTit").val();//间隔时间
	var add_dele = $("#addordele").val();//添加或删除
	var notice_content = $("#emailContent").val();//公告内容
	$.ajax({
		type: "get",
		url: "../postSendNotice.action",
		async: true,
		data:{
			serverId:jsons,
			marqueeId:notice,
			marqueeInterval:interval,
			enable:add_dele,
			marqueeContent:notice_content,
			startDate:times
		},
		success:function(json){
			$(".main_bottom").html(json.message)
		}
	})
}