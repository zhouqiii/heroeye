today()
//设置默认时间
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
	old = y + "-" + m + "-" + d +" "+ a + ":" + b + ":" +c;
	var newtoday = new Date();
	var newy = newtoday.getFullYear();
	var newm = newtoday.getMonth() + 1;
	var newd = newtoday.getDate();
	var newa = today.getHours();
	var newb = today.getMinutes();
	var newc = today.getSeconds();
	if(newm >= 1 && newm < 10) {
		newm = "0" + newm
	}
	if(newd >= 1 && newd < 10) {
		newd = "0" + newd
	}
	if(newa >= 1 && newa < 10) {
		newa = "0" + newa
	}
	if(newb >= 1 && newb < 10) {
		newb = "0" + newb
	}
	if(newc >= 1 && newc < 10) {
		newc = "0" + newc
	}
	newtime = newy + "-" + newm + "-" + newd +" "+ newa + ":" + newb + ":" +newc;
}
var times = old + "~" + newtime;
layui.use(['element', 'table', 'layer', 'laydate'], function() {
	var element = layui.element;
	var table = layui.table;
	var layer = layui.layer;
	var laydate = layui.laydate;
	element.init();
	//日历配置
	var now = new Date();
	laydate.render({
		elem: '#datatimes',
		type:'datetime',//日期可选时分秒
		range: '~', //日期范围选择
		lang: 'en', //国际化
		format: 'yyyy-MM-dd HH:mm:ss',
		theme: 'riqi', //自定义类名
		value: old + ' ~ ' + newtime,
//		max: 'now',
		trigger: 'click',
		done: function(res) {
			times = res
		}
	});
	var type = $("#district_service").val();
	var state = $("#state").val();
	var username = $("#username").val();
	if(type!=null){
		type = type.join(',')
	}
	if(state!=null){
		state = state.join(',')
	}
	var tableIns = table.render({
		elem: '#datatable',
		url: '../selectEyeLog.action',
		loading: true,
		toolbar: '#toobar',
		page: true,
		where:{
			opTypes:type,
			results:state,
			startTime:times,
			userId:username
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
		parseData: function(res){
//			console.log(res)
		},
		cols: [
			[
				{
					field: 'logTime',
					title: '操作时间',
					event: 'collapse',
				},
				{
					field: 'userId',
					title: '用户ID',
				},
				{
					field: 'content',
					title: '操作内容',
					width: '65%',
				},
				{
					field: 'result',
					title: '操作结果',
					templet: function(d) {
						if(d.result == 0){
							return '<span>成功</span>'
						}
						if(d.result == 1){
							return '<span>失败</span>'
						}
					}
				},
				{
					field: 'opType',
					title: '操作类型',
					templet: function(d) {
						if(d.opType == 0){
							return '<span>登录</span>'
						}
						if(d.opType == 1){
							return '<span>登出</span>'
						}
						if(d.opType == 2){
							return '<span>启动服务器</span>'
						}
						if(d.opType == 3){
							return '<span>停止服务器</span>'
						}
						if(d.opType == 4){
							return '<span>添加</span>'
						}
						if(d.opType == 5){
							return '<span>修改</span>'
						}
						if(d.opType == 6){
							return '<span>删除</span>'
						}
						if(d.opType == 7){
							return '<span>GM指令</span>'
						}
						if(d.opType == 8){
							return '<span>上传</span>'
						}
						if(d.opType == 9){
							return '<span>下载</span>'
						}
						if(d.opType == 10){
							return '<span>补单</span>'
						}
						if(d.opType == 11){
							return '<span>发布活动</span>'
						}
					}
				},
			]
		],
		done: function(data) {
			
		}
	});
	$("#query").click(function(){
		var type = $("#district_service").val();
		var state = $("#state").val();
		var username = $("#username").val();
		if(type!=null){
			type = type.join(',')
		}
		if(state!=null){
			state = state.join(',')
		}
		var tableIns = table.render({
			elem: '#datatable',
			url: '../selectEyeLog.action',
			loading: true,
			toolbar: '#toobar',
			page: true,
			where:{
				opTypes:type,
				results:state,
				startTime:times,
				userId:username
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
			parseData: function(res){
//				console.log(res)
			},
			cols: [
				[
					{
						field: 'logTime',
						title: '操作时间',
						event: 'collapse',
					},
					{
						field: 'userId',
						title: '用户ID',
					},
					{
						field: 'content',
						title: '操作内容',
						width: '65%',
					},
					{
						field: 'result',
						title: '操作结果',
						templet: function(d) {
							if(d.result == 0){
								return '<span>成功</span>'
							}
							if(d.result == 1){
								return '<span>失败</span>'
							}
						}
					},
					{
						field: 'opType',
						title: '操作类型',
						templet: function(d) {
							if(d.opType == 0){
								return '<span>登录</span>'
							}
							if(d.opType == 1){
								return '<span>登出</span>'
							}
							if(d.opType == 2){
								return '<span>启动服务器</span>'
							}
							if(d.opType == 3){
								return '<span>停止服务器</span>'
							}
							if(d.opType == 4){
								return '<span>添加</span>'
							}
							if(d.opType == 5){
								return '<span>修改</span>'
							}
							if(d.opType == 6){
								return '<span>删除</span>'
							}
							if(d.opType == 7){
								return '<span>GM指令</span>'
							}
							if(d.opType == 8){
								return '<span>上传</span>'
							}
							if(d.opType == 9){
								return '<span>下载</span>'
							}
						}
					},
				]
			],
			done: function(data) {
				
			}
		})
	})
})

$("#district_service").each(function() {
	$(this).find("option").attr("selected", "selected")
})
$('#district_service').multiselect({
	buttonWidth: '70%',
	nonSelectedText: '请选择',
	maxHeight: 200,
	numberDisplayed: 2,
	includeSelectAllOption: true,
	selectAllText: '全选/全不选', //全选按钮显示的文本	
	nSelectedText: '项被选中',
	allSelectedText: '已选中所有类型',
	enableFiltering: false, //搜索框
});
$("#state").each(function() {
	$(this).find("option").attr("selected", "selected")
})
$('#state').multiselect({
	buttonWidth: '70%',
	nonSelectedText: '请选择',
	maxHeight: 200,
	numberDisplayed: 2,
	includeSelectAllOption: true,
	selectAllText: '全选/全不选', //全选按钮显示的文本	
	nSelectedText: '项被选中',
	allSelectedText: '已选中所有类型',
	enableFiltering: false //搜索框
});
