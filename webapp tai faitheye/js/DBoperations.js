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
					$(".main_left").append("<input class='ischeck' type='checkbox' onclick='ischeck(this)' name="+json.rows[i].serverName+" value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span><span class='base "+json.rows[i].serverId+"' vulue="+json.rows[i].serverName+" style='display:none;'>"+json.rows[i].bases+"</span><i style='float:right;' class='layui-icon layui-icon-right hide'></i>")
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
//执行
function upload(){
//	$("body").mLoading("show")
	//判断是否有任务正在上传
	if($(".feedback-btn").html() == "正在执行"){
		var istrue = confirm("有任务正在执行，是否清空并进行下一个任务")
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
		$ ('.confirm_area').fadeIn ().delay (2000).fadeOut ();
		return false;
	}
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
		$ ('.confirm_area').html("请选择要执行的文件")
		$ ('.confirm_area').fadeIn ().delay (2000).fadeOut ();
		return false;
	}
	fileArr = filestr.split("[")
	var filePath = fileArr[2].split("]")
	//获取执行路径
	var dbName = $(".saveRoute").val()
		
	var fileSize = fileArr[1];
	fileSize = fileSize.substring(0,fileSize.length-2);
	mess.fileName = fileArr[0];
	mess.filePath = filePath[1];
	mess.fileSize = fileSize;
	mess.lastDate = filePath[0];
	mess.serverId = serverId;
	mess.dbName = dbName;
	$.ajax({
		type:"post",
		url:"../automaticHandle.action", //自动化执行接口
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
			url:"../selectHandleInfo.action", //自动化执行信息查询接口
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
							$(".feedback-btn").html("正在执行")
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
//服务器全选或反选
function checkall(obj){
	var mess = [];
	if(obj.checked){
		$(".main_left input").attr("checked",true)
		$(".main_left input").addClass("inputchecked")
		var database = $(".base")
		for(var i=0;i<database.length;i++){
			if(database[i].textContent == null || database[i].textContent == "null" || database[i].textContent == "" || database[i].textContent == "{}"){
				var str = database[i].attributes[1].value + "服务器没有配置数据库"
				mess.push(str)
			}
		}
		var aa = mess.join("\n")
		alert(aa)
		if(aa != ""){
			$(".main_left input").attr("checked",false)
			$(".main_left input").removeClass("inputchecked")
			return false;
		}
	}else{
		$(".main_left input").attr("checked",false)
		$(".main_left input").removeClass("inputchecked")
	}
}
function ischeck(obj){
	var isallcheck=true;
	if(obj.checked){
		$(obj).addClass("inputchecked")
		var database = $(".base")
		for(var i=0;i<database.length;i++){
			if(database[i].classList[1]== $(obj).val()){
				var objName = $(obj).attr("name")
				if(database[i].textContent == null || database[i].textContent == "null" || database[i].textContent == "" || database[i].textContent == "{}"){
					alert($(obj).attr("name") + "服务器没有配置数据库") 
					obj.checked = false;
					$(obj).removeClass("inputchecked")
					return false;
				}
			}
		}
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
	}else{
		
	}
}