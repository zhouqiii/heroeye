
layui.use(['element', 'table', 'layer'], function() {
	var element = layui.element;
	var table = layui.table;
	var layer = layui.layer;
	element.init();
	var tableIns = table.render({
		elem: '#datatable',
		url: '../getGlobalListNoPage',
		loading: true,
		page: true,
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
					field: 'gameId',
					title: 'ID',
				},
				{
					field: 'gameName',
					title: '名称'
				},
				{
					field: 'remarks',
					title: '备注',
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
        }
	});
	$("#add").click(function(){
		layer.open({
			type:1,
			area:['500px','270px'],
			title:["添加游戏",'font-size:14px','font-weight:400'],
			shadeClose:false,
			shade:0,
			content:$('#add_area'),
			closeBtn:1,
			btn:['确定','取消'],
			yes:function(index,layero){
				layer.close(index)
				var add_gameid = $("#add_gameid").val();//游戏ID
				var add_gamename = $("#add_gamename").val();//游戏名称
				var add_gameremakers = $("#add_gameremakers").val();//备注
				var regEn = /[`!@#$%^&*()_+<>?:"{},.\/;'[\]-]/im;
				var regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
				if(add_gameid==""||add_gameid==null||add_gameid==undefined){
					alert("游戏ID不能为空");
					return false;
				}else if(isNaN(add_gameid)||add_gameid.length>11){
					alert("游戏ID只能为不超过11位的数字");
					return false;
				}else if(add_gamename==""||add_gamename==null||add_gamename==undefined){
					alert("游戏名称不能为空");
					return false;
				}else if(regEn.test(add_gamename)||regCn.test(add_gamename)){
					alert("游戏名称不能包含特殊字符");
					return false;
				}else if(add_gameremakers==""||add_gameremakers==null||add_gameremakers==undefined){
					alert("备注不能为空");
					return false;
				}else{
					$('.main').css('display','none')
					$('.loadTag').css('display','block')
					$.ajax({
						type:"get",
						url:"../saveGame",
						async:true,
						data:{
							gameId:add_gameid,
							gameName:add_gamename,
							remarks:add_gameremakers,
						},
						success:function(json){
							alert(json.message)
							tableIns.reload()
                            $('.loadTag').css('display','none')
                            $('.main').css('display','block')
						}
					});
				}
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
		var modGameid = data.gameId;
		var modGamename = data.gameName;
		var modGameremakers = data.remarks;
		//如果点击修改触发的事件
		if(layEvent === 'edit'){
			$("#modify_gameid").val(modGameid);//游戏ID赋值
			$("#modify_gamename").val(modGamename);//游戏名称赋值
			$("#modify_gameremakers").val(modGameremakers);//游戏备注赋值
			layer.open({
				type:1,
				area:['500px','270px'],
				title:["修改大区",'font-size:14px','font-weight:400'],
				shadeClose:false,
				shade:0,
				content:$('#modify_area'),
				closeBtn:1,
				btn:['确定','取消'],
				yes:function(index,layero){
					layer.close(index)
					var id = data.vId
					var modify_gameid = $("#modify_gameid").val();//大区ID
					var modify_gamename = $("#modify_gamename").val();//大区名称
					var modify_gameremakers = $("#modify_gameremakers").val();//备注
					var regEn = /[`!@#$%^&*()_+<>?:"{},.\/;'[\]-]/im;
					var regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
					if(modify_gameid==""||modify_gameid==null||modify_gameid==undefined){
						alert("大区ID不能为空");
						return false;
					}else if(isNaN(modify_gameid)||modify_gameid.length>11){
						alert("大区ID只能为不超过11位的数字");
						return false;
					}else if(modify_gamename==""||modify_gamename==null||modify_gamename==undefined){
						alert("大区名称不能为空");
						return false;
					}else if(regEn.test(modify_gamename)||regCn.test(modify_gamename)){
						alert("大区名称不能包含特殊字符");
						return false;
					}else if(modify_gameremakers==""||modify_gameremakers==null||modify_gameremakers==undefined){
						alert("备注不能为空");
						return false;
					}else{
                        $('.main').css('display','none')
                        $('.loadTag').css('display','block')
						$.ajax({
							type:"get",
							url:"../updateGame",
							async:true,
							data:{
								vId:id,
								gameId:modify_gameid,
								gameName:modify_gamename,
								remarks:modify_gameremakers,
							},
							success:function(json){
								alert(json.message);
								tableIns.reload();
                                $('.loadTag').css('display','none')
                                $('.main').css('display','block')
							}
						});
					}
				},
                btn2:function(index,layero){
                    layer.close(index)
				}
			})
		}else if(layEvent === 'del'){
			//如果点击删除触发的事件
			layer.confirm('是否确认删除', function(index) {
				layer.close(index);
                $('.main').css('display','none')
                $('.loadTag').css('display','block')
				var id = data.vId
				$.ajax({
					type:"get",
					url:"../deleteGame",
					async:true,
					data:{
						vId:id,
						gameId:modGameid,
						gameName:modGamename
					},
					success:function(e){
						alert(e.message);
						tableIns.reload();
                        $('.loadTag').css('display','none')
                        $('.main').css('display','block')
					}
				})
			});
		}
	})
});
