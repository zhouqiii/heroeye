//获取服务器
checboxs()
var serverAll = new Map();
function checboxs(obj){
	if(obj == undefined){
		$.ajax({
			type:"get",
			url:"../getServerListNoPage.action",
			async:true,
			data:{
			},
			success:function(json){
				$(".server_main").append("<div style='display:inline-block;height: 30px;'><input class='ischeckAll' type='checkbox' onclick='ischeckAll(this)' />"+"<span style='margin-left:8px;margin-right:30px;'>全选</span><div>")
				for(var i = 0;i<json.rows.length;i++){
					serverAll.set(json.rows[i].serverId,json.rows[i].serverName)
					$(".server_main").append("<div style='display:inline-block;height: 30px;'><input class='ischeck' type='checkbox' onclick='ischeck(this)' name="+json.rows[i].serverName+" value="+json.rows[i].serverId+" />"+"<span style='margin-left:8px;margin-right:30px;'>"+json.rows[i].serverName+"</span><div>")
				}
			}
		});
	}
}
//查询指令列表
$.ajax({
	type:"get",
	url:"../selectInstructList.action",
	async:true,
	data:{
	},
	success:function(json){
		if(json.state == true){
			if(json.data != null ||json.data != "" ||json.data.length != 0){
				for(var i=0;i<json.data.length;i++){
					$(".orderList").append("<div style='line-height:35px;padding-left: 5%;'><input onclick='ischeckOne(this)' type='radio' id="+json.data[i].id+"  /><span style='margin-left: 6px;display: inline-block;width:80%;'>"+json.data[i].name+"</span></div>")
				}
			}
		}
	}
});
//保存指令
function saveOrder(){
	if($("#orderName").val() == ""){
		$('.confirm_area').html("请输入指令名称")
		$('.confirm_area').fadeIn ().delay (2000).fadeOut ();
		return false;
	}
	var orderName = $("#orderName").val();
	var orderContent = $("#orderContent").val();
	$.ajax({
		type:"get",
		url:"../saveInstruct.action",
		async:true,
		data:{
			name:orderName,
			content:orderContent,
		},
		success:function(json){
			$('.confirm_area').html(json.message)
			$('.confirm_area').fadeIn ().delay (2000).fadeOut ();
			if(json.state == true){
				$("#orderName").val("")
				$("#orderContent").val("")
//				$(".server_main input").attr("checked",false)
//				$(".orderList").append("<div style='line-height:35px;padding-left: 5%;'><input onclick='ischeckOne(this)' type='radio' /><span style='margin-left: 2%;'>"+orderName+"</span></div>")
				location.reload()
			}
		}
	});
}
//发送指令
function sendOrder(){
	if($("#orderName").val() == ""){
		$('.confirm_area').html("请输入指令名称")
		$('.confirm_area').fadeIn ().delay (2000).fadeOut ();
		return false;
	}
	var count=0;
	var serverIds=[];
	for(var i=0;i<$(".ischeck").length;i++){
		if($(".ischeck")[i].checked){
			serverIds.push($(".ischeck")[i].value)
			count ++;
		}
	}
	if(count == 0){
		$('.confirm_area').html("请选择要发送的服务器")
		$('.confirm_area').fadeIn ().delay (2000).fadeOut ();
		return false;
	}
	if(serverIds != null||serverIds != ""||serverIds.length != 0){
		var serverId = serverIds.join(",")
	}
	
	var orderName = $("#orderName").val();
	var orderContent = $("#orderContent").val();
	$("body").mLoading("show")
	$.ajax({
		type:"get",
		url:"../sendInstruct.action",
		async:true,
		data:{
			name:orderName,
			content:orderContent,
			serverId:serverId
		},
		success:function(json){
			$("body").mLoading("hide")
			var str = json.message;
			var Array = str.split(";")
			str = Array.join("\n")
			alert(str)
			if(json.state == true){
				$(".server_main input").attr("checked",false)
			}
		}
	})
}
//载入指令
function getOrder(){
	var Lock = false;
	var orderList = $(".orderList input")
	for(var i=0;i<orderList.length;i++){
		if(orderList[i].checked){
			$.ajax({
				type:"get",
				url:"../selectInstruct.action",//查询单个指令
				async:true,
				data:{
					id:orderList[i].id
				},
				success:function(json){
					$ ('.confirm_area').html(json.message)
					$ ('.confirm_area').fadeIn ().delay (2000).fadeOut ();
					if(json.state == true){
						$("#orderName").val(json.data.name)
						$("#orderContent").val(json.data.content)
						var serverStr = json.data.serverId;
						if(serverStr != null){
							var serverArr = serverStr.split(",")
							for(var j=0;j<serverArr.length;j++){
								for(var i=0;i<$(".ischeck").length;i++){
									if($(".ischeck")[i].value == serverArr[j]){
										$(".ischeck")[i].prop("checked",true)
									}
								}
							}
						}
					}
				}
			})
			Lock = true;
		}
	}
	if(Lock == false){
		$ ('.confirm_area').html("请选择需要载入的指令")
		$ ('.confirm_area').fadeIn ().delay (2000).fadeOut ();
		return false;
	}
}
//删除指令
function deleteOrder(){
	var Lock = false;
	var orderList = $(".orderList input")
	for(var i=0;i<orderList.length;i++){
		if(orderList[i].checked){
			 var msg=confirm("是否确认删除本条指令");
				if(msg==true){
					$.ajax({
						type:"get",
						url:"../delectInstruct.action",
						async:true,
						data:{
							id:orderList[i].id
						},
						success:function(json){
							$ ('.confirm_area').html(json.message)
							$ ('.confirm_area').fadeIn ().delay (2000).fadeOut ();
						}
					})
					Lock = true;
					orderList[i].parentNode.remove();
				 }else{
				  return false;
				 }
		}
	}
	if(Lock == false){
		$ ('.confirm_area').fadeIn ().delay (2000).fadeOut ();
		return false;
	}
}
//全选服务器
function ischeckAll(obj){
	if(obj.checked){
		$(".server_main input").prop("checked",true)
	}else{
		$(".server_main input").attr("checked",false)
	}
}
//判断是否达成全选
function ischeck(obj){
	var Lock = false;
	var serverAll = $(".ischeck")
	var count = 0;
	for(var i=0;i<$(".ischeck").length;i++){
		if($(".ischeck")[i].checked){
			Lock = true;
			count ++;
		}
	}
	if(obj.checked){
		if(count == $(".ischeck").length){
			$(".ischeckAll").prop("checked",true)
		}
	}else{
		if(count == 0||count !== $(".ischeck").length){
			$(".ischeckAll").attr("checked",false)
		}
	}
}
//单选指令
function ischeckOne(obj){
	if(obj.checked){
		$(obj).parent().siblings().children("input").prop("checked",false)
	}else{
		
	}
}