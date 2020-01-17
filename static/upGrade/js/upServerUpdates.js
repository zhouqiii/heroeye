layui.use(['element', 'table', 'form', 'upload'], function() {
	var element = layui.element;
	var table = layui.table;
	var form = layui.form;
	var upload = layui.upload;
	//本地上传
	var t;
	var filse;
	upload.render({
		elem: '#uploads',
		url: '../fileUpload',
		accept: 'file',
		choose: function(res) {
			$('.layui-progress').css('display', 'block');
			$("#uploads").prop("disabled", true);
			element.progress('demo', '0%');
			t = window.setInterval(st, 200);
			var files = res.pushFile();
			res.preview(function(index, file, result) {
				$("#name").text(file.name);
				filse = file
				function change(limit) {
					var size = "";
					if(limit < 0.1 * 1024) { //小于0.1KB，则转化成B
						size = limit.toFixed(2) + "B"
					} else if(limit < 0.1 * 1024 * 1024) { //小于0.1MB，则转化成KB
						size = (limit / 1024).toFixed(2) + "KB"
					} else if(limit < 0.1 * 1024 * 1024 * 1024) { //小于0.1GB，则转化成MB
						size = (limit / (1024 * 1024)).toFixed(2) + "MB"
					} else { //其他转化成GB
						size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB"
					}
					var sizeStr = size + ""; //转成字符串
					var index = sizeStr.indexOf("."); //获取小数点处的索引
					var dou = sizeStr.substr(index + 1, 2) //获取小数点后两位的值
					if(dou == "00") { //判断后两位是否为00，如果是则删除00
						return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
					}
					return size;
				}
				var newLimit = change(file.size);
				//				console.log(newLimit);
				$("#size").text('[' + newLimit + ']');
				var currTime = new Date();
				var year = currTime.getFullYear();
				var month = currTime.getMonth() + 1;
				var day = currTime.getDate();
				var hour = currTime.getHours();
				var minute = currTime.getMinutes();
				var second = currTime.getSeconds();
				var sums = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
				$("#time").text('[' + sums + ']');
			});
		},
		done: function(res) {
			if(res.state == true) {
				element.progress('demo', '100%');
				clearInterval(t);
				$("#uploads").prop("disabled", false);
				fileList()
			} else {
				element.progress('demo', '99%');
			}
		}
	});
	element.init();
	var up = 0;

	function st() {
		up = up + Math.random() * 10 | 0;
		if(up > 99) {
			up = 99;
			clearInterval(t)
		}
		element.progress('demo', up + '%');
	}

});
fileList()

function fileList() {
	$(".check_inner").empty();
	$.ajax({
		type: "post",
		url: "../fileList",
		async: false,
		success: function(json) {
			for(var i = 0; i < json.data.length; i++) {
				var str = json.data[i].filePath;
				str = str.replace(/ /g, '&#32;')
				$(".check_inner").prepend("<p class='check_sp1'><span class='filename'><input value="+str+" type='checkbox'/>" + json.data[i].fileName  + "</span><span class='filetime'>" + json.data[i].lastDate + "</span><span class='filesize'>"  + json.data[i].fileSize + "</span><span onclick='download(this)' id=" + str + "><img src='../img/导出.png'></span></p>")
			}
		}
	});
}
//下载文件
function download(obj){
    // var ins = $(".check_inner input");
    // var arr = [];
    // for(var i = 0;i<ins.length;i++){
    //     if(ins[i].checked==true){
    //         arr.push(ins[i].value)
    //     }
    // }
    // if(arr.length===0){
    // 	alert('请选择要下载的文件')
	// }else{
    //     //创建url
    //     var url="../fileDown";
    //     //创建form
    //     var form=$("<form></form>");
    //     //设置属性
    //     form.attr("action",url);
    //     form.attr("method","get");
    //     for(var i=0;i<arr.length;i++){
    //     	var valueTag=arr[i]
	// 		console.log(valueTag)
    //         var inputType=$("<input type='text' name='filePath'/>");
    //         inputType.attr("value",valueTag);
    //         form.append(inputType);
    //         form.appendTo("body");
	// 	}
    //     form.hide();
    //     //提交表单
    //     form.submit();
	// }

	var c = $(obj).attr("id");
	console.log(c)
	var currentPage=obj;
	//创建url
	var url="../fileDown";
  	//创建form
	var form=$("<form></form>");
	//设置属性
	form.attr("action",url);
	form.attr("method","get");
	//创建input，即参数
	var inputType=$("<input type='text' name='filePath'/>");
	inputType.attr("value",c);
	//注入参数到表单
	form.append(inputType);
	form.appendTo("body");
	form.hide();
	//提交表单
	form.submit();
}
//获取大区
onarea()

function onarea() {
	$.ajax({
		type: "get",
		url: "../getArea",
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
			url: "../getServerListNoPage",
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
			url: "../getServerListNoPage",
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
function selects(ob) {
	var value = $(ob).val();
	if(value == 0) {
		$(".right_content").empty()
		$.ajax({
			type: "get",
			url: "../getServerListNoPage",
			async: true,
			success: function(json) {
				for(var i = 0; i < json.rows.length; i++) {
					$(".right_content").append("<div><input type='checkbox' checked='checked' value=" + json.rows[i].serverId + " />" + "<span>" + json.rows[i].serverName + "</span></div>")
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
			success: function(json) {
				for(var i = 0; i < json.rows.length; i++) {
					$(".right_content").append("<div><input type='checkbox' checked='checked' value=" + json.rows[i].serverId + " />" + "<span>" + json.rows[i].serverName + "</span></div>")
				}
			}
		});
		$(".left_content input").prop("disabled", false);
		$(".right_content input").prop("disabled", false);
		for(var i=0;i<($(".left_content input").length);i++){
            $(".left_content input").eq(i).prop("checked", false)
		}
		$(".left_content input").eq(0).prop("checked", true)
		$(".right_content input").eq(0).prop("checked", true).siblings().prop("checked", false);
	}
}
//删除文件
function filedelet(){
	var ins = $(".check_inner input");
	var arr = [];
	var ary = [];
	for(var i = 0;i<ins.length;i++){
		if(ins[i].checked==true){
			arr.push(ins[i].value)
		}else{
			ary.push(ins[i].value)
		}
	}
	if(arr.length===0){
		alert('未选择要删除的文件')
		return false
	}
	var jsons =arr.join(',')
	$.ajax({
		type:"post",
		url:"../fileDelete",
		async:true,
		data:{
			filePath:jsons
		},
		success:function(json){
			if(json.state == true){
				alert("删除成功");
				fileList()
			}else{
				alert("删除失败")
			}
		}
	});
}
