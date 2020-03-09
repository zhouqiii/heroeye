var type;
$(function(){
		setInterval(function(){
			$.ajax({
				type:"get",
					url:"../selectInfo.action",
					async:true,
					data:{
					},
					success:function(json){
						if(json.state == true){
							if(json.data.type == 0){
								$(".marning").css("background-color","green")
								$(".marning").html("空闲")
								type = 0
//								$(".retreated").removeAttr("disabled")
//								$(".merge").removeAttr("disabled")
//								$(".backups").removeAttr("disabled")
							}
							if(json.data.type == 1){
								$(".marning").css("background-color","red")
								$(".marning").html("正在备份")
								type = 1
//								$(".retreated").attr('disabled',"true")
//								$(".merge").attr('disabled',"true")
//								$(".backups").attr('disabled',"true")
							}
							if(json.data.type == 2){
								$(".marning").css("background-color","red")
								$(".marning").html("正在合并")
								type = 2
//								$(".retreated").attr('disabled',"true")
//								$(".merge").attr('disabled',"true")
//								$(".backups").attr('disabled',"true")
							}
							if(json.data.type == 3){
								$(".marning").css("background-color","red")
								$(".marning").html("正在回档")
								type = 3
//								$(".retreated").attr('disabled',"true")
//								$(".merge").attr('disabled',"true")
//								$(".backups").attr('disabled',"true")
							}
						}
					}
			})
		},1000);
	
    });
var AllserverID = new Map()
var sendTime;
var serverIDs = [];
var serverIdCheck =[];
var list=[];
var listright=[];
var alllistright =[];
var alllistleft = [];
var all=[];
var middle="";
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
					serverIDs.push(json.rows[i].serverId)
				}
				for(var i = 0;i<json.rows.length;i++){
					AllserverID.set(json.rows[i].serverId,json.rows[i].serverName)
					$(".all_server").append("<div id="+json.rows[i].serverId+" style='height:30px;line-height:30px;margin:2px 0;overflow: auto;'><input onclick='ischeck(this)' type='checkbox' name="+json.rows[i].serverName+" value="+json.rows[i].serverId+" />"+"<span  onclick='look(this)'>"+json.rows[i].serverName+"</span><i style='float:right;' class='layui-icon layui-icon-right hide'></i>  </div>")
					$(".merge_server").append("<div id="+json.rows[i].serverId+" style='height:30px;line-height:30px;margin:2px 0;'><input onclick='ischeckright(this)' type='checkbox'  name="+json.rows[i].serverName+" value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span></div>")
				}
			}
		});
	}
}
function look(obj){
	var Array1=[];
	var Array2
	after = $(obj).siblings("input")[0].value
	$(".btn2").css("display","block")
	$(".btn1").css("display","none")
	$(".Mask_area").css("display","block")
	$(".merge_server").css("display","block")
	$(".merge_server div").remove()
	$(obj).parent().siblings().css("background-color","#272727")
	$(obj).parent().css("background-color","#355974")
	$(obj).parent().siblings().children(".layui-icon-right").addClass("hide")
	$(obj).parent().children(".layui-icon-right").removeClass("hide")
		$.ajax({
			type:"get",
			url:"../getServerListNoPage.action",
			async:false,
			data:{
			},
			success:function(json){
				for(var i=0;i<json.rows.length;i++){
					$(".merge_server").append("<div id="+json.rows[i].serverId+" style='height:30px;line-height:30px;margin:2px 0;'><input onclick='ischeckright(this)' type='checkbox'  name="+json.rows[i].serverName+" value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span></div>")
				}
			}
		});
	myMap.forEach(function(value, key) {
		Array1.push(key)
		Array2=value.split(",")
		for(var i=0;i<Array2.length;i++){
			Array1.push(Array2[i])
		}
	});
		var objid =$(obj).parent()[0].id
		var allright = $(".merge_server input")
		for(var j=0;j<Array1.length;j++){
			for(var i=0;i<allright.length;i++){
				if(Array1[j] == allright[i].value){
					allright[i].parentNode.style.display="none";
				}
			}
		}
	var mapvalue = myMap.get(objid)
	if(mapvalue == undefined){
		return false;
	}
	mapvalue = mapvalue.split(",")
		for(var j=0;j<mapvalue.length;j++){
			for(var i=0;i<allright.length;i++){
				if(mapvalue[j] == allright[i].value){
					allright[i].parentNode.style.display="block";
					allright[i].checked =true;
				}
			}
		}
}
var count=[];
var after;
var before;
var start;
var Arrayright = [];
var allcheck =[];
var myMap = new Map();
var myMapName = new Map();
var afterName;
function ischeck(obj){
	
	start = after;
	Arrayright=[]
	var inputright =  $(".merge_server input")
	for(var i=0;i<inputright.length;i++){
		if(inputright[i].checked){
//			inputright[i].parentNode.remove();
			inputright[i].parentNode.style.display = "none"
			count.push(inputright[i].parentNode)
		}
	}
	if(obj.checked == true){
		$(".btn2").css("display","none")
		$(".btn1").css("display","block")
		$(".Mask_area").css("display","block")
		$(".merge_server").css("display","block")
		
		after=obj.value
		for(var i=0;i<serverIDs.length;i++){
			if(serverIDs[i] == obj.value){
				serverIDs.splice(jQuery.inArray(serverIDs[i],serverIDs),1);
			}
		}
		for(var i=0;i<$(".merge_server div").length;i++){
			if(obj.value == $(".merge_server div")[i].id){
//				$(".merge_server div")[i].remove();
				$(".merge_server div")[i].style.display="none";
			}
		}
	}
	else {
		for(var i=0;i<$(".merge_server div").length;i++){
			if(obj.value == $(".merge_server div")[i].id){
//				$(".merge_server div")[i].remove();
				$(".merge_server div")[i].style.display="block";
			}
		}
	}
}
var a;
function ischeckright(obj){
	var inputright=[]
	var inputrightName=[]
	for(var i=0;i<$(".merge_server input").length;i++){
		if($(".merge_server input")[i].parentNode.style.display =="" ||$(".merge_server input")[i].parentNode.style.display =="block" ){
			if($(".merge_server input")[i].checked){
				inputright.push($(".merge_server input")[i].value)
			}
		}
	}
	AllserverID.forEach(function(value, key) {
		for(var i=0;i<inputright.length;i++){
			if(key == inputright[i]){
				inputrightName.push(value)
				inputrightName[i] = value
			}
		}
	});
	inputright = inputright.join(",")
	
	AllserverID.forEach(function(value, key) {
		if(key == after){
			afterName = value
		}
	});
	
	myMapName.set(afterName, inputrightName);
	myMap.set(after, inputright);
	
	if(obj.checked == true){
		for(var i=0;i<serverIDs.length;i++){
			if(serverIDs[i] == obj.value){
				serverIDs.splice(jQuery.inArray(serverIDs[i],serverIDs),1);
			}
		}
		for(var i=0;i<$(".all_server div").length;i++){
			if(obj.value == $(".all_server div")[i].id){
				$(".all_server div")[i].style.display="none";
			}
		}
	}
	else{
		Arrayright.pop(obj.value)
		all.pop(obj.value)
//		$(".all_server").append("<div id="+obj.value+" style='height:30px;line-height:30px;margin:2px 0;'><input onclick='ischeck(this)' type='checkbox' value="+obj.value+" />"+"<span>"+obj.name+"</span><i style='float:right;' class='layui-icon layui-icon-right hide'></i></div>")
		for(var i=0;i<$(".all_server div").length;i++){
			if(obj.value == $(".all_server div")[i].id){
				$(".all_server div")[i].style.display="block";
			}
		}
	}
}
//清空
function delet(){
	clearInterval(mergetext);
	$(".main_right").html('');
}
//保存

function preserve(){
	console.log(myMapName)
	$(".merge_server").css("display","none")
	$(".Mask_area").css("display","none")
	$(".check_server div").remove()
	myMapName.forEach(function(value, key) {
	    $(".check_server").append("<div style='border-bottom: 1px solid #fff;margin-top: 10px;padding-bottom: 10px;'><p style='font-size: 16px;color: #2c96d8;font-weight: 700;'>"+key+":</p> "+value+"<button class='clear' style='float:right;border:0;background: transparent;color: #2c96d8;' onclick='clear()'>删除</button></div>")
	});
}
//合并
var mains=[];
var mergetext
function merge(){
	
	if(type == 0|| type == undefined){
	var Array1=[]
	var str1=""
	mains=[]
	var isLock = confirm("请先进行备份,如已备份，请点击确定，进行下一步");
	if(isLock ==false){
		return false;
	}
	if(myMap.size == 1){
		myMap.forEach(function(value, key) {
		    str1 = '"'+ key+'"'+":"+'"'+value +'"'
		    mains.push(key)
		});
	}else{
		myMap.forEach(function(value, key) {
		    str1 = str1+'"'+ key+'"'+":"+'"'+value +'"'+","
		    mains.push(key)
		});
		str1=str1.substring(0,str1.length-1);
	}
	myMap.forEach(function(value, key) {
		Array1.push(key)
		Array1.push(value)
	});
	mains = mains.join(",")
	Array1 = Array1.join(",")
	var whole ="{"+ str1 +"}"
	$.ajax({
		type:"get",
			url:"../mergeServer.action",
			async:true,
			data:{
				mains:mains,
				whole:whole,
				total:Array1
			},
			success:function(json){
				if(json.state == true){
					
				}
				else{
					
				}
			}
	})
//	settime()
	setIn()
	}else{
		alert("有其它服务正在工作，请稍后进行操作")
		return false;
	}
}
//备份
function backups(){
if(type == 0 || type == undefined){
	var Array1=[]
	myMap.forEach(function(value, key) {
		Array1.push(key)
		Array1.push(value)
	});
	Array1 = Array1.join(",")
	$.ajax({
		type:"get",
			url:"../backUps.action",
			async:true,
			data:{
				str:Array1
			},
			success:function(json){
			}
	})
//	timeout()
	setInter()	
	}else{
		alert("有其它服务正在工作，请稍后进行操作")
		return false;
	}
	
}
//回档
function retreated(){
	
if(type == 0|| type == undefined){
	var mains=[]
	clearInterval(mergetext);
	$(".main_right").html("");
	var Array1=[]
	myMap.forEach(function(value, key) {
		Array1.push(key)
		Array1.push(value)
	});
	Array1 = Array1.join(",")
	$.ajax({
		type:"get",
			url:"../retreated.action",
			async:true,
			data:{
				str:Array1
			},
			success:function(json){
			}
	})
//	timeout()
	setInter()
	}else{
		alert("有其它服务正在工作，请稍后进行操作")
		return false;
	}
	
}
//清空已选服务器
$(document).on('click','.clear',function(){
	var string;
	var arr2=[];
	var s = event.toElement.parentNode.childNodes[0].textContent;
	s=s.substring(0,s.length-1);
	myMapName.forEach(function(value, key) {
		if(key == s){
			myMapName.delete(key)
		}
	});
	var arr1 = event.toElement.parentNode.childNodes[1].textContent;
	arr1=arr1.substring(1);
	arr1 = arr1.split(",")
	arr1.push(s)
	AllserverID.forEach(function(value, key) {
		for(var i=0;i<arr1.length;i++){
			if(value == arr1[i]){
				string = key;
				arr2.push(string)
			}
			if(value == s){
				s= key
			}
		}
	});
	for(var j=0;j<arr2.length;j++){
		for(var i=0;i<$(".all_server div").length;i++){
			if($(".all_server div")[i].id == arr2[j]){
				$(".all_server div")[i].style.display="block";
				$(".all_server div")[i].children[0].checked = false;
			}
		}
	}
	for(var i=0;i<$(".merge_server div").length;i++){
		if($(".merge_server div")[i].id == s){
			$(".merge_server div")[i].style.display="block";
		}
	}
	for(var j=0;j<arr2.length;j++){
		for(var i=0;i<$(".merge_server div").length;i++){
			if($(".merge_server div")[i].id == arr2[j]){
				console.log($(".merge_server div")[i].id)
				$(".merge_server div")[i].style.display="block";
				$(".merge_server div")[i].children[0].checked = false;
			}
		}
	}
	myMap.forEach(function(value, key) {
		if(key == s){
			myMap.delete(key)
		}
	});
	event.toElement.parentNode.remove()
})
	
function setIn(){
	clearInterval(mergetext2)
	clearInterval(mergetext2)
	
	mergetext = setInterval(function(){
		$(".main_right").html("")
		$.ajax({
			type:"get",
				url:"../selectInfo.action",
				async:true,
				data:{
				},
				success:function(json){
					if(json.state == true){
						var textValue = $.map(json.data,function(value,index){
							
								return [value];
							
						})
						var text_index = $.map(json.data,function(value,index){
//							if(json.data.type){
//							}else{
								return [index];
//							}
							
						})
						for(var i=0;i<text_index.length;i++){
//							$(".main_right").append("<div style='border-bottom:1px solid #fff;'>"+text_index[i]+"</div>")
							$(".main_right").append("<div style='border-bottom:1px solid #fff;'></div>")
						}
						console.log(textValue)
						for(var i=0;i<text_index.length-1;i++){
							var ValueLine =textValue[i].split(";")
							for(var j=0;j<ValueLine.length;j++){
								var Div = document.createElement("p");
								Div.innerHTML = ValueLine[j];
								$(".main_right div")[i].append(Div)
							}
						}
					}
					else{
						
					}
				}
		})
	},5000);
}
function settime(){
	$(".main_right").html("")
	$.ajax({
		type:"get",
			url:"../selectInfo.action",
			async:true,
			data:{
			},
			success:function(json){
				if(json.state == true){
					var textValue = $.map(json.data,function(value,index){
//						if(json.data.type){
//						}else{
							return [value];
//						}
					})
					var text_index = $.map(json.data,function(value,index){
						return [index];
					})
					for(var i=0;i<text_index.length;i++){
//						$(".main_right").append("<div style='border-bottom:1px solid #fff;'>"+text_index[i]+"</div>")
						$(".main_right").append("<div style='border-bottom:1px solid #fff;'></div>")
					}
					for(var i=0;i<text_index.length-1;i++){
						var ValueLine =textValue[i].split(";")
						for(var j=0;j<ValueLine.length;j++){
							var Div = document.createElement("p");
							Div.innerHTML = ValueLine[j];
							$(".main_right div")[i].append(Div)
						}
					}
				}
				else{
					
				}
			}
	})
}
function timeout(){
	$(".main_right").html("")
	$.ajax({
		type:"get",
			url:"../selectInfo.action",
			async:true,
			data:{
			},
			success:function(json){
				if(json.state == true){
					var textValue = $.map(json.data,function(value,index){
//						if(json.data.type){
//						}else{
							return [value];
//						}
					})
					var ValueLine = textValue[0].split(";")
					
					for(var j=0;j<ValueLine.length-1;j++){
						$(".main_right").append("<div style='border-bottom:1px solid #fff;'>"+ValueLine[j]+"</div>")
					}
				}
				else{
					
				}
			}
	})
}
function setInter(){
	mergetext2 = setInterval(function(){
		$(".main_right").html("")
		$.ajax({
			type:"get",
				url:"../selectInfo.action",
				async:true,
				data:{
				},
				success:function(json){
					if(json.state == true){
						var textValue = $.map(json.data,function(value,index){
//							if(json.data.type){
//							}else{
								return [value];
//							}
						})
						var ValueLine = textValue[0].split(";")
						for(var j=0;j<ValueLine.length-1;j++){
							$(".main_right").append("<div style='border-bottom:1px solid #fff;'>"+ValueLine[j]+"</div>")
						}
					}
					else{
						
					}
				}
		})
	},5000);
}
$(".btn1").click(function(){
	console.log(after)
	console.log(afterName)
	myMap.forEach(function(value, key) {
		if(key == after){
			myMap.delete(key)
		}
	});
	myMapName.forEach(function(value, key) {
		if(key == afterName){
			myMapName.delete(key)
		}
	});
	var cancel_right = []
	console.log($(".merge_server input"))
	for(var i=0;i<$(".merge_server input").length;i++){
		if($(".merge_server input")[i].parentNode.style.display == "block" || $(".merge_server input")[i].parentNode.style.display == ""){
			if($(".merge_server input")[i].checked ){
				$(".merge_server input")[i].checked = false;
				cancel_right.push($(".merge_server input")[i].value)
			}
		}
			if($(".merge_server input")[i].value == after){
				$(".merge_server input")[i].parentNode.style.display="block";
			}
	}
	for(var i=0;i<cancel_right.length;i++){
		for(var j=0;j<$(".all_server div").length;j++){
			if($(".all_server div")[j].id == cancel_right[i]){
				$(".all_server div")[j].style.display="block";
			}
			if($(".all_server div")[j].id == after){
				$(".all_server div")[j].children[0].checked = false;
			}
		}
	}
	for(var j=0;j<$(".all_server div").length;j++){
		if($(".all_server div")[j].id == after){
			$(".all_server div")[j].children[0].checked = false;
		}
	}
	$(".merge_server").css("display","none")
	$(".Mask_area").css("display","none")
})
$(".btn2").click(function(){
	$(".merge_server").css("display","none")
	$(".Mask_area").css("display","none")
})