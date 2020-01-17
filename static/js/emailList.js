
var sendTime;
var sendTimes;
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
	sendTimes = y + "-" + m + "-" + d +" "+ a + ":" + b + ":" +c;
}

layui.use(['element', 'table', 'layer', 'laydate', 'form'], function() {
//	var element = layui.element;
	var table = layui.table;
	var layer = layui.layer;
	var laydate = layui.laydate;
	var form = layui.form;
//	element.init();
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
	laydate.render({
		elem: '#datatimesmodify',
		type:'datetime',//日期可选时分秒
		lang: 'en', //国际化
		format:'yyyy-MM-dd HH:mm:ss',
		theme: '日期', //自定义类名
		value: sendTime,
		trigger: 'click',
		min:0,
		done:function(res){
			sendTimes = res
		}
	});
	servres()
	function servres(){
		$.post("../getServerListNoPage", function (data) {
			var allserver = [];
	        $.each(data.rows, function (index, item) {
	        	allserver.push(item.serverId)
	            $('#add_server').append(new Option(item.serverName, item.serverId));
	            $('#add_servermodify').append(new Option(item.serverName, item.serverId));
	            $('#sinadd_server').append(new Option(item.serverName, item.serverId));
	            $('#sinadd_servermodify').append(new Option(item.serverName, item.serverId));
	        });
	        var serverjson = allserver.join(',');
			$("#add_server").prepend("<option value=''></option><option value="+serverjson+">全区全服</option>");
			$("#add_server").each(function() {
				$(this).find("option").eq(0).attr("selected", "selected")
			});
			$("#add_servermodify").prepend("<option value=''></option><option value="+serverjson+">全区全服</option>");
			$("#add_servermodify").each(function() {
				$(this).find("option").eq(0).attr("selected", "selected")
			})
			$("#sinadd_server").prepend("<option value=''></option>");
			$("#sinadd_server").each(function() {
				$(this).find("option").eq(0).attr("selected", "selected")
			})
			$("#sinadd_servermodify").prepend("<option value=''></option>");
			$("#sinadd_servermodify").each(function() {
				$(this).find("option").eq(0).attr("selected", "selected")
			})
	      form.render('select')
	    });
	    
	}
	var tableIns = table.render({
		elem: '#datatable',
		url: '../mailList',
		loading: true,
		page: true,
		toolbar:'#toolbarDemo',
		response: {
		    statusName: 'state',
		    msgName: 'message',
		    statusCode: true,
		    countName: 'total',
		    dataName: 'rows' 
		}, 
		request: {
		    pageName: 'pageIndex',
		    limitName: 'pageSize' 
		},
		cols: [
			[
				{
					type: 'checkbox',
				},
				{
					field: 'mailSender',
					title: '发件人',
				},
				{
					field: 'mailName',
					title: '邮件名称',
				},
				{
					field: 'mailAddressee',
					title: '收件人'
				},
				{
					field: 'mailContent',
					title: '邮件内容',
					width: 450
				},
				{
					field: 'mailSendstatus',
					title: '发送状态',
					templet: function(value) {
						var status
						if(value.mailSendstatus == 0){
							status = "已发送"
						}else{
							status = "未发送"	
						}
						return status
					}
				},
				{
					field: 'mailSendtime',
					title: '发送时间',
				},
				{
					field: 'enclosure',
					title: '是否附件',
					templet: function(value) {
						var type;
						console.log(value)
						if(value.enclosure == 0){
							type = "是"
						}else{
							type = "否"	
						}
						return type
					}
				},
				{
					field: '',
					title: '操作',
					event: 'collapse',
					templet: function(value) {
						return "<span class='start_up' lay-event='edit' >查看邮件</span>" + "<span class='close' lay-event='del'>删除</span>"
					}
				},
			]
		],
		done:function(res){
//			console.log(res)
		}
	});
	form.on('radio(jiedian)', function (data) {
	   	var value = data.value;
	   	if(value == "0"){
	   		$("#single").css("display","block");
	   		$("#groupEmail").css("display","none");
	   		$("#singroupEmail").css("display","block")
	   		$("#add_server").val('');
	   		$("#singleId").css("display","block")
	   	}else if(value == "1"){
	   		$("#addname").val('');
	   		$("#addnameId").val('');
	   		$("#singleId").css("display","none")
	   		$("#single").css("display","none");
	   		$("#groupEmail").css("display","block");
	   		$("#singroupEmail").css("display","none")
	   	}
	});
	$("#add").click(function(){
		$("#addpro").siblings().remove();
		$.ajax({
			type:"post",
			url:"../newMail",
			async:true,
			success:function(json){
				if(json.state == true){
					$("#emailid").val(json.data.mailName);//邮件名称
					$("#emailContent").val(json.data.mailContent);//邮件内容
					$("#datatimes").val(json.data.mailSendtime);//时间
					$("#Expiration").val(json.data.expire)
					if(json.data.mailProperty == 0){
						$("#singleEmail").prop("checked",true);
						$("#single").css("display","block");
				   		$("#groupEmail").css("display","none");
				   		$("#addname").val(json.data.mailAddressee);//单发收件人
				   		$("#singleId").css("display","block");
				   		$("#addnameId").val(json.data.mailAddresseeid);//收件人ID
				   		$("#sinadd_server").find("option[value="+json.data.mailOneserver+"]").prop("selected",true);
				   		form.render();
					}else{
						$("#groupEmails").prop("checked",true);
						$("#add_server").find("option[value="+json.data.mailServer+"]").prop("selected",true);
						$("#singleId").css("display","none");
				   		$("#single").css("display","none");
				   		$("#groupEmail").css("display","block");
				   		form.render();
					}
				}else{
					$("#emailid").val('');
					$("#addname").val('');
					$("#addnameId").val('');
					$("#emailContent").val('');
					$("#datatimes").val('');
					$("#Expiration").val('')
				}
			}
		});
		$.ajax({
			type:"post",
			url:"../newMailg",
			async:true,
			success:function(json){
				if(json.state == true){
					for(var i = 0;i<json.data.length;i++){
						$("#addpro").after('<input type="text" class="layui-input Goodsid" value='+json.data[i].goodsCode+' style="width: 35%;background: transparent;color: white;float: left;margin-left:12%;" /><input type="text" class="layui-input Goodsnum" value='+json.data[i].goodsNumber+' style="width: 35%;background: transparent;color: white;float: left;margin-bottom: 2%;" />')
					}
					$('.Goodsid').eq(0).css("margin-left","0")
					$("#addDiv").append('<button type="button" class="layui-btn layui-btn-danger" id="adds" onclick="addins(this)">添加</button>')
				}else if(json.state == false){
					$("#addpro").after('<input type="text" class="layui-input Goodsid" style="width: 35%;background: transparent;color: white;float: left;" placeholder="请输入物品ID" /><input type="text" class="layui-input Goodsnum" style="width: 35%;background: transparent;color: white;float: left;margin-bottom: 2%;" placeholder="请输入物品数量" /><button type="button" class="layui-btn layui-btn-danger" id="adds" onclick="addins(this)">添加</button>')
				}else if(json.data.length == 0){
					$("#addpro").after('<input type="text" class="layui-input Goodsid" style="width: 35%;background: transparent;color: white;float: left;" placeholder="请输入物品ID" /><input type="text" class="layui-input Goodsnum" style="width: 35%;background: transparent;color: white;float: left;margin-bottom: 2%;" placeholder="请输入物品数量" /><button type="button" class="layui-btn layui-btn-danger" id="adds" onclick="addins(this)">添加</button>')
				}
			}
		})
		
		layer.open({
			type:1,
			area:['800px','600px'],
			title:"添加邮件",
			shadeClose:false,
			shade:0,
			content:$('#add_area'),
			closeBtn:0,
			btn:['关闭'],
			yes:function(index,layero){
				layer.close(index)
			}
		})
	})
	if($.cookie('the_cookie_pname')!=null){
		getcookie2()
		function getcookie2(){
			layer.open({
				type:1,
				area:['800px','600px'],
				title:"添加邮件",
				shadeClose:false,
				shade:0,
				content:$('#add_area'),
				closeBtn:0,
				btn:['关闭'],
				yes:function(index,layero,json){
					layer.close(index)
					
					
				}

			})
			$("#addpro").after('<input type="text" class="layui-input Goodsid" style="width: 35%;background: transparent;color: white;float: left;margin-left:12%;" /><input type="text" class="layui-input Goodsnum"  style="width: 35%;background: transparent;color: white;float: left;margin-bottom: 2%;" />')
			$('.Goodsid').eq(0).css("margin-left","0")
			$("#addDiv").append('<button type="button" class="layui-btn layui-btn-danger" id="adds" onclick="addins(this)">添加</button>')

			$('#addname').val($.cookie('the_cookie_pname'));
			$('#addnameId').val($.cookie('the_cookie_pacc'));
			
			$("#singleEmail").attr('checked')  
			$("#singleEmail").attr("checked","checked");

			// $(".layui-form-radio").click(function(){
				// alert(1)
				// $(".layui-form-radio").addClass('layui-form-radioed')	
				// $(".layui-form-radio i:eq(0)").addClass('layui-anim-scaleSpring')	
			// })
		}
	}

	//发送邮件
	$("#sendEmail").click(function(){
		var emailid = $("#emailid").val();//邮件名称
		var addname = $("#addname").val();//单发收件人
		var sinadd_server = $("#sinadd_server").val();//单人发送服务器
		var add_server = $("#add_server").val();//群发收件人
		var addnameId = $("#addnameId").val();//收件人ID
		var content = $("#emailContent").val();//邮件内容
		var Goodsid = $(".Goodsid");//获取所有附件ID
		var datatimes = $("#datatimes").val();//获取时间
		var Expiration = $("#Expiration").val();//过期时间
		var radios = $(".radios input[name = 'sex']:checked").val();//获取单发群发
		if(emailid == "" || emailid.length>16){
			alert("邮件名称不能为空且不能超过16位");
			return false;
		}else if(radios == undefined){
			alert("请选择发送类型");
			return false;
		}else if(radios == 0&&addname == ""){
			alert("收件人不能为空");
			return false;
		}else if(radios == 0&&addnameId == ""){
			alert("收件人ID不能为空");
			return false;
		}else if(Expiration == ""){
			alert("过期时间不能为空");
			return false;
		}else if(content == "" || content.length>500){
			alert("邮件内容不能为空且不能超过500位");
			return false;
		}
		var idArr = [];
		for(var i = 0;i<Goodsid.length;i++){
			idArr.push(Goodsid[i].value)
		}
		var idjsons = idArr.join(',');
		var Goodsnum = $(".Goodsnum");//获取所有附件数量
		var numArr = [];
		for(var i = 0;i<Goodsnum.length;i++){
			numArr.push(Goodsnum[i].value)
		}
		var numjsons = numArr.join(',');
		if(addname != ""&&addnameId == ""){
			alert("收件人ID不能为空")
			return false;
		}else if(addname == ""&&addnameId != ""){
			alert("收件人不能为空")
			return false;
		}
		var Goodsid = $(".Goodsid").val();
		var Goodsnum = $(".Goodsnum").val();
		if(Goodsid != ""&&Goodsnum == ""){
			alert("物品数量不能为空")
			return false
		}else if(Goodsid == ""&&Goodsnum != ""){
			alert("物品数量不能为空")
			return false
		}
		if(radios == 0){
			if(sinadd_server == ""){
				alert("服务器不能为空");
				return false
			}
		}else if(radios == 1){
			if(add_server == ""){
				alert("服务器不能为空");
				return false
			}
		}
		var emailStatus;
		if(datatimes == ""){
			emailStatus = 0
		}else{
			emailStatus = 1
		}
		$("html").mLoading("show")
		$.ajax({
			type:"get",
			url:"../insertMail",
			async:true,
			data:{
				mailName:emailid,
				mailContent:content,
				mailAddressee:addname,
				mailServer:add_server,
				mailAddresseeid:addnameId,
				mailSendtime:datatimes,
				mailProperty:radios,
				goodsCode:idjsons,
				goodsNumber:numjsons,
				mailSendstatus:emailStatus,
				expire:Expiration,
				mailOneserver:sinadd_server
			},
			success:function(json){
				alert(json.message);
				$("html").mLoading("hide")
//				$("#add_area").css("display","none");
//				$(".layui-layer-page").css("display","none")
				tableIns.reload();
				layer.closeAll();
				location.closeAll()

			}

		});
			location.closeAll()
			layer.closeAll();
	})
	//保存邮件
	$("#saveEmail").click(function(){
		var emailid = $("#emailid").val();//邮件名称
		var addname = $("#addname").val();//单发收件人
		var sinadd_server = $("#sinadd_server").val();//单人发送服务器
		var Expiration = $("#Expiration").val();//过期时间
		var add_server = $("#add_server").val();//群发收件人
		var addnameId = $("#addnameId").val();//收件人ID
		var content = $("#emailContent").val();//邮件内容
		var datatimes = $("#datatimes").val();//获取时间
		var Goodsid = $(".Goodsid");//获取所有附件ID
		var radios = $(".radios input[name = 'sex']:checked").val();//获取单发群发
		if(emailid == "" || emailid.length>16){
			alert("邮件名称不能为空且不能超过16位");
			return false;
		}else if(radios == undefined){
			alert("请选择发送类型");
			return false;
		}else if(radios == 0&&addname == ""){
			alert("收件人不能为空");
			return false;
		}else if(radios == 0&&addnameId == ""){
			alert("收件人ID不能为空");
			return false;
		}else if(Expiration == ""){
			alert("过期时间不能为空");
			return false;
		}else if(content == "" || content.length>500){
			alert("邮件内容不能为空且不能超过500位");
			return false;
		}
		var idArr = [];
		for(var i = 0;i<Goodsid.length;i++){
			idArr.push(Goodsid[i].value)
		}
		var idjsons = idArr.join(',');
		var Goodsnum = $(".Goodsnum");//获取所有附件数量
		var numArr = [];
		for(var i = 0;i<Goodsnum.length;i++){
			numArr.push(Goodsnum[i].value)
		}
		var numjsons = numArr.join(',');
		if(addname != ""&&addnameId == ""){
			alert("收件人ID不能为空")
			return false;
		}else if(addname == ""&&addnameId != ""){
			alert("收件人不能为空")
			return false;
		}
		var Goodsid = $(".Goodsid").val();
		var Goodsnum = $(".Goodsnum").val();
		if(Goodsid != ""&&Goodsnum == ""){
			alert("物品数量不能为空")
			return false
		}else if(Goodsid == ""&&Goodsnum != ""){
			alert("物品数量不能为空")
			return false
		}
		if(radios == 0){
			if(sinadd_server == ""){
				alert("服务器不能为空");
				return false
			}
		}else if(radios == 1){
			if(add_server == ""){
				alert("服务器不能为空");
				return false
			}
		}
		var emailStatus;
		if(datatimes == ""){
			emailStatus = 0
		}else{
			emailStatus = 1
		}
		$.ajax({
			type:"get",
			url:"../saveMail",
			async:true,
			data:{
				mailName:emailid,
				mailContent:content,
				mailAddressee:addname,
				mailServer:add_server,
				mailAddresseeid:addnameId,
				mailSendtime:datatimes,
				mailProperty:radios,
				goodsCode:idjsons,
				goodsNumber:numjsons,
				mailSendstatus:emailStatus,
				expire:Expiration,
				mailOneserver:sinadd_server
			},
			success:function(json){
				alert(json.message);
//				$("#add_area").css("display","none");
//				$(".layui-layer-page").css("display","none")
				tableIns.reload();
			}
		});
	})
	//保存模板
	$(".saveTemplate").click(function(){
		layer.open({
			type:1,
			area:['400px','200px'],
			title:"保存模板",
			shadeClose:false,
			shade:0,
			content:$('#Template'),
			closeBtn:2,
			btn:['确定'],
			yes:function(index,layero){
				var template = $("#templateNmae").val();//模板名称
				var emailid = $("#emailid").val();//邮件名称
				var addname = $("#addname").val();//单发收件人
				var add_server = $("#add_server").val();//群发收件人
				var addnameId = $("#addnameId").val();//收件人ID
				var content = $("#emailContent").val();//邮件内容
				var sinadd_server = $("#sinadd_server").val();//单人发送服务器
				var Expiration = $("#Expiration").val();//过期时间
				var Goodsid = $(".Goodsid");//获取所有附件ID
				var datatimes = $("#datatimes").val();//获取时间
				var radios = $(".radios input[name = 'sex']:checked").val();//获取单发群发
				if(emailid == "" || emailid.length>16){
					alert("邮件名称不能为空且不能超过16位");
					return false;
				}else if(radios == undefined){
					alert("请选择发送类型");
					return false;
				}else if(radios == 0&&addname == ""){
					alert("收件人不能为空");
					return false;
				}else if(radios == 0&&addnameId == ""){
					alert("收件人ID不能为空");
					return false;
				}else if(Expiration == ""){
					alert("过期时间不能为空");
					return false;
				}else if(content == "" || content.length>500){
					alert("邮件内容不能为空且不能超过500位");
					return false;
				}
				var idArr = [];
				for(var i = 0;i<Goodsid.length;i++){
					idArr.push(Goodsid[i].value)
				}
				var idjsons = idArr.join(',');
				var Goodsnum = $(".Goodsnum");//获取所有附件数量
				var numArr = [];
				for(var i = 0;i<Goodsnum.length;i++){
					numArr.push(Goodsnum[i].value)
				}
				var numjsons = numArr.join(',');
				if(addname != ""&&addnameId == ""){
					alert("收件人ID不能为空")
					return false;
				}else if(addname == ""&&addnameId != ""){
					alert("收件人不能为空")
					return false;
				}
				var Goodsid = $(".Goodsid").val();
				var Goodsnum = $(".Goodsnum").val();
				if(Goodsid != ""&&Goodsnum == ""){
					alert("物品数量不能为空")
					return false
				}else if(Goodsid == ""&&Goodsnum != ""){
					alert("物品数量不能为空")
					return false
				}
				if(radios == 0){
					if(sinadd_server == ""){
						alert("服务器不能为空");
						return false
					}
				}else if(radios == 1){
					if(add_server == ""){
						alert("服务器不能为空");
						return false
					}
				}
				var emailStatus;
				if(datatimes == ""){
					emailStatus = 0
				}else{
					emailStatus = 1
				}
				$.ajax({
					type:"get",
					url:"../insertTemplate",
					async:true,
					data:{
						mailName:emailid,
						mailContent:content,
						mailAddressee:addname,
						mailServer:add_server,
						mailAddresseeid:addnameId,
						mailSendtime:datatimes,
						mailProperty:radios,
						goodsCode:idjsons,
						goodsNumber:numjsons,
						template:template,
						mailSendstatus:emailStatus,
						expire:Expiration,
						mailOneserver:sinadd_server
					},
					success:function(json){
						alert(json.message);
						layer.close(index)
					}
				});
			}
		})
	})
	//载入模板
	$("#loademail").click(function(){
		$('#selectTemplate').children().remove()
		$.post("../selTemplate", function (data) {
	        $.each(data.data, function (index, item) {
	            $('#selectTemplate').append(new Option(item.template, item.mid));
	        });
			$("#selectTemplate").prepend("<option value=''></option>");
			$("#selectTemplate").each(function() {
				$(this).find("option").eq(0).attr("selected", "selected")
			})
			 form.render('select')
	    });
		layer.open({
			type:1,
			area:['400px','400px'],
			title:"选择模板",
			shadeClose:false,
			shade:0,
			content:$('#loadTemplate'),
			closeBtn:2,
			btn:['确定'],
			yes:function(index,layero){
				var selectTemplate = $("#selectTemplate").val();
				$("#addpro").siblings().remove()
				$.ajax({
					type:"post",
					url:"../setTemplate",
					async:true,
					data:{
						mId:selectTemplate
					},
					success:function(json){
						$("#emailid").val(json.data[0].mailName);//邮件名称
						$("#emailContent").val(json.data[0].mailContent);//邮件内容
						$("#datatimes").val(json.data[0].mailSendtime);//时间
						$("#Expiration").val(json.data[0].expire)
						if(json.data[0].mailProperty == 0){
							$("#singleEmail").prop("checked",true);
							$("#single").css("display","block");
					   		$("#groupEmail").css("display","none");
					   		$("#addname").val(json.data[0].mailAddressee);//单发收件人
					   		$("#singleId").css("display","block");
					   		$("#addnameId").val(json.data[0].mailAddresseeid);//收件人ID
					   		$("#singroupEmail").css("display","block")
					   		$("#sinadd_server").find("option[value="+json.data[0].mailOneserver+"]").prop("selected",true);
					   		form.render();
						}else{
							$("#groupEmails").prop("checked",true);
							$("#add_server").find("option[value="+json.data[0].mailServer+"]").prop("selected",true);
							$("#singleId").css("display","none");
					   		$("#single").css("display","none");
					   		$("#singroupEmail").css("display","none")
					   		$("#groupEmail").css("display","block");
					   		form.render();
						}
						$.ajax({
							type:"post",
							url:"../setTemplateg",
							async:true,
							data:{
								mId:selectTemplate
							},
							success:function(json){
//										console.log(json)
								if(json.data == ""){ 
									$("#addpro").after('<input type="text" placeholder="请输入物品ID" class="layui-input Goodsid" value="" style="width: 35%;background: transparent;color: white;float: left;margin-left:12%;" /><input placeholder="请输入物品名称" type="text" class="layui-input Goodsnum" value="" style="width: 35%;background: transparent;color: white;float: left;margin-bottom: 2%;" />')
								}else{
									for(var i = 0;i<json.data.length;i++){
										$("#addpro").after('<input type="text" class="layui-input Goodsid" value='+json.data[i].goodsCode+' style="width: 35%;background: transparent;color: white;float: left;margin-left:12%;" /><input type="text" class="layui-input Goodsnum" value='+json.data[i].goodsNumber+' style="width: 35%;background: transparent;color: white;float: left;margin-bottom: 2%;" />')
									}
								}
								
								$('.Goodsid').eq(0).css("margin-left","0")
								$("#addDiv").append('<button type="button" class="layui-btn layui-btn-danger" id="adds" onclick="addins(this)">添加</button>')
							}
						});
						layer.close(index)
					}
				});
			}
		})
	})
	
	table.on('tool(test)',function(obj){
		//获取当前某一条数据
		var data = obj.data
		var layEvent = obj.event;
		var id = data.mid;
		//查看邮件
		if(layEvent === 'edit'){
			layer.open({
				type:1,
				area:['800px','600px'],
				title:"邮件内容浏览",
				shadeClose:false,
				shade:0,
				content:$('#add_modify'),
				closeBtn:0,
				btn:'关闭',
				yes:function(index,layero){
					layer.close(index)
					
				}
			})
			$("#add_modify input").attr("disabled","disabled");
//			$("#add_modify button").attr("disabled","disabled");
			$("#add_modify textarea").attr("disabled","disabled");
//			$("#add_modify select").attr("disabled","disabled");
			$("#addpromodify").siblings().remove();
			$.ajax({
				type:"post",
				async:true,
				url:"../browseContent",
				data:{
					mId:id
				},
				success:function(json){
//					console.log(json)
					if(json.data[0].mailSendstatus == 0){
						$("#sendEmailmodify").css("display","none")
					}else if(json.data[0].mailSendstatus == 1){
						$("#sendEmailmodify").css("display","inline-block")
					}
					$("#emailidmodify").val(json.data[0].mailName);//邮件名称
					$("#emailContentmodify").val(json.data[0].mailContent);//邮件内容
					$("#datatimesmodify").val(json.data[0].mailSendtime);//时间
					$("#Expirationmodify").val(json.data[0].expire);//时间
					if(json.data[0].mailProperty == 0){
						$("#singleEmailmodify").prop("checked",true);
						$("#singlemodify").css("display","block");
				   		$("#groupEmailmodify").css("display","none");
				   		$("#singroupEmailmodify").css("display","block");
				   		$("#addnamemodify").val(json.data[0].mailAddressee);//单发收件人
				   		$("#singleIdmodify").css("display","block")
				   		$("#addnameIdmodify").val(json.data[0].mailAddresseeid);//收件人ID
				   		$("#sinadd_servermodify").find("option[value="+json.data[0].mailOneserver+"]").prop("selected",true);
				   		form.render();
					}else{
						$("#groupEmailsmodify").prop("checked",true);
						$("#add_servermodify").find("option[value="+json.data[0].mailServer+"]").prop("selected",true);
						$("#singleIdmodify").css("display","none")
				   		$("#singlemodify").css("display","none");
				   		$("#groupEmailmodify").css("display","block");
				   		$("#singroupEmailmodify").css("display","none");
				   		form.render();
					}
				}
			})
			$.ajax({
				type:"post",
				async:true,
				url:"../browseGoods",
				data:{
					mId:id
				},
				success:function(json){
//					console.log(json)
					if(json.data.length != 0){
						for(var i = 0;i<json.data.length;i++){
							$("#addpromodify").after('<input type="text" disabled="disabled" class="layui-input Goodsidmodify" value='+json.data[i].goodsCode+' style="width: 35%;background: transparent;color: white;float: left;margin-left:12%;" /><input disabled="disabled" type="text" class="layui-input Goodsnummodify" value='+json.data[i].goodsNumber+' style="width: 35%;background: transparent;color: white;float: left;margin-bottom: 2%;" />')
						}
						$('.Goodsidmodify').eq(0).css("margin-left","0")
						$("#addDivmodify").append('<button type="button" disabled="disabled" class="layui-btn layui-btn-danger" id="adds" onclick="addins(this)">添加</button>')
					}else{
						$("#addpromodify").after('<input type="text" disabled="disabled" class="layui-input Goodsidmodify" style="width: 35%;background: transparent;color: white;float: left;" placeholder="请输入物品ID" /><input disabled="disabled" type="text" class="layui-input Goodsnummodify" style="width: 35%;background: transparent;color: white;float: left;margin-bottom: 2%;" placeholder="请输入物品数量" /><button disabled="disabled" type="button" class="layui-btn layui-btn-danger" id="adds" onclick="addins(this)">添加</button>')
					}
				}
			})
			
		}else if(layEvent === 'del'){
			//删除邮件
			layer.confirm('是否确认删除', function(index) {
				layer.close(index);
				var id = data.mid
				$.ajax({
					type:"post",
					url:"../delMail",
					async:true,
					data:{
						ids:id,
					},
					success:function(e){
						alert(e.message);
						tableIns.reload();
					}
				})
			});
		}
	})
	//内容浏览单选
	form.on('radio(sta)', function (data) {
	   	var value = data.value;
	   	if(value == "0"){
	   		$("#singlemodify").css("display","block");
	   		$("#groupEmailmodify").css("display","none");
	   		$("#singroupEmailmodify").css("display","block")
	   		$("#add_servermodify").val('');
	   		$("#singleIdmodify").css("display","block")
	   	}else if(value == "1"){
	   		$("#addnamemodify").val('');
	   		$("#addnameIdmodify").val('');
	   		$("#singleIdmodify").css("display","none")
	   		$("#singlemodify").css("display","none");
	   		$("#groupEmailmodify").css("display","block");
	   		$("#singroupEmailmodify").css("display","none")
	   	}
	});
	//内容浏览编辑邮件
	$("#sendEmailmodify").click(function(){
		$("#add_modify input").removeAttr("disabled");
		$("#add_modify button").removeAttr("disabled");
		$("#add_modify textarea").removeAttr("disabled");
		$("#add_modify select").removeAttr("disabled");
	})
	//内容浏览再次发送邮件
	$("#saveEmailmodify").click(function(){
		var emailidmodify = $("#emailidmodify").val();//邮件名称
		var datatimesmodify = $("#datatimesmodify").val();//发送时间
		var addnamemodify = $("#addnamemodify").val();//单发收件人
		var sinadd_servermodify = $("#sinadd_servermodify").val();//单发服务器
		var add_servermodify = $("#add_servermodify").val();//群发服务器
		var addnameIdmodify = $("#addnameIdmodify").val();//收件人ID
		var emailContentmodify = $("#emailContentmodify").val();//邮件内容
		var Expirationmodify = $("#Expirationmodify").val();//过期时间
		$("#emailid").val(emailidmodify);
		$("#datatimes").val(datatimesmodify);
		$("#emailContent").val(emailContentmodify);
		$("#Expiration").val(Expirationmodify);
		if($("#singleEmailmodify").is(":checked") == true){
			$("#singleEmail").prop("checked",true);
			$("#single").css("display","block");
	   		$("#groupEmail").css("display","none");
	   		$("#singroupEmail").css("display","block");
	   		$("#singleId").css("display","block");
	   		$("#addname").val(addnamemodify);
	   		$("#addnameId").val(addnameIdmodify);
	   		$("#add_server").val('');
	   		$("#sinadd_server").find("option[value="+sinadd_servermodify+"]").prop("selected",true);
	   		form.render();
		}else if($("#groupEmailsmodify").is(":checked") == true){
			$("#groupEmails").prop("checked",true);
			$("#singleId").css("display","none");
	   		$("#single").css("display","none");
	   		$("#groupEmail").css("display","block");
	   		$("#singroupEmail").css("display","none");
	   		$("#addname").val('');
	   		$("#addnameId").val('');
	   		$("#add_server").find("option[value="+add_servermodify+"]").prop("selected",true);
	   		form.render();
		}
		var Goodsidmodify = $(".Goodsidmodify");//获取所有附件ID
		var idArr = [];
		for(var i = 0;i<Goodsidmodify.length;i++){
			idArr.push(Goodsidmodify[i].value)
		}
		var Goodsnummodify = $(".Goodsnummodify");//获取所有附件数量
		var numArr = [];
		for(var i = 0;i<Goodsnummodify.length;i++){
			numArr.push(Goodsnummodify[i].value)
		}
		$("#addpro").siblings().remove()
		var data = [];
		data = idArr.map((key,value)=>[key,numArr[value]]);
//		console.log(data)
		for(var x = 0;x<data.length;x++){
			if(data[x][0] == ""){
				$("#addpro").after("<input type='text' class='layui-input Goodsid' value='' style='width: 35%;background: transparent;color: white;float: left;margin-left:12%;' /><input type='text' class='layui-input Goodsnum' value='' style='width: 35%;background: transparent;color: white;float: left;margin-bottom: 2%;' />")
			}else{
				$("#addpro").after("<input type='text' class='layui-input Goodsid' value="+data[x][0]+" style='width: 35%;background: transparent;color: white;float: left;margin-left:12%;' /><input type='text' class='layui-input Goodsnum' value="+data[x][1]+" style='width: 35%;background: transparent;color: white;float: left;margin-bottom: 2%;' />")
			}
			
		}
		$('.Goodsid').eq(0).css("margin-left","0")
		$("#addDiv").append('<button type="button" class="layui-btn layui-btn-danger" id="adds" onclick="addins(this)">添加</button>')
		layer.open({
			type:1,
			area:['800px','600px'],
			title:"添加邮件",
			shadeClose:false,
			shade:0,
			content:$('#add_area'),
			closeBtn:0,
			btn:['关闭'],
			yes:function(index,layero){
				layer.close(index)
			}
		})
		
	})
	//批量删除
	table.on('toolbar(test)', function(obj){
	  	var checkStatus = table.checkStatus(obj.config.id);
	  	var arr = [];
	  	if(obj.event == "delete"){
	  		layer.confirm('是否确认删除', function(index) {
				layer.close(index);
				for(var i = 0; i < checkStatus.data.length; i++) {
					arr.push(checkStatus.data[i].mid)
				}
				var jsons = arr.join(',')
				$.ajax({
					type:"post",
					url:"../delMail",
					async:true,
					data:{
						ids:jsons,
					},
					success:function(e){
						alert(e.message);
						/*tableIns.reload();*/
						location.reload()
					}
				})
			});
	  	}
	});
});

function addins(obj){
	var Goodsid = $(".Goodsid").val();
	var Goodsnum = $(".Goodsnum").val();
	if(Goodsid != ""&&Goodsnum == ""){
		alert("物品数量不能为空")
		return false
	}else if(Goodsid == ""&&Goodsnum != ""){
		alert("物品数量不能为空")
		return false
	}
	$(obj).after('<input type="text" class="layui-input Goodsid" placeholder="请输入物品ID" style="width: 35%;background: transparent;color: white;float: left;margin-left:12%" /><input type="text" class="layui-input Goodsnum" placeholder="请输入物品数量" style="width: 35%;background: transparent;color: white;float: left;margin-bottom:2%" />')
}



