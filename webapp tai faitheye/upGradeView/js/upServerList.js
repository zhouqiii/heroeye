getUrlParam()
var areaid;
var gametext="";
var logtext="";
var gamemodify="";
var logmodify="";
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
		$.post("../getArea.action", function (data) {
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
		url: '../upload.action',
		accept: 'file',
		done: function(res){
			alert(res.message);
	    }
	});

	var tableIns = table.render({
		elem: '#datatable',
		height:800,
		url: '../getServerList.action',
		loading: true,
		page: true,
		where: {
			pId:areaid
		},
		limits: [14, 30, 50], //显示
        limit: 14, //每页默认显示的数量,
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
					field: 'bases',
					title: '数据库名',
					templet: function(value) {
						var Array=[];
						var str
						if(value.bases == null || value.bases == "{}" || value.bases == "" ){
							
							return ""
						}else{
							var obj = JSON.parse(value.bases)
							$.each(obj, function(i) {
//								console.log(i); //获取键值
//								console.log(obj[i]); //获取对应的value
//								console.log(obj[i].name)
//								Array.push(i)
								if(obj[i].name != ""){
									Array.push(obj[i].name)
								}
							});
						}
						str = Array.join(",")
						return str
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
				{
					field: '',
					title: '查看进程',
					templet: function(value) {
						return '<button type="button" class="checkServer" lay-event="procs">查看进程</button>'
					}
				},
			]
		],
		done: function (res, curr, count) {// 表格渲染完成之后的回调
            var that = this.elem.next();
            res.rows.forEach(function (item, index) {
                if (index%2===0) {
                    var tr = that.find(".layui-table-box tbody tr[data-index='" + index + "']").css("background-color", "#363636");
                } else{
                    var tr = that.find(".layui-table-box tbody tr[data-index='" + index + "']").css("background-color", "#242424");
                }
            });
        },
	});
	//通过ID搜索
	$("#search").click(function(){
		var searchid = $("#search_Id").val();
		var reg=/^[0-9]+([.]{1}[0-9]+){0,1}$/
		if(reg.test(searchid)===false&&searchid!==''){
			alert('请输入正确的服务器ID')
			return false
		}
		var tableIns = table.render({
			elem: '#datatable',
			height:800,
			url: '../getServerListNoPage.action',
			loading: true,
			page: true,
			where: {
				serverId: searchid,
			},
			limits: [14, 30, 50], //显示
	        limit: 14, //每页默认显示的数量,
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
						field: 'bases',
						title: '数据库名',
						templet: function(value) {
							var Array=[];
							var str
							if(value.bases == null || value.bases == "{}" || value.bases == "" ){
								return ""
							}else{
								var obj = JSON.parse(value.bases)
								$.each(obj, function(i) {
//									console.log(i); //获取键值
//									console.log(obj[i]); //获取对应的value
									Array.push(i)
								});
							}
							str = Array.join(",")
							return str
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
					{
						field: 'remarks',
						title: '查看服务器',
						templet: function(value) {
							return '<button type="button" class="checkServer" lay-event="procs">查看服务器</button>'
						}
					},
				]
			],
			done: function (res, curr, count) {// 表格渲染完成之后的回调
	            var that = this.elem.next();
	            res.rows.forEach(function (item, index) {
	                if (index%2===0) {
	                    var tr = that.find(".layui-table-box tbody tr[data-index='" + index + "']").css("background-color", "#363636");
	                } else{
	                    var tr = that.find(".layui-table-box tbody tr[data-index='" + index + "']").css("background-color", "#242424");
	                }
	            });
	        },
		});
	})
	function selectOptionClear(){
		document.getElementById("addSubordinate_area").options.length=0;
		$.post("../getArea.action", function (data) {
	        $.each(data.rows, function (index, item) {
	            $('#addSubordinate_area').append(new Option(item.areaName, item.areaId));
	        });
			$("#addSubordinate_area").prepend("<option value=''></option>");
			$("#addSubordinate_area").each(function() {
				$(this).find("option").eq(0).attr("selected", "selected")
			})
	        form.render('select')
	    });
	}
	$("#add").click(function() {
		layer.open({
			type: 1,
			area: ['500px', '650px'],
			title: "添加服务器",
			shadeClose: false,
			shade: 0,
			content: $('#add_area'),
			closeBtn:1,
			btn: ['确定','取消'],
			yes: function(index, layero) {
				var addSubordinate_area = $("#addSubordinate_area").val(); //所属大区
				var add_serverid = $("#add_serverid").val(); //服务器ID
				var add_servername = $("#add_servername").val(); //服务器名称
				var add_serverip = $("#add_serverip").val(); //服务器ip
				var add_serverport = $("#add_serverport").val(); //服务器端口
				var add_serverremarks = $("#add_serverremarks").val(); //备注
//				var whether_process = $("#whether_process").val()//是否开启进程
				var game_message = $("#game_message").val()//game
				var log_message = $("#log_message").val()//log
				var string = layui.formSelects.value('whether_process', 'val');
				console.log(string,'1')
				string=string.sort(function(a,b){
				return a-b;
				});
				console.log(string,'2')
				var whether_process= string.join(",")
				console.log(whether_process,'3')
				var regEn = /[`!@#$%^&*()_+<>?:"{},.\/;'[\]-]/im;
				var regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
				var regIp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/; //判断ip
				if(add_serverid == "" || add_serverid == null || add_serverid == undefined||$.trim(add_serverid) == '') {
					alert("服务器ID不能为空")
					return false;
				} else if(isNaN(add_serverid) || add_serverid.length > 11) {
					alert("服务器ID只能为不超过11位的数字")
					return false;
				} else if(add_servername == "" || add_servername == null || add_servername == undefined||$.trim(add_servername) == '') {
					alert("服务器名称不能为空")
					return false;
				} else if(regEn.test(add_servername) || regCn.test(add_servername)) {
					alert("服务器名称不能包含特殊字符")
					return false;
				} else if(addSubordinate_area == '' || addSubordinate_area == null || addSubordinate_area == undefined) {
					alert("所属大区不能为空")
					return false;
				} else if(add_serverip == "" || add_serverip == null || add_serverip == undefined||$.trim(add_serverip) == '') {
					alert("服务器IP不能为空")
					return false;
				} else if(regIp.test(add_serverip) == false) {
					alert("服务器IP格式不正确")
					return false;
				} else if(add_serverport == "" || add_serverport == null || add_serverport == undefined||$.trim(add_serverport) == '') {
					alert("服务器端口不能为空")
					return false;
				} else if(isNaN(add_serverport) || add_serverport.length > 6) {
					alert("服务器端口号只能为数字且不能超过6位")
					return false;
				} else if(add_serverremarks == "" || add_serverremarks == null || add_serverremarks == undefined||$.trim(add_serverremarks) == '') {
					alert("备注不能为空")
					return false;
				} else {
					
					if(gametext == "" ||logtext==""){
						bases="{"+gametext + logtext+"}"
					}
					else{
						bases="{"+gametext +","+ logtext+"}"
					}
					layer.close(index)
					$('.main').css('display','none')
					$('.loadTag').css('display','block')
					$.ajax({
						type: "get",
						url: "../saveServerList.action",
						async: true,
						data: {
							serverId: add_serverid,
							serverName: add_servername,
							pId: addSubordinate_area,
							serverIp: add_serverip,
							serverPort: add_serverport,
							remarks: add_serverremarks,
							processes: whether_process,
							bases:bases
						},
						success: function(json) {
							alert(json.message)
							$('.loadTag').css('display','none')
							$('.main').css('display','block')
							tableIns.reload()
							document.getElementById('add_serverid').value=""
							document.getElementById('add_servername').value=""
							document.getElementById('add_serverip').value=""
							document.getElementById('add_serverport').value=""
							document.getElementById('add_serverremarks').value=""
							document.getElementById('game_message').value=""
							document.getElementById('log_message').value=""
							selectOptionClear()
							layui.formSelects.value('whether_process', []);
							$("#dataserver").empty();
							$('#dataserver').append("<option value='game'>game</option><option value='log'>log</option> ");
						}
					});
				}
			},
			btn2:function(index, layero){
				document.getElementById('add_serverid').value=""
				document.getElementById('add_servername').value=""
				document.getElementById('add_serverip').value=""
				document.getElementById('add_serverport').value=""
				document.getElementById('add_serverremarks').value=""
				document.getElementById('game_message').value=""
				document.getElementById('log_message').value=""
				selectOptionClear()
				layui.formSelects.value('whether_process', []);
				$("#dataserver").empty();
				$('#dataserver').append("<option value='game'>game</option><option value='log'>log</option> ");
				layer.close(index)
			}
		})
	})
	var serve;
	var modify_serverip;
	var id
	table.on('tool(test)', function(obj) {
		//获取点击的某一行数据
		var data = obj.data;
		serve = data.serverId;
		var layEvent = obj.event;
		var modify_serverid = data.serverId;
		var modify_servername = data.serverName;
		var modifySubordinate_area = data.pId;
			modify_serverip = data.serverIp;
		var modify_serverport = data.serverPort;
		var modify_serverremarks = data.remarks;
		var bases = data.bases;
			id = data.id;
		//点击服务器查看对应进程
		if(layEvent === 'procs') {
			$(".process").css("display", "block")
			$(".inner").css("display", "none")
			$("#server_proce").text(modify_servername+" 进程列表")
			var tableIng = table.render({
				elem: '#datatable_two',
				url: '../getProcessByServerId.action',
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
					id: id
				},
				cols: [
					[
						{
							field: 'serverIp',
							title: 'IP',
						},
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
//						{
//							field: 'processNum',
//							title: '数量'
//						},
						{
							field: 'city',
							title: '操作',
							templet: function(value) {
								return "<span class='close' lay-event='edits'>编辑</span>" + "<span class='close' lay-event='delet'>删除</span>"
							}
						}
					]
				],
				done: function (res, curr, count) {// 表格渲染完成之后的回调
		            var that = this.elem.next();
		            res.rows.forEach(function (item, index) {
		                if (index%2===0) {
		                    var tr = that.find(".layui-table-box tbody tr[data-index='" + index + "']").css("background-color", "#363636");
		                } else{
		                    var tr = that.find(".layui-table-box tbody tr[data-index='" + index + "']").css("background-color", "#242424");
		                }
		            });
		        },
				
			});
			//进程列表操作
			
			//点击添加进程
			$("#add_process").click(function() {
				$("#add_proceType").find("option[value='']").prop("selected",true);
				form.render();
				$("#add_procename").val("")
				$("#add_remakers").val("")
				layer.open({
					type: 1,
					area: ['500px', '343px'],
					title: "添加进程",
					shadeClose: false,
					shade: 0,
					content: $('#add_proce'),
					closeBtn: 1,
					btn: ['确定','取消'],
					yes: function(index, layero) {
						layer.close(index);
						var add_proceType = $("#add_proceType").val(); //类型
						var add_procename = $("#add_procename").val(); //名称
						var add_remakers = $("#add_remakers").val(); //备注
						var add_ip = $("#add_ip").val();//IP
//						var add_num = $("#add_num").val(); //进程个数
						var regEn = /[`!@#$%^&*()_+<>?:"{},.\/;'[\]-]/im;
						var regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
						if(add_proceType == "" || add_proceType == null || add_proceType == undefined) {
							alert("类型不能为空");
							return false;
						} else if(add_procename == "" || add_procename == null || add_procename == undefined||$.trim(add_procename) == '') {
							alert("名称不能为空");
							return false;
						} else if(regEn.test(add_procename) || regCn.test(add_procename)) {
							alert("名称不能包含特殊字符");
							return false;
						} else if(add_remakers == "" || add_remakers == null | add_remakers == undefined||$.trim(add_remakers) == '') {
							alert("备注不能为空");
							return false;
						} else if(add_ip == "" || add_ip == null | add_ip == undefined||$.trim(add_ip) == '') {
							alert("IP不能为空");
							return false;
						} 
						
//						else if(add_num == "" || add_num == null | add_num == undefined) {
//							alert("进程数量不能为空");
//							return false;
//						} 
						else {
							$('.main').css('display','none')
							$('.loadTagTwo').css('display','block')
							$.ajax({
								type: "get",
								url: "../saveProcess.action",
								async: true,
								data: {
									serverId: serve,
									serverIp: add_ip,
									remarks: add_remakers,
									processType: add_proceType,
									processName: add_procename,
//									processNum:add_num,
									pId:id
								},
								success: function(e) {
									alert(e.message);
									$('.loadTagTwo').css('display','none')
									$('.main').css('display','block')
									
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
				var id = data.id;
				var serverid = data.serverId;
				var procetype = data.processType;
				var procename = data.processName;
				var proceremakers = data.remarks;
				var proceserverip = data.serverIp;
				if(layEvent === "edits") {
					$("#modify_proceType").val(procetype);
					$("#modify_procename").val(procename);
					$("#modify_remakers").val(proceremakers);
					$("#modify_ip").val(proceserverip);
					layer.open({
						type: 1,
						area: ['500px', '350px'],
						title: "修改进程",
						shadeClose: false,
						shade: 0,
						content: $('#modify_proce'),
						closeBtn: 1,
						btn: ['确定','取消'],
						yes: function(index, layero) {
							layer.close(index);
							var modify_proceType = $("#modify_proceType").val(); //类型
							var modify_procename = $("#modify_procename").val(); //名称
							var modify_remakers = $("#modify_remakers").val(); //备注
							var modify_ip = $("#modify_ip").val();//IP
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
							} else if(modify_ip == "" || modify_ip == null | modify_ip == undefined) {
								alert("备注不能为空");
								return false;
							}else{
								$('.main').css('display','none')
								$('.loadTagTwo').css('display','block')
								$.ajax({
									type: "get",
									url: "../updateProcess.action",
									async: true,
									data: {
										id: id,
										serverId: serverid,
										remarks: modify_remakers,
										processType: modify_proceType,
										processName: modify_procename,
										serverIp: modify_ip 
									},
									success: function(e) {
										alert(e.message);
										$('.loadTagTwo').css('display','none')
										$('.main').css('display','block')
										tableIng.reload();
									}
								});
							}
								
						}
					})
				} else if(layEvent === "delet") {
					layer.open({
						type: 1,
						area: ['300px', '150px'],
						title: "删除",
						shadeClose: false,
						shade: 0,
						content: $('#deleteTop'),
						closeBtn: 1,
						btn: ['确定','取消'],
						yes: function(index, layero) {
							layer.close(index)
							$('.main').css('display','none')
							$('.loadTagTwo').css('display','block')
							var id = data.id
							$.ajax({
								type: "get",
								url: "../deleteProcess.action",
								async: true,
								data: {
									id: id,
									processType:procetype,
									processName:procename,
									serverIp:modify_serverip
								},
								success: function(e) {
									alert(e.message)
										$('.loadTagTwo').css('display','none')
									$('.main').css('display','block')
									tableIng.reload()
								}
							})
						}
					})
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
			var modifySubordi_area = 'dd[lay-value='+ modifySubordinate_area +']';
			$("#modifySubordinate_area").siblings("div.layui-form-select").find('dl').find(modifySubordi_area).click();
			console.log(bases)
			if(bases == {} ||bases==""){
				$("#game_modify").val("")
				$("#log_modify").val("")
				$("#modifyServer").siblings("div.layui-form-select").find('dl').find('game').click();
			}else{
				var mess_base = JSON.parse(bases)
				console.log(mess_base)
				console.log(JSON.stringify(mess_base.game))
				$("#game_modify").val(JSON.stringify(mess_base.game))
				$("#log_modify").val(JSON.stringify(mess_base.log))
//				if(JSON.stringify(mess_base.game) == undefined || JSON.stringify(mess_base.game) == ""){
//					var log = 'dd[lay-value="log"]';
////					$("#modifyServer").siblings("div.layui-form-select").find('dl').find(log).click().off('click');
//				}
//				else{
//					var game = 'dd[lay-value="game"]';
////					$("#modifyServer").siblings("div.layui-form-select").find('dl').find(game).click();
//				}
			}
			layer.open({
				type: 1,
				area: ['500px', '600px'],
				title: "修改服务器",
				shadeClose: false,
				shade: 0,
				content: $('#modify_area'),
				closeBtn: 1,
				btn: ['确定','取消'],
				yes: function(index, layero) {
					layer.close(index)
					var id = data.id
					var modifySubordinate_area = $("#modifySubordinate_area").val(); //所属大区
					var modify_serverid = $("#modify_serverid").val(); //服务器ID
					var modify_servername = $("#modify_servername").val(); //服务器名称
					var modify_serverip = $("#modify_serverip").val(); //服务器ip
					var modify_serverport = $("#modify_serverport").val(); //服务器端口
					var modify_serverremarks = $("#modify_serverremarks").val(); //备注
					var regEn = /[`!@#$%^&*()_+<>?:"{},.\/;'[\]-]/im;
					var regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
					var regIp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/; //判断ip
					if(modify_serverid == "" || modify_serverid == null || modify_serverid == undefined||$.trim(modify_serverid) == '') {
						alert("服务器ID不能为空")
						return false;
					} else if(isNaN(modify_serverid) || modify_serverid.length > 11) {
						alert("服务器ID只能为不超过11位的数字")
						return false;
					} else if(modify_servername == "" || modify_servername == null || modify_servername == undefined||$.trim(modify_servername) == '') {
						alert("服务器名称不能为空")
						return false;
					} else if(regEn.test(modify_servername) || regCn.test(modify_servername)) {
						alert("服务器名称不能包含特殊字符")
						return false;
					} else if(modifySubordinate_area == '' || modifySubordinate_area == null || modifySubordinate_area == undefined) {
						alert("所属大区不能为空")
						return false;
					} else if(modify_serverip == "" || modify_serverip == null || modify_serverip == undefined||$.trim(modify_serverip) == '') {
						alert("服务器IP不能为空")
						return false;
					} else if(regIp.test(modify_serverip) == false) {
						alert("服务器IP格式不正确")
						return false;
					} else if(modify_serverport == "" || modify_serverport == null || modify_serverport == undefined||$.trim(modify_serverport) == '') {
						alert("服务器端口不能为空")
						return false;
					} else if(isNaN(modify_serverport) || modify_serverport.length > 6) {
						alert("服务器端口号只能为数字且不能超过6位")
						return false;
					} else if(modify_serverremarks == "" || modify_serverremarks == null || modify_serverremarks == undefined||$.trim(modify_serverremarks) == '') {
						alert("备注不能为空")
						return false;
					} else {
						var gamemess =  $("#game_modify").val();
						var logmess = $("#log_modify").val();
						if(gamemess == "" && logmess==""){
							bases =""
						}else if(gamemess != "" && logmess !=""){
//							bases="{"+gamemodify +","+ logmodify+"}"
							bases="{"+ '"'+"game"+'"'+":"+ gamemess +","+ '"'+"log"+'"'+":"+ logmess +"}"
						}
						else if(gamemess == ""){
//							bases="{"+gamemodify + logmodify+"}"
							bases = "{"+ '"'+"log"+'"'+":"+ logmess +"}"
						}else {
							bases = "{"+ '"'+"game"+'"'+":"+ gamemess +"}"
						}
						$('.main').css('display','none')
						$('.loadTag').css('display','block')
						$.ajax({
							type: "get",
							url: "../updateServerList.action",
							async: true,
							data: {
								id: id,
								serverId: modify_serverid,
								serverName: modify_servername,
								pId: modifySubordinate_area,
								serverIp: modify_serverip,
								serverPort: modify_serverport,
								remarks: modify_serverremarks,
								bases:bases //数据库
							},
							success: function(json) {
								alert(json.message)
								$('.loadTag').css('display','none')
								$('.main').css('display','block')
								tableIns.reload()
							}
						});

					}
				},
				btn2: function(index, layero) {
					layer.close(index)
					}
			})
		} else if(layEvent === 'del') {
			//如果点击删除触发的事件
			layer.open({
				type: 1,
				area: ['300px', '150px'],
				title: "删除",
				shadeClose: false,
				shade: 0,
				content: $('#deleteNext'),
				closeBtn: 1,
				btn: ['确定','取消'],
				yes: function(index, layero) {
					layer.close(index);
					$('.main').css('display','none')
					$('.loadTag').css('display','block')
					var id = data.id
					$.ajax({
						type: "get",
						url: "../deleteServerList.action",
						async: true,
						data: {
							id: id,
							serverId:modify_serverid,
							serverName:modify_servername,
							serverIp:modify_serverip
						},
						success: function(e) {
							alert(e.message)
							$('.loadTag').css('display','none')
									$('.main').css('display','block')
							tableIns.reload()
						}
					})
				}
			})
		}
	})
	form.on('select(selectServer)', function (data) {
		var message=$("select[name=dataserver]").val();
		if(message == "game"){
			$("#data_user").val("");
			$("#data_pwd").val("");
			$("#data_IP").val("");
			$("#data_port").val("");
			$("#data_name").val("");
		layer.open({
			type: 1,
			area: ['500px', '400px'],
			title: "选择game数据库",
			shadeClose: false,
			shade: 0,
			content: $('#data_proce'),
			closeBtn: 1,
			btn: ['确定','取消'],
			yes: function(index, layero) {
				var data_user = $("#data_user").val();
				var data_pwd = $("#data_pwd").val();
				var data_IP = $("#data_IP").val();
				var data_port = $("#data_port").val();
				var data_name = $("#data_name").val();
				layer.close(index)
				gametext = '"'+message+'"'+":"+"{"+'"'+"user"+'"'+":"+'"'+data_user+'"'+","+'"'+"pass"+'"'+":"+'"'+data_pwd+'"'+","+'"'+"ip"+'"'+":"+'"'+data_IP+'"'+","+'"'+"port"+'"'+":"+'"'+data_port+'"'+","+'"'+"name"+'"'+":"+'"'+data_name+'"'+"}"
//				console.log(gametext)
//				$("#game_message").val("user"+":"+data_user+","+"pass"+":"+data_pwd+","+"ip"+":"+data_IP+","+"port"+":"+data_port)
				$("#game_message").val("{"+'"'+"user"+'"'+":"+'"'+data_user+'"'+","+'"'+"pass"+'"'+":"+'"'+data_pwd+'"'+","+'"'+"ip"+'"'+":"+'"'+data_IP+'"'+","+'"'+"port"+'"'+":"+'"'+data_port+'"'+","+'"'+"name"+'"'+":"+'"'+data_name+'"'+"}")
				if(data_user == "" && data_pwd == ""&&data_IP==""&&data_port==""&&data_name==""){
					$("#game_message").val("")
				}
			}
		})
		}
		else{
			$("#data_user").val("");
			$("#data_pwd").val("");
			$("#data_IP").val("");
			$("#data_port").val("");
			$("#data_name").val("");
			layer.open({
				type: 1,
				area: ['500px', '400px'],
				title: "选择log数据库",
				shadeClose: false,
				shade: 0,
				content: $('#data_proce'),
				closeBtn: 1,
				btn: ['确定','取消'],
				yes: function(index, layero) {
					var data_user = $("#data_user").val();
					var data_pwd = $("#data_pwd").val();
					var data_IP = $("#data_IP").val();
					var data_port = $("#data_port").val();
					var data_name = $("#data_name").val();
					layer.close(index)
					logtext = '"'+message+'"'+":"+"{"+'"'+"user"+'"'+":"+'"'+data_user+'"'+","+'"'+"pass"+'"'+":"+'"'+data_pwd+'"'+","+'"'+"ip"+'"'+":"+'"'+data_IP+'"'+","+'"'+"port"+'"'+":"+'"'+data_port+'"'+","+'"'+"name"+'"'+":"+'"'+data_name+'"'+"}"
					console.log(logtext)
//					$("#log_message").val("user"+":"+data_user+","+"pass"+":"+data_pwd+","+"ip"+":"+data_IP+","+"port"+":"+data_port)
					$("#log_message").val("{"+'"'+"user"+'"'+":"+'"'+data_user+'"'+","+'"'+"pass"+'"'+":"+'"'+data_pwd+'"'+","+'"'+"ip"+'"'+":"+'"'+data_IP+'"'+","+'"'+"port"+'"'+":"+'"'+data_port+'"'+","+'"'+"name"+'"'+":"+'"'+data_name+'"'+"}")
					if(data_user == "" && data_pwd == ""&&data_IP==""&&data_port==""&&data_name==""){
						$("#log_message").val("")
					}
				}
			})
		}
 	});
	form.on('select(modifyServer)', function (data) {
		var message=$("select[name=modifyServer]").val();
		if(message == "game"){
//			console.log($("#game_modify").val())
			var game_mes = $("#game_modify").val()
			if(game_mes != ""){
				game_mes = JSON.parse(game_mes)
				$("#data_user").val(game_mes.user);
				$("#data_pwd").val(game_mes.pass);
				$("#data_IP").val(game_mes.ip);
				$("#data_port").val(game_mes.port);
				$("#data_name").val(game_mes.name);
			}else{
				$("#data_user").val("");
				$("#data_pwd").val("");
				$("#data_IP").val("");
				$("#data_port").val("");
				$("#data_name").val("");
			}
		layer.open({
			type: 1,
			area: ['500px', '400px'],
			title: "选择game数据库",
			shadeClose: false,
			shade: 0,
			content: $('#data_proce'),
			closeBtn: 1,
			btn: ['确定','取消'],
			yes: function(index, layero) {
				var data_user = $("#data_user").val();
				var data_pwd = $("#data_pwd").val();
				var data_IP = $("#data_IP").val();
				var data_port = $("#data_port").val();
				var data_name = $("#data_name").val();
				layer.close(index)
				gamemodify = '"'+message+'"'+":"+"{"+'"'+"user"+'"'+":"+'"'+data_user+'"'+","+'"'+"pass"+'"'+":"+'"'+data_pwd+'"'+","+'"'+"ip"+'"'+":"+'"'+data_IP+'"'+","+'"'+"port"+'"'+":"+'"'+data_port+'"'+","+'"'+"name"+'"'+":"+'"'+data_name+'"'+"}"
				$("#game_modify").val("{"+'"'+"user"+'"'+":"+'"'+data_user+'"'+","+'"'+"pass"+'"'+":"+'"'+data_pwd+'"'+","+'"'+"ip"+'"'+":"+'"'+data_IP+'"'+","+'"'+"port"+'"'+":"+'"'+data_port+'"'+","+'"'+"name"+'"'+":"+'"'+data_name+'"'+"}")
				if(data_user == "" && data_pwd == ""&&data_IP==""&&data_port==""&&data_name==""){
					$("#game_modify").val("")
				}
			}
		})
		}
		else{
//			console.log($("#log_modify").val())
			var log_mes = $("#log_modify").val()
			if(log_mes !=""){
				log_mes = JSON.parse(log_mes)
				$("#data_user").val(log_mes.user);
				$("#data_pwd").val(log_mes.pass);
				$("#data_IP").val(log_mes.ip);
				$("#data_port").val(log_mes.port);
				$("#data_name").val(log_mes.name);
			}else{
				$("#data_user").val("");
				$("#data_pwd").val("");
				$("#data_IP").val("");
				$("#data_port").val("");
				$("#data_name").val("");
			}
			
			layer.open({
				type: 1,
				area: ['500px', '400px'],
				title: "选择log数据库",
				shadeClose: false,
				shade: 0,
				content: $('#data_proce'),
				closeBtn: 1,
				btn: ['确定','取消'],
				yes: function(index, layero) {
					var data_user = $("#data_user").val();
					var data_pwd = $("#data_pwd").val();
					var data_IP = $("#data_IP").val();
					var data_port = $("#data_port").val();
					var data_name = $("#data_name").val();
					layer.close(index)
					logmodify = '"'+message+'"'+":"+"{"+'"'+"user"+'"'+":"+'"'+data_user+'"'+","+'"'+"pass"+'"'+":"+'"'+data_pwd+'"'+","+'"'+"ip"+'"'+":"+'"'+data_IP+'"'+","+'"'+"port"+'"'+":"+'"'+data_port+'"'+","+'"'+"name"+'"'+":"+'"'+data_name+'"'+"}"
					$("#log_modify").val("{"+'"'+"user"+'"'+":"+'"'+data_user+'"'+","+'"'+"pass"+'"'+":"+'"'+data_pwd+'"'+","+'"'+"ip"+'"'+":"+'"'+data_IP+'"'+","+'"'+"port"+'"'+":"+'"'+data_port+'"'+","+'"'+"name"+'"'+":"+'"'+data_name+'"'+"}")
					if(data_user == "" && data_pwd == ""&&data_IP==""&&data_port==""&&data_name==""){
						$("#log_modify").val("")
					}
				}
			})
		}
 	});
});

