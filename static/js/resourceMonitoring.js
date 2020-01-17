layui.use(['element', 'table', 'form', 'upload'], function() {
	var element = layui.element;
	element.init();
})
servers()
function servers(){
	$.ajax({
		type:"get",
		url:"../getServerListNoPage",
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
		url:"../monitoringCpuInfo",
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
		     name : 'CPU占用率',
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
	      	url: "../monitoringCpuInfo",    
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
	      	url: "../monitoringCpuInfo",    
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
	   $.ajax({
	      	type: "post",
	      	url: "../monitoringCpuInfo",    
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