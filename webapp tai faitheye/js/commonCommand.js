layui.use(['element', 'table', 'layer', 'laydate','form'], function() {
    var element = layui.element;
    var table = layui.table;
    var form=layui.form;
    var layer = layui.layer;
    // var laydate = layui.laydate;
    element.init();
    //日历配置
//     var now = new Date();
//     laydate.render({
//         elem: '#datatimes',
//         type:'datetime',//日期可选时分秒
//         range: '~', //日期范围选择
//         lang: 'en', //国际化
//         format: 'yyyy-MM-dd HH:mm:ss',
//         theme: 'riqi', //自定义类名
//         value: old + ' ~ ' + newtime,
// //		max: 'now',
//         trigger: 'click',
//         done: function(res) {
//             times = res
//         }
//     });
    var serverDel = $("#server8").val();//删除-单区多区
    var roleidD = $("#roleidD").val();//删除-角色ID
    var accoutD = $("#accout").val();//删除-账号
    var rolenameD = $("#rolename").val();//删除-角色名称

    $("#queryId").click(function(){
    	var flag=false
    	var htm='<div onclick="showDetail()" id="showDetailStyle">货币<i class="fa fa-caret-down" style="margin-left: 7%;"></i><div>'
    	var thAll=document.getElementsByTagName('th')
    	var myScript= document.createElement("script");
        myScript.type = "text/javascript";
        myScript.appendChild(document.createTextNode("function showDetail(){document.flag=!document.flag;if(document.flag===true){$('#moneySelectAno').css('display','block');$('#moneySelectAno').css('z-index','1000');}else{$('#moneySelectAno').css('display','none');}}"));
        document.body.appendChild(myScript);
    	var serverChoose
        var roleidD = $("#roleidD").val();//删除-角色ID
        var rolenameD = $("#rolename").val();//删除-角色名称
    	var server = $(".right_content8 input");
//    	console.log(server)
    	for(var i = 0;i<server.length;i++){
    		if(server[i].checked == true){
    			serverChoose=server[i].value
    		}
    	}
    	if(serverChoose==undefined){
    		serverChoose=null
    	}
    	var tableIns = table.render({
    		elem: '#datatable',
    		height: 500,
    		url: '../queryRoleInfo.action',
    		loading: true,
    		page: true,
    		where:{
    			serverId:serverChoose,//服务器
            	role_guid:roleidD,//角色ID
            	roleName:rolenameD, //角色名称
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
    		parseData: function(data){
    		},
    		cols: [
    			[
    				{
                      field: 'accountId',
                      title: '账号ID',
                      minWidth: 155
                  },
                  {
                      field: 'roleId',
                      title: '角色ID',
                      width: 155
                  },
                  {
                      field: 'roleName',
                      title: '角色名'
                  },
                  {
                  field: 'moneyType',//字段
                  title: htm,
//                  templet: '#moneySelect',
                  event: 'detail',
                  edit: 'text'
              },{
                  field: 'leaveValue',//剩余数量
                  title: '剩余数量'
              },
              {
                  field: 'deleteNumber',
                  title: '删除数量',
                  edit: 'text'
              }
    			]
    		],
    		done: function(res, curr, count) {
       }
    	});
    })
     $("#litag").on("click","li",function(){
			$("#moneySelectAno").css("display","none")
			var htm='<div onclick="showDetail()" id="showDetailStyle">货币<i class="fa fa-caret-down" style="margin-left: 7%;"></i><div>'
			//console.log($(this).text())
			var value=$(this).text()////货币文本
			var valueNumA=$(this).val()//货币类型
			var olddata=table.cache["datatable"]
//			console.log(olddata)
			olddata[0].moneyType=value
			var roleidD = $("#roleidD").val();//删除-角色ID
	        var rolenameD = $("#rolename").val();//删除-角色名称
	    	var server = $(".right_content8 input");
//	    	console.log(server)
	    	for(var i = 0;i<server.length;i++){
	    		if(server[i].checked == true){
	    			serverChoose=server[i].value
	    		}
	    	}
	    	if(serverChoose==undefined){
	    		serverChoose=null
	    	}
//			console.log(olddata)
			$.ajax({
				type:"get",
				url:"../queryRoleInfo.action",
				async:true,
				data:{
					serverId:serverChoose,//服务器
	            	role_guid:roleidD,//角色ID
	            	roleName:rolenameD, //角色名称
				},
				success:function(data){
					var res=data.rows[0]
					if(valueNumA==0){
						olddata[0].leaveValue=res.e_money_type_exp
					}else if(valueNumA==1){
						olddata[0].leaveValue=res.e_money_type_silver
					}else if(valueNumA==2){
						olddata[0].leaveValue=res.e_money_type_silver_bind
					}else if(valueNumA==3){
						olddata[0].leaveValue=res.e_money_type_jewel
					}else if(valueNumA==4){
						olddata[0].leaveValue=res.e_money_type_jewel_bind
					}else if(valueNumA==5){
						olddata[0].leaveValue=res.e_money_type_belief_point
					}else if(valueNumA==6){
						olddata[0].leaveValue=res.e_money_type_magic_crystal
					}else if(valueNumA==7){
						olddata[0].leaveValue=res.e_money_type_remodeling_point
					}else if(valueNumA==8){
						olddata[0].leaveValue=res.e_money_type_spirit_score
					}else if(valueNumA==9){
						olddata[0].leaveValue=res.e_money_type_spirit_crystal
					}else if(valueNumA==10){
						olddata[0].leaveValue=res.e_money_type_pound
					}else if(valueNumA==11){
						olddata[0].leaveValue=res.e_money_type_guard_point
					}else if(valueNumA==12){
						olddata[0].leaveValue=res.e_money_type_achievement_point
					}else if(valueNumA==13){
						olddata[0].leaveValue=res.e_money_type_reputation
					}else if(valueNumA==14){
						olddata[0].leaveValue=res.e_money_type_hope_point
					}else if(valueNumA==15){
						olddata[0].leaveValue=res.e_money_type_battle_achievement
					}else if(valueNumA==16){
						olddata[0].leaveValue=res.e_money_type_cross_honor
					}else if(valueNumA==17){
						olddata[0].leaveValue=res.e_money_type_talent
					}else if(valueNumA==18){
						olddata[0].leaveValue=res.e_money_type_assist_fighting
					}else if(valueNumA==19){
						olddata[0].leaveValue=res.e_money_type_treasure_score
					}else if(valueNumA==20){
						olddata[0].leaveValue=res.e_money_type_belief_rune_piece
					}else if(valueNumA==21){
						olddata[0].leaveValue=res.e_money_type_legion_warehouse_score
					}else if(valueNumA==22){
						olddata[0].leaveValue=res.e_money_type_attribute_talent
					}else if(valueNumA==23){
						olddata[0].leaveValue=res.e_money_type_world_essence
					}else if(valueNumA==24){
						olddata[0].leaveValue=res.e_money_type_cross_server_money
					}else if(valueNumA==25){
						olddata[0].leaveValue=res.e_money_type_red_diamond
					}else if(valueNumA==26){
						olddata[0].leaveValue=res.e_money_type_feather_piece
					}else if(valueNumA==27){
						olddata[0].leaveValue=res.e_money_type_cross_ladder_honor
					}
					console.log(olddata)
					$("body").mLoading("hide")
			    	var tableIns = table.render({
			    		elem: '#datatable',
			    		height: 500,
			    		data:olddata,
			    		cols: [
			    			[
			    				{
			                      field: 'accountId',
			                      title: '账号',
			                  },
			                  {
			                      field: 'roleId',
			                      title: '角色ID',
			                      width:155
			                  },
			                  {
			                      field: 'roleName',
			                      title: '角色名'
			                  },
			                  {
			                  field: 'moneyType',
			                  title: htm,
//			                  templet: '#moneySelect',
			                  event: 'detail',
			                  edit: 'text'
			              },{
		                      field: 'leaveValue',//剩余数量
		                      title: '剩余数量'
		                  },
			              {
			                  field: 'deleteNumber',
			                  title: '删除数量',
			                  edit: 'text'
			              }
			    			]
			    		],
			    	});
				}
			});
		})
		$("#deleteMoney").click(function(){
    	var tableData=table.cache["datatable"]
    	var liTag=document.getElementsByClassName("litag")
    	for(var i=0;i<liTag.length;i++){
    		var htmlContent=liTag[i].innerText
    		if(tableData[0].moneyType==htmlContent){
    			tableData[0].moneyType=i
    		}
    	}
    	var deleteNum=tableData[0].deleteNumber//删除数量
    	var leaveNum=tableData[0].leaveValue//剩余数量
    	var reg = new RegExp("^[0-9]*$");//校验数字
//    	console.log(deleteType)
    	var roleId=tableData[0].roleId//角色ID
    	var deleteType=tableData[0].moneyType//删除类型
    	var server = $(".right_content8 input");
//    	console.log(server)
    	for(var i = 0;i<server.length;i++){
    		if(server[i].checked == true){
    			serverChoose=server[i].value
    		}
    	}
    	if(serverChoose==undefined){
    		serverChoose=null
    	}
    	if(deleteNum==undefined){
    		deleteNum=null
//    		console.log(deleteNum)
    	}if(!reg.test(deleteNum)){
    		alert("删除数量只能输入数字")
    		return false
    	}
//    	if(deleteNum>leaveNum){
//    		layer.msg("删除数量超过剩余数量")
//    		return false
//    	}
    	 $.ajax({
	          type: "post",
	          url: "../postSendDeductMoney.action",
	          async: true,
	          data: {
	        	 moneyValue:deleteNum,//删除数量
	        	 e_money_save_type:deleteType,//删除的货币类型
	        	 role_guid:roleId,//角色Id
	        	 serverId:serverChoose//serverId
	          },
	          success: function (e) {
	        	 alert(e.message)
	            $("body").mLoading("hide")
	          }
	        })
    })
    table.on('tool(test)',function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if(layEvent === 'edit'){
            var newMoney =$("#deleteNumber").val();//所属游戏赋值
            layer.open({
                type:1,
                area:['450px','200px'],
                title:"货币减少数量",
                shadeClose:false,
                shade:0,
                content:$('#modify_area'),
                closeBtn:2,
                btn:'确定',
                yes:function(index,layero){
                    layer.close(index);
                    var modify_areaid = $("#deleteNumber").val();//删除数量
                    modify_areaid=parseInt(modify_areaid)
                    if(typeof modify_areaid === 'number' && !isNaN(modify_areaid)){
                        $("body").mLoading("show")
                        $.ajax({
                            type:"get",
                            url:"../updateMoney.action",
                            async:true,
                            data:{
                                newMoney:modify_areaid,//改后台字段
                            },
                            success:function(json){
                                alert(json.message)
                                $("body").mLoading("hide")
                                tableIns.reload()
                            }
                        });
                    }else{
                        alert("请填入正确的数字");
                    }
                }
            })
        }
    })
//    实时角色查询
//    var exportData;
//    var tableIns9
//    $("#query_role").click(function(){
//    	var flag=false
//        var serverChoose
//        var roleidD = $("#roleidD").val();//删除-角色ID
//        var rolenameD = $("#rolename").val();//删除-角色名称
//        var server = $(".role_right_area input");
//    //  console.log(server)
//        for(var i = 0;i<server.length;i++){
//        	if(server[i].checked == true){
//        		serverChoose=server[i].value
//        	}
//        }
//    	var realRoleName = $("#realRoleName").val();//角色名称
//    	var realRoleId = $("#realRoleId").val();//角色ID
//    	var Occupation = $("#Occupation").val();//职业
//    	if(serverChoose==undefined){
//    		serverChoose=null
//    	}
//    	tableIns9 = table.render({
//    		elem: '#role_table',
//    		height: 500,
//    		url: '../queryRoleInfo_everyTime.action',
////    		loading: true,
////    		page: false,
//    		where:{
//    			serverId:10001,//区服
//    			role_name:rolenameD, //角色名称
//            	role_guid:roleidD,//角色ID
//            	e_role_info_class_type:Occupation //职业
//    		},
////    		response: {
////    			statusName: 'state',
////    			msgName: 'message',
////    			statusCode: true,
////    			countName: 'total',
////    			dataName: 'rows'
////    		},
////    		request: {
////    			pageName: 'pageIndex',
////    			limitName: 'pageSize'
////    		},
//    		parseData: function(data){
//    			console.log(data)
//    			console.log(data.rows)
//    			exportData = data.rows
//    		},
//    		cols: [
//    			[
//    				{
//                      field: 'account',
//                      title: '账号ID',
//                      width: 75
//                  },
//                  {
//                      field: 'role_giud',
//                      title: '角色ID',
//                      width: 75
//                  },
//                  {
//                      field: 'role_name',
//                      title: '角色名称',
//                      width: 88
//                  },
//                  {
//                      field: 'e_role_info_class_type',
//                      title: '职业',
//                      width: 70
//                  },
//                  {
//                      field: 'e_role_info_GS_value',
//                      title: '战斗力',
//                      width: 75
//                  },
//                  {
//                      field: 'e_money_type_jewel',
//                      title: '钻石数',
//                      width: 75
//                  },
//                  {
//                      field: 'e_money_type_jewel_bind',
//                      title: '紫钻数',
//                      width: 75
//                  },
//                  {
//                      field: 'e_money_type_red_diamond',
//                      title: '红钻数',
//                      width: 75
//                  },
//                  {
//                      field: 'e_money_type_silver2',
//                      title: '金币数',
//                      width: 75
//                  },
//                  {
//                      field: 'e_role_info_exp_level',
//                      title: '等级',
//                      width: 70
//                  },
//                  {
//                      field: 'e_role_info_vip_level',
//                      title: 'VIP等级',
//                      width: 88
//                  },
//                  {
//                      field: 'isLogin',
//                      title: '在线与否',
//                      width: 88
//                  },
//                  {
//                      field: 'e_time_type_logout_time',
//                      title: '最后活跃时间（退出游戏时间）',
//                      width: 100
//                  },
//                  {
//                      field: 'e_time_type_create_time',
//                      title: '创角时间',
//                      width: 88
//                  },
//                  {
//                      field: 'role_name',
//                      title: '总在线天数',
//                      width: 100
//                  },
//                  {
//                      field: 'end_time',
//                      title: '最后付费时间',
//                      width: 115
//                  },
//                  {
//                      field: 'e_money_type_silver',
//                      title: '总付费金额',
//                      width: 100
//                  }
//    			]
//    		],
////    		done: function(res, curr, count) {
////    			exportData =res.data
////    			console.log(exportData)
////       }
//    	});
//    })
    //实时角色表格导出
		$("#export_role").click(function(){
//			table.exportFile(tableIns9.config.id,exportData, 'xls');
////			table.exportExcel({tableIns9.data}, filename+'.'+type, type, null);
			$("#role_table").table2excel({  
                exclude: ".noExl",  
                name: "Excel Document Name",  
                filename: "myFileName",  
                exclude_img: true,  
                exclude_links: true,  
                exclude_inputs: true  
            }); 
		})
    
})

//获取大区
onarea()
function onarea(){
	$.ajax({
		type:"get",
		url:"../getArea.action",
		async:true,
		success:function(json){
			for(var i = 0;i<json.rows.length;i++){
				$(".left_content").append("<input type='checkbox' value="+json.rows[i].areaId+" onclick='checboxs(this)' />"+"<span>"+json.rows[i].areaName+"</span>");
				$(".left_content1").append("<input type='checkbox' value="+json.rows[i].areaId+" onclick='checboxs(this)' />"+"<span>"+json.rows[i].areaName+"</span>");
				$(".left_content2").append("<input type='checkbox' value="+json.rows[i].areaId+" onclick='checboxs(this)' />"+"<span>"+json.rows[i].areaName+"</span>");
				$(".left_content3").append("<input type='checkbox' value="+json.rows[i].areaId+" onclick='checboxs(this)' />"+"<span>"+json.rows[i].areaName+"</span>");
				$(".left_content4").append("<input type='checkbox' value="+json.rows[i].areaId+" onclick='checboxs(this)' />"+"<span>"+json.rows[i].areaName+"</span>");
				$(".left_content5").append("<input type='checkbox' value="+json.rows[i].areaId+" onclick='checboxs(this)' />"+"<span>"+json.rows[i].areaName+"</span>");
				$(".left_content6").append("<input type='checkbox' value="+json.rows[i].areaId+" onclick='checboxs(this)' />"+"<span>"+json.rows[i].areaName+"</span>");
				$(".left_content7").append("<input type='checkbox' value="+json.rows[i].areaId+" onclick='checboxs(this)' />"+"<span>"+json.rows[i].areaName+"</span>");
                $(".left_content8").append("<input type='checkbox' value="+json.rows[i].areaId+" onclick='checboxs(this)' />"+"<span>"+json.rows[i].areaName+"</span>");
                $(".left_content9").append("<input type='checkbox' value="+json.rows[i].areaId+" onclick='checboxs(this)' />"+"<span>"+json.rows[i].areaName+"</span>");
			}
			$(".left_content input").eq(0).prop("checked",true);
			$(".left_content1 input").eq(0).prop("checked",true);
			$(".left_content2 input").eq(0).prop("checked",true);
			$(".left_content3 input").eq(0).prop("checked",true);
			$(".left_content4 input").eq(0).prop("checked",true);
			$(".left_content5 input").eq(0).prop("checked",true);
			$(".left_content6 input").eq(0).prop("checked",true);
			$(".left_content7 input").eq(0).prop("checked",true);
            $(".left_content8 input").eq(0).prop("checked",true);
            $(".left_content9 input").eq(0).prop("checked",true);
			checboxs()
		}
	});
}
//获取服务器

function checboxs(obj){
	var areaid
	if(obj == undefined){
		areaid = $(".left_content input").eq(0).val();
		$(".right_content").empty();
		$(".right_content1").empty();
		$(".right_content2").empty();
		$(".right_content3").empty();
		$(".right_content4").empty();
		$(".right_content5").empty();
		$(".right_content6").empty();
		$(".right_content7").empty();
        $(".right_content8").empty();
        $(".right_content9").empty();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage.action",
			async:true,
			data:{
				pId:areaid
			},
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
					$(".right_content1").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
					$(".right_content2").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
					$(".right_content3").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
					$(".right_content4").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
					$(".right_content5").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
					$(".right_content6").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
					$(".right_content7").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
                    $(".right_content8").append("<input type='checkbox'  value="+json.rows[i].serverId+" name='server' onclick='choose(this)'/>"+"<span>"+json.rows[i].serverName+"</span>");
                    $(".right_content9").append("<input type='checkbox'  value="+json.rows[i].serverId+" name='server' onclick='choose(this)'/>"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
	}
	if($(obj).is(":checked") == true){
		$(obj).siblings().removeAttr("checked");
		$(".right_content").empty();
		$(".right_content1").empty();
		$(".right_content2").empty();
		$(".right_content3").empty();
		$(".right_content4").empty();
		$(".right_content5").empty();
		$(".right_content6").empty();
		$(".right_content7").empty();
        $(".right_content8").empty();
        $(".right_content9").empty();
		areaid = $(obj).val();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage.action",
			async:true,
			data:{
				pId:areaid
			},
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
					$(".right_content1").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
					$(".right_content2").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
					$(".right_content3").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
					$(".right_content4").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
					$(".right_content5").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
					$(".right_content6").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
					$(".right_content7").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
                    $(".right_content8").append("<input type='checkbox'  value="+json.rows[i].serverId+"  name='server' onclick='choose(this)'/>"+"<span>"+json.rows[i].serverName+"</span>");
                    $(".right_content9").append("<input type='checkbox'  value="+json.rows[i].serverId+"  name='server' onclick='choose(this)'/>"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
	}else{
		$(obj).prop("checked",true)
	}
}
function choose(obj){
	var server= document.getElementsByName("server");
    for (var i = 0; i < server.length; i++) {
    	server[i].checked = false;
    }
    $(obj).prop("checked",true)
}
//选择下拉触发
function selects(ob){
	var value = $(ob).val();
	if(value == 0){
		$(".right_content").empty();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage.action",
			async:true,
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content input").prop("disabled",true);
		$(".right_content input").prop("disabled",true);
		$(".left_content input").prop("checked",true);
		$(".right_content input").prop("checked",true);
	}else{
		$(".right_content").empty();
		var areaid = $(".left_content input").eq(0).val();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage.action",
			async:true,
			data:{
				pId:areaid
			},
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content input").prop("disabled",false);
		$(".right_content input").prop("disabled",false);
		$(".left_content input").eq(0).prop("checked",true).siblings().prop("checked",false);
		$(".right_content input").eq(0).prop("checked",true).siblings().prop("checked",false);
	}
}
//跨服开关获取区服
function select1(ob){
	var value = $(ob).val();
	if(value == 0){
		$(".right_content1").empty();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage.action",
			async:true,
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content1").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content1 input").prop("disabled",true);
		$(".right_content1 input").prop("disabled",true);
		$(".left_content1 input").prop("checked",true);
		$(".right_content1 input").prop("checked",true);
	}else{
		$(".right_content1").empty();
		var areaid = $(".left_content1 input").eq(0).val();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage.action",
			async:true,
			data:{
				pId:areaid
			},
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content1").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content1 input").prop("disabled",false);
		$(".right_content1 input").prop("disabled",false);
		$(".left_content1 input").eq(0).prop("checked",true).siblings().prop("checked",false);
		$(".right_content1 input").eq(0).prop("checked",true).siblings().prop("checked",false);
	}
}
//跨服pk开关
function select2(ob){
	var value = $(ob).val();
	if(value == 0){
		$(".right_content2").empty();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage.action",
			async:true,
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content2").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content2 input").prop("disabled",true);
		$(".right_content2 input").prop("disabled",true);
		$(".left_content2 input").prop("checked",true);
		$(".right_content2 input").prop("checked",true);
	}else{
		$(".right_content2").empty();
		var areaid = $(".left_content2 input").eq(0).val();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage.action",
			async:true,
			data:{
				pId:areaid
			},
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content2").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content2 input").prop("disabled",false);
		$(".right_content2 input").prop("disabled",false);
		$(".left_content2 input").eq(0).prop("checked",true).siblings().prop("checked",false);
		$(".right_content2 input").eq(0).prop("checked",true).siblings().prop("checked",false);
	}
}
//提出军团长获取区服
function select3(ob){
	var value = $(ob).val();
	if(value == 0){
		$(".right_content3").empty();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage.action",
			async:true,
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content3").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content3 input").prop("disabled",true);
		$(".right_content3 input").prop("disabled",true);
		$(".left_content3 input").prop("checked",true);
		$(".right_content3 input").prop("checked",true);
	}else{
		$(".right_content3").empty();
		var areaid = $(".left_content3 input").eq(0).val();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage.action",
			async:true,
			data:{
				pId:areaid
			},
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content3").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content3 input").prop("disabled",false);
		$(".right_content3 input").prop("disabled",false);
		$(".left_content3 input").eq(0).prop("checked",true).siblings().prop("checked",false);
		$(".right_content3 input").eq(0).prop("checked",true).siblings().prop("checked",false);
	}
}
//删除物品获取区服
function select4(ob){
	var value = $(ob).val();
	if(value == 0){
		$(".right_content4").empty();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage.action",
			async:true,
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content4").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content4 input").prop("disabled",true);
		$(".right_content4 input").prop("disabled",true);
		$(".left_content4 input").prop("checked",true);
		$(".right_content4 input").prop("checked",true);
	}else{
		$(".right_content4").empty();
		var areaid = $(".left_content4 input").eq(0).val();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage.action",
			async:true,
			data:{
				pId:areaid
			},
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content4").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content4 input").prop("disabled",false);
		$(".right_content4 input").prop("disabled",false);
		$(".left_content4 input").eq(0).prop("checked",true).siblings().prop("checked",false);
		$(".right_content4 input").eq(0).prop("checked",true).siblings().prop("checked",false);
	}
}
//删除货币获取区服
function select8(ob){
    var value = $(ob).val();
    if(value == 0){
        $(".right_content8").empty();
        $.ajax({
            type:"get",
            url:"../getServerListNoPage.action",
            async:true,
            success:function(json){
                for(var i = 0;i<json.rows.length;i++){
                    $(".right_content8").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
                }
            }
        });
        $(".left_content8 input").prop("disabled",true);
        $(".right_content8 input").prop("disabled",true);
        $(".left_content8 input").prop("checked",true);
        $(".right_content8 input").prop("checked",true);
    }else{
        $(".right_content8").empty();
        var areaid = $(".left_content8 input").eq(0).val();
        $.ajax({
            type:"get",
            url:"../getServerListNoPage.action",
            async:true,
            data:{
                pId:areaid
            },
            success:function(json){
                for(var i = 0;i<json.rows.length;i++){
                    $(".right_content8").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
                }
            }
        });
        $(".left_content8 input").prop("disabled",false);
        $(".right_content8 input").prop("disabled",false);
        $(".left_content8 input").eq(0).prop("checked",true).siblings().prop("checked",false);
        $(".right_content8 input").eq(0).prop("checked",true).siblings().prop("checked",false);
    }
}
//角色查询获取区服
function select9(ob){
    var value = $(ob).val();
    if(value == 0){
        $(".role_right_area").empty();
        $.ajax({
            type:"get",
            url:"../getServerListNoPage.action",
            async:true,
            success:function(json){
                for(var i = 0;i<json.rows.length;i++){
                    $(".role_right_area").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
                }
            }
        });
        $(".role_left_area input").prop("disabled",true);
        $(".role_right_area input").prop("disabled",true);
        $(".role_left_area input").prop("checked",true);
        $(".role_right_area input").prop("checked",true);
    }else{
        $(".role_right_area").empty();
        var areaid = $(".role_left_area input").eq(0).val();
        $.ajax({
            type:"get",
            url:"../getServerListNoPage.action",
            async:true,
            data:{
                pId:areaid
            },
            success:function(json){
                for(var i = 0;i<json.rows.length;i++){
                    $(".role_right_area").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
                }
            }
        });
        $(".role_left_area input").prop("disabled",false);
        $(".role_right_area input").prop("disabled",false);
        $(".role_left_area input").eq(0).prop("checked",true).siblings().prop("checked",false);
        $(".role_right_area input").eq(0).prop("checked",true).siblings().prop("checked",false);
    }
}
//重新载入表格获取区服
function select5(ob){
	var value = $(ob).val();
	if(value == 0){
		$(".right_content5").empty();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage.action",
			async:true,
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content5").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content5 input").prop("disabled",true);
		$(".right_content5 input").prop("disabled",true);
		$(".left_content5 input").prop("checked",true);
		$(".right_content5 input").prop("checked",true);
	}else{
		$(".right_content5").empty();
		var areaid = $(".left_content5 input").eq(0).val();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage.action",
			async:true,
			data:{
				pId:areaid
			},
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content5").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content5 input").prop("disabled",false);
		$(".right_content5 input").prop("disabled",false);
		$(".left_content5 input").eq(0).prop("checked",true).siblings().prop("checked",false);
		$(".right_content5 input").eq(0).prop("checked",true).siblings().prop("checked",false);
	}
}
//批量发奖获取区服
function select6(ob){
	var value = $(ob).val();
	if(value == 0){
		$(".right_content6").empty();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage.action",
			async:true,
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content6").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content6 input").prop("disabled",true);
		$(".right_content6 input").prop("disabled",true);
		$(".left_content6 input").prop("checked",true);
		$(".right_content6 input").prop("checked",true);
	}else{
		$(".right_content6").empty();
		var areaid = $(".left_content6 input").eq(0).val();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage.action",
			async:true,
			data:{
				pId:areaid
			},
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content6").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content6 input").prop("disabled",false);
		$(".right_content6 input").prop("disabled",false);
		$(".left_content6 input").eq(0).prop("checked",true).siblings().prop("checked",false);
		$(".right_content6 input").eq(0).prop("checked",true).siblings().prop("checked",false);
	}
}
//清除缓存获取区服
function select7(ob){
	var value = $(ob).val();
	if(value == 0){
		$(".right_content7").empty();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage.action",
			async:true,
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content7").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content7 input").prop("disabled",true);
		$(".right_content7 input").prop("disabled",true);
		$(".left_content7 input").prop("checked",true);
		$(".right_content7 input").prop("checked",true);
	}else{
		$(".right_content7").empty();
		var areaid = $(".left_content7 input").eq(0).val();
		$.ajax({
			type:"get",
			url:"../getServerListNoPage.action",
			async:true,
			data:{
				pId:areaid
			},
			success:function(json){
				for(var i = 0;i<json.rows.length;i++){
					$(".right_content7").append("<input type='checkbox' checked='checked' value="+json.rows[i].serverId+" />"+"<span>"+json.rows[i].serverName+"</span>");
				}
			}
		});
		$(".left_content7 input").prop("disabled",false);
		$(".right_content7 input").prop("disabled",false);
		$(".left_content7 input").eq(0).prop("checked",true).siblings().prop("checked",false);
		$(".right_content7 input").eq(0).prop("checked",true).siblings().prop("checked",false);
	}
}
//发送设置主播账号指令
function postsend(){
	$("body").mLoading("show");
	var server = $(".right_content input");
	var arr = [];
	for(var i = 0;i<server.length;i++){
		if(server[i].checked == true){
			arr.push(server[i].value)
		}
	}
	var jsons = arr.join(',');
	var account = $("#accountID").val();
	$.ajax({
		type:"get",
		url:"../postSendRadioHost.action",
		async:true,
		data:{
			serverId:jsons,
			userId:account
		},
		success:function(json){
			$("body").mLoading("hide");
			$(".main_right").text(json.message)
		}
	});
}
//发送跨服开关指令
function postsend1(){
	$("body").mLoading("show");
	var server = $(".right_content1 input");
	var arr = [];
	for(var i = 0;i<server.length;i++){
		if(server[i].checked == true){
			arr.push(server[i].value)
		}
	}
	var jsons = arr.join(',');
	var open = $("#gateId").val();
	$.ajax({
		type:"get",
		url:"../postSendCross.action",
		async:true,
		data:{
			serverId:jsons,
//			isOpen:open////////////////////////////////////////////////////
		},
		success:function(json){
			$("body").mLoading("hide");
			$(".main_right1").text(json.message)
		}
	});
}
//发送跨服PK开关指令
function postsend2(){
	$("body").mLoading("show");
	var server = $(".right_content2 input");
	var arr = [];
	for(var i = 0;i<server.length;i++){
		if(server[i].checked == true){
			arr.push(server[i].value)
		}
	}
	var jsons = arr.join(',');
	var open = $("#open2").val();
	$.ajax({
		type:"get",
		url:"../postSendCrossPK.action",
		async:true,
		data:{
			serverId:jsons,
			isOpen:open
		},
		success:function(json){
			$("body").mLoading("hide");
			$(".main_right2").text(json.message)
		}
	});
}
//发送踢出军团长指令
function postsend3(){
	$("body").mLoading("show");
	var server = $(".right_content3 input");
	var arr = [];
	for(var i = 0;i<server.length;i++){
		if(server[i].checked == true){
			arr.push(server[i].value)
		}
	}
	var jsons = arr.join(',');
	var guid = $("#GUID").val();
	$.ajax({
		type:"get",
		url:"../postSendKickOutChief.action",
		async:true,
		data:{
			serverId:jsons,
			legionGuid:guid
		},
		success:function(json){
			$("body").mLoading("hide");
			$(".main_right3").text(json.message)
		}
	});
}
//发送删除物品指令
function postsend4(){
	$("body").mLoading("show");
	var server = $(".right_content4 input");
	var arr = [];
	for(var i = 0;i<server.length;i++){
		if(server[i].checked == true){
			arr.push(server[i].value)
		}
	}
	var jsons = arr.join(',');
	var roleid = $("#roleId").val();
	var type = $("#knapsack_type").val();
	var start = $("#start_lattice").val();
	var end = $("#end_lattice").val();
	$.ajax({
		type:"get",
		url:"../postSendDelItem.action",
		async:true,
		data:{
			serverId:jsons,
			roleId:roleid,
			bagType:type,
			bagSlotBegin:start,
			bagSlotEnd:end
		},
		success:function(json){
			$("body").mLoading("hide");
			$(".main_right4").text(json.message)
		}
	});
}

//重新载入表格
function postsend5(){
	$("body").mLoading("show");
	var server = $(".right_content5 input");
	var arr = [];
	for(var i = 0;i<server.length;i++){
		if(server[i].checked == true){
			arr.push(server[i].value)
		}
	}
	var jsons = arr.join(',');
	$.ajax({
		type:"get",
		url:"../postSendReloadCsv.action",
		async:true,
		data:{
			serverId:jsons,
		},
		success:function(json){
			$("body").mLoading("hide");
			$(".main_right5").text(json.message)
		}
	});
}
//附件邮件
function postsend6(){
	$("body").mLoading("show");
	var server = $(".right_content6 input");
	var arr = [];
	for(var i = 0;i<server.length;i++){
		if(server[i].checked == true){
			arr.push(server[i].value)
		}
	}
	var jsons = arr.join(',');
	var title = $("#email_title").val();
	var content = $("#email_content").val();
	$.ajax({
		type:"get",
		url:"../postSendRoleReward.action",
		async:true,
		data:{
			serverId:jsons,
			emailTitle:title,
			emailContent:content
		},
		success:function(json){
			$("body").mLoading("hide");
			$(".form_bottom").text(json.message)
		}
	});
}

//发送清除玩家缓存指令
function postsend7(){
	$("body").mLoading("show");
	var server = $(".right_content7 input");
	var arr = [];
	for(var i = 0;i<server.length;i++){
		if(server[i].checked == true){
			arr.push(server[i].value)
		}
	}
	var jsons = arr.join(',');
	var roles = $("#roles").val();
	$.ajax({
		type:"get",
		url:"../postSendDelCache.action",
		async:true,
		data:{
			serverId:jsons,
			roleId:roles
		},
		success:function(json){
			$("body").mLoading("hide");
			$(".main_right7").text(json.message)
		}
	});
}
function delet(){
	$(".main_right").html('');
}
function delet1(){
	$(".main_right1").html('');
}
function delet2(){
	$(".main_right2").html('');
}
function delet3(){
	$(".main_right3").html('');
}
function delet4(){
	$(".main_right4").html('');
}
function delet5(){
	$(".main_right5").html('');
}
function delet6(){
	$(".form_bottom").html('');
}
function delet7(){
	$(".main_right7").html('');
}
function delet9(){
	$(".main_right9").html('');
}

//实时角色查询
var exportData;
var tableIns9
$("#query_role").click(function(){
	var flag=false
    var serverChoose
    var roleidD = $("#roleidD").val();//删除-角色ID
    var rolenameD = $("#rolename").val();//删除-角色名称
    var server = $(".role_right_area input");
//  console.log(server)
    for(var i = 0;i<server.length;i++){
    	if(server[i].checked == true){
    		serverChoose=server[i].value
    	}
    }
	var realRoleName = $("#realRoleName").val();//角色名称
	var realRoleId = $("#realRoleId").val();//角色ID
	console.log(realRoleId)
	var Occupation = $("#Occupation").val();//职业
	if(serverChoose==undefined){
		serverChoose=null
	}
	$("body").mLoading("show")
    $("#role_table").bootstrapTable('destroy');
    var t = $("#role_table").bootstrapTable({
        url: "../queryRoleInfo_everyTime.action", 
        method: 'get',
        cache: false,
//        contentType: "application/json", //post请求的话就加上这个句话
        striped: false, //设置为 true 会有隔行变色效果
        undefinedText: "0", //当数据为 undefined 时显示的字符
        pagination: false, //分页
        paginationLoop: false, //设置为 true 启用分页条无限循环的功能。
        showToggle: false, //是否显示 切换试图（table/card）按钮
        showColumns: false, //是否显示 内容列下拉框
        search: false, //显示搜索框
        data_local: "zh-US", 
        queryParams: function(params) { 
            return { //这里的params是table提供的
            	serverId:serverChoose,//区服
//            	serverId:10001,//区服-测试区服ID
    			role_name:realRoleName, //角色名称
            	role_guid:realRoleId,//角色ID
            	e_role_info_class_type:Occupation //职业
            };
        },
        responseHandler: function (res) {
             console.log(res)
            return {
//                "total": res.totalCount,
                "rows": res.rows
            }
            },
        idField: "logId", //指定主键列
        columns: [  //设置表头
            [
            	{
                    field: 'account',
                    title: '账号ID',
//                    width: 50,
                    align:"center",
                    formatter:function (value,rows,index) {
                        return "<span>&nbsp;</span> "+ rows.account
                    }
                },
                {
                    field: 'role_guid',
                    title: '角色ID',
//                    width: 50,
                    align:"center",
                    formatter:function (value,rows,index) {
                        return "<span>&nbsp;</span> "+ rows.role_guid
                    }
                },
                {
                    field: 'role_name',
                    title: '角色名称',
//                    width: 87,
//                    width: 56,
                    align:"center"
                },
                {
                    field: 'e_role_info_class_type',
                    title: '职业',
//                    width: 40,
                    align:"center"
                },
                {
                    field: 'e_role_info_GS_value',
                    title: '战斗力',
//                    width: 50,
                    align:"center"
                },
                {
                    field: 'e_money_type_jewel',
                    title: '钻石数',
//                    width: 50,
                    align:"center"
                },
                {
                    field: 'e_money_type_jewel_bind',
                    title: '紫钻数',
//                    width: 50,
                    align:"center"
                },
                {
                    field: 'e_money_type_red_diamond',
                    title: '红钻数',
//                    width: 68,
                    align:"center"
                },
                {
                    field: 'e_money_type_silver2',
                    title: '金币数',
//                    width: 68,
                    align:"center"
                },
                {
                    field: 'e_role_info_exp_level',
                    title: '等级',
//                    width: 40,
                    align:"center"
                },
                {
                    field: 'e_role_info_vip_level',
                    title: 'VIP等级',
//                    width: 68,
                    align:"center"
                },
                {
                    field: 'isLogin',
                    title: '在线与否',
//                    width: 72,
                    align:"center",
                    formatter:function (value,rows,index) {
                        if(rows.isLogin == 1){
                        	return "在线"
                        }
                        if(rows.isLogin == 2){
                        	return "不在线"
                        }
                    }
                },
                {
                    field: 'e_time_type_logout_time',
                    title: '最后活跃时间（退出游戏时间）',
//                    width: 188,
                    align:"center"
                },
                {
                    field: 'e_time_type_create_time',
                    title: '创角时间',
//                    width: 125,
                    align:"center"
                },
                {
                    field: 'e_role_info_total_login_days',
                    title: '总在线天数',
//                    width: 89,
                    align:"center"
                },
                {
                    field: 'end_time',
                    title: '最后付费时间',
//                    width: 125,
                    align:"center"
                },
                {
                    field: 'e_money_type_silver',
                    title: '总付费金额',
//                    width: 80,
                    align:"center"
                }
            ]],
        formatNoMatches: function () {
            return "没有相关的匹配结果";
        },
        formatLoadingMessage: function () {
            return "请稍等，正在加载中...";
        },
        formatShowingRows: function (a, b, c) {
            return "显示第 " + a + "到第 " + b + " 条记录，总共 " + c + " 条记录";
        },
        formatRecordsPerPage: function (a) {
            return "每页显示 " + a + " 条记录";
        },
        onLoadSuccess: function (row) {
            //   console.log("加载成功时执行");
        },
        // onLoadError: function (row) {
        //     alert("加载数据失败");
        // },
    });
    t.on('load-success.bs.table', function(data) {
        $("body").mLoading("hide")
        $(".pull-right").css("display", "block");
        $("#role_table tbody tr").css("background-color", "#363636")
//        $("#role_table tbody tr").css("margin-top","10px")
    });
})