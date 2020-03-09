var winPos
$(document).ready(function() {
	$(".layui-body").scroll(function() {
		winPos = $(".layui-body").scrollTop()
	})
})
var flag=false
layui.use(['element', 'table', 'tableFilter', 'layer', 'form'], function() {
	var element = layui.element;
	var table = layui.table;
	var tableFilter = layui.tableFilter;
	var layer = layui.layer;
	var form = layui.form;
	Subordinate_area()

	function Subordinate_area() {
		$.post("../getArea.action", function(data) {
			$.each(data.rows, function(index, item) {
				$('#modifySubordinate_area').append(new Option(item.areaName, item.areaId));
			});
			$("#modifySubordinate_area").prepend("<option value=''></option>");
			$("#modifySubordinate_area").each(function() {
				$(this).find("option").eq(0).attr("selected", "selected")
			})
			form.render('select')
		});
	}
	element.init();
	var tableIns = table.render({
		elem: '#datatable',
		url: '../getServerListNoPage.action',
		loading: false,
		toolbar: '#toobar',
		page: false,
		response: {
			statusName: 'state',
			msgName: 'message',
			statusCode: true,
			countName: 'total',
			dataName: 'rows'
		},
		cols: [
			[{
					field: 'id',
					title: 'id',
				},
				{
					field: 'serverId',
					type: 'checkbox',

				},
//				{
//					field: 'serverIp',
//					title: '服务器IP',
//					width:240,
//					event: 'collapse',
//					templet: function(d) {
//						return '<div style="cursor:pointer;color:#ffffff;font-size:14px">' + d.serverIp + '<br /><span class="ip_server" style="font-size:14px">IP服务器名称状态</span><i style="left: 0px;top:2px;position:relative;color:#298af3" lay-tips="展开" class="layui-icon layui-colla-icon layui-icon-right"></i></div>'
//					}
//				},
				{
					field: 'serverId',
					title: '服务器ID',
					event: 'collapse',
					templet: function(d) {
						return '<div style="cursor:pointer;color:#ffffff;font-size:14px">' + d.serverId + '<br /><span class="ip_server" style="font-size:14px">IP服务器名称状态</span><i style="left: 0px;top:2px;position:relative;color:#298af3" lay-tips="展开" class="layui-icon layui-colla-icon layui-icon-right"></i></div>'
					}
				},
				{
					field: 'serverName',
					title: '服务器名称',
				},
				{
					field: 'pId',
					title: '所属区服'
				},
				{
					field: 'bases',
					title: '数据库名',
					width:300,
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
								if(i == "game"){
									$("#game_modify").val(JSON.stringify(obj[i]))
								}else{
									$("#log_modify").val(JSON.stringify(obj[i]))
								}
							});
						}
						str = Array.join(",")
						return str
					}
				},
				{
					field: '',
					title: '预警',
					templet: function(d) {
						console.log(d)
						//return "<div style='color: #D81F1F; cursor: pointer;'><span lay-event='check' style='"+(d.isOpen==0?'':'color:#31c972')+"' >"+ (d.isOpen==0?'关闭':'开启') +"</span></div>"
						// d.isMonitoring==0?'关闭':'开启'+"
						return ''
					}
				},
				{
					field: '',
					title: '操作',
					width:240,
					templet: function(d) {
						return "<span lay-event='starts' class='starts'>启动</span>&nbsp;&nbsp;" + "&nbsp;&nbsp;<span lay-event='closes' class='closes'>关闭</span>" + "&nbsp;&nbsp;<span class='close' lay-event='edits'>编辑</span>" + "&nbsp;&nbsp;<span class='close' lay-event='delet'>删除</span>"
					}
				},
				{
					field: 'type',
					title: '状态',
					templet: function(value) {
						if(value.type == 0) {
							return "<p style='background:#c8823c;width:48%;height:25px;color:white;margin:0 auto;line-height:25px;cursor: pointer;font-size:12px' class='rec' >网络断开</p>"
						}
						if(value.type == 2) {
							return "<p style='background:#cb3234;width:48%;height:25px;color:white;margin:0 auto;line-height:25px;cursor: pointer;font-size:12px' class='rec'>进程异常</p>"
						}
						if(value.type == 5) {
							return "<p style='background:#4132c9;width:48%;height:25px;color:white;margin:0 auto;line-height:25px;cursor: pointer;font-size:12px' class='rec'>正常关闭</p>"
						}
						if(value.type == 6) {
							return "<p style='background:#31c972;width:48%;height:25px;color:white;margin:0 auto;line-height:25px;cursor: pointer;font-size:12px' class='rec'>正常运行</p>"
						}
					}
				},
			]
		],
		done: function (res, curr, count) {// 表格渲染完成之后的回调
			$("[data-field='id']").css('display', 'none');
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

	//ID搜索服务器
	$("#search").click(function() {
		var searchid = $("#search_id").val();
		var searchip = $("#search_ip").val();
		var regIp = /^(?:(?:1[0-9][0-9]\.)|(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:1[0-9][0-9])|(?:2[0-4][0-9])|(?:25[0-5])|(?:[1-9][0-9])|(?:[0-9]))+$/; //判断ip
		if(isNaN(searchid) || searchid.length > 11) {
			alert("服务器ID格式不正确");
			return false;
		} else {
			var ip;
			if(searchip == "") {
				ip == searchip
			} else {
				ip = "'" + searchip + "'"
			}
			var tableIns = table.render({
				elem: '#datatable',
				toolbar: '#toobar',
				url: '../getServerListNoPage.action',
				loading: true,
				page: false,
				where: {
					serverId: searchid,
					serverIp: ip
				},
				response: {
					statusName: 'state',
					msgName: 'message',
					statusCode: true,
					countName: 'total',
					dataName: 'rows'
				},
				cols: [
					[{
							field: 'id',
							title: 'id',
						},
						{
							type: 'checkbox'
						},
//						{
//							field: 'serverIp',
//							title: '服务器IP',
//							width:240,
//							event: 'collapse',
//							templet: function(d) {
//								return '<div style="cursor:pointer;color:#ffffff;font-size:14px">' + d.serverIp + '<br /><span class="ip_server" style="font-size:14px">IP服务器名称状态</span><i style="left: 0px;top:2px;position:relative;color:#298af3" lay-tips="展开" class="layui-icon layui-colla-icon layui-icon-right"></i></div>'
//							}
//						},
						{
							field: 'serverId',
							title: '服务器ID',
							event: 'collapse',
							templet: function(d) {
								return '<div style="cursor:pointer;color:#ffffff;font-size:14px">' + d.serverId + '<br /><span class="ip_server" style="font-size:14px">IP服务器名称状态</span><i style="left: 0px;top:2px;position:relative;color:#298af3" lay-tips="展开" class="layui-icon layui-colla-icon layui-icon-right"></i></div>'
							}
						},
						{
							field: 'serverName',
							title: '服务器名称',
						},
						{
							field: 'pId',
							title: '所属区服'
						},
						{
							field: 'bases',
							title: '数据库名',
							width:300,
							templet: function(value) {
								var Array=[];
								var str
								if(value.bases == null || value.bases == "{}" || value.bases == "" ){
									return ""
								}else{
									var obj = JSON.parse(value.bases)
									$.each(obj, function(i) {
//										console.log(i); //获取键值
//										console.log(obj[i]); //获取对应的value
										Array.push(i)
									});
								}
								str = Array.join(",")
								return str
							}
						},
						{
							field: '',
							title: '预警',
							templet: function(d) {
								console.log(d)
								//return "<div style='color: #D81F1F; cursor: pointer;'><span lay-event='check' style='"+(d.isOpen==0?'':'color:#31c972')+"' >"+ (d.isOpen==0?'关闭':'开启') +"</span></div>"
								return ''
							}
						},
						{
							field: '',
							title: '操作',
							width:240,
							templet: function(d) {
								return "<span lay-event='starts' class='starts'>启动</span>&nbsp;&nbsp;" + "&nbsp;&nbsp;<span lay-event='closes' class='closes'>关闭</span>" + "&nbsp;&nbsp;<span class='close' lay-event='edits'>编辑</span>" + "&nbsp;&nbsp;<span class='close' lay-event='delet'>删除</span>"
							}
						},
						{
							field: 'type',
							title: '状态',
							templet: function(value) {
								if(value.type == 0) {
									return "<p style='background:#c8823c;width:48%;height:25px;color:white;margin:0 auto;line-height:25px;cursor: pointer;font-size:12px' class='rec'>网络断开</p>"
								}
								if(value.type == 2) {
									return "<p style='background:#cb3234;width:48%;height:25px;color:white;margin:0 auto;line-height:25px;cursor: pointer;font-size:12px' class='rec'>进程异常</p>"
								}
								if(value.type == 5) {
									return "<p style='background:#4132c9;width:48%;height:25px;color:white;margin:0 auto;line-height:25px;cursor: pointer;font-size:12px' class='rec'>正常关闭</p>"
								}
								if(value.type == 6) {
									return "<p style='background:#31c972;width:48%;height:25px;color:white;margin:0 auto;line-height:25px;cursor: pointer;font-size:12px' class='rec'>正常运行</p>"
								}
							}
						},
					]
				],
				done: function (res, curr, count) {// 表格渲染完成之后的回调
					$("[data-field='id']").css('display', 'none');
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
		}
	})

	//区服筛选
	tableFilter.render({
		'elem': '#datatable', //table的选择器
		'mode': 'local', //过滤模式
		'filters': [{
			field: 'pId',
			type: 'checkbox',
		}],
		'done': function(filters) {
			//结果回调
		}
	});
	//服务器对应进程查询
	var setid;
	var sta;
	var timeout;
	var serverip;
	var tableType;
	var tableServerId;
	var trObjParentId
	var twoId
	var serverId
	var processType
	table.on('row(datatable)', function(obj){
		
		flag=!flag
//		  console.log(obj.data) //得到当前行数据
		  
		  //obj.del(); //删除当前行
		  //obj.update(fields) //修改当前行数据
		oneId = obj.data.id;
		oneServerId = obj.data.serverId;
		console.log(oneId)
		});
	table.on('row(process_test)', function(obj){
		flag=!flag
		console.log(obj.data) //得到当前行数据
		twoId = obj.data.pId;
		serverId = obj.data.serverId;
		processType = obj.data.processType;
		
		  //obj.del(); //删除当前行
		  //obj.update(fields) //修改当前行数据
		});
	table.on('tool(datatable)', function(obj) {
		var data = obj.data;
		var severid = data.serverId;
		setid = data.id;
		tableServerId = data.serverId;
		var serverport = data.serverPort;
		var modify_serverid = data.serverId;
		var modify_servername = data.serverName;
		var modifySubordinate_area = data.pId;
		modify_serverip = data.serverIp;
		var modify_serverport = data.serverPort;
		var modify_serverremarks = data.remarks;
		
//		setid = data.vId;
//		toring= data.isOpen;
//		var modify_serverid = data.name;
//		var modify_servername = data.mobile;
//		if(obj.event==='check'){
//			if(obj.data.isOpen===0){
//
//			}else if(obj.data.isOpen===1){
//			}
//			if($(this).text()==='关闭'){
//				$.ajax({
//					type: "get",
//					url: "../updateLinkman",
//					async: true,
//					data: {
//						vId: setid,
//						isOpen:1,
//					},
//					success: function(json) {
//						$('.loadTag').css('display','none')
//						$('.main').css('display','block')
//						// alert(json.message)
//						//						tableIns.reload()
//						if(json.state===true){
//							$(this).html("开启");
//							tableIns.reload()
//						}else{
//
//						}
//					}
//				})
//			}else{
//				$('.main').css('display','none')
//				$('.loadTag').css('display','block')
//				$.ajax({
//					type: "get",
//					url: "../updateLinkman",
//					async: true,
//					data: {
//						vId: setid,
//						isOpen:0
//					},
//					success: function(json) {
//						$('.loadTag').css('display','none')
//						$('.main').css('display','block')
//						if(json.state==true){
//							$(this).html("关闭");
//							tableIns.reload()
//						}else{
//
//						}
//					}
//				})
//			}
//			// form.render()
//		}
		if(obj.event === 'collapse') {
			serverip = data.serverIp;
			var trObj = layui.$(this).parent('tr'); //当前行
			timeout = trObj[0].cells[0].innerText;
			var accordion = true; //开启手风琴，那么在进行折叠操作时，始终只会展现当前展开的表格。
			var content = '<table id="excaple" lay-filter="process_test"></table>'; //内容
			var t = window.setInterval(pro_reload, 1000)
			//表格行折叠方法
			collapseTable({
				elem: trObj,
				accordion: accordion,
				content: content,
				success: function(trObjChildren, index) { //成功回调函数
					//trObjChildren.find('table').attr("id", index);
					//var righttt=document.getElementById(index)
					 //var rightdiv = document.getElementById('showcontent')
			            //给2个div设置不同的属性
			            //2个div合并成包含关系
			          //  righttt.appendChild(rightdiv)
					
					//trObjChildren 展开tr层DOM
					//index 当前层索引
					trObjChildren.find('table').attr("id", index);
					
					var tableIng = table.render({
						elem: "#" + index,
//						url: '../getProcessByServerId.action',
						url: '../getProcess.action',
						where: {
							id: setid,
							serverId: tableServerId
						},
						response: {
							statusName: 'state',
							msgName: 'message',
							statusCode: true,
							countName: 'total',
							dataName: 'rows'
						},
						cols: [
							[
								{
									field: 'pId',
									title: 'pId',
								},{
								field: 'processType',
								title: '服务器类型',
								width:260,
								event: 'collapse2',
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
//									return "<span style='color:#999999'>"+type+"</span>";
									return '<div style="cursor:pointer;color:#ffffff;font-size:14px" >' + type + '<i style="left: 12px;top:0px;position:relative;color:#298af3" lay-tips="展开" class="layui-icon layui-colla-icon layui-icon-right"></i></div>'
									}
								},
								{
									field: 'processName',
									title: '名称',
									templet: function(d) {
										return "<span style='color:#999999'>"+d.processName+"</span>";
									}
								},
								{
									field: 'state',
									title: '状态',
									templet: function(d) {
										if(d.state == 1) {
											return "<span class='status' >已开启</span>"
										}
										if(d.state == 0) {
											return "<span class='status' >已关闭</span>"
										}
										if(d.state == 2) {
											return "<span class='status' >正在启动</span>"
										}
										if(d.state == 3) {
											return "<span class='status' >正在关闭</span>"
										}
										if(d.state == 4) {
											return "<span class='status' >异常</span>"
										}

									}
								},
//								{
//									field: 'processNum',
//									title: '数量'
//								},
								{
									field: 'city',
									title: '操作',
									templet: function(d) {
										return "<span lay-event='pro_starts' class='starts' >启动</span>&nbsp;&nbsp;" + "&nbsp;&nbsp;<span lay-event='pro_closes' class='closes' >关闭</span>"
									}
								},
							]
						],
						done: function(e) {
							$("[data-field='pId']").css('display', 'none');
							sta = $(".layui-table-click").next().children().children().children().find('.status');
//							var x = $(".layui-table-click").next().children().children().children().find('.status');
//							console.log(x)
						}
					});
				}
			});

		} else if(obj.event === 'collapse2') {
			console.log(trObjParentId)
			serverip = data.serverIp;
			setid = data.id;
			var tablePId = data.pId;
//			var tableType=data.processType;
			var trObj = layui.$(this).parent('tr'); //当前行
//			var trObjParent = $(".layui-table-click")[0].children[0]; //当前行的父亲
//			var trObjParent = trObj.parents("table").parents("table")
//			var aaa = trObjParent.children().children()
//			trObjParentId = trObjParent.innerText;//当前行唯一ID
			timeout = trObj[0].cells[0].innerText;
			if(timeout == "Gate") {
				tableType = 1;
			}
			if(timeout == "WS") {
				tableType = 2;
			}
			if(timeout == "Fep") {
				tableType = 3;
			}
			if(timeout == "LS") {
				tableType = 4;
			}
			if(timeout == "CS") {
				tableType = 5;
			}
			if(timeout == "DP") {
				tableType = 6;
			}
			if(timeout == "Gmt") {
				tableType = 8;
			}
			if(timeout == "Billing") {
				tableType = 9;
			}
			var accordion = true; //开启手风琴，那么在进行折叠操作时，始终只会展现当前展开的表格。
			var content = '<table id="excaple" lay-filter="process_test2"></table>'; //内容
			var t = window.setInterval(pro_reload2, 1000)
			//表格行折叠方法
			collapseTable({
				elem: trObj,
				accordion: accordion,
				content: content,
				success: function(trObjChildren, index) { //成功回调函数
					//trObjChildren.find('table').attr("id", index);
					//var righttt=document.getElementById(index)
					 //var rightdiv = document.getElementById('showcontent')
			            //给2个div设置不同的属性
			            //2个div合并成包含关系
			          //  righttt.appendChild(rightdiv)
					
					//trObjChildren 展开tr层DOM
					//index 当前层索引
					trObjChildren.find('table').attr("id", index);
					var aaa = getCookieValue("trObjParentId")
					var tableIng = table.render({
						elem: "#" + index,
						url: '../getProcessByType.action',
						where: {
//							id: setid
							pId: twoId,
							processType: processType
						},
						response: {
							statusName: 'state',
							msgName: 'message',
							statusCode: true,
							countName: 'total',
							dataName: 'rows'
						},
						cols: [
							[{
								field: 'pId',
								title: 'pId',
							},
								{
								field: 'serverIp',
								title: '服务器IP',
								width:260,
								templet: function(d) {
									return "<span style='color:#298af3'>"+d.serverIp+"</span>";
								}
							},
								{
									field: 'processName',
									title: '名称',
									templet: function(d) {
										return "<span style='color:#999999'>"+d.processName+"</span>";
									} 
								},
								{
									field: 'state',
									title: '状态',
									templet: function(d) {
										if(d.state == 1) {
											return "<span class='status2' >已开启</span>"
										}
										if(d.state == 0) {
											return "<span class='status2' >已关闭</span>"
										}
										if(d.state == 2) {
											return "<span class='status2' >正在启动</span>"
										}
										if(d.state == 3) {
											return "<span class='status2' >正在关闭</span>"
										}
										if(d.state == 4) {
											return "<span class='status2' >异常</span>"
										}

									}
								},
//								{
//									field: 'processNum',
//									title: '数量'
//								},
								{
									field: 'city',
									title: '操作',
									templet: function(d) {
										return "<span lay-event='pro_starts2' class='starts2' >启动</span>&nbsp;&nbsp;" + "&nbsp;&nbsp;<span lay-event='pro_closes2' class='closes2' >关闭</span>"
									}
								},
							]
						],
						done: function(data) {
							$("[data-field='pId']").css('display', 'none');
							sta2 = $(".layui-table-click").next().children().children().children().find('.status2');
//							var x = $(".layui-table-click").next().children().children().children().find('.status');
//							console.log(x)
						}
					});
				}
			});

		}else if(obj.event === "starts") {
			layer.open({
				type: 1,
				area: ['300px', '150px'],
				title: "启动",
				shadeClose: false,
				shade: 0,
				content: $('#startTop'),
				closeBtn: 1,
				btn: ['确定','取消'],
				yes: function(index, layero) {
					layer.close(index)
					$('.main').css('display','none')
					$('.loadTag').css('display','block')
					$.ajax({
						type: "get",
						url: "../postSendStartServer.action",
						async: true,
						data: {
							serverId: severid,
							serverIp: serverip,
							serverPort: serverport,
							id: setid
							//					state: 1
						},
						success: function(json) {
							$('.loadTag').css('display','none')
							$('.main').css('display','block')
							layer.msg(json.message)
							//						tableIns.reload()
						}
				})
				}
			})
		} else if(obj.event === "closes") {
			layer.open({
				type: 1,
				area: ['300px', '150px'],
				title: "关闭",
				shadeClose: false,
				shade: 0,
				content: $('#closeTop'),
				closeBtn: 1,
				btn: ['确定','取消'],
				yes: function(index, layero) {
					layer.close(index)
					$('.main').css('display','none')
					$('.loadTag').css('display','block')
					$.ajax({
						type: "get",
						url: "../postSendCloseServer.action",
						async: true,
						data: {
							serverId: severid,
							serverIp: serverip,
							serverPort: serverport,
							id: setid
							//					state: 1
						},
						success: function(json) {
							$('.loadTag').css('display','none')
							$('.main').css('display','block')
//							alert(json.message)
							layer.msg(json.message)
							//						tableIns.reload()
						}
				})
				}
			})
		} else if(obj.event === 'edits') {
			$("#modify_serverid").val(modify_serverid); //服务器ID
			$("#modify_servername").val(modify_servername); //服务器名称
			$("#modifySubordinate_area").val(modifySubordinate_area); //服务器所属大区
			$("#modify_serverip").val(modify_serverip); //服务器ip
			$("#modify_serverport").val(modify_serverport); //服务器端口
			$("#modify_serverremarks").val(modify_serverremarks); //备注
			layer.open({
				type: 1,
				area: ['500px', '450px'],
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
						$('.main').css('display','none')
						$('.loadTag').css('display','block')
						$.ajax({
							type: "get",
							url: "../updateServerList.action",
							async: true,
							data: {
								id: setid,
								serverId: modify_serverid,
								serverName: modify_servername,
								pId: modifySubordinate_area,
								serverIp: modify_serverip,
								serverPort: modify_serverport,
								remarks: modify_serverremarks
							},
							success: function(json) {
								alert(json.message)
								$('.loadTag').css('display','none')
						$('.main').css('display','block')
								tableIns.reload()
								$(".layui-body").animate({scrollTop:winPos},100);
							}
						});

					}
				}
			})
		} else if(obj.event === 'delet') {
			//如果点击删除触发的事件
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
					layer.close(index);
					$('.main').css('display','none')
					$('.loadTag').css('display','block')
					var id = data.id
					$.ajax({
						type: "get",
						url: "../deleteServerList.action",
						async: true,
						data: {
							id: setid,
							serverId:severid,
							serverIp:serverip,
							serverName:modify_servername
						},
						success: function(e) {
							alert(e.message);
							$('.loadTag').css('display','none')
							$('.main').css('display','block')
							tableIns.reload();
							$(".layui-body").animate({scrollTop:winPos},100);
						}
					})
				}
			})
		}
	});
	//启动同一类型的服务器
	table.on('tool(process_test)', function(obj) {
		var type = obj.data.processType;
		var serverid = obj.data.serverId;
		var pId = obj.data.pId;
		/*var serverip = obj.data.serverIp;*/
		var $this = $(this);
		var aaa = getCookieValue("trObjParentId")
		if(obj.event === "pro_starts") {
			$.ajax({
				type: "get",
//				url: "../postSendStartProcess.action",
				url: "../postSendStartProcessByType.action",
				async: true,
				data: {
					processType: type,
					serverId: serverid,
//					serverIp: serverip
					pId: pId
				},
				success: function(json) {
					if(json.state == true) {
						alert("启动成功")
					} else {
						alert("启动失败")
					}
				}
			})
		} else if(obj.event === "pro_closes") {
			$.ajax({
				type: "get",
				url: "../postSendCloseProcessByType.action",
				async: true,
				data: {
					processType: type,
					serverId: serverid,
//					serverIp: serverip
					pId: pId
				},
				success: function(json) {
					if(json.state == true) {
						alert("关闭成功")
					} else {
						alert("关闭失败")
					}
				}
			})
		}
	})
	//启动单一服务器
	table.on('tool(process_test2)', function(obj) {
		var type = obj.data.processType;
		var serverid = obj.data.serverId;
		var serverip = obj.data.serverIp;
		var pId = obj.data.pId;
		var $this = $(this);
		var aaa = getCookieValue("trObjParentId")
		if(obj.event === "pro_starts2") {
			$.ajax({
				type: "get",
				url: "../postSendStartProcess.action",
				async: true,
				data: {
					processType: type,
					serverId: serverid,
					serverIp: serverip,
					pId: pId
				},
				success: function(json) {
					if(json.state == true) {
						alert("启动成功")
					} else {
						alert("启动失败")
					}
				}
			})
		} else if(obj.event === "pro_closes2") {
			$.ajax({
				type: "get",
				url: "../postSendCloseProcess.action",
				async: true,
				data: {
					processType: type,
					serverId: serverid,
					serverIp: serverip,
					pId: pId
				},
				success: function(json) {
					if(json.state == true) {
						alert("关闭成功")
					} else {
						alert("关闭失败")
					}
				}
			})
		}
	})
	function collapseTable(options) {
		var trObj = options.elem;
		if(!trObj) return;
		var accordion = options.accordion,
			success = options.success,
			content = options.content || '';
		var tableView = trObj.parents('.layui-table-view'); //当前表格视图
		var id = tableView.attr('lay-id'); //当前表格标识
		var index = trObj.data('index'); //当前行索引
		var leftTr = tableView.find('.layui-table-fixed.layui-table-fixed-l tr[data-index="' + index + '"]'); //左侧当前固定行
		var rightTr = tableView.find('.layui-table-fixed.layui-table-fixed-r tr[data-index="' + index + '"]'); //右侧当前固定行
		var colspan = trObj.find('td').length; //获取合并长度
		var trObjChildren = trObj.next(); //展开行Dom
		var indexChildren = id + '-' + index + '-children'; //展开行索引
		var leftTrChildren = tableView.find('.layui-table-fixed.layui-table-fixed-l tr[data-index="' + indexChildren + '"]'); //左侧展开固定行
		var rightTrChildren = tableView.find('.layui-table-fixed.layui-table-fixed-r tr[data-index="' + indexChildren + '"]'); //右侧展开固定行
		var lw = leftTr.width() + 15; //左宽
		var rw = rightTr.width() + 15; //右宽
	
		//不存在就创建展开行
		if(trObjChildren.data('index') != indexChildren) {
			//装载HTML元素
			var tr = '<tr data-index="' + indexChildren + '"><td colspan="' + colspan + '"><div style="height: auto;padding-left:' + lw + 'px;padding-right:' + rw + 'px;" class="layui-table-cell" id="childTable">' + content + '</div></td></tr>';
			trObjChildren = trObj.after(tr).next().hide(); //隐藏展开行
			var fixTr = '<tr data-index="' + indexChildren + '"></tr>'; //固定行
			leftTrChildren = leftTr.after(fixTr).next().hide(); //左固定
			rightTrChildren = rightTr.after(fixTr).next().hide(); //右固定
		}
		//展开|折叠箭头图标
		trObj.find('td[lay-event="collapse"] i.layui-colla-icon').toggleClass("layui-icon-right layui-icon-down");
		//显示|隐藏展开行
		trObjChildren.toggle();
		//开启手风琴折叠和折叠箭头
		if(accordion) {
			trObj.siblings().find('td[lay-event="collapse"] i.layui-colla-icon').removeClass("layui-icon-down").addClass("layui-icon-right");
			trObjChildren.siblings('[data-index$="-children"]').hide(); //展开
			rightTrChildren.siblings('[data-index$="-children"]').hide(); //左固定
			leftTrChildren.siblings('[data-index$="-children"]').hide(); //右固定
		}
		success(trObjChildren, indexChildren); //回调函数
		heightChildren = trObjChildren.height(); //展开高度固定
		rightTrChildren.height(heightChildren + 115).toggle(); //左固定
		leftTrChildren.height(heightChildren + 115).toggle(); //右固定
	}
	//批量启动服务器
	table.on('toolbar(datatable)', function(json) {
		var checkstatus = table.checkStatus(json.config.id)
		var arr = [];
		if(json.event == "start") {
			layer.open({
				type: 1,
				area: ['500px', '300px'],
				title: "启动",
				shadeClose: false,
				shade: 0,
				content: $('#selecs'),
				closeBtn: 1,
				btn: ['确定','取消'],
				yes: function(index, layero) {
					layer.close(index)
					$('.main').css('display','none')
				$('.loadTag').css('display','block')
					var val = $("#process").val();
					var urls = "../postSendStartBatchServer.action";
					if(val == "") {
						urls = "../postSendStartBatchServer.action";
						val = null;
					} else {
						urls = "../postSendStartBatchBilling.action";
					}
					for(var i = 0; i < checkstatus.data.length; i++) {
						arr.push(checkstatus.data[i].serverId)
					}
					var jsons = arr.join(',')
					if(jsons == "") {
						alert("操作成功")
						$('.loadTag').css('display','none')
						$('.main').css('display','block')
						return false;
					}
					$.ajax({
						type: "get",
						url: urls,
						async: true,
						data: {
							serverId: jsons,
							processType: val
						},
						success: function(res) {
							layer.msg(res.message);
							$('.loadTag').css('display','none')
							$('.main').css('display','block')
							//							tableIns.reload()
						}
					});
				}
			});

		} else if(json.event == "end") {
			layer.open({
				type: 1,
				area: ['500px', '300px'],
				title: "关闭",
				shadeClose: false,
				shade: 0,
				content: $('#selecs'),
				closeBtn: 1,
				btn: ['确定','取消'],
				yes: function(index, layero) {
					layer.close(index)
					$('.main').css('display','none')
				$('.loadTag').css('display','block')
					var val = $("#process").val();
					var urls = "../postSendCloseBatchServer.action";
					if(val == "") {
						urls = "../postSendCloseBatchServer.action";
						val = null;
					} else {
						urls = "../postSendCloseBatchBilling.action";
					}
					for(var i = 0; i < checkstatus.data.length; i++) {
						arr.push(checkstatus.data[i].serverId)
					}
					var jsons = arr.join(',')
					if(jsons == "") {
						alert("操作成功")
						$('.loadTag').css('display','none')
						$('.main').css('display','block')
						return false;
					}
					$.ajax({
						type: "get",
						url: urls,
						async: true,
						data: {
							serverId: jsons,
							processType: val
						},
						success: function(res) {
//							alert(res.message);
							layer.msg(res.message)
							$('.loadTag').css('display','none')
						$('.main').css('display','block')
							//							tableIns.reload()
						}
					});
				}
			});
		} else if(json.event == "down") {
			for(var i = 0; i < checkstatus.data.length; i++) {
				arr.push(checkstatus.data[i].serverId)
			}
			var jsons = arr.join(',');
			if(jsons == "") {
				alert("操作成功")
				$('.loadTag').css('display','none')
						$('.main').css('display','block')
				return false;
			}
			$.ajax({
				type: "get",
				url: "../postSendAutoStart.action",
				async: true,
				data: {
					serverId: jsons,
					isAutoStart: 1
				},
				success: function(res) {
					$('.loadTag').css('display','none')
					$('.main').css('display','block')
					tableIns.reload()
				}
			});
		} else if(json.event == "clos") {
			for(var i = 0; i < checkstatus.data.length; i++) {
				arr.push(checkstatus.data[i].serverId)
			}
			var jsons = arr.join(',');
			if(jsons == "") {
				alert("操作成功")
				$('.loadTag').css('display','none')
						$('.main').css('display','block')
				return false;
			}
			$.ajax({
				type: "get",
				url: "../postSendAutoStart.action",
				async: true,
				data: {
					serverId: jsons,
					isAutoStart: 0
				},
				success: function(res) {
					$('.loadTag').css('display','none')
					$('.main').css('display','block')
					tableIns.reload()
				}
			});
		}

	})
	var t = window.setInterval(reload, 1000)

	function reload() {
		var search_id = $("#search_id").val();
		var search_ip = $("#search_ip").val();
		var ip;
		if(search_ip == "") {
			ip == search_ip
		} else {
			ip = "'" + search_ip + "'"
		}
		$.ajax({
			type: "get",
			url: "../getServerListNoPage.action",
			async: true,
			data: {
				serverId: search_id,
				serverIp: ip
			},
			success: function(e) {
				data = e;
				var sum = $(".rec")
				var num = []
				for(var i = 0; i < e.rows.length; i++) {
					num.push(e.rows[i].type)
				}
				for(var x = 0; x < sum.length; x++) {
					if(num[x] == 0) {
						sum[x].innerHTML = "网络断开";
						sum[x].style.background = "#c8823c";
					}
					if(num[x] == 2) {
						sum[x].innerHTML = "进程异常";
						sum[x].style.background = "#cb3234"
					}
					if(num[x] == 5) {
						sum[x].innerHTML = "正常关闭";
						sum[x].style.background = "#4132c9"
					}
					if(num[x] == 6) {
						sum[x].innerHTML = "正常运行";
						sum[x].style.background = "#31c972"
					}
				}

			}
		});
	}
	function pro_reload() {
		$.ajax({
			type: "get",
			url: "../getProcess.action",
			async: true,
			data: {
//				id: timeout
				id: oneId,
				serverId: oneServerId
			},
			success: function(e) {
				var num = []
				for(var i = 0; i < e.rows.length; i++) {
					num.push(e.rows[i].state)
				}
				for(var x = 0; x < sta.length; x++) {
					if(num[x] == 0) {
						sta[x].innerHTML = "已关闭";
						sta[x].style.color = "#999999";
					}
					if(num[x] == 1) {
						sta[x].innerHTML = "已开启";
						sta[x].style.color = "#999999";
					}
					if(num[x] == 2) {
						sta[x].innerHTML = "正在启动";
						sta[x].style.color = "#999999";
					}
					if(num[x] == 3) {
						sta[x].innerHTML = "正在关闭";
						sta[x].style.color = "#999999";
					}
				}
			}
		});
	}
	
	function pro_reload2() {
		
		$.ajax({
			type: "get",
			url: "../getProcessByType.action",
			async: true,
			data: {
//				id: timeout
				pId: twoId,
				processType: processType
			},
			success: function(e) {
				var num = []
				for(var i = 0; i < e.rows.length; i++) {
					num.push(e.rows[i].state)
				}
				for(var x = 0; x < sta.length; x++) {
					if(num[x] == 0) {
						sta2[x].innerHTML = "已关闭";
						sta2[x].style.color = "#999999";
					}
					if(num[x] == 1) {
						sta2[x].innerHTML = "已开启";
						sta2[x].style.color = "#999999";
					}
					if(num[x] == 2) {
						sta2[x].innerHTML = "正在启动";
						sta2[x].style.color = "#999999";
					}
					if(num[x] == 3) {
						sta2[x].innerHTML = "正在关闭";
						sta2[x].style.color = "#999999";
					}
				}
			}
		});
	}
});