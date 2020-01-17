
layui.use(['element', 'table', 'layer', 'form'], function() {
	var element = layui.element;
	var table = layui.table;
	var layer = layui.layer;
	var form = layui.form;
	//游戏下拉赋值
	Subordinate_area()
	function Subordinate_area(){
		$.post("../getGlobalListNoPage", function (data) {
	        $.each(data.rows, function (index, item) {
	            $('#addSubordinate_game').append(new Option(item.gameName, item.gameId));
	            $('#modifySubordinate_game').append(new Option(item.gameName, item.gameId));
	        });
			$("#addSubordinate_game").prepend("<option value=''></option>");
				$("#modifySubordinate_game").prepend("<option value=''></option>");
				$("#addSubordinate_game").each(function() {
					$(this).find("option").eq(0).attr("selected", "selected")
				})
				$("#modifySubordinate_game").each(function() {
					$(this).find("option").eq(0).attr("selected", "selected")
				})
	        form.render('select')
	    });
	}
	element.init();
	var tableIns = table.render({
		elem: '#datatable',
		url: '../getAreas',
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
					field: 'areaId',
					title: 'ID',
				},
				{
					field: 'areaName',
					title: '名称'
				},
				{
					field: 'pId',
					title: '所属游戏',
				},
				{
					field: 'remarks',
					title: '备注',
				},
				{
					field: '',
					title: '查看服务器',
					templet: function(value) {
						return '<button type="button" class="layui-btn layui-btn-normal" lay-event="serv">查看服务器</button>'
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
	$("#add").click(function(){
		layer.open({
			type:1,
			area:['450px','400px'],
			title:"添加大区",
			shadeClose:false,
			shade:0,
			content:$('#add_area'),
			closeBtn:2,
			btn:'确定',
			yes:function(index,layero){
				layer.close(index)
				var add_areaid = $("#add_areaid").val();//大区ID
				var add_areaname = $("#add_areaname").val();//大区名称
				var add_arearemakers = $("#add_arearemakers").val();//备注
				var addSubordinate_game = $("#addSubordinate_game").val();//所属游戏
				var regEn = /[`!@#$%^&*()_+<>?:"{},.\/;'[\]-]/im;
				var regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
				if(add_areaid==""||add_areaid==null||add_areaid==undefined){
					alert("大区ID不能为空")
				}else if(isNaN(add_areaid)||add_areaid.length>11){
					alert("大区ID只能为不超过11位的数字")
				}else if(add_areaname==""||add_areaname==null||add_areaname==undefined){
					alert("大区名称不能为空")
				}else if(regEn.test(add_areaname)||regCn.test(add_areaname)){
					alert("大区名称不能包含特殊字符")
				}else if(add_arearemakers==""||add_arearemakers==null||add_arearemakers==undefined){
					alert("备注不能为空")
				}else if(addSubordinate_game==""||addSubordinate_game==null||addSubordinate_game==undefined){
					alert("所属游戏不能为空")
				}else{
					$("body").mLoading("show")
					$.ajax({
						type:"get",
						url:"../saveArea",
						async:true,
						data:{
							areaId:add_areaid,
							areaName:add_areaname,
							remarks:add_arearemakers,
							pId:addSubordinate_game
						},
						success:function(json){
							alert(json.message)
							$("body").mLoading("hide")
							tableIns.reload()
						}
					});
				}
			}
		})
	})
	table.on('tool(test)',function(obj){
		//获取当前某一条数据
		var data = obj.data
		var id = data.vId;
		var layEvent = obj.event;
		var modAreaid = data.areaId;
		var modAreaname = data.areaName;
		var modArearemakers = data.remarks;
		var modAreagame = data.pId;
		//如果点击修改触发的事件
		if(layEvent === 'edit'){
			$("#modify_areaid").val(modAreaid);//大区ID赋值
			$("#modify_areaname").val(modAreaname);//大区名称赋值
			$("#modify_arearemakers").val(modArearemakers);//大区备注赋值
			$("#modifySubordinate_game").val(modAreagame);//所属游戏赋值
			layer.open({
				type:1,
				area:['450px','400px'],
				title:"修改大区",
				shadeClose:false,
				shade:0,
				content:$('#modify_area'),
				closeBtn:2,
				btn:'确定',
				yes:function(index,layero){
					layer.close(index)
					var id = data.vId
					var modify_areaid = $("#modify_areaid").val();//大区ID
					var modify_areaname = $("#modify_areaname").val();//大区名称
					var modify_arearemakers = $("#modify_arearemakers").val();//备注
					var modifySubordinate_game = $("#modifySubordinate_game").val();//所属游戏
					var regEn = /[`!@#$%^&*()_+<>?:"{},.\/;'[\]-]/im;
					var regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
					if(modify_areaid==""||modify_areaid==null||modify_areaid==undefined){
						alert("大区ID不能为空")
					}else if(isNaN(modify_areaid)||modify_areaid.length>11){
						alert("大区ID只能为不超过11位的数字")
					}else if(modify_areaname==""||modify_areaname==null||modify_areaname==undefined){
						alert("大区名称不能为空")
					}else if(regEn.test(modify_areaname)||regCn.test(modify_areaname)){
						alert("大区名称不能包含特殊字符")
					}else if(modify_arearemakers==""||modify_arearemakers==null||modify_arearemakers==undefined){
						alert("备注不能为空")
					}else if(modifySubordinate_game==""||modifySubordinate_game==null||modifySubordinate_game==undefined){
						alert("所属游戏不能为空")
					}else{
						$("body").mLoading("show")
						$.ajax({
							type:"get",
							url:"../updateArea",
							async:true,
							data:{
								vId:id,
								areaId:modify_areaid,
								areaName:modify_areaname,
								remarks:modify_arearemakers,
								pId:modifySubordinate_game
							},
							success:function(json){
								alert(json.message)
								$("body").mLoading("hide")
								tableIns.reload()
							}
						});
					}
				}
			})
		}else if(layEvent === 'del'){
			//如果点击删除触发的事件
			layer.confirm('是否确认删除', function(index) {
				$("body").mLoading("show");
				layer.close(index)
				var id = data.vId
				$.ajax({
					type:"get",
					url:"../deleteArea",
					async:true,
					data:{
						vId:id,
						areaId:modAreaid,
						areaName:modAreaname,
						pId:modAreagame
					},
					success:function(e){
						alert(e.message)
						$("body").mLoading("hide");
						tableIns.reload()
					}
				})
			});
		}else if(layEvent === 'serv'){
			window.location.href="serverList.html?areaId="+modAreaid
		}
	})
	
});


