layui.use(['element', 'table', 'form', 'upload'], function() {
	var element = layui.element;
	element.init();
})
servers()
function servers(){
	$.ajax({
		type:"get",
		url:"../getServerListNoPage.action",
		async:true,
		success:function(json){
			for(var i = 0;i<json.rows.length;i++){
				$("#server").append("<option value="+json.rows[i].serverId+">"+json.rows[i].serverName+"</option>")
			}
			regs()
		}
	});
}
function regs(){
	var serverid = $("#server").val();
	var name = $("#server").find("option:selected").text();
	$(".serverName").html(name);
	$.ajax({
		type:"post",
		url:"../monitoringCpuInfo.action",
		async:true,
		data:{
			serverId:serverid
		},
		success:function(json){
			onreal(json);
			memory(json);
			disk(json);
		}
	});
}

//cpu占用率
function onreal(json){
 	var categories = [];
 	var arr = [];
	Highcharts.setOptions({global: {useUTC: false}});
	var max=6;
	var chart = Highcharts.chart('container', {
		chart: {//图标操作
			type: 'area',//类型
			events: {//事件
                 load: st  //图表加载事件
           },
           backgroundColor: {//图表绘图区背景色
				stops: [
					[0, 'rgb(54, 54, 54)']
				]
			},
		},
		title: {//图表标题
			text: ''//图表标题内容
		},
		credits:{
            enabled:false // 禁用版权信息
        },
        exporting: {
            enabled:false//禁用右上角打印
		},
		xAxis: {//x坐标轴
			type: 'datetime',
			labels:{//设置x轴各分类名称的一些形式
				enable: true,
				rotation:320,//角度
				style: {//样式
					color: '#fff'
				}
			},	
			dateTimeLabelFormats: {//时间格式化
				week: '%Y-%m-%d'
			}
		},
		yAxis: {
			title: {//y轴名称
				text: ""
			},
			gridLineColor: "#c0c0c0",//网格颜色
			labels: {//设置y轴各分类名称的一些形式
				style: {
					color: '#fff'
				},
				formatter:function(){
					return this.value + "%"
				}
			},
			
		},
		tooltip: {//显示当鼠标滑向数据点时显示的提示信息
			formatter: function () {
				return '<b>'+this.x+ '</b><br>'+ this.series.name + '<br/>'+ this.y+"%";//series：用于设置图表中要展示的数据相关属性[name:数据列的名称]
			}
		},
		legend: {//设置图例相关属性
			itemStyle: {//内容样式
				color: '#c0c0c0',
			},
			itemHoverStyle: {//鼠标悬浮样式
				color: '#fff'
			}
		},
		plotOptions: {//数据点相关属性
			area: {
				marker: {
					enabled: false,//是否在数据点上直接显示数据
					symbol: 'circle',
					radius: 2,
					states: {
						hover: {
							enabled: true
						}
					}
				}
			}
		},
		series:  [ {//设置图表中要展示的数据相关的属性
		     name : 'CPU占用率',
		     data : []//显示在图表中的数据列
	    } ]
	});
	function st() {
	   	setInterval(getData, 1000);
	}
	//动态更新图表数据
	function getData() {
	   var server = $("#server").val();
	   $.ajax({
	      	type: "post",
	      	url: "../monitoringCpuInfo.action",    
	      	dataType: "json",
	      	async: false,
	      	data:{
	      		serverId:server
	      	},
	      	success : function(json){
	      		var value = json.data.cpuInfo.cpuTotalLoad;
	      		categories.push(value);
	      		if(categories.length>20){
	      			categories.splice(0,1)
	      			chart.series[0].addPoint(value,true,true,true);
	      		}
	      		chart.series[0].setData(categories);
	      		arr.push(json.data.monitoringTime);
	      		chart.xAxis[0].setCategories(arr);
	      	}
	    });
	}
}

//内存占用率
function memory(json){
 	var categories = [];
 	var arr = [];
	Highcharts.setOptions({global: {useUTC: false}});
	var max=6;
	var chart = Highcharts.chart('Memory_container', {
		chart: {
			type: 'area',
			events: {
                 load: st  
           },
           backgroundColor: {
				stops: [
					[0, 'rgb(54, 54, 54)']
				]
			},
		},
		title: {
			text: ''
		},
		credits:{
            enabled:false // 禁用版权信息
        },
        exporting: {
            enabled:false//禁用右上角打印
		},
		xAxis: {
			type: 'datetime',
			labels:{
				enable: true,
				rotation:320,
				style: {
					color: '#fff'
				}
			},	
			dateTimeLabelFormats: {
				week: '%Y-%m-%d'
			}
		},
		yAxis: {
			title: {
				text: ""
			},
			gridLineColor: "#c0c0c0",
			labels: {
				style: {
					color: '#fff'
				},
				formatter:function(){
					return this.value + "%"
				}
			},
			
		},
		tooltip: {
			formatter: function () {
				return '<b>'+this.x+ '</b><br>'+ this.series.name + '<br/>'+ this.y+"%";
			}
		},
		legend: {
			itemStyle: {
				color: '#c0c0c0',
			},
			itemHoverStyle: {
				color: '#fff'
			}
		},
		plotOptions: {
			area: {
				marker: {
					enabled: false,
					symbol: 'circle',
					radius: 2,
					states: {
						hover: {
							enabled: true
						}
					}
				}
			}
		},
		series:  [ {
		     name : '内存占用率',
		     data : []
	    } ]
	});
	function st() {
	   	setInterval(getData, 1000);
	}
	//动态更新图表数据
	function getData() {
	   var server = $("#server").val();
	   $.ajax({
	      	type: "post",
	      	url: "../monitoringCpuInfo.action",    
	      	dataType: "json",
	      	async: false,
	      	data:{
	      		serverId:server
	      	},
	      	success : function(json){
	      		var free = json.data.memInfo.freeMem;
	      		var total = json.data.memInfo.totalMem;
	      		var occupy = (total-free)/total;
	      		var value = occupy.toFixed(2)*100;
	      		categories.push(value);
	      		if(categories.length>20){
	      			categories.splice(0,1);
	      			chart.series[0].addPoint(value,true,true,true);
	      		}
	      		chart.series[0].setData(categories);
	      		arr.push(json.data.monitoringTime);
	      		chart.xAxis[0].setCategories(arr);
	      	}
	    });
	}
}
//C盘占用率
function disk(json){
 	var categories = [];
 	var arr = [];
	Highcharts.setOptions({global: {useUTC: false}});
	var max=6;
	var chart = Highcharts.chart('hard_container', {
		chart: {
			type: 'area',
			events: {
                 load: st  
           },
           backgroundColor: {
				stops: [
					[0, 'rgb(54, 54, 54)']
				]
			},
		},
		title: {
			text: ''
		},
		credits:{
            enabled:false // 禁用版权信息
        },
        exporting: {
            enabled:false//禁用右上角打印
		},
		xAxis: {
			type: 'datetime',
			labels:{
				enable: true,
				rotation:320,
				style: {
					color: '#fff'
				}
			},	
			dateTimeLabelFormats: {
				week: '%Y-%m-%d'
			}
		},
		yAxis: {
			title: {
				text: ""
			},
			gridLineColor: "#c0c0c0",
			labels: {
				style: {
					color: '#fff'
				},
				formatter:function(){
					return this.value + "%"
				}
			},
			
		},
		tooltip: {
			formatter: function () {
				return '<b>'+this.x+ '</b><br>'+ this.series.name + '<br/>'+ this.y+"%";
			}
		},
		legend: {
			itemStyle: {
				color: '#c0c0c0',
			},
			itemHoverStyle: {
				color: '#fff'
			}
		},
		plotOptions: {
			area: {
				marker: {
					enabled: false,
					symbol: 'circle',
					radius: 2,
					states: {
						hover: {
							enabled: true
						}
					}
				}
			}
		},
		series:  [ {
		     name : 'C盘占用率',
		     data : []
	    } ]
	});
	function st() {
	   	setInterval(getData, 1000);
	}
	//动态更新图表数据
	function getData() {
	   var server = $("#server").val();
	   console.log(server)
	   $.ajax({
	      	type: "post",
	      	url: "../monitoringCpuInfo.action",    
	      	dataType: "json",
	      	async: false,
	      	data:{
	      		serverId:server
	      	},
	      	success : function(json){
	      		var free = json.data.diskInfo[0].freeSize;
	      		var total = json.data.diskInfo[0].totalSize;
	      		var occupy = (total-free)/total;
	      		var value = occupy.toFixed(2)*100;
	      		categories.push(value);
	      		if(categories.length>20){
	      			categories.splice(0,1);
	      			chart.series[0].addPoint(value,true,true,true);
	      		}
	      		chart.series[0].setData(categories);
	      		arr.push(json.data.monitoringTime);
	      		chart.xAxis[0].setCategories(arr);
	      	}
	    });
	}
}