layui.use(['element', 'table', 'layer', 'upload'], function () {
    var element = layui.element;
    var table = layui.table;
    var layer = layui.layer;
    var upload = layui.upload;
    var exportData = ""; //定义全局变量
    var exportDataBranch = "";
    var isHot = "";//定义全局变量-判断是否为热更新
    // element.init();
    var num='活动编号<p style="float:right;color:white;margin-right:-15px;opacity: .1;"><i class="	fa fa-chevron-right"></i></p>'
    var id='活动ID<p style="float:right;color:white;margin-right:-15px;opacity: .1;"><i class="	fa fa-chevron-right"></i></p>'
    var type='活动类型<p style="float:right;color:white;margin-right:-15px;opacity: .1;"><i class="	fa fa-chevron-right"></i></p>'
    var name='活动名称<p style="float:right;color:white;margin-right:-15px;opacity: .1;"><i class="	fa fa-chevron-right"></i></p>'
    var starttime='开始时间<p style="float:right;color:white;margin-right:-15px;opacity: .1;"><i class="	fa fa-chevron-right"></i></p>'
    var cyclequery='周期参数<p style="float:right;color:white;margin-right:-15px;opacity: .1;"><i class="	fa fa-chevron-right"></i></p>'
    var duration='持续天数<p style="float:right;color:white;margin-right:-15px;opacity: .1;"><i class="	fa fa-chevron-right"></i></p>'
    var cycleday='循环天数<p style="float:right;color:white;margin-right:-15px;opacity: .1;"><i class="	fa fa-chevron-right"></i></p>'
    var paramArr5='生效服务器类型<p style="float:right;color:white;margin-right:-15px;opacity: .1;"><i class="	fa fa-chevron-right"></i></p>'
    var annouce='发布状态<p style="float:right;color:white;margin-right:-15px;opacity: .1;"><i class="	fa fa-chevron-right"></i></p>'
    var opration='操作<p style="float:right;color:white;margin-right:-15px;opacity: .1;"><i class="	fa fa-chevron-right"></i></p>'
    //第一个实例
    $('.btn2f').css("background","rgba(255, 251, 240, 0.3)")
    var activity = table.render({
        elem: '#demo',
        url: '../getActivityList.action', //数据接口     ,
//        page: true //开启分页
//        ,
        loading: true,
        multiple: true,
        number: 0,
        response: {
            statusName: 'state',
            msgName: 'message',
            statusCode: true,
            countName: 'total',
            dataName: 'data'

        },
        cols: [
            [ //表头
                {
                    type: 'checkbox',

                }, {
                field: 'activityId',
                title: num,
                minWidth: 150,
            }, {
                field: 'attributeId',
                title: id,
                minWidth: 150,

            }, {
                field: 'activityType',
                title: type,
                minWidth: 150,

            }, {
                field: 'activityName',
                title: name,
                minWidth: 150,

            }, {
                field: 'startTime',
                title: starttime,
                minWidth: 250,

            }, {
                field: 'cycleParamNum',
                title: cyclequery,
                minWidth: 150,

            }, {
                field: 'durationDays',
                title: duration,
                minWidth: 150,
                templet: function (d) {
                	if(d.durationDays == ""){
                		return "未配置"
                	}else{
                		return d.durationDays
                	}
                }
            }, {
                field: 'cycleDays',
                title: cycleday,
                minWidth: 150,
                templet: function (d) {
                	if(d.cycleDays == ""){
                		return "未配置"
                	}else{
                		return d.cycleDays
                	}
                }

            },{
                field: 'paramArr5',
                title: paramArr5,
                minWidth: 150,

            }, {
                field: 'state',
                title: annouce,
                minWidth: 150,

                templet: function (d) {
                    var type
                    // if(d.status== "") {
                    //    "<span style='color:#CC0000;' class='noAnnunoce' ></span>"
                    //    return  false
                    // }
                    if (d.state == null) {
                        return type = "<span style='color:#CC0000;' class='noAnnunoce' ></span>"

                    }
                    if (d.state == 0) {
                        return type = "<span style='color:red;' class='noAnnunoce' >不可发布</span>"

                    }
                    if (d.state == 1) {
                        return type = "<span style='color:green;' class='annunoce' >发布异常</span>"

                    }
                    if (d.state == 2) {
                        return type = "<span style='color:green;' class='annunoce' >已发布</span>"

                    }
                    if (d.state == 3) {
                        return type = "<span style='color:red;' class='annunoce' >未发布</span>"

                    }
                }
            }, {
                field: 'del',
                title: opration,
                width: 400,
                templet: function (value) {
                    return `<span class='start_up' lay-event='edits' style='color: #99CCFF; '>编辑详情</span>
                            <span class='start_up' lay-event='search' style='color: #3366FF;margin-left:25px;margin-right:25px;'>查询服务器</span>
                            <span class='start_up' lay-event='del' style='color: #CC0000;'>删除</span>`
                }
            }
            ]
        ],
        done: function (res, curr, count) {
        	$('.layui-table-body').css('overflow','inherit')
        	$('.layui-table-body layui-table-main').css('overflow','inherit')
        	$('.layui-table-header').css('overflow','inherit')
        	$('.layui-table-box').css('overflow','inherit')
            exportData = res.data; //获取表格中的数据集合。
        }

    });
    $('#export').click(function(){
    	var newServer=[]
    	var newObj={}
    	var serverRight = $(".right_content input")
    	for (var i = 0; i < serverRight.length; i++) {
            if (serverRight[i].checked === true) {
            	newObj.serverId=serverRight[i].value
            	newServer.push(JSON.parse(JSON.stringify(newObj)))
            }
         }
    	if(newServer.length==0){
    		alert("此区没有服务器")
    	}else{
    	       var serverTable=table.render({
    	            elem: '#demoBranch',//////
    	            id: 'demoBranch',//////////
    	            title:'服务器表'
    	            , data:newServer
    	            , cols: [[
    	              {
    	                field: 'serverId',
    	                title: '服务器ID'
    	              }
    	            ]],
    	            done: function (res, curr, count) {
    	                exportData = res.data; //获取表格中的数据集合。
    	            }
    	          });
    	   table.exportFile(serverTable.config.id,exportData,'xls') 	
    	}
    })
    $('#exportB').click(function(){
    	var newServer=[]
    	var newObj={}
    	var serverRight = $(".left_contentB input")
    	for (var i = 0; i < serverRight.length; i++) {
            if (serverRight[i].checked === true) {
            	newObj.serverId=serverRight[i].value
            	newServer.push(JSON.parse(JSON.stringify(newObj)))
            }
         }
    	if(newServer.length==0){
    		alert("此区没有服务器")
    	}else{
    	       var serverTable=table.render({
    	            elem: '#demoBranch',//////
    	            id: 'demoBranch',//////////
    	            title:'服务器表'
    	            , data:newServer
    	            , cols: [[
    	              {
    	                field: 'serverId',
    	                title: '服务器ID'
    	              }
    	            ]],
    	            done: function (res, curr, count) {
    	                exportData = res.data; //获取表格中的数据集合。
    	            }
    	          });
    	   table.exportFile(serverTable.config.id,exportData,'xls') 	
    	}
    })
    var activeid_id = 100095
    var activityBranch = table.render({
        elem: '#demoBranch'
        // , height: 312
        ,
        url: '../getActivityBranchTemplateList.action' //数据接口
        ,
        where: {
            isTemplate: 0,
            pId: activeid_id,


        },
        response: {
            statusName: 'state',
            msgName: 'message',
            statusCode: true,
            countName: 'total',
            dataName: 'data'
        },

        request: {
            pageName: 'pageIndex',
            limitName: 'pageSize'
        },
        cols: [
            [ //表头

                {
                    field: 'activityId',
                    title: '序号',
                    width: 150,
                    edit: 'text'
                },
                {
                    field: 'cycleIndex',
                    title: '周期内序号',
                    width: 150,
                    edit: 'text'
                }, {
                field: 'reachCondition',
                title: '达成条件',
                edit: 'text',
                edit: 'text'
            }, {
                field: 'reward',
                title: '奖励',
                edit: 'text'
            }, {
                field: 'textImage',
                title: '文件图片资源',
                edit: 'text'
            }, {
                field: 'paramArr1',
                title: '保留参数1',
                edit: 'text'
            }, {
                field: 'paramArr2',
                title: '保留参数2',
                edit: 'text'
            }, {
                field: 'paramArr3',
                title: '保留参数3',
                edit: 'text'
            }, 
//            {
//                field: 'paramArr4',
//                title: '保留参数4',
//                edit: 'text'
//            },
            {
                field: 'paramArr5',
                title: '保留参数5',
                edit: 'text'
            }, {
                field: 'operaTion',
                title: '操作',
                width: 350,
                templet: function (value) {
                    return `
                        <span id='jiangli' onclick="jiangli_pei()" lay-event='reise' style="margin-right:20px;color:#2fa88d;">奖励配置</span> 
                        <span class='moveUpOrDown up' lay-event='upload'  style="margin-right:20px;color:#82ab2a;">上移</span> 
                        <span class='moveUpOrDown down' lay-event='download'  style="margin-right:20px;color:#9e254f;">下移</span>
                        <span class='start_up' lay-event='del' style="color:#e63838;">删除</span> 
                        
                        `
                }
            }

            ]
        ],
        done: function (res, curr, count) {
            $("[lay-id='demoBranch']").css('display', 'none');
            $('.layui-table-body').css('overflow','inherit')
            $('.layui-table-body layui-table-main').css('overflow','inherit')
        	$('.layui-table-header').css('overflow','inherit')
        	$('.layui-table-box').css('overflow','inherit')
            exportDataBranch = res.data; //获取表格中的数据集合。
        }
    });


    // 通过ID搜索 活动名称
    $("#header_title_seach").click(function () {
        // alert(1)
        var searchid = $("#seachactiver_id").val();
        var searchanme = $("#seachactiver_name").val();
        var tableIns = table.render({
            elem: '#demo',
            url: '../getActivityList.action',
            loading: true,
//            page: true,
            where: {
                attributeId: searchid,
                activityName: searchanme,
            },
            response: {
                statusName: 'state',
                msgName: 'message',
                statusCode: true,
                countName: 'total',
                dataName: 'data'
            },

            cols: [
                [ //表头
                    {
                        type: 'checkbox',

                    }, {
                    field: 'activityId',
                    title: num,
                    minWidth: 150,
                }, {
                    field: 'attributeId',
                    title: id,
                    minWidth: 150,

                }, {
                    field: 'activityType',
                    title: type,
                    minWidth: 150,

                }, {
                    field: 'activityName',
                    title: name,
                    minWidth: 150,

                }, {
                    field: 'startTime',
                    title: starttime,
                    minWidth: 250,

                }, {
                    field: 'cycleParamNum',
                    title: cyclequery,
                    minWidth: 150,

                }, {
                    field: 'durationDays',
                    title: duration,
                    minWidth: 150,
                    templet: function (d) {
                    	if(d.durationDays == ""){
                    		return "未配置"
                    	}else{
                    		return d.durationDays
                    	}
                    }

                }, {
                    field: 'cycleDays',
                    title: cycleday,
                    minWidth: 150,
                    templet: function (d) {
                    	if(d.cycleDays == ""){
                    		return "未配置"
                    	}else{
                    		return d.cycleDays
                    	}
                    }
                }, {
                    field: 'paramArr5',
                    title: paramArr5,
                    minWidth: 150,

                }, {
                    field: 'state',
                    title: annouce,
                    minWidth: 150,

                    templet: function (d) {
                        var type
                        // if(d.status== "") {
                        //    "<span style='color:#CC0000;' class='noAnnunoce' ></span>"
                        //    return  false
                        // }
                        if (d.state == null) {
                            return type = "<span style='color:#CC0000;' class='noAnnunoce' ></span>"

                        }
                        if (d.state == 0) {
                            return type = "<span style='color:red;' class='noAnnunoce' >不可发布</span>"

                        }
                        if (d.state == 1) {
                            return type = "<span style='color:green;' class='annunoce' >发布异常</span>"

                        }
                        if (d.state == 2) {
                            return type = "<span style='color:green;' class='annunoce' >已发布</span>"

                        }
                        if (d.state == 3) {
                            return type = "<span style='color:red;' class='annunoce' >未发布</span>"

                        }
                    }
                }, {
                    field: 'del',
                    title: opration,
                    width: 400,
                    templet: function (value) {
                        return `<span class='start_up' lay-event='edits' style='color: #99CCFF; '>编辑详情</span>
                                <span class='start_up' lay-event='search' style='color: #3366FF;margin-left:25px;margin-right:25px;'>查询服务器</span>
                                <span class='start_up' lay-event='del' style='color: #CC0000;'>删除</span>`
                    }
                }
                ]
            ],
            done: function (res, curr, count) {
            	$('.layui-table-body').css('overflow','inherit')
            	$('.layui-table-body layui-table-main').css('overflow','inherit')
            	$('.layui-table-header').css('overflow','inherit')
            	$('.layui-table-box').css('overflow','inherit')
            }
        });
    })
    //通过状态搜索--不能发布的
    $('.btn1f').click(function () {
    	$('#but-hotUpdate').css("display","none");
    	$('.liebiao_fabu_btn').css("background","none")
       $('.btn1f').css("background","rgba(255, 251, 240, 0.3)")
        var states = $('.btn1f').val()
        console.log(states)
        var tableIns = table.render({
            elem: '#demo',
            url: '../getActivityList.action',
            loading: true,
//            page: true,
            where: {
                state: states,

            },
            response: {
                statusName: 'state',
                msgName: 'message',
                statusCode: true,
                countName: 'total',
                dataName: 'data'
            },

            cols: [
                [ //表头
                    {
                        type: 'checkbox',

                    }, {
                    field: 'activityId',
                    title: num,
                    minWidth: 150,
                }, {
                    field: 'attributeId',
                    title: id,
                    minWidth: 150,

                }, {
                    field: 'activityType',
                    title: type,
                    minWidth: 150,

                }, {
                    field: 'activityName',
                    title: name,
                    minWidth: 150,

                }, {
                    field: 'startTime',
                    title: starttime,
                    minWidth: 250,

                }, {
                    field: 'cycleParamNum',
                    title: cyclequery,
                    minWidth: 150,

                }, {
                    field: 'durationDays',
                    title: duration,
                    minWidth: 150,
                    templet: function (d) {
                    	if(d.durationDays == ""){
                    		return "未配置"
                    	}else{
                    		return d.durationDays
                    	}
                    }
                }, {
                    field: 'cycleDays',
                    title: cycleday,
                    minWidth: 150,
                    templet: function (d) {
                    	if(d.cycleDays == ""){
                    		return "未配置"
                    	}else{
                    		return d.cycleDays
                    	}
                    }
                }, {
                    field: 'paramArr5',
                    title: paramArr5,
                    minWidth: 150,

                }, {
                    field: 'state',
                    title: annouce,
                    minWidth: 150,

                    templet: function (d) {
                        var type
                        // if(d.status== "") {
                        //    "<span style='color:#CC0000;' class='noAnnunoce' ></span>"
                        //    return  false
                        // }
                        if (d.state == null) {
                            return type = "<span style='color:#CC0000;' class='noAnnunoce' ></span>"

                        }
                        if (d.state == 0) {
                            return type = "<span style='color:red;' class='noAnnunoce' >不可发布</span>"

                        }
                        if (d.state == 1) {
                            return type = "<span style='color:green;' class='annunoce' >发布异常</span>"

                        }
                        if (d.state == 2) {
                            return type = "<span style='color:green;' class='annunoce' >已发布</span>"

                        }
                        if (d.state == 3) {
                            return type = "<span style='color:red;' class='annunoce' >未发布</span>"

                        }
                    }
                }, {
                    field: 'del',
                    title: opration,
                    width: 400,
                    templet: function (value) {
                        return `<span class='start_up' lay-event='edits' style='color: #99CCFF; '>编辑详情</span>
                                <span class='start_up' lay-event='search' style='color: #3366FF;margin-left:25px;margin-right:25px;'>查询服务器</span>
                                <span class='start_up' lay-event='del' style='color: #CC0000;'>删除</span>`
                    }
                }
                ]
            ],
            done: function (res, curr, count) {
            	$('.layui-table-body').css('overflow','inherit')
            	$('.layui-table-body layui-table-main').css('overflow','inherit')
            	$('.layui-table-header').css('overflow','inherit')
            	$('.layui-table-box').css('overflow','inherit')
            }
        });
    })
    //通过状态搜索--全部
    $('.btn2f').click(function () {
    	$('#but-hotUpdate').css("display","none");
    	$('.liebiao_fabu_btn').css("background","none")
    	$('#but-removeBatch').css("display","none")  //非未发布状态下隐藏发布按钮
    	$('.btn2f').css("background","rgba(255, 251, 240, 0.3)")
//        console.log(states)
        var tableIns = table.render({
            elem: '#demo',
            url: '../getActivityList.action',
            loading: true,
//            page: true,
//            where: {
//                state: states,
//
//            },
            response: {
                statusName: 'state',
                msgName: 'message',
                statusCode: true,
                countName: 'total',
                dataName: 'data'
            },

            cols: [
                [ //表头
                    {
                        type: 'checkbox',

                    }, {
                    field: 'activityId',
                    title: num,
                    minWidth: 150,
                }, {
                    field: 'attributeId',
                    title: id,
                    minWidth: 150,

                }, {
                    field: 'activityType',
                    title: type,
                    minWidth: 150,

                }, {
                    field: 'activityName',
                    title: name,
                    minWidth: 150,

                }, {
                    field: 'startTime',
                    title: starttime,
                    minWidth: 250,

                }, {
                    field: 'cycleParamNum',
                    title: cyclequery,
                    minWidth: 150,

                }, {
                    field: 'durationDays',
                    title: duration,
                    minWidth: 150,
                    templet: function (d) {
                    	if(d.durationDays == ""){
                    		return "未配置"
                    	}else{
                    		return d.durationDays
                    	}
                    }
                }, {
                    field: 'cycleDays',
                    title: cycleday,
                    minWidth: 150,
                    templet: function (d) {
                    	if(d.cycleDays == ""){
                    		return "未配置"
                    	}else{
                    		return d.cycleDays
                    	}
                    }
                }, {
                    field: 'paramArr5',
                    title: paramArr5,
                    minWidth: 150,

                }, {
                    field: 'state',
                    title: annouce,
                    minWidth: 150,

                    templet: function (d) {
                        var type
                        // if(d.status== "") {
                        //    "<span style='color:#CC0000;' class='noAnnunoce' ></span>"
                        //    return  false
                        // }
                        if (d.state == null) {
                            return type = "<span style='color:#CC0000;' class='noAnnunoce' ></span>"

                        }
                        if (d.state == 0) {
                            return type = "<span style='color:red;' class='noAnnunoce' >不可发布</span>"

                        }
                        if (d.state == 1) {
                            return type = "<span style='color:green;' class='annunoce' >发布异常</span>"

                        }
                        if (d.state == 2) {
                            return type = "<span style='color:green;' class='annunoce' >已发布</span>"

                        }
                        if (d.state == 3) {
                            return type = "<span style='color:red;' class='annunoce' >未发布</span>"

                        }
                    }
                }, {
                    field: 'del',
                    title: opration,
                    width: 400,
                    templet: function (value) {
                        return `<span class='start_up' lay-event='edits' style='color: #99CCFF; '>编辑详情</span>
                                <span class='start_up' lay-event='search' style='color: #3366FF;margin-left:25px;margin-right:25px;'>查询服务器</span>
                                <span class='start_up' lay-event='del' style='color: #CC0000;'>删除</span>`
                    }
                }
                ]
            ],
            done: function (res, curr, count) {
            	$('.layui-table-body').css('overflow','inherit')
            	$('.layui-table-body layui-table-main').css('overflow','inherit')
            	$('.layui-table-header').css('overflow','inherit')
            	$('.layui-table-box').css('overflow','inherit')
            }
        });
    })

    // 已发布的
    $('.btn3f').click(function () {
    	$('#but-hotUpdate').css("display","none");
    	$('.liebiao_fabu_btn').css("background","none")
    	$('#but-removeBatch').css("display","none")  //非未发布状态下隐藏发布按钮
    	$('.btn3f').css("background","rgba(255, 251, 240, 0.3)")
        var states = $('.btn3f').val()
        console.log(states)
        var tableIns = table.render({
            elem: '#demo',
            url: '../getActivityList.action',
            loading: true,
//            page: true,
            where: {
                state: states,

            },
            response: {
                statusName: 'state',
                msgName: 'message',
                statusCode: true,
                countName: 'total',
                dataName: 'data'
            },
            cols: [
                [ //表头
                    {
                        type: 'checkbox',

                    }, {
                    field: 'activityId',
                    title: num,
                    minWidth: 150,
                }, {
                    field: 'attributeId',
                    title: id,
                    minWidth: 150,

                }, {
                    field: 'activityType',
                    title: type,
                    minWidth: 150,

                }, {
                    field: 'activityName',
                    title: name,
                    minWidth: 150,

                }, {
                    field: 'startTime',
                    title: starttime,
                    minWidth: 250,

                }, {
                    field: 'cycleParamNum',
                    title: cyclequery,
                    minWidth: 150,

                }, {
                    field: 'durationDays',
                    title: duration,
                    minWidth: 150,
                    templet: function (d) {
                    	if(d.durationDays == ""){
                    		return "未配置"
                    	}else{
                    		return d.durationDays
                    	}
                    }
                }, {
                    field: 'cycleDays',
                    title: cycleday,
                    minWidth: 150,
                    templet: function (d) {
                    	if(d.cycleDays == ""){
                    		return "未配置"
                    	}else{
                    		return d.cycleDays
                    	}
                    }
                }, {
                    field: 'paramArr5',
                    title: paramArr5,
                    minWidth: 150,

                }, {
                    field: 'state',
                    title: annouce,
                    minWidth: 150,

                    templet: function (d) {
                        var type
                        // if(d.status== "") {
                        //    "<span style='color:#CC0000;' class='noAnnunoce' ></span>"
                        //    return  false
                        // }
                        if (d.state == null) {
                            return type = "<span style='color:#CC0000;' class='noAnnunoce' ></span>"

                        }
                        if (d.state == 0) {
                            return type = "<span style='color:red;' class='noAnnunoce' >不可发布</span>"

                        }
                        if (d.state == 1) {
                            return type = "<span style='color:green;' class='annunoce' >发布异常</span>"

                        }
                        if (d.state == 2) {
                            return type = "<span style='color:green;' class='annunoce' >已发布</span>"

                        }
                        if (d.state == 3) {
                            return type = "<span style='color:red;' class='annunoce' >未发布</span>"

                        }
                    }
                }, {
                    field: 'del',
                    title: opration,
                    width: 400,
                    templet: function (value) {
                        return `<span class='start_up' lay-event='edits' style='color: #99CCFF; '>编辑详情</span>
                                <span class='start_up' lay-event='search' style='color: #3366FF;margin-left:25px;margin-right:25px;'>查询服务器</span>
                                <span class='start_up' lay-event='del' style='color: #CC0000;'>删除</span>`
                    }
                }
                ]
            ],
            done: function (res, curr, count) {
            	$('.layui-table-body').css('overflow','inherit')
            	$('.layui-table-body layui-table-main').css('overflow','inherit')
            	$('.layui-table-header').css('overflow','inherit')
            	$('.layui-table-box').css('overflow','inherit')
            }
        });
    })


    //通过状态搜索--未发布
    $('.btn4f').click(function () {
    	if(isHot == "88"){//--热更新
    		$('#but-removeBatch').css("display","none")
    		$('#but-hotUpdate').css("display","block");
    	}else{
    		$('#but-removeBatch').css("display","block")
    		$('#but-hotUpdate').css("display","none");
    	}
    	$('.liebiao_fabu_btn').css("background","none")
//    	$('#but-removeBatch').css("display","block")  //未发布状态下显示发布按钮
    	$('.btn4f').css("background","rgba(255, 251, 240, 0.3)")
        var states = $('.btn4f').val()
        console.log(states)
        var tableIns = table.render({
            elem: '#demo',
            url: '../getActivityList.action',
            loading: true,
//            page: true,
            where: {
                state: states,

            },
            response: {
                statusName: 'state',
                msgName: 'message',
                statusCode: true,
                countName: 'total',
                dataName: 'data'
            },
            cols: [
                [ //表头
                    {
                        type: 'checkbox',  //--隐藏前端勾选

                    }, 
                    {
                    field: 'activityId',
                    title: num,
                    minWidth: 150,
                }, {
                    field: 'attributeId',
                    title: id,
                    minWidth: 150,

                }, {
                    field: 'activityType',
                    title: type,
                    minWidth: 150,

                }, {
                    field: 'activityName',
                    title: name,
                    minWidth: 150,

                }, {
                    field: 'startTime',
                    title: starttime,
                    minWidth: 250,

                }, {
                    field: 'cycleParamNum',
                    title: cyclequery,
                    minWidth: 150,

                }, {
                    field: 'durationDays',
                    title: duration,
                    minWidth: 150,
                    templet: function (d) {
                    	if(d.durationDays == ""){
                    		return "未配置"
                    	}else{
                    		return d.durationDays
                    	}
                    }
                }, {
                    field: 'cycleDays',
                    title: cycleday,
                    minWidth: 150,
                    templet: function (d) {
                    	if(d.cycleDays == ""){
                    		return "未配置"
                    	}else{
                    		return d.cycleDays
                    	}
                    }
                }, {
                    field: 'paramArr5',
                    title: paramArr5,
                    minWidth: 150,

                }, {
                    field: 'state',
                    title: annouce,
                    minWidth: 150,

                    templet: function (d) {
                    	console.log(d)
                        var type
                        // if(d.status== "") {
                        //    "<span style='color:#CC0000;' class='noAnnunoce' ></span>"
                        //    return  false
                        // }
                        if (d.state == null) {
                            return type = "<span style='color:#CC0000;' class='noAnnunoce' ></span>"

                        }
                        if (d.state == 0) {
                            return type = "<span style='color:red;' class='noAnnunoce' >不可发布</span>"

                        }
                        if (d.state == 1) {
                            return type = "<span style='color:green;' class='annunoce' >发布异常</span>"

                        }
                        if (d.state == 2) {
                            return type = "<span style='color:green;' class='annunoce' >已发布</span>"

                        }
                        if (d.state == 3) {
                            return type = "<span style='color:red;' class='annunoce' >未发布</span>"

                        }
                    }
                }, {
                    field: 'del',
                    title: opration,
                    width: 400,
                    templet: function (value) {
                        return `<span class='start_up' lay-event='edits' style='color: #99CCFF; '>编辑详情</span>
                                <span class='start_up' lay-event='search' style='color: #3366FF;margin-left:25px;margin-right:25px;'>查询服务器</span>
                                <span class='start_up' lay-event='del' style='color: #CC0000;'>删除</span>`
                    }
                }
                ]
            ],
            done: function (res, curr, count) {
            	$('.layui-table-body').css('overflow','inherit')
            	$('.layui-table-body layui-table-main').css('overflow','inherit')
            	$('.layui-table-header').css('overflow','inherit')
            	$('.layui-table-box').css('overflow','inherit')
            }
        });
    })


    //单个删除
    table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data //拿到这一行数据
        var layEvent = obj.event
        var newactivityId = data.activityId;
        var newattributeId = data.activityId;
        var nweactivityType = data.activityType;
        var nweactivityName = data.activityName;
        var nwestartTime = data.startTime;
        var nwecycleParamNum = data.cycleParamNum;
        var nwedurationDays = data.durationDays;
        var nwecycleDays = data.cycleDays;
        var nwestatus = data.status;
        if (layEvent === 'del') { //删除
            console.log(data)
            layer.confirm('确定删除？', function (index) {
                obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                layer.close(index); //向服务端发送删除指令
                $("body").mLoading("show")
                $.ajax({
                    type: "post",
                    url: "../delActivity.action",
                    async: true,
                    data: {
                        activityId: newactivityId,

                    },
                    success: function (e) {
                        $("body").mLoading("hide")
                        alert(json.message)
                        tableIns.reload()
                    }
                })
            });
        }
        //编辑详情
        else if (layEvent === 'edits') {
            $.cookie('the_cookie_pname', data.activityId, {
                expires: 7,
                path: '/'
            })
             $.cookie('the_cookie_pid', data.attributeId, {
                expires: 8,
                path: '/'
            })
            $.cookie('the_cookie_pCanNum', data.cycleParamNum, {
                expires: 9,
                path: '/'
            })
             $.cookie('the_cookie_pactivityName', data.activityName, {
                expires: 10,
                path: '/'
            })
            $.cookie('the_cookie_pactivityType', data.activityType, {
                expires: 11,
                path: '/'
            })
            self.location.href = "activity_edit.html"
        }
        //查询服务器
        else if (layEvent === 'search') {
        	$("#sendSure").css("display","none")
        	$("#export").css("display","block")
        	$("#delSure").css("display","none")
//        	onareaB()
//            $(".active_serverB").css("display", "block")
            $(".left_contentB input").prop("checked", false)
            $(".right_contentB input").prop("checked", false);
            var leftElementList = document.getElementsByClassName("left_contentB")[0].children
            for (var i = 0; i < leftElementList.length; i++) {
                leftElementList[i].setAttribute('onclick', 'checboxsB(this)')
                leftElementList[i].removeAttribute('disabled')
            }
            var activityid = data.activityId;
            document.activityid = activityid
            $(".right_contentB").empty()
//            $(".left_content input").eq(0).prop("checked", true)
            checboxsB()
//            queryAndSelectServer(activityid)

        }
    })
    //上传
    $('#upl').click(function () {
        // alert("上传")
        layer.open({
            type: 1,
            shadeClose: false,
            shade: 0,
            title: ["导入文件", 'text-align:center;'],
            content: $("#daoru"),
            area: ['700px', '310px'],
        })
    })
    //下载
    $("#down").click(function () {
    	var downloadWindow = null;    //定义窗口的全局变量
    	var upArray = table.checkStatus('demo').data
    	if (upArray.length == 0) {
          layer.msg("请选择要下载的内容")
      }else{
//    	  console.log(upArray)
    	  var arrayId=[]
    	  for(var i=0;i<upArray.length;i++){
    		  arrayId.push(upArray[i].activityId) 
    	  }
    	 var newArray=arrayId.join(",")
//    	  console.log(newArray)
    		$.ajax({
    			type:"get",
    			url:"../exportActivity.action",///////接口
    			async:false,
    			data:{
    				serverId:newArray,
    			},
    			success:function(e){
    				
    				if(e.state==false){
    					alert(e.message)
    					$("body").mLoading("hide");
    				}else{
    					downloadWindow  = window.open('/upload/OperatorUseActivityBranchTemplate.csv');
    				}
    			}
    		});
    	 if( downloadWindow == null){
         }else{
        	 setTimeout(function(){
        		           $.ajax({
     	 			type:"get",
    	 			url:"../exportActivity.action",///////接口
    	 			async:false,
    	 			data:{
    	 				serverId:newArray,
    	 			},
    	 			success:function(e){
    	 				if(e.state==false){
    	 					alert(e.message)
    	 					$("body").mLoading("hide");
    	 				}else{
    	 					window.open('/upload/OperatorUseActivityTemplate.csv');
//    	 					window.location.reload()
    	 					$("body").mLoading("hide");
    	 				}
    	 			}
    	 		});
    		$("body").mLoading("hide");  
        		           }, 1000);
         }
    	 
//    	 $.ajax({
// 			type:"get",
// 			url:"../getActivityList.action",///////接口
// 			async:true,
//// 			data:{
//// 				serverId:newArray,
//// 			},
// 			success:function(e){
//// 				if(e.state==false){
//// 					alert(e.message)
//// 					$("body").mLoading("hide");
//// 				}else{
// 					window.open('/upload/OperatorUseActivityTemplate.csv');
//// 					$("body").mLoading("hide");
//// 				}
// 			}
// 		});
      }
//    	var mp3arr = ["/upload/OperatorUseActivityBranchTemplate.csv", "/upload/OperatorUseActivityTemplate.csv"];
//    	  function download(name, href) {
//    	      var a = document.createElement("a"), //创建a标签
//    	          e = document.createEvent("MouseEvents"); //创建鼠标事件对象
//    	      e.initEvent("click", false, false); //初始化事件对象
//    	      a.href = href; //设置下载地址
//    	      a.download = name; //设置下载文件名
//    	      a.dispatchEvent(e); //给指定的元素，执行事件click事件
//    	  }
//    	  for (let index = 0; index < mp3arr.length; index++) {
//    		  if(index==0){
//    			  download(OperatorUseActivityBranchTemplate.csv, mp3arr[index]);
//    		  }else if(index==1){
//    			  download(OperatorUseActivityTemplate.csv, mp3arr[index]);
//    		  }
//          }
//    	window.open('/upload/OperatorUseActivityBranchTemplate.csv');/////打开地址
//		window.open('/upload/OperatorUseActivityTemplate.csv');/////打开地址
//    	$.ajax({
//			type:"get",
//			url:"../queryChartOfRechargeExport.action",/////////下载接口
//			async:true,
//			data:{
////				serverId: pay_district_num,
////				seDate: pay_date,
////				loginType: pay_ways,
////				channelId: pay_reg_ways,
////				pageIndex:1,
////				pageSize:100000000
//			},
//			success:function(e){
//				if(e.state==false){
//					alert(e.message)
//					$("body").mLoading("hide");
//				}else{
//					window.open('/upload/log.csv');/////打开地址
//					window.open('/upload/log.csv');/////打开地址
//					$("body").mLoading("hide");
//				}
//			}
//		});
//        var upArray = table.checkStatus('demo').data
//        if (upArray.length == 0) {
//            layer.msg("请选择要下载的内容")
//        }else{
//        	table.exportFile(activity.config.id, upArray, 'csv');
//        	
//            table.exportFile(activityBranch.config.id, exportDataBranch, 'xlsx');
//        }
    })
//    批量删除
    $('#but-allRemove').click(function () {
    	var arr3 = table.checkStatus('demo');
    	var delid = [];
    	console.log(arr3)
    	if(arr3.data.length == 0){
    		layer.msg("请选择需要删除的行")
    	}else{
    		for(var i = 0;i<arr3.data.length;i++){
    			delid.push(arr3.data[i].activityId)
    		}
    		var delactivityid = delid.join(',')
    		layer.confirm('确定删除？', function (index) {
//                obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                layer.close(index); //向服务端发送删除指令
                $("body").mLoading("show")
                $.ajax({
                    type: "post",
                    url: "../delActivity.action",
                    async: true,
                    data: {
                        activityId: delactivityid,

                    },
                    success: function (e) {
                    	$("body").mLoading("hide")
                        if(e.state == true){
//                            tableIns.reload()
                            var array = $("table tbody tr")
                            for(var i=0;i<array.length;i++){
                            	var isdel =array[i].cells[0].childNodes[0].childNodes[0].checked
                            	var nodes = array[i].childNodes;
                            	var haha = array[i]
                            	console.log(isdel)
                            	if(isdel){
                            		haha.remove()
                            	}
                            }
                        }
                            alert(e.message)
                    }
                })
            });
    	}
    })
    //发布
    $('#but-removeBatch').click(function () {
    	$(".right_content input").prop("checked", false);
//        var array = table.checkStatus('demo').data
    	var array = $("table tbody tr")
    	if(array.length == 0){
    		alert("没有活动可发布")
    		return false;
    	}
  	  
  	  
  	  
    	var allnotdid =[];
    	var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
    	var reg2 = /[\u4e00-\u9fa5]{1}/g
    	for(var i=0;i<array.length;i++){
        	var notd =array[i].cells[5].innerText
        	var notdid =array[i].cells[2].innerText
        	var notdchixu = array[i].children[7].textContent
        	var notdxunhuan = array[i].children[8].textContent
        	var LUCK = true;
        	//对未发布的活动进行判断ID是否重复
        		for(var j=i+1;j<array.length;j++){
            		if(array[i].children[9].textContent == array[j].children[9].textContent){
                		if(array[i].cells[2].innerText == array[j].cells[2].innerText){
                			alert("同一服务器下活动ID重复，无法发布");
                			return false;
                		}
                	}
            	}
        	//对已发布的活动进行检测
//        	  $.ajax({
//        		  type:"post",
//        		  url:"../getActivityList.action",
//        		  data:{
//        			  
//        		  },
//        		  async: false,
//        		  success:function(e){
//        			  for(var j=0;j<e.data.length;j++){
//        				  if(e.data[j].state == 2){
//        					  if(e.data[j].paramArr5 == array[i].children[9].textContent){
//            					  if(e.data[j].attributeId == array[i].cells[2].innerText){
//            						  alert("已发布活动中同一服务器类型下已有此活动ID，无法发布")
//            						  LUCK = false;
//            						  return false;
//            					  }
//            				  }
//        				  }
//        			  }
//        			  
//        		  }
//        	  })
//        	  if(LUCK == false){
//          		  return false;
//          	  }
        	allnotdid.push(notdid)
        	if(notd === "未配置"){
        		alert("有活动暂未配置时间")
        		return false;
        	}
        	if(notdchixu == "未配置"){
        		alert("有活动暂未配置持续天数")
        		return false;
        	}
        	if(notdxunhuan == "未配置"){
        		alert("有活动暂未配置循环天数")
        		return false;
        	}
        	var resultCn = notd.match(reg2);
        	console.log(resultCn)
        	if(resultCn !== null){
        		console.log(resultCn.length)
            	if(resultCn.length == 3){
            		alert("有活动暂未配置时间"); 
            		return false
            	}
        	}
        	
         }
    	// 判断数组是否存在重复的值
        var nary=allnotdid.sort(); 
        var istrue;
        for(var i=0;i<allnotdid.length;i++){  
                if (allnotdid[i]==allnotdid[i+1]){  
//                    alert("活动ID重复："+allnotdid[i]);  
                	alert("活动ID重复");  
                	istrue = false;
                    return false;
                }  
                else{
            		istrue = true;
            	}
        }
       
        if(istrue = true){
        	$(".active_server").show()
     		 $("#sendSure").css("display","block")
     		 $("#export").css("display","none")
     		 $("#delSure").css("display","none")
        }
        
    })
var array;
var arrActivity;
var arrServer;
     //确认发布
    $('#sendSure').click(function () {
    	array = $("table tbody tr")
        arrActivity = []
        arrServer = []
        for (var i = 0; i < array.length; i++) {
        	var ddd = array[i].cells[1].innerText;
        	if(ddd != ""){
        		
            	console.log(array[i])
            	console.log(array[i].cells[1])
            	console.log(array[i].cells[1].innerText)
                	arrActivity.push(ddd)
        	}
            
         }
        var server = $(".right_content input")
        for (var i = 0; i < server.length; i++) {
            if(server[i].value != ""){
            	if (server[i].checked == true ) {
                	arrServer.push(server[i].value)
                }
            }
         }
        if(arrServer.length==0){
        	alert("请选择服务器")
        	return false
        }else{
        	$("body").mLoading("show");
            var jsonActivity = arrActivity.join(',')
            var jsonServer = arrServer.join(',')

            if (jsonActivity == "" && jsonServer == '') {
                alert("操作成功")
                $("body").mLoading("hide")
                return false;
            }
            $.ajax({
                type: "post",
                url: '../sendActivity.action',
                async: true,
                data: {
                    activityId: jsonActivity,
                    serverId: jsonServer,
                },
                success: function (res) {
                    alert(res.message);
                    $("body").mLoading("hide")
//                     $(".main_right").text(res.message)
//                    location.reload()
////                    更新为热更新按钮
//                    $('#but-hotUpdate').css("display","block");
//                    $('#but-removeBatch').css("display","none");
//                    $(".active_server").css("display","none")
                    var tableIns = table.render({
                        elem: '#demo',
                        url: '../getActivityList.action',
                        loading: true,
//                        page: true,
                        where: {
                            state: 3,

                        },
                        response: {
                            statusName: 'state',
                            msgName: 'message',
                            statusCode: true,
                            countName: 'total',
                            dataName: 'data'
                        },
                        cols: [
                            [ //表头
//                                {
//                                    type: 'checkbox',  //--隐藏前端勾选
            //
//                                }, 
                                {
                                field: 'activityId',
                                title: num,
                                minWidth: 150,
                            }, {
                                field: 'attributeId',
                                title: id,
                                minWidth: 150,

                            }, {
                                field: 'activityType',
                                title: type,
                                minWidth: 150,

                            }, {
                                field: 'activityName',
                                title: name,
                                minWidth: 150,

                            }, {
                                field: 'startTime',
                                title: starttime,
                                minWidth: 250,

                            }, {
                                field: 'cycleParamNum',
                                title: cyclequery,
                                minWidth: 150,

                            }, {
                                field: 'durationDays',
                                title: duration,
                                minWidth: 150,
                                templet: function (d) {
                                	if(d.durationDays == ""){
                                		return "未配置"
                                	}else{
                                		return d.durationDays
                                	}
                                }
                            }, {
                                field: 'cycleDays',
                                title: cycleday,
                                minWidth: 150,
                                templet: function (d) {
                                	if(d.cycleDays == ""){
                                		return "未配置"
                                	}else{
                                		return d.cycleDays
                                	}
                                }
                            }, {
                                field: 'paramArr5',
                                title: paramArr5,
                                minWidth: 150,

                            }, {
                                field: 'state',
                                title: annouce,
                                minWidth: 150,

                                templet: function (d) {
                                	console.log(d)
                                    var type
                                    // if(d.status== "") {
                                    //    "<span style='color:#CC0000;' class='noAnnunoce' ></span>"
                                    //    return  false
                                    // }
                                    if (d.state == null) {
                                        return type = "<span style='color:#CC0000;' class='noAnnunoce' ></span>"

                                    }
                                    if (d.state == 0) {
                                        return type = "<span style='color:red;' class='noAnnunoce' >不可发布</span>"

                                    }
                                    if (d.state == 1) {
                                        return type = "<span style='color:green;' class='annunoce' >发布异常</span>"

                                    }
                                    if (d.state == 2) {
                                        return type = "<span style='color:green;' class='annunoce' >已发布</span>"

                                    }
                                    if (d.state == 3) {
                                        return type = "<span style='color:red;' class='annunoce' >未发布</span>"

                                    }
                                }
                            }, {
                                field: 'del',
                                title: opration,
                                width: 400,
                                templet: function (value) {
                                    return `<span class='start_up' lay-event='edits' style='color: #99CCFF; '>编辑详情</span>
                                            <span class='start_up' lay-event='search' style='color: #3366FF;margin-left:25px;margin-right:25px;'>查询服务器</span>
                                            <span class='start_up' lay-event='del' style='color: #CC0000;'>删除</span>`
                                }
                            }
                            ]
                        ],
                        done: function (res, curr, count) {
                        	$('.layui-table-body').css('overflow','inherit')
                        	$('.layui-table-body layui-table-main').css('overflow','inherit')
                        	$('.layui-table-header').css('overflow','inherit')
                        	$('.layui-table-box').css('overflow','inherit')
                        }
                    });
//                  更新为热更新按钮
                    isHot = "88";//---热更新
                    $('#but-hotUpdate').css("display","block");
                    $('#but-removeBatch').css("display","none");
                    $(".active_server").css("display","none")
                }
            });
            
        }
    })  
    //清除数据
    $('#but-removeData').click(function () {
//    	$(".left_content input").prop("checked", false);
//    	$(".right_content input").prop("checked", false);
    	$(".active_server").show()
		$("#sendSure").css("display","none")
		$("#export").css("display","none")
		$("#delSure").css("display","block")
		
    })
//    确认清除
    $('#delSure').click(function () {
    	var Lock = false;
    	$("body").mLoading("show");
//		console.log(arrActivity)
//		console.log(arrServer)
        server = $(".right_content input")
        var arr2 =[];
        for (var i = 0; i < server.length; i++) {
        	if (server[i].checked) {
              arr2.push(server[i].value)   
              Lock = true;
            }
         }
        if(Lock != true){
        	alert("请选择要清除数据的服务器")
        	$("body").mLoading("hide");
        	return false;
        }
        var jsonServer = arr2.join(',')
		console.log(jsonServer)
        $.ajax({
            type: "post",
            url: '../postSendCleraData.action',
            async: true,
            data: {
            	serverId: jsonServer,
            },
            success: function (res) {
                alert(res.message);
                $("body").mLoading("hide")
                $(".left_content input").prop("checked", false);
            	$(".right_content input").prop("checked", false);
            }
        }); 
        $.ajax({
            type: "post",
            url: '../uploadNullCsv.action',
            async: true,
            data: {
            	serverId: jsonServer,
            },
            success: function (res) {
                
            }
        }); 
    })
  //热更新
    $('#but-hotUpdate').click(function () {
    	$("body").mLoading("show");
    	var jsonActivity = arrActivity.join(',')
        var jsonServer = arrServer.join(',')

        if (jsonActivity == "" && jsonServer == '') {
            alert("操作成功")
            $("body").mLoading("hide")
            return false;
        }
        $.ajax({
            type: "post",
            url: '../postSendReloadCsv.action',
            async: true,
            data: {
                serverId: jsonServer,
            },
            success: function (res) {
                alert(res.message);
                $("body").mLoading("hide")
//                 $(".main_right").text(res.message)
                location.reload()
                isHot = "999";//---热更新
                $('#but-hotUpdate').css("display","none");
                $('#but-removeBatch').css("display","block");
            }
        });
    })
});

var queryAndSelectServer = function (activityid) {
    $.ajax({
        type: "post",
        url: "../getActivityList.action",
        async: true,
        data: {
            activityId: activityid,
        },
        success: function (json) {
//            alert(104)
            var dataCon = json.data
            console.log(dataCon)
            var serverName = $(".left_contentB input");
            var serveruser = $(".left_contentB span");
            var servers = dataCon[0].serverId
            var serverState = dataCon[0].state
//            if(serverState == 1){
//            	$(".active_serverB").css("display", "block")
//            	$(".left_contentB").empty()
//            	return false;
//            }
            var serversArr
            if (!servers) {
            	serversArr==null
           } else{
        	   var serversArr = servers.split(",")
               serversArr.forEach(function (item) {
                   for (var i = 0; i < serverName.length; i++) {
                       if (serverName[i].value === item) {
                           serverName[i].checked = true
                       }
                   }
               })
           }
            for (var i = 0; i < serverName.length; i++) {
                if (serverName[i].checked == true) {
                    
                }else{
                	serverName[i].style.display = "none"
                	for(var j = 0; j < serveruser.length; j++){
                		if(i == j){
                			serveruser[i].style.display = "none"
                		}
                	}
                }
            }
            $(".active_serverB").css("display", "block")
            $("body").mLoading("hide")
        }
    })
}
////////////
//获取大区


function onareaB() {
    $.ajax({
        type: "get",
        url: "../getArea.action",
        async: true,
        success: function (json) {
//        	$(".left_content").append("<input type='checkbox' onclick='checkLeftAll' /><span>全选</span>")
            for (var i = 0; i < json.rows.length; i++) {
                $(".left_content").append("<input type='checkbox' value=" + json.rows[i].areaId + " onclick='checboxs(this)' />" + "<span >" + json.rows[i].areaName + "</span>")
            }
            // $(".left_content input").eq(0).prop("checked", true)
            checboxsB()
        }
    });
}

//获取服务器
function checboxsB(obj) {
    var areaid
    if (obj == undefined) {
        $(".left_contentB").empty()
        $.ajax({
            type: "get",
            url: "../getServerListNoPage.action",
            async: true,
            data: {
                pId: areaid
            },
            success: function (json) {
                for (var i = 0; i < json.rows.length; i++) {
                    $(".left_contentB").append("<input type='checkbox' value=" + json.rows[i].serverId + " />" + "<span class='content'>" + json.rows[i].serverName + "</span>")
                }

                if (document.activityid) {
                    queryAndSelectServer(document.activityid)
                }
            }
        });
    }
    if ($(obj).is(":checked") == true) {
        $(".left_contentB").empty()
        areaid = $(obj).val();
        $.ajax({
            type: "get",
            url: "../getServerListNoPage.action",
            async: true,
            data: {
                pId: areaid
            },
            success: function (json) {
                for (var i = 0; i < json.rows.length; i++) {
                    $(".left_contentB").append("<input type='checkbox' value=" + json.rows[i].serverId + " />" + "<span class='content'>" + json.rows[i].serverName + "</span>")

                }
                if (document.activityid) {
                    queryAndSelectServer(document.activityid)
                }
            }
        });
    }
}

///////////
//获取大区
onarea()

function onarea() {
    $.ajax({
        type: "get",
        url: "../getArea.action",
        async: true,
        success: function (json) {
        	$(".left_content").append("<input type='checkbox' class='checkLeftAll' value='' onclick='checkLeftAll(this)' /><span>全选</span>")
            for (var i = 0; i < json.rows.length; i++) {
                $(".left_content").append("<input type='checkbox' value=" + json.rows[i].areaId + " onclick='checboxs(this)' />" + "<span >" + json.rows[i].areaName + "</span>")
            }
//            $(".left_content input").eq(0).prop("checked", true)
            checboxs()
        }
    });
}

//获取服务器
function checboxs(obj) {
	var rightChecked=[]
	for(var i=0;i<$(".right_content input").length;i++){
		if($(".right_content input")[i].checked == true){
			rightChecked.push($(".right_content input")[i].value)
		}
	}
	var ischeckAll = false
	var serverChecked=[]
	for(var i=0;i<$(".left_content input").length;i++){
		if($(".left_content input")[i].checked == true && $(".left_content input")[i].className != "checkLeftAll"){
			serverChecked.push($(".left_content input")[i].value)
		}else{
		}
	}
	for(var i=0;i<$(".left_content input").length;i++){
		if($(".left_content input")[i].checked == true){
			ischeckAll = true;
		}else{
			ischeckAll = false;
			break;
		}
	}
	if(ischeckAll == false){
		$(".checkLeftAll").prop("checked", false);
	}else{
		$(".checkLeftAll").prop("checked", true)
	}
    var areaid
    if (obj == undefined) {
        areaid = $(".left_content input").eq(0).val();
        $(".right_content").empty()
        $(".right_content").append("<input type='checkbox' value=''  class='checkRightAll' onclick='checkRightAll(this)' /><span style='width:80%;'>全选</span>")
        $.ajax({
            type: "get",
            url: "../getServerListNoPage.action",
            async: false,
            data: {
                pId: areaid
            },
            success: function (json) {
                for (var i = 0; i < json.rows.length; i++) {
                    $(".right_content").append("<input type='checkbox'  value=" + json.rows[i].serverId + " />" + "<span class='content'>" + json.rows[i].serverName + "</span>")
                }
            }
        });
    }
    if ($(obj).is(":checked") == true) {
//        $(obj).siblings().removeAttr("checked")
        $(".right_content").empty()
        $(".right_content").append("<input type='checkbox' value='' onclick='checkRightAll(this)' /><span style='width:80%;'>全选</span>")
//        areaid = $(obj).val();
        
        for(var i=0;i<serverChecked.length;i++){
        	areaid = serverChecked[i]
        	$.ajax({
                type: "get",
                url: "../getServerListNoPage.action",
                async: false,
                data: {
                    pId: areaid
                },
                success: function (json) {
                    for (var i = 0; i < json.rows.length; i++) {
                        $(".right_content").append("<input type='checkbox' value=" + json.rows[i].serverId + " />" + "<span class='content'>" + json.rows[i].serverName + "</span>")
                    }
                }
            });
        }
    } else {
//        $(obj).prop("checked", true)
    	$(obj).prop("checked", false)
    	$(".right_content").empty()    
    	$(".right_content").append("<input type='checkbox' value='' onclick='checkRightAll(this)' /><span style='width:80%;'>全选</span>")
      for(var i=0;i<serverChecked.length;i++){
      	areaid = serverChecked[i]
      	$.ajax({
              type: "get",
              url: "../getServerListNoPage.action",
              async: false,
              data: {
                  pId: areaid
              },
              success: function (json) {
                  for (var i = 0; i < json.rows.length; i++) {
                      $(".right_content").append("<input type='checkbox' value=" + json.rows[i].serverId + " />" + "<span class='content'>" + json.rows[i].serverName + "</span>")
                  }
              }
          });
      }
    }
    var rightAll =$(".right_content input")
    console.log(rightAll)
    for(var i=0;i<rightChecked.length;i++){
    	for(var j=0;j<rightAll.length;j++){
        	if(rightChecked[i] == rightAll[j].value){
        		rightAll[j].checked = true;
        	}
        }
    }
}

//选择下拉触发
function selects(ob) {
	
	
    var value = $(ob).val();
    if (value == 0) {
        $(".right_content").empty()
//        $(".right_content").append("<input type='checkbox' /><span style='width:80%;'>全选</span>")
        $.ajax({
            type: "get",
            url: "../getServerListNoPage.action",
            async: true,
            success: function (json) {
                for (var i = 0; i < json.rows.length; i++) {
                    $(".right_content").append("<input type='checkbox' checked='checked' value=" + json.rows[i].serverId + " />" + "<span class='content'>" + json.rows[i].serverName + "</span>")
                }
            }
        });
        $(".left_content input").prop("disabled", true);
        $(".right_content input").prop("disabled", true);
        $(".left_content input").prop("checked", true);
        $(".right_content input").prop("checked", true);
    } else {
        $(".right_content").empty()
//        $(".right_content").append("<input type='checkbox' /><span style='width:80%;'>全选</span>")
//        var areaid = $(".left_content input").eq(0).val();
        $.ajax({
            type: "get",
            url: "../getServerListNoPage.action",
            async: true,
            data: {
                pId: areaid
            },
            success: function (json) {
                for (var i = 0; i < json.rows.length; i++) {
                    $(".right_content").append("<input type='checkbox' checked='checked' value=" + json.rows[i].serverId + " />" + "<span class='content'>" + json.rows[i].serverName + "</span>")
                }
            }
        });
        $(".left_content input").prop("disabled", false);
        $(".right_content input").prop("disabled", false);
        $(".left_content input").eq(0).prop("checked", true).siblings().prop("checked", false);
        //		console.log($(".right_content input").eq(0))
        $(".right_content input").eq(0).prop("checked", true).siblings().prop("checked", false);
    }
}
//全选大区
function checkLeftAll(obj){
	$(".right_content").empty() 
	if(obj.checked == true){
		for(var i=0;i<$(".left_content input").length;i++){
			$(".left_content input")[i].checked = true;
		}
		var serverChecked=[]
		for(var i=0;i<$(".left_content input").length;i++){
			if($(".left_content input")[i].checked == true){
				serverChecked.push($(".left_content input")[i].value)
			}
		}
		$(".right_content").empty()    
		$(".right_content").append("<input type='checkbox' value='' onclick='checkRightAll(this)' checked /><span style='width:80%;'>全选</span>")
//	      for(var i=0;i<serverChecked.length;i++){
//	      	areaid = serverChecked[i]
	      	$.ajax({
	              type: "get",
	              url: "../getServerListNoPage.action",
	              async: true,
	              data: {
	                  pId: ""
	              },
	              success: function (json) {
	                  for (var i = 0; i < json.rows.length; i++) {
	                      $(".right_content").append("<input type='checkbox' checked='checked' value=" + json.rows[i].serverId + " />" + "<span class='content'>" + json.rows[i].serverName + "</span>")
	                  }
	              }
	          });
//	      }
	}
	else{
		for(var i=0;i<$(".left_content input").length;i++){
			$(".left_content input")[i].checked = false;
			
		}
		$(".right_content").empty() 
		
	}
}
//服务器全选
function checkRightAll(obj){
	if(obj.checked == true){
		for(var i=0;i<$(".right_content input").length;i++){
			$(".right_content input")[i].checked = true;
		}
	}
	else{
		for(var i=0;i<$(".right_content input").length;i++){
			$(".right_content input")[i].checked = false;
		}
	}
}
//发送
$('#addserver_select').click(function () {
    $(".active_server").show()
})

//$('iframe[name=iframe_display]').on('load', function() {
//　 var responseText = $("iframe")[0].contentDocument.body.getElementsByTagName("pre")[0].innerHTML
//　 var json=JSON.parse(responseText)
//  if(json.state==false){
//	  alert(json.message)
//  }else{
//	  alert(json.message)
//	  window.location.reload()
//  }
//})