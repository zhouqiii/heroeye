function delet(){
	$(".main_bottom").html('');
}
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
	if(a >= 1 && a < 10) {
		a = "0" + a
	}
	if(b >= 1 && b < 10) {
		b = "0" + b
	}
	if(c >= 1 && c < 10) {
		c = "0" + c
	}
	sendTime = y + "-" + m + "-" + d +" "+ a + ":" + b + ":" +c;
}

layui.use(['element', 'table', 'layer', 'laydate', 'form'], function() {
	var element = layui.element;
	var table = layui.table;
	var layer = layui.layer;
	var laydate = layui.laydate;
	var form = layui.form;
	element.init();
	laydate.render({
		elem: '#datatimes',
		type:'datetime',//日期可选时分秒
		lang: 'en', //国际化
		format:'yyyy-MM-dd HH:mm:ss',
		theme: '日期', //自定义类名
		value: sendTime,
		trigger: 'click',
		min:0,
		done:function(res){
			sendTime = res
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
$("#openSupplement").click(function(){
	var amount = $(".amount").css("display");
	if(amount == "block"){
		$(".amount").css("display","none");
		$(".number").css("display","none");
		$(this).html("开启补单");
	}else{
		$(".amount").css("display","block");
		$(".number").css("display","block");
		$(this).html("关闭补单");
	}
})
//$('input[type=radio][name=sex]').change(function(data) {
//	$("#server").removeAttr("disabled");
//	   	if(this.value == "1"){
//	   		$("#server").find("option[value='0']").attr("selected",true);
//	   		var showName = $("#server").find("option:selected").text();
//			$(".logs").text(showName)
//	   		$(".right_content").empty()
//			$.ajax({
//				type:"get",
//				url:"../getServerListNoPage.action",
//				async:true,
//				success:function(json){
//					for(var i = 0;i<json.rows.length;i++){
//						$(".right_content").append("<div><input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span></div>")
//					}
//				}
//			});
//			$(".left_content input").prop("disabled",true);
//			$(".right_content input").prop("disabled",true);
//			$(".left_content input").prop("checked",true);
//			$(".right_content input").prop("checked",true);
//			$("#server").attr("disabled","disabled");
//	   	}
//	});
//发送指令
function postsend(){
	var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
    var regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
    var reg=/(^\s+)|(\s+$)/g;
	var server = $(".right_content input");
	var arr = [];
	for(var i = 0;i<server.length;i++){
		if(server[i].checked == true){
			arr.push(server[i].value)
		}
	}
	if(arr.length<=0){
		alert("请选择服务器")
		return false
	}
	var jsons = arr.join(',');//服务器
	var emailid = $("#emailid").val();//邮件名称
	if(emailid == "" || emailid.length>16){
		alert("邮件名称不能为空且不能超过16位");
		return false;
	}
//	var radios = $(".radios input[name = 'sex']:checked").val();//获取单发群发
//	if(radios === undefined){
//		alert("请选择邮件性质");
//		return false;}
	var datatimes = $("#datatimes").val();//发送时间
	
	var Expiration = $("#Expiration").val();//过期时间
	if(Expiration === ""||Expiration===null){
		alert("过期时间不能为空");
		return false;}
	var addname = $("#addname").val();//收件名称
	var addnameId = $("#addnameId").val();//收件ID
	if(addname === ""||addname===null){
		alert("收件人名称不能为空");
		return false;}
	if(addnameId === ""||addnameId===null){
		alert("收件人ID不能为空");
		return false;}
	 if(regEn.test(addnameId) || regCn.test(addnameId) || reg.test(addnameId)){
         alert("收件人ID不能为特殊字符");
         return false;
     }
	    var Moneyid = document.getElementsByClassName("Moneyid")
		var Moneynum = document.getElementsByClassName("Moneynum")
		var one_currencyID=Moneyid[0].value
		var one_currencyNum=Moneynum[0].value
		var two_currencyID=Moneyid[1].value
		var two_currencyNum=Moneynum[1].value
		console.log(one_currencyID)
		if(one_currencyID !=""&&one_currencyNum == ""){
			alert("货币数量不能为空");
			return false;
		}else if(one_currencyID == ""&&one_currencyNum !=""){
			alert("货币ID不能为空");
			return false;
		}else if(two_currencyID !=""&&two_currencyNum == ""){
			alert("货币数量不能为空");
			return false;
		}else if(two_currencyID == ""&&two_currencyNum !=""){
			alert("货币ID不能为空");
			return false;
		}
		
	 var content=$("#emailContent").val();//邮件内容
	 if(content == "" || content.length>500){
			alert("邮件内容不能为空且不能超过500位");
			return false;
		}
	 var Goodsid = document.getElementsByClassName("Goodsid")
	 var Goodsnum = document.getElementsByClassName("Goodsnum")
	 var one_goodsID = Goodsid[0].value;//一号物品ID
		var one_goodsNum = Goodsnum[0].value;//一号物品数量
		var two_goodsID = Goodsid[1].value;//二号物品ID
		var two_goodsNum = Goodsnum[1].value;//二号物品数量
		var thr_goodsID = Goodsid[2].value;//三号物品ID
		var thr_goodsNum = Goodsnum[2].value;//三号物品数量
		var for_goodsID = Goodsid[3].value;//四号物品ID
		var for_goodsNum = Goodsnum[3].value;//四号物品数量
		var fiv_goodsID = Goodsid[4].value;//五号物品ID
		var fiv_goodsNum = Goodsnum[4].value;//五号物品数量
//		var idArr = [];
//		for(var i = 0;i<Goodsid.length;i++){
//			idArr.push(Goodsid[i].value)
//		}
//		var idjsons = idArr.join(',');
//		var Goodsnum = $(".Goodsnum");//获取所有附件数量
//		var numArr = [];
//		for(var i = 0;i<Goodsnum.length;i++){
//			numArr.push(Goodsnum[i].value)
//		}
//		var numjsons = numArr.join(',');
	
		$.ajax({
			type:"get",
			url:"../postSendEmail.action",
			async:true,
			data:{
				serverId:jsons,
//				emailType:radios,
				emailSendTime:datatimes,
				emailExpires:Expiration,
				roleId:addnameId,
				emailContent:content,
				goodsNumber1:one_goodsNum,
				goodsCode1:one_goodsID,
				goodsNumber2:two_goodsNum,
				goodsCode2:two_goodsID,
				goodsNumber3:thr_goodsNum,
				goodsCode3:thr_goodsID,
				goodsNumber4:for_goodsNum,
				goodsCode4:for_goodsID,
				goodsNumber5:fiv_goodsNum,
				goodsCode5:fiv_goodsID,
				moneyId_1:one_currencyID,
				moneyNum_1:one_currencyNum,
				moneyId_2:two_currencyID,
				moneyNum_2:two_currencyNum,
			},
			success:function(json){
				if(json.message===false){
					alert(json.message)
				}
				else{
					alert(json.message)
//					window.location.reload()
				}
			}
		});
	
}
//function addins(){
//	var obj=document.getElementsByClassName('addGoal')
//	var len=obj.length
//	for(var i=0;i<len;i++){
//        var Goodsid= document.getElementsByClassName('Goodsid')[i].value
//		var Goodsnum=document.getElementsByClassName('Goodsnum')[i].value
//		if(Goodsid === ""||Goodsid===null||Goodsid===undefined){
//			alert("物品或货币ID不能为空")
//			return false
//		}
//		if(Goodsnum === ""||Goodsnum===null||Goodsnum===undefined){
//            alert("物品或货币数量不能为空")
//            return false
//		}
//
//	}
//	$(obj[len-1]).after('<div class="addGoal"><input type="text" class="Goodsid" placeholder="请输入物品或货币ID" style="width: 140px;background: transparent;color: white;float: left;" /><input type="text" class="Goodsnum"   placeholder="请输入物品或货币数量" style="width: 140px;background: transparent;color: white;float: left;" /></div>')
//}
