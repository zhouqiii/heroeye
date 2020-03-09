
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
			$("#add_server").prepend("<option value="+serverjson+">全区全服</option>");
			$("#add_server").each(function() {
				$(this).find("option").eq(0).attr("selected", "selected")
			});
			$("#add_servermodify").prepend("<option value="+serverjson+">全区全服</option>");
			$("#add_servermodify").each(function() {
				$(this).find("option").eq(0).attr("selected", "selected")
			})
			$("#sinadd_server").each(function() {
				$(this).find("option").eq(0).attr("selected", "selected")
			})
            var c = $("#sinadd_server").find("option:selected").text();
            $("#logsserver").text(c)
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
                            return "<span class='start_up' lay-event='edit' >内容浏览</span>"
                        }
                    },
                    {
                        field: '',
                        title: '删除邮件',
                        event: 'collapse',
                        templet: function(value) {
                            return "<span class='close' lay-event='del' style='color:#F13131'>删除</span>"
                        }
                    },
                ]
            ],
            done: function(res, curr, count) {
                var that = this.elem.next();
                res.rows.forEach(function (item, index) {
                    if (index%2===0) {
                        var tr = that.find(".layui-table-box tbody tr[data-index='" + index + "']").css("background-color", "#363636");
                    } else{
                        var tr = that.find(".layui-table-box tbody tr[data-index='" + index + "']").css("background-color", "#242424");
                    }
                });

            }
        });
    $('input[type=radio][name=sex]').change(function(data) {
	   	if(this.value == "0"){
	   		$("#single").css("display","flex");
	   		$("#groupEmail").css("display","none");
	   		$("#singroupEmail").css("display","flex")
	   		$("#add_server").val('');
	   		$("#singleId").css("display","flex")
	   	}else if(this.value == "1"){
	   		$("#addname").val('');
	   		$("#addnameId").val('');
	   		$("#singleId").css("display","none")
	   		$("#single").css("display","none");
	   		$("#groupEmail").css("display","flex");
	   		$("#singroupEmail").css("display","none")
	   	}
	});
	$("#addBtn").click(function(){
		$('.addGoal').remove();
		$.ajax({
			type:"post",
			url:"../newMail",
			async:true,
			success:function(json){
				if(json.state == true){
					$("#emailid").val(json.data.mailName);//邮件名称
					$("#emailContent").val(json.data.mailContent);//邮件内容
					$("#datatimes").val(json.data.mailSendtime);//发送时间
					$("#Expiration").val(json.data.expire)//过期时间
					if(json.data.mailProperty === 0){
						$("#singleEmail").prop("checked",true);//性质
						$("#single").css("display","flex");//单发收件人
						$('#singroupEmail').css("display","flex");//服务器
				   		$("#groupEmail").css("display","none");//群发收件人
				   		$("#addname").val(json.data.mailAddressee);//单发收件人
				   		$("#singleId").css("display","flex");//收件人ID
				   		$("#addnameId").val(json.data.mailAddresseeid);//收件人ID
				   		$("#sinadd_server").find("option[value="+json.data.mailOneserver+"]").prop("selected",true);
                        var thisLevel = $("#sinadd_server").find("option:selected").text();
                        $("#logsserver").text(thisLevel)
				   		form.render();
					}else{
						$("#groupEmails").prop("checked",true);
                        $("#singleId").css("display","none");
                        $("#single").css("display","none");
                        $('#singroupEmail').css("display","none");//服务器
                        $("#groupEmail").css("display","flex");
						$("#add_server").find("option[value="+json.data.mailServer+"]").prop("selected",true);
                        var thisLevel = $("#add_server").find("option:selected").text();
                        $("#logsname").text(thisLevel)
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
				if(json.state === true){
					if(json.data.length === 0){
                        var addGoal=document.createElement('div')
                        addGoal.className='addGoal'
                        addGoal.innerHTML='<input type="text" placeholder="请输入物品ID" class="Goodsid"  value="" style="width: 150px;background: transparent;color: white;float: left;" /><input placeholder="请输入物品名称" type="text" class="Goodsnum" value="" style="width: 150px;background: transparent;color: white;float: left;" />'
                        document.getElementById('addInterface').appendChild(addGoal)
					}else{
                        for(var i = 0;i<json.data.length;i++){
                            var addGoal=document.createElement('div')
                            addGoal.className='addGoal'
                            addGoal.innerHTML='<input type="text" class="Goodsid"  value="" style="width: 150px;background: transparent;color: white;float: left;" /><input type="text" class="Goodsnum" value="" style="width: 150px;background: transparent;color: white;float: left;" />'
                            document.getElementById('addInterface').appendChild(addGoal)
                            document.getElementsByClassName('Goodsid')[i].value=json.data[i].goodsCode
                            document.getElementsByClassName('Goodsnum')[i].value=json.data[i].goodsNumber
                        }
					}
					$('.Goodsid').eq(0).css("margin-left","0")
				}else{
                    var addGoal=document.createElement('div')
                    addGoal.className='addGoal'
                    addGoal.innerHTML='<input type="text" placeholder="请输入物品ID" class="Goodsid"  value="" style="width: 150px;background: transparent;color: white;float: left;" /><input placeholder="请输入物品名称" type="text" class="Goodsnum" value="" style="width: 150px;background: transparent;color: white;float: left;" />'
                    document.getElementById('addInterface').appendChild(addGoal)
				}
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
			$("#addpro").after('<div class="addGoal"><input type="text" class="Goodsid" style="width: 150px;background: transparent;color: white;float: left;" /><input type="text" class="Goodsnum"  style="width: 150px;background: transparent;color: white;float: left;" /></div>')
			$('.Goodsid').eq(0).css("margin-left","0")

			$('#addname').val($.cookie('the_cookie_pname'));
			$('#addnameId').val($.cookie('the_cookie_pacc'));

			$("#singleEmail").attr('checked')
			$("#singleEmail").attr("checked","checked");

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
        var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
        var regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
        var reg=/(^\s+)|(\s+$)/g;
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
		}else if(regEn.test(addnameId) || regCn.test(addnameId) || reg.test(addnameId)){
            alert("收件人ID不能为特殊字符");
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
            add_server=''
			if(sinadd_server == ""){
				alert("服务器不能为空");
				return false
			}
		}else if(radios == 1){
            sinadd_server=''
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
		$('.addContent').css('display','none')
        $('.loadTag').css('display','block')
		$.ajax({
			type:"get",
			url:"../insertMail",
			async:true,
			data:{
				mailName:emailid,
				mailContent:content,
				mailAddressee:addname,
				mailServer:add_server,//群发服务器
				mailAddresseeid:addnameId,
				mailSendtime:datatimes,
				mailProperty:radios,
				goodsCode:idjsons,
				goodsNumber:numjsons,
				mailSendstatus:emailStatus,
				expire:Expiration,
				mailOneserver:sinadd_server//单发服务器
			},
			success:function(json){
				alert(json.message);
				if(json.state===true){
//                    location.reload();
				}else{
                    $('.loadTag').css('display','none')
                    $('.addContent').css('display','block')
				}
			}

		});

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
        var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
        var regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
        var reg=/(^\s+)|(\s+$)/g;
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
		}else if(regEn.test(addnameId) || regCn.test(addnameId) || reg.test(addnameId)){
            alert("收件人ID不能为特殊字符");
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
				tableIns.reload();
			}
		});
	})
	//保存模板
	$(".saveTemplate").click(function(){
		layer.open({
			type:1,
			area:['400px','180px'],
			title:"保存模板",
			shadeClose:false,
			shade:0,
			content:$('#Template'),
			closeBtn:1,
			btn:['确定','取消'],
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
                var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
                var regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
                var reg=/(^\s+)|(\s+$)/g;
				if(template===''){
                    alert("模板名称不能为空");
                    return false;
				}
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
				}else if(regEn.test(addnameId) || regCn.test(addnameId) || reg.test(addnameId)){
                    alert("收件人ID不能为特殊字符");
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
			},
			btn2:function (index,layero) {
                layer.close(index)
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
			area:['400px','300px'],
			title:"选择模板",
			shadeClose:false,
			shade:0,
			content:$('#loadTemplate'),
			closeBtn:1,
			btn:['确定','取消'],
			yes:function(index,layero){
				var selectTemplate = $("#selectTemplate").val();
				$.ajax({
					type:"post",
					url:"../setTemplate",
					async:true,
					data:{
						mId:selectTemplate
					},
					success:function(json){
						$("#emailid").val(json.data[0].mailName);//邮件名称1
						$("#emailContent").val(json.data[0].mailContent);//邮件内容1
						$("#datatimes").val(json.data[0].mailSendtime);//发送时间1
						$("#Expiration").val(json.data[0].expire)//过期时间1
						if(json.data[0].mailProperty == 0){
							$("#singleEmail").prop("checked",true);//单选框1
							$("#single").css("display","flex");//
					   		$("#groupEmail").css("display","none");
					   		$("#addname").val(json.data[0].mailAddressee);//收件人1
					   		$("#singleId").css("display","flex");
					   		$("#addnameId").val(json.data[0].mailAddresseeid);//收件人ID1
					   		$("#singroupEmail").css("display","flex")
					   		$("#sinadd_server").find("option[value="+json.data[0].mailOneserver+"]").prop("selected",true);
                            var thisLevel = $("#sinadd_server").find("option:selected").text();
                            $("#logsserver").text(thisLevel)
					   		form.render();
						}else{
							$("#groupEmails").prop("checked",true);
                            $("#single").css("display","none");
                            $("#singroupEmail").css("display","none")
                            $("#singleId").css("display","none")
                            $("#groupEmail").css("display","flex");
							$("#add_server").val(json.data[0].mailServer);
                            var thisLevel = $("#add_server").find("option:selected").text();
                            $("#logsname").text(thisLevel)
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
                                $('.addGoal').remove();
								if(json.data == ""||json.data===[]){
									var addGoal=document.createElement('div')
                                    addGoal.className='addGoal'
                                    addGoal.innerHTML='<input type="text" placeholder="请输入物品ID" class="Goodsid"  value="" style="width: 150px;background: transparent;color: white;float: left;" /><input placeholder="请输入物品名称" type="text" class="Goodsnum" value="" style="width: 150px;background: transparent;color: white;float: left;" />'
									document.getElementById('addInterface').appendChild(addGoal)
								}else{
									for(var i = 0;i<json.data.length;i++){
                                        var addGoal=document.createElement('div')
                                        addGoal.className='addGoal'
                                        addGoal.innerHTML='<input type="text" class="Goodsid"  value="" style="width: 150px;background: transparent;color: white;float: left;" /><input type="text" class="Goodsnum" value="" style="width: 150px;background: transparent;color: white;float: left;" />'
                                        document.getElementById('addInterface').appendChild(addGoal)
										document.getElementsByClassName('Goodsid')[i].value=json.data[i].goodsCode
                                        document.getElementsByClassName('Goodsnum')[i].value=json.data[i].goodsNumber
									}
								}

								$('.Goodsid').eq(0).css("margin-left","0")
							}
						});
						layer.close(index)
					}
				});
			},
			btn2:function(index,layero){
                layer.close(index)
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
            $(".inner .inner_main").eq(2).css("display","block").siblings('.inner_main').css("display","none")
			if(data.mailSendstatus===0){
				$("#sendEmailmodify").css('display','none')
			}else{
                $("#sendEmailmodify").css('display','inline-block')
			}
           var mailstatus=data.mailProperty
			if(mailstatus===1){//群发邮件
                $("#groupEmailsmodify").prop("checked",true);
                $("#singleEmailmodify").attr("disabled","disabled");
				$('#singlemodify').css('display','none')
				$('#groupEmailmodify').css('display','flex')
				$('#singroupEmailmodify').css('display','none')
				$('#singleIdmodify').css('display','none')
				if(data.mailAddressee==='全区全服'){
                    $("#add_servermodify option:first").prop("selected", 'selected');
				}else{
                    $("#add_servermodify").find("option[value="+data.mailServer+"]").prop("selected",true);
				}
                var thisType = $("#add_servermodify").find("option:selected").text();
                $("#logsnameAno").text(thisType)
                $("#add_servermodify").attr('disabled',"disabled");
                form.render();
			}else{//单人邮件
                $("#singleEmailmodify").prop("checked",true);
                $("#groupEmailsmodify").attr("disabled","disabled");
                $('#groupEmailmodify').css('display','none')
                $('#singlemodify').css('display','flex')
                $('#singroupEmailmodify').css('display','flex')
                $('#singleIdmodify').css('display','flex')
                $("#addnamemodify").val(data.mailAddressee);//单发收件人
                $("#addnamemodify").attr("readOnly","true");
                $("#addnameIdmodify").val(data.mailAddresseeid);//收件人ID
                $("#addnameIdmodify").attr("readOnly","true");
                $("#sinadd_servermodify").find("option[value="+data.mailOneserver+"]").prop("selected",true);
                var thisType = $("#sinadd_servermodify").find("option:selected").text();
                $("#logsserverAno").text(thisType)
                $("#sinadd_servermodify").attr('disabled',"disabled");
                form.render();
			}
            $("#emailidmodify").val(data.mailName);//邮件名称
            $("#datatimesmodify").val(data.mailSendtime);//发送时间
            $("#Expirationmodify").val(data.expire);//过期时间
            $("#emailContentmodify").val(data.mailContent);//邮件内容
            $("#emailidmodify").attr("readOnly","true");
            $("#datatimesmodify").attr("disabled","disabled");
            $("#Expirationmodify").attr("readOnly","true");
            $("#emailContentmodify").attr("readOnly","true");
			$.ajax({
				type:"post",
				async:true,
				url:"../browseGoods",
				data:{
					mId:id
				},
				success:function(json){
                    $('.addGoalMod').remove();
					if(json.data.length !== 0){
						for(var i = 0;i<json.data.length;i++){
                            var addGoal=document.createElement('div')
                            addGoal.className='addGoalMod'
                            addGoal.innerHTML='<input type="text" class="Goodsidmodify" disabled="disabled" value="" style="width: 150px;background: transparent;color: white;float: left;" /><input type="text" class="Goodsnummodify" disabled="disabled" value="" style="width: 150px;background: transparent;color: white;float: left;" />'
                            document.getElementById('addInterfaceAno').appendChild(addGoal)
                            document.getElementsByClassName('Goodsidmodify')[i].value=json.data[i].goodsCode
                            document.getElementsByClassName('Goodsnummodify')[i].value=json.data[i].goodsNumber
						}
					}else{
                        var addGoal=document.createElement('div')
                        addGoal.className='addGoalMod'
                        addGoal.innerHTML='<input type="text" class="Goodsidmodify" disabled="disabled" value="" style="width: 150px;background: transparent;color: white;float: left;" /><input type="text" class="Goodsnummodify" disabled="disabled" value="" style="width: 150px;background: transparent;color: white;float: left;" />'
                        document.getElementById('addInterfaceAno').appendChild(addGoal)
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
    $('input[type=radio][name=scapRadio]').change(function(data) {
	   	if(this.value === "0"){
	   		$("#singlemodify").css("display","flex");
	   		$("#groupEmailmodify").css("display","none");
	   		$("#singroupEmailmodify").css("display","flex")
	   		$("#add_servermodify").val('');
	   		$("#singleIdmodify").css("display","flex")
	   	}else if(this.value === "1"){
	   		$("#addnamemodify").val('');
	   		$("#addnameIdmodify").val('');
	   		$("#singleIdmodify").css("display","none")
	   		$("#singlemodify").css("display","none");
	   		$("#groupEmailmodify").css("display","flex");
	   		$("#singroupEmailmodify").css("display","none")
	   	}
	});
	//内容浏览编辑邮件
	$("#sendEmailmodify").click(function(){
        $("#emailidmodify").removeAttr("readOnly");//邮件名称
        $("#datatimesmodify").removeAttr("disabled");//发送时间
        $("#Expirationmodify").removeAttr("readOnly");//过期时间
        $("#emailContentmodify").removeAttr("readOnly");//邮件内容
        $(".addGoalMod input").removeAttr("disabled");//附件
        $("#add_servermodify").removeAttr('disabled');//群发收件人
        $("#singleEmailmodify").removeAttr("disabled");//邮件性质
        $("#groupEmailsmodify").removeAttr("disabled");//邮件性质
        $("#addnamemodify").removeAttr("readOnly");//单发收件人
        $("#addnameIdmodify").removeAttr("readOnly");//收件人ID
        $("#sinadd_servermodify").removeAttr('disabled');//服务器
	})
	//内容浏览再次发送邮件
	$("#saveEmailmodify").click(function(){
        var emailid = $("#emailidmodify").val();//邮件名称
        var content = $("#emailContentmodify").val();//邮件内容
        var Expiration = $("#Expirationmodify").val();//过期时间
        var datatimes = $("#datatimesmodify").val();//发送时间
        var addname = $("#addnamemodify").val();//单发收件人
        var sinadd_server = $("#sinadd_servermodify").val();//单人发送服务器
        var add_server = $("#add_servermodify").val();//群发收件人
        var addnameId = $("#addnameIdmodify").val();//收件人ID
        var Goodsid = $(".Goodsidmodify");//获取所有附件ID
        var radios = $(".radios input[name = 'scapRadio']:checked").val();//获取单发群发
        var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
        var regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
        var reg=/(^\s+)|(\s+$)/g;
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
        }else if(regEn.test(addnameId) || regCn.test(addnameId) || reg.test(addnameId)){
            alert("收件人ID不能为特殊字符");
            return false;
        }else if(Expiration == ""){
            alert("过期时间不能为空");
            return false;
        }else if(content == "" || content.length>500){
            alert("邮件内容不能为空且不能超过500位");
            alert("邮件内容不能为空且不能超过500位");
            return false;
        }
        var idjsons
        var numjsons
        var idArr = [];
        for(var i = 0;i<Goodsid.length;i++){
            idArr.push(Goodsid[i].value)
        }
        var Goodsnum = $(".Goodsnummodify");//获取所有附件数量
        var numArr = [];
        for(var i = 0;i<Goodsnum.length;i++){
            numArr.push(Goodsnum[i].value)
        }
        for(var i=0;i<idArr.length;i++){
        	if((idArr[i]!=='')&&(numArr[i]==='')){
        		alert('物品数量不能为空')
				return false
			}else if((idArr[i]==='')&&(numArr[i]!=='')){
                alert('物品ID不能为空')
                return false
			}else{
                idjsons = idArr.join(',');
                numjsons = numArr.join(',');
			}
		}

        if(addname != ""&&addnameId == ""){
            alert("收件人ID不能为空")
            return false;
        }else if(addname == ""&&addnameId != ""){
            alert("收件人不能为空")
            return false;
        }
        if(radios == 0){
            add_server=''
            if(sinadd_server == ""){
                alert("服务器不能为空");
                return false
            }
        }else if(radios == 1){
            sinadd_server=''
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
        $('.addContent').css('display','none')
        $('.loadTagAno').css('display','block')
        $.ajax({
            type:"get",
            url:"../insertTemplate",
            async:true,
            data:{
                mailName:emailid,//邮件名称
                mailContent:content,//邮件内容
                mailAddressee:addname,//单发收件人
                mailServer:add_server,//群发收件人
                mailAddresseeid:addnameId,//收件人ID
                mailSendtime:datatimes,//发送时间
                mailProperty:radios,//获取单发群发
                goodsCode:idjsons,//获取所有附件ID
                goodsNumber:numjsons,//获取所有附件数量
                mailSendstatus:emailStatus,
                expire:Expiration,//过期时间
                mailOneserver:sinadd_server//单人发送服务器
            },
            success:function(json){
                alert(json.message);
                if(json.state===true){
                    location.reload();
                }else{
                    $('.loadTagAno').css('display','none')
                    $('.addContent').css('display','block')
                }
            }
        });
	})
    //内容浏览再次保存模板
    $(".saveTemplateModify").click(function(){
        layer.open({
            type:1,
            area:['400px','180px'],
            title:"保存模板",
            shadeClose:false,
            shade:0,
            content:$('#Template'),
            closeBtn:1,
            btn:['确定','取消'],
            yes:function(index,layero){
                var template = $("#templateNmae").val();//模板名称
                var emailid = $("#emailidmodify").val();//邮件名称
                var content = $("#emailContentmodify").val();//邮件内容
                var Expiration = $("#Expirationmodify").val();//过期时间
                var datatimes = $("#datatimesmodify").val();//发送时间
                var addname = $("#addnamemodify").val();//单发收件人
                var sinadd_server = $("#sinadd_servermodify").val();//单人发送服务器
                var add_server = $("#add_servermodify").val();//群发收件人
                var addnameId = $("#addnameIdmodify").val();//收件人ID
                var Goodsid = $(".Goodsidmodify");//获取所有附件ID
                var radios = $(".radios input[name = 'scapRadio']:checked").val();//获取单发群发
                var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
                var regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
                var reg=/(^\s+)|(\s+$)/g;
				if(template===''){
					alert('模板名称不能为空')
					return false
				}
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
                }else if(regEn.test(addnameId) || regCn.test(addnameId) || reg.test(addnameId)){
                    alert("收件人ID不能为特殊字符");
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
                var Goodsnum = $(".Goodsnummodify");//获取所有附件数量
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
                if(radios == 0){
                    if(sinadd_server == ""){
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
                        mailName:emailid,//邮件名称
                        mailContent:content,//邮件内容
                        mailAddressee:addname,//单发收件人
                        mailServer:add_server,//群发收件人
                        mailAddresseeid:addnameId,//收件人ID
                        mailSendtime:datatimes,//发送时间
                        mailProperty:radios,//获取单发群发
                        goodsCode:idjsons,//获取所有附件ID
                        goodsNumber:numjsons,//获取所有附件数量
                        template:template,//模板名称
                        mailSendstatus:emailStatus,
                        expire:Expiration,//过期时间
                        mailOneserver:sinadd_server//单人发送服务器
                    },
                    success:function(json){
                        alert(json.message);
                        layer.close(index)
                    }
                });
            },
            btn2:function (index,layero) {
                layer.close(index)
            }
        })
    })
	//批量删除
	table.on('toolbar(test)', function(obj){
	  	var checkStatus = table.checkStatus(obj.config.id);
	  	var arr = [];
	  	if(obj.event == "delete"){
	  		if(checkStatus.data.length===0){
	  			alert('未选中要删除的邮件！')
				return false
			}
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

function addins(){
	var obj=document.getElementsByClassName('addGoal')
	var len=obj.length
	for(var i=0;i<len;i++){
        var Goodsid= document.getElementsByClassName('Goodsid')[i].value
		var Goodsnum=document.getElementsByClassName('Goodsnum')[i].value
		if(Goodsid === ""||Goodsid===null||Goodsid===undefined){
			alert("物品ID不能为空")
			return false
		}
		if(Goodsnum === ""||Goodsnum===null||Goodsnum===undefined){
            alert("物品数量不能为空")
            return false
		}

	}
	$(obj[len-1]).after('<div class="addGoal"><input type="text" class="Goodsid" placeholder="请输入物品ID" style="width: 150px;background: transparent;color: white;float: left;" /><input type="text" class="Goodsnum"   placeholder="请输入物品数量" style="width: 150px;background: transparent;color: white;float: left;" /></div>')
}

function addinsMod(){
    var obj=document.getElementsByClassName('addGoalMod')
    var len=obj.length
    for(var i=0;i<len;i++){
        var Goodsid= document.getElementsByClassName('Goodsidmodify')[i].value
        var Goodsnum=document.getElementsByClassName('Goodsnummodify')[i].value
        if(Goodsid === ""||Goodsid===null||Goodsid===undefined){
            alert("物品ID不能为空")
            return false
        }
        if(Goodsnum === ""||Goodsnum===null||Goodsnum===undefined){
            alert("物品数量不能为空")
            return false
        }
    }
    $(obj[len-1]).after('<div class="addGoalMod"><input type="text" class="Goodsidmodify" placeholder="请输入物品ID" style="width: 150px;background: transparent;color: white;float: left;" /><input type="text" class="Goodsnummodify"   placeholder="请输入物品数量" style="width: 150px;background: transparent;color: white;float: left;" /></div>')
}

