var sendTime;
//设置默认时间
today()
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
	sendTime = y + "-" + m + "-" + d +" "+ a + ":" + b + ":" +c;
	$(".time").text(sendTime)
}
layui.use(['element', 'table', 'form', 'laydate'], function() {
	var element = layui.element;
	var table = layui.table;
	var form = layui.form;
	var laydate = layui.laydate;
	element.init();
	laydate.render({
		elem: '#datatimes',
		type:'datetime',//日期可选时分秒
		lang: 'en', //国际化
		format:'yyyy-MM-dd H:m:s',
		theme: '日期', //自定义类名
		value: sendTime,
		trigger: 'click',
		min:0,
		done:function(res){
			sendTime = res
			$(".time").text(sendTime)
		}
	});
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
				$(".left_content").append("<div><input type='checkbox' value="+json.rows[i].areaId+" onclick='checboxs(this)' />"+"<span>"+json.rows[i].areaName+"</span></div>")
			}
			$(".left_content input").eq(0).prop("checked",true)
			checboxs()
		}
	});
}
//获取服务器

function checboxs(obj){
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
function postsend(){
	$("body").mLoading("show")
	var server = $(".right_content input");
	var arr = [];
	for(var i = 0;i<server.length;i++){
		if(server[i].checked == true){
			arr.push(server[i].value)
		}
	}
	var jsons = arr.join(',');
	$.ajax({
		type:"get",
		url:"../postSend.action",
		async:true,
		data:{
			serverId:jsons,
			serverOpenDate:sendTime
		},
		success:function(json){
			$("body").mLoading("hide")
			$(".main_right").text(json.message)
		}
	});
}
function delet(){
	$(".main_right").html('');
}