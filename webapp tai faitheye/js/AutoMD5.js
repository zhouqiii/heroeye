var sreverName;
var sendTime;
var majorName; //全局主文件名
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
				for(var i = 0;i<json.rows.length;i++){
					serverAll.set(json.rows[i].serverId,json.rows[i].serverName)
					$(".main_left").append("<input class='ischeck' type='checkbox' onclick='ischeck(this)' name="+json.rows[i].serverName+" value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span><i style='float:right;' class='layui-icon layui-icon-right hide'></i>")
				}
			}
		});
	}
}
//获取文件列表
getList();
function getList(){
	$.ajax({
		type:"get",
		url:"../listFile.action",
		async:true,
//		data:{
//			type:0,
//		},
		success:function(json){
			for(var i = 0;i<json.data.length;i++){
//				$(".fileName").append("<li><input type='radio' onclick='checkFile(this)'/><span class='file'></span><span class='fileall' style='display:inline-block;width:89%;'>"+json.data[i].fileName+" "+"["+json.data[i].fileSize+"]"+" "+"["+json.data[i].lastDate+"]"+ "<span style='display:none;'>"+" "+json.data[i].filePath+"</span></span></li>")
				$(".fileName .layui-collapse").append("<div class='layui-colla-item'><h2 class='layui-colla-title' onclick='getZip(this)'><span class='file'></span><span class='fileMajor' style='display:inline-block;width:89%;'>"+json.data[i].fileName+" "+" "+"["+json.data[i].lastDate+"]"+ "<span style='display:none;'>"+" "+json.data[i].filePath+"</span></span></h2><div class='layui-colla-content '></div></div>")
			}
		}
	});
}
//获取子文件
function getZip(obj){
	console.log($(obj).children(".fileMajor").html())
	var aaa = $(obj).children(".fileMajor").html();
	var Arr = aaa.split(" ")
	majorName = Arr[0]
	$(obj).siblings('.layui-colla-content').empty()
	var filetext = $(obj).children(".fileMajor").html()
	var FileName = filetext.split("  ")
	$.ajax({
		type:"get",
		url:"../zipList.action",
		async:true,
		data:{
			str:FileName[0],
		},
		success:function(json){
			for(var i = 0;i<json.data.length;i++){
//				$(obj).siblings('.layui-colla-content').append("<p style=><input type='radio' onclick='checkFile(this)'/><span class='zip_png'></span><span class='fileall' style='display:inline-block;width:87%;'>"+json.data[i].fileName+" "+"["+json.data[i].fileSize+"]"+" "+"["+json.data[i].lastDate+"]"+ "<span style='display:none;'>"+" "+json.data[i].filePath+"</span></p>")
				var str = json.data[i].fileName
				if(str.split(".")[1] == "zip" || str.split(".")[1] == "rar"){
					$(obj).siblings('.layui-colla-content').append("<p style=><input type='radio' onclick='checkFile(this)'/><span class='zip_png'></span><span class='fileall' style='display:inline-block;width:87%;'>"+json.data[i].fileName+" "+"["+json.data[i].fileSize+"]"+" "+"["+json.data[i].lastDate+"]"+ "<span style='display:none;'>"+" "+json.data[i].filePath+"</span></p>")
				}else{
					$(obj).siblings('.layui-colla-content').append("<p style=><input type='radio' onclick='checkFile(this)'/><span class='layui-icon layui-icon-file-b' style='color: #ffef05;margin-right: 9px;margin-left: 19px;'></span><span class='fileall' style='display:inline-block;width:87%;'>"+json.data[i].fileName+" "+"["+json.data[i].fileSize+"]"+" "+"["+json.data[i].lastDate+"]"+ "<span style='display:none;'>"+" "+json.data[i].filePath+"</span></p>")
				}
			}
		}
	});
}
//获取上传路径
getRedis();
function getRedis(){
	$.ajax({
		type:"get",
		url:"../getRedis.action",
		async:true,
		data:{
			
		},
		success:function(json){
			console.log(json.data)
			for(var i = 0;i<json.data.length;i++){
				$(".file_upload").append("<input type='radio' onclick='checkFile(this)'/><span style='margin-right: 21px;margin-left:12px;'>路径</span><input class='saveRoute' style='margin-right:36%;margin-bottom: 12px;' type='text' value="+json.data[i]+"> ")
			}
		}
	});
}
//添加上传路径
function addRedis(){
	$(".file_upload").append("<input type='radio' onclick='checkFile(this)'/><span style='margin-right: 21px;margin-left:12px;'>路径</span><input class='saveRoute' style='margin-right:36%;margin-bottom: 12px;' type='text' placeholder='例：https://www.baidu.com/upload/1028.html' > ")
}
//保存上传路径
function saveRedis(){
	var urlString="";
	var radioupload = $(".file_upload input[type='radio']");
	var textupload = $(".file_upload input[type='text']")
	for(var i=0;i<radioupload.length;i++){
		if(radioupload[i].checked){
			for(var j=0;j<textupload.length;j++){
				if(j == i){
					urlString = textupload[j].value
				}
			}
		}
	}
	$.ajax({
		type:"get",
		url:"../saveRedis.action",
		async:true,
		data:{
			path:urlString,
		},
		success:function(json){
			if(json.state == true){
				alert(json.message)
			}else{
				alert(json.message)
			}
		}
	});
}
//md5校验
$(".md5").blur(function(){
	 var md5 = $(".md5").val();
	 var reg = /^([A-Za-z]|[0-9])+$/;
	 if(md5 != ""){
		 if(reg.test(md5)){
			 return true;
		 }else{
			 alert("MD5码格式不规范，请重新输入")
			 return false;
		 }
	 }
})
//解压
function decompression(){
	var files = $(".fileName input[type=radio]")
	var fileArr;
	var filestr = "";
	//获取选中文件
	for(var i=0;i<files.length;i++){
		if(files[i].checked){
			for(var j=0;j<$(".fileall").length;j++){
				if(j == i){
					console.log($(".fileall"))
					filestr = $(".fileall")[j].textContent
				}
			}
		}
		
	}
	if(filestr == ""){
//		alert("请选择要上传的文件")
		$ ('.confirm_area').html("请选择要解压的文件")
		$ ('.confirm_area').fadeIn ().delay (2000).fadeOut ();
		return false;
	}
	fileArr = filestr.split("[")
	var str = fileArr[0].substring(0,fileArr[0].length-1);
	$.ajax({
		type:"get",
		url:"../unzipFile.action",
		async:true,
		data:{
			fileName:str,
			filePath:majorName,
		},
		success:function(json){
			alert(json.message)
		}
	});
}
//MD5验证
function md5Check(){
	var files = $(".fileName input[type=radio]")
	var fileArr;
	var filestr = "";
	//获取选中文件
	for(var i=0;i<files.length;i++){
		if(files[i].checked){
			for(var j=0;j<$(".fileall").length;j++){
				if(j == i){
					console.log($(".fileall"))
					filestr = $(".fileall")[j].textContent
				}
			}
		}
		
	}
	if(filestr == ""){
		$ ('.confirm_area').html("请选择要验证的文件")
		$ ('.confirm_area').fadeIn ().delay (2000).fadeOut ();
		return false;
	}
	fileArr = filestr.split("[")
	var str = fileArr[0].substring(0,fileArr[0].length-1);
	//MD5
	var md5 = $(".md5").val();
//	if(md5 == ""){
//		$ ('.confirm_area').html("请填写MD5码")
//		$ ('.confirm_area').fadeIn ().delay (2000).fadeOut ();
//		return false;
//	}
	$.ajax({
		type:"get",
		url:"../md5Check.action",
		async:true,
		data:{
			fileName:str,
			filePath:majorName,
			md5:md5
		},
		success:function(json){
			alert(json.message)
		}
	});
}
//上传
function upload(){
//	$("body").mLoading("show")
	//判断是否有任务正在上传
	if($(".feedback-btn").html() == "正在上传"){
		var istrue = confirm("有任务正在上传，是否清空上传并进行下一个任务")
		if(istrue){
			$.ajax({
				type:"get",
				url:"../clearUpload.action",
				async:true,
				data:{
					
				},
				success:function(json){
					alert(json.message)
				}
			});
		}else{
			return false;
		}
	}
	
		    
	var serverArr = [];
	var serverId;
	var files = $(".fileName input[type=radio]")
	var filestr = "";
	var fileArr=[];
	var filePath;
	var md5;
	var mess = {};
	var person = [];
	var urlString="";
	var radioupload = $(".file_upload input[type='radio']");
	var textupload = $(".file_upload input[type='text']")
	//获取选中服务器
	for(var i=0;i<$(".ischeck").length;i++){
		if($(".ischeck")[i].checked){
			serverArr.push($(".ischeck")[i].value)
		}
	}
	if(serverArr.length != 0){
		serverId = serverArr.join(",")
	}else{
//		alert("请选择至少一个服务器")
		$ ('.confirm_area').fadeIn ().delay (2000).fadeOut ();
		return false;
	}
	//MD5
//	var md5 = $(".md5").val();
//	if(md5 == ""){
//		$ ('.confirm_area').html("请填写MD5码")
//		$ ('.confirm_area').fadeIn ().delay (2000).fadeOut ();
//		return false;
//	}
	//获取选中文件
	for(var i=0;i<files.length;i++){
		if(files[i].checked){
			for(var j=0;j<$(".fileall").length;j++){
				if(j == i){
					console.log($(".fileall"))
					filestr = $(".fileall")[j].textContent
				}
			}
		}
	}
	if(filestr == ""){
		$ ('.confirm_area').html("请选择要上传的文件")
		$ ('.confirm_area').fadeIn ().delay (2000).fadeOut ();
		return false;
	}
	fileArr = filestr.split("[")
	var filePath = fileArr[2].split("]")
	//获取上传路径
	for(var i=0;i<radioupload.length;i++){
		if(radioupload[i].checked){
			for(var j=0;j<textupload.length;j++){
				if(j == i){
					urlString = textupload[j].value
				}
			}
		}
	}
	if(urlString == ""){
		$ ('.confirm_area').html("请选择文件上传路径")
		$ ('.confirm_area').fadeIn ().delay (2000).fadeOut ();
		return false;
	}
		
	var fileSize = fileArr[1];
	fileSize = fileSize.substring(0,fileSize.length-2);
	layer.open({
		type: 1,
		title:"请输入MD5值",
		content:$("#MD5_area"),
	    area: ['300px', '200px'],
		btn: ['确定'],
        yes: function(index, value,layero){
        	layer.close(index);
        	md5 = $("#MD5_upload").val()
        	var reg = /^([A-Za-z]|[0-9])+$/;
        	if(md5 !=""){
        	if(reg.test(md5)){
			}else{
				 alert("MD5码格式不规范，请重新输入")
				 $("#MD5_upload").val("")
				 return false;
			}
        }
	mess.fileName = fileArr[0];
	mess.filePath = majorName;
	mess.fileSize = fileSize;
	mess.lastDate = filePath[0];
	mess.md5 = md5;
	mess.serverId = serverId;
	mess.uploadPath = urlString;
	mess.uuid = null;
	$.ajax({
		type:"post",
		url:"../automaticUpload.action", //自动化上传接口
		async:true,
		data:mess,
		success:function(json){
		}
	});
	$("body").mLoading("hide")
	setInterval(function(){
		$(".feedback").empty()
		$.ajax({
			type:"post",
			url:"../selectUploadInfo.action", //自动化上传信息查询接口
			async:true,
			data:{
				str:serverId,
			},
			success:function(json){
				var obj = json.data
				for(let i in obj){
					var UploadMess = i.split(";")
					serverAll.forEach(function(value, key) {
						if(key == UploadMess[0]){
							serverName = value
							$(".feedback").append("<div style='height: 36px;line-height: 36px;padding-left: 18px;'><span>"+serverName+"</span style='display:inline-block;width:82px;'> "+"："+" "+obj[i]+"</div>")
						}else{
//							serverName = "type"
						}
					});
//					$(".feedback").append("<div style='height: 36px;line-height: 36px;padding-left: 18px;'><span>"+serverName+"</span style='display:inline-block;width:82px;'> "+"："+" "+obj[i]+"</div>")
					if(i == "type"){
						if(obj[i] == 1){
							$(".feedback-btn").html("正在上传")
							$(".feedback-btn").css("background","red")
						}else{
							$(".feedback-btn").html("暂无操作")
							$(".feedback-btn").css("background","#009688")
						}
					}
				}
				for(var i=0;i<$(".feedback div span").length;i++){
					if($(".feedback div span")[i].textContent == "undefined" || $(".feedback div span")[i].textContent == "type"){
						$(".feedback div span")[i].parentNode.style.display = "none"
					}
				}
			}
		});
	},3000);
  }
		});
}
//服务器全选或反选
function checkall(obj){
	if(obj.checked){
		$(".main_left input").attr("checked",true)
		$(".main_left input").addClass("inputchecked")
	}else{
		$(".main_left input").attr("checked",false)
		$(".main_left input").removeClass("inputchecked")
	}
}
function ischeck(obj){
	var isallcheck=true;
	if(obj.checked){
		$(obj).addClass("inputchecked")
	}else{
		$(obj).removeClass("inputchecked")
	}
	for(var i=0;i<$(".ischeck").length;i++){
		if($(".ischeck")[i].checked == false){
			$(".checkall").attr("checked",false)
			$(".checkall").removeClass("inputchecked")
			isallcheck = false;
			return false;
		}
	}
	if(isallcheck == true){
		$(".checkall").attr("checked",true)
		$(".checkall").addClass("inputchecked")
	}
}
//文件单选
function checkFile(obj){
	if(obj.checked){
		$(obj).siblings("input").prop("checked",false)
		$(obj).parent().siblings("p").children("input").prop("checked",false)
		$(obj).parent().parent().parent().siblings(".layui-colla-item").children(".layui-colla-content").children().children("input").prop("checked",false)
	}else{
		
	}
}

//清空
function delet(){
	$(".main_right").html('');
}