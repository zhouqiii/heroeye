getUrlParam()
var areaid;
function getUrlParam() {
	var loc = window.location.search;
	var n1 = loc.length;//地址的总长度
	var n2 = loc.indexOf("=");//取得=号的位置
	areaid = loc.substr(n2 + 1, n1 - n2);//从=号后面的内容
}
layui.use(['element', 'table', 'layer', 'form', 'upload'], function() {
	var element = layui.element;
	var table = layui.table;
	var layer = layui.layer;
	var form = layui.form;
	var upload = layui.upload;
	//大区下拉赋值
	Subordinate_area()
	function Subordinate_area(){
		$.post("../getArea", function (data) {
	        $.each(data.rows, function (index, item) {
	            $('#addSubordinate_area').append(new Option(item.areaName, item.areaId));
	            $('#modifySubordinate_area').append(new Option(item.areaName, item.areaId));
	        });
			$("#addSubordinate_area").prepend("<option value=''></option>");
			$("#modifySubordinate_area").prepend("<option value=''></option>");
			$("#addSubordinate_area").each(function() {
				$(this).find("option").eq(0).attr("selected", "selected")
			})
			$("#modifySubordinate_area").each(function() {
				$(this).find("option").eq(0).attr("selected", "selected")
			})
	        form.render('select')
	    });
	}
	element.init();
	//批量导入服务器
	upload.render({
		elem: '#test3',
		url: '../upload',
		accept: 'file',
		done: function(res){
			alert(res.message);
	    }
	});
	var tableIns = table.render({
		elem: '#datatable',
		url: '../getServerList',
		loading: true,
		page: true,
		where: {
			pId:areaid
		},
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
			[{
					field: 'serverId',
					title: '服务器ID',
				},
				{
					field: 'serverName',
					title: '服务器名称'
				},
				{
					field: 'pId',
					title: '所属大区',
				},
				{
					field: 'serverIp',
					title: 'IP',
				},
				{
					field: 'remarks',
					title: '备注',
				},
				{
					field: '',
					title: '查看进程',
					templet: function(value) {
						return '<button type="button" class="layui-btn layui-btn-normal" lay-event="procs">查看进程</button>'
					}
				},
				// {
				// 	field: '',
				// 	title: '预警',
				// 	templet: function(d) {
				// 		return "<div><button lay-event='check' class=\"layui-btn layui-btn-warm\">"+ (d.isMonitoring==0?'关闭':'开启') +"</button></div>"
				// 		// d.isMonitoring==0?'关闭':'开启'+"
				// 	}
				// },
				{
					field: '',
					title: '操作',
					event: 'collapse',
					templet: function(value) {
						return "<span class='start_up' lay-event='edit' >编辑</span>" + "<span class='close' lay-event='del'>删除</span>"
					}
				},
			]
		]
	});
	//通过ID搜索
	$("#search").click(function(){
		var searchid = $("#search_Id").val();
		var tableIns = table.render({
			elem: '#datatable',
			url: '../getServerListNoPage',
			loading: true,
			page: true,
			where: {
				serverId: searchid,
			},
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
				[{
						field: 'serverId',
						title: '服务器ID',
					},
					{
						field: 'serverName',
						title: '服务器名称'
					},
					{
						field: 'pId',
						title: '所属大区',
					},
					{
						field: 'serverIp',
						title: 'IP',
					},
					{
						field: 'remarks',
						title: '备注',
					},
					{
						field: 'remarks',
						title: '查看服务器',
						templet: function(value) {
							return '<button type="button" class="layui-btn layui-btn-normal" lay-event="procs">查看服务器</button>'
						}
					},
					{
						field: '',
						title: '操作',
						event: 'collapse',
						templet: function(value) {
							return "<span class='start_up' lay-event='edit' >编辑</span>" + "<span class='close' lay-event='del'>删除</span>"
						}
					},
				]
			]
		});
	})
	$("#add").click(function() {
		layer.open({
			type: 1,
			area: ['500px', '470px'],
			title: "添加服务器",
			shadeClose: false,
			shade: 0,
			content: $('#add_area'),
			closeBtn: 2,
			btn: '确定',
			yes: function(index, layero) {
				layer.close(index)
				console.log(index)
				var addSubordinate_area = $("#addSubordinate_area").val(); //所属大区
				var add_serverid = $("#add_serverid").val(); //服务器ID
				var add_servername = $("#add_servername").val(); //服务器名称
				var add_serverip = $("#add_serverip").val(); //服务器ip
				var add_serverport = $("#add_serverport").val(); //服务器端口
				var add_serverremarks = $("#add_serverremarks").val(); //备注
				var whether_process = $("#whether_process").val()//是否开启进程
				var whether_pere =$("#whether_pere").val()
				var regEn = /[`!@#$%^&*()_+<>?:"{},.\/;'[\]-]/im;
				var regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
				var regIp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/; //判断ip
				console.log(addSubordinate_area,add_serverid,add_servername,add_serverip,add_serverport,add_serverremarks,whether_process,whether_pere)
				if(add_serverid == "" || add_serverid == null || add_serverid == undefined) {
					alert("服务器ID不能为空")
					return false;
				} else if(isNaN(add_serverid) || add_serverid.length > 11) {
					alert("服务器ID只能为不超过11位的数字")
					return false;
				} else if(add_servername == "" || add_servername == null || add_servername == undefined) {
					alert("服务器名称不能为空")
					return false;
				} else if(regEn.test(add_servername) || regCn.test(add_servername)) {
					alert("服务器名称不能包含特殊字符")
					return false;
				} else if(addSubordinate_area == '' || addSubordinate_area == null || addSubordinate_area == undefined) {
					alert("所属大区不能为空")
					return false;
				} else if(add_serverip == "" || add_serverip == null || add_serverip == undefined) {
					alert("服务器IP不能为空")
					return false;
				} else if(regIp.test(add_serverip) == false) {
					alert("服务器IP格式不正确")
					return false;
				} else if(add_serverport == "" || add_serverport == null || add_serverport == undefined) {
					alert("服务器端口不能为空")
					return false;
				} else if(isNaN(add_serverport) || add_serverport.length > 6) {
					alert("服务器端口号只能为数字且不能超过6位")
					return false;
				} else if(add_serverremarks == "" || add_serverremarks == null || add_serverremarks == undefined) {
					alert("备注不能为空")
					return false;
				} else {
					$("body").mLoading("show")
					$.ajax({
						type: "get",
						url: "../saveServerList",
						async: true,
						data: {
							serverId: add_serverid,
							serverName: add_servername,
							pId: addSubordinate_area,
							serverIp: add_serverip,
							serverPort: add_serverport,
							remarks: add_serverremarks,
							isProcess: whether_process,
							isMonitoring:whether_pere,
						},
						success: function(json) {
							console.log(json)
							alert(json.message)
							$("body").mLoading("hide")
							tableIns.reload()
						}
					});
				}
			}
		})
	})
	var serve;
	var modify_serverip;
	var id
	var toring
	table.on('tool(test)', function(obj) {
		//获取点击的某一行数据
		var data = obj.data;
		serve = data.serverId;
		toring= data.isMonitoring;
		var layEvent = obj.event;
		var modify_serverid = data.serverId;
		var modify_servername = data.serverName;
		var modifySubordinate_area = data.pId;
			modify_serverip = data.serverIp;
		var modify_serverport = data.serverPort;
		var modify_serverremarks = data.remarks;
		var whether_pere= data.isMonitoring
			id = data.vId;

		if(obj.event=='check'){
			if(obj.data.isMonitoring==0){

			}else if(obj.data.isMonitoring==1){

			}

			console.log(666,obj.data.isMonitoring)
			if($(this).text()=='关闭'){
				$.ajax({
					type: "get",
					url: "../updateServerList",
					async: true,
					data: {
						vId: id,
						isMonitoring:toring,
						serverId:serve,
					},
					success: function(json) {
						$("body").mLoading("hide")
						// alert(json.message)
						//						tableIns.reload()
						if(json.state==true){
							$(this).html("开启");
							tableIns.reload()
						}else{

						}
					}
				})
			}else{
				$("body").mLoading("show")
				$.ajax({
					type: "get",
					url: "../updateServerList",
					async: true,
					data: {
						vId: id,
						isMonitoring:toring,
						serverId:serve,
					},
					success: function(json) {
						$("body").mLoading("hide")

						if(json.state==true){
							$(this).html("关闭");
							tableIns.reload()
						}else{

						}
					}
				})
			}
			// form.render()
		}else if(layEvent === 'procs') {//点击服务器查看对应进程
			$(".process").css("display", "block")
			$(".inner").css("display", "none")
			$("#server_proce").text(modify_servername+" 进程列表")
			var tableIng = table.render({
				elem: '#datatable_two',
				url: '../getProcessByServerId',
				loading: true,
				page: false,
				response: {
					statusName: 'state',
					msgName: 'message',
					statusCode: true,
					countName: 'total',
					dataName: 'rows'
				},
				where: {
					vId: id
				},
				cols: [
					[
						{
							field: 'processType',
							title: '服务器类型',
							templet: function(value) {
								var type;
								if(value.processType == 1) {
									type = "Gate";
								}
								if(value.processType == 2) {
									type = "WS";
								}
								if(value.processType == 3) {
									type = "Fep";
								}
								if(value.processType == 4) {
									type = "LS";
								}
								if(value.processType == 5) {
									type = "CS";
								}
								if(value.processType == 6) {
									type = "DP";
								}
								if(value.processType == 8) {
									type = "Gmt";
								}
								if(value.processType == 9) {
									type = "Billing";
								}
								return type;
							}
						},
						{
							field: 'processName',
							title: '名称'
						},
						
						{
							field: 'remarks',
							title: '备注'
						},
						{
							field: 'city',
							title: '操作',
							templet: function(value) {
								return "<span class='close' lay-event='edits'>编辑</span>" + "<span class='close' lay-event='delet'>删除</span>"
							}
						}
					]
				]
			});
			//进程列表操作
			
			//点击添加进程
			$("#add_process").click(function() {
				layer.open({
					type: 1,
					area: ['500px', '350px'],
					title: "添加进程",
					shadeClose: false,
					shade: 0,
					content: $('#add_proce'),
					closeBtn: 2,
					btn: '确定',
					yes: function(index, layero) {
						layer.close(index);
						var add_proceType = $("#add_proceType").val(); //类型
						var add_procename = $("#add_procename").val(); //名称
						var add_remakers = $("#add_remakers").val(); //备注
						var regEn = /[`!@#$%^&*()_+<>?:"{},.\/;'[\]-]/im;
						var regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
						if(add_proceType == "" || add_proceType == null || add_proceType == undefined) {
							alert("类型不能为空");
							return false;
						} else if(add_procename == "" || add_procename == null || add_procename == undefined) {
							alert("名称不能为空");
							return false;
						} else if(regEn.test(add_procename) || regCn.test(add_procename)) {
							alert("名称不能包含特殊字符");
							return false;
						} else if(add_remakers == "" || add_remakers == null | add_remakers == undefined) {
							alert("备注不能为空");
							return false;
						} else {
							$("body").mLoading("show")
							$.ajax({
								type: "get",
								url: "../saveProcess",
								async: true,
								data: {
									serverId: serve,
									serverIp: modify_serverip,
									remarks: add_remakers,
									processType: add_proceType,
									processName: add_procename,
									pId:id,

								},
								success: function(e) {
									alert(e.message);
									$("body").mLoading("hide")
									
									tableIng.reload();
								}
							});
						}
					}
				})
			})
			table.on('tool(process_test)', function(ob) {
				//获取点击的某一行数据
				var data = ob.data;
				var layEvent = ob.event;
				var id = data.vId;
				var serverid = data.serverId;
				var procetype = data.processType;
				var procename = data.processName;
				var proceremakers = data.remarks;
				var proceserverip = data.serverIp;
				var preus =data.isMonitoring;
				console.log(data.isMonitoring)
				if(layEvent === "edits") {
					$("#modify_proceType").val(procetype);
					$("#modify_procename").val(procename);
					$("#modify_remakers").val(proceremakers);
					layer.open({
						type: 1,
						area: ['500px', '350px'],
						title: "修改进程",
						shadeClose: false,
						shade: 0,
						content: $('#modify_proce'),
						closeBtn: 2,
						btn: '确定',
						yes: function(index, layero) {
							layer.close(index);
							var modify_proceType = $("#modify_proceType").val(); //类型
							var modify_procename = $("#modify_procename").val(); //名称
							var modify_remakers = $("#modify_remakers").val(); //备注
							var regEn = /[`!@#$%^&*()_+<>?:"{},.\/;'[\]-]/im;
							var regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
							if(modify_proceType == "" || modify_proceType == null || modify_proceType == undefined) {
								alert("类型不能为空");
								return false;
							} else if(modify_procename == "" || modify_procename == null || modify_procename == undefined) {
								alert("名称不能为空");
								return false;
							} else if(regEn.test(modify_procename) || regCn.test(modify_procename)) {
								alert("名称不能包含特殊字符");
								return false;
							} else if(modify_remakers == "" || modify_remakers == null | modify_remakers == undefined) {
								alert("备注不能为空");
								return false;
							} else{
								$("body").mLoading("show")
								$.ajax({
									type: "get",
									url: "../updateProcess",
									async: true,
									data: {
										vId: id,
										serverId: serverid,
										remarks: modify_remakers,
										processType: modify_proceType,
										processName: modify_procename,
										serverIp: proceserverip,
										isMonitoring:preus,
									},
									success: function(e) {
										alert(e.message);
										$("body").mLoading("hide")
										tableIng.reload();
									}
								});
							}
								
						}
					})
				} else if(layEvent === "delet") {
					layer.confirm('是否删除此进程', function(index) {
						layer.close(index)
						$("body").mLoading("show")
						var id = data.vId
						$.ajax({
							type: "get",
							url: "../deleteProcess",
							async: true,
							data: {
								vId: id,
								processType:procetype,
								processName:procename,
								serverIp:modify_serverip
							},
							success: function(e) {
								alert(e.message)
								$("body").mLoading("hide")
								tableIng.reload()
							}
						})
					});
				}

			})
		}
		//如果点击修改触发的事件
		if(layEvent === 'edit') {
			$("#modify_serverid").val(modify_serverid); //服务器ID
			$("#modify_servername").val(modify_servername); //服务器名称
			$("#modifySubordinate_area").val(modifySubordinate_area); //服务器所属大区
			$("#modify_serverip").val(modify_serverip); //服务器ip
			$("#modify_serverport").val(modify_serverport); //服务器端口
			$("#modify_serverremarks").val(modify_serverremarks); //备注
			$("#whether-pere").val(whether_pere)
			layer.open({
				type: 1,
				area: ['500px', '470px'],
				title: "修改服务器",
				shadeClose: false,
				shade: 0,
				content: $('#modify_area'),
				closeBtn: 2,
				btn: '确定',
				yes: function(index, layero) {
					console.log($("#whether_pere").val())
					layer.close(index)
					var id = data.vId
					var modifySubordinate_area = $("#modifySubordinate_area").val(); //所属大区
					var modify_serverid = $("#modify_serverid").val(); //服务器ID
					var modify_servername = $("#modify_servername").val(); //服务器名称
					var modify_serverip = $("#modify_serverip").val(); //服务器ip
					var modify_serverport = $("#modify_serverport").val(); //服务器端口
					var whether_pere = $("#whether-pere").val();
					var modify_serverremarks = $("#modify_serverremarks").val(); //备注
					var regEn = /[`!@#$%^&*()_+<>?:"{},.\/;'[\]-]/im;
					var regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
					var regIp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/; //判断ip
					if(modify_serverid == "" || modify_serverid == null || modify_serverid == undefined) {
						alert("服务器ID不能为空")
						return false;
					} else if(isNaN(modify_serverid) || modify_serverid.length > 11) {
						alert("服务器ID只能为不超过11位的数字")
						return false;
					} else if(modify_servername == "" || modify_servername == null || modify_servername == undefined) {
						alert("服务器名称不能为空")
						return false;
					} else if(regEn.test(modify_servername) || regCn.test(modify_servername)) {
						alert("服务器名称不能包含特殊字符")
						return false;
					} else if(modifySubordinate_area == '' || modifySubordinate_area == null || modifySubordinate_area == undefined) {
						alert("所属大区不能为空")
						return false;
					} else if(modify_serverip == "" || modify_serverip == null || modify_serverip == undefined) {
						alert("服务器IP不能为空")
						return false;
					} else if(regIp.test(modify_serverip) == false) {
						alert("服务器IP格式不正确")
						return false;
					} else if(modify_serverport == "" || modify_serverport == null || modify_serverport == undefined) {
						alert("服务器端口不能为空")
						return false;
					} else if(isNaN(modify_serverport) || modify_serverport.length > 6) {
						alert("服务器端口号只能为数字且不能超过6位")
						return false;
					} else if(modify_serverremarks == "" || modify_serverremarks == null || modify_serverremarks == undefined) {
						alert("备注不能为空")
						return false;
					} else {
						$("body").mLoading("show")
						$.ajax({
							type: "get",
							url: "../updateServerList",
							async: true,
							data: {
								vId: id,
								serverId: modify_serverid,
								serverName: modify_servername,
								pId: modifySubordinate_area,
								serverIp: modify_serverip,
								serverPort: modify_serverport,
								remarks: modify_serverremarks,
								isMonitoring:whether_pere,
							},
							success: function(json) {
								alert(json.message)
								$("body").mLoading("hide")
								tableIns.reload()
							}
						});

					}
				}
			})
		} else if(layEvent === 'del') {
			//如果点击删除触发的事件
			layer.confirm('是否确认删除', function(index) {
				layer.close(index);
				$("body").mLoading("show")
				var id = data.vId
				$.ajax({
					type: "get",
					url: "../deleteServerList",
					async: true,
					data: {
						vId: id,
						serverId:modify_serverid,
						serverName:modify_servername,
						serverIp:modify_serverip
					},
					success: function(e) {
						alert(e.message)
						$("body").mLoading("hide")
						tableIns.reload()
					}
				})
			});
		}
	})
	
});
