var winPos
$(document).ready(function() {
    $(".layui-body").scroll(function() {
        winPos = $(".layui-body").scrollTop()
    })
})
layui.use(['element', 'table', 'tableFilter', 'layer', 'form'], function() {
    var element = layui.element;
    var table = layui.table;
    var tableFilter = layui.tableFilter;
    var layer = layui.layer;
    var form = layui.form;
    Subordinate_area()

    function Subordinate_area() {
        $.post("../getArea", function(data) {
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
    var addEvent =  "<div class='layui-form-item layui-form-item' style='margin-top: 5px;'><button class='layui-btn layui-btn-normal' lay-submit lay-filter='GSUpdateIniOff'>添加</button></div>"

    var tableIns = table.render({
        elem: '#datatable',
        url: '../getLinkmanListByPage',
        loading: false,
        // toolbar:'#weiqu',

        response: {
            statusName: 'state',
            msgName: 'message',
            statusCode: true,
            countName: 'total',
            dataName: 'rows'
        },
        where:{
            pageSize:50,
            pageIndex:1,
        },
        cols: [
            [{
                field: 'vId',
                title: 'id',
            },
                // {
                //     field: 'Add',
                //     title:addEvent ,
                // },
                {
                    field: 'name',
                    title: '姓名',
                },
                {
                    field: 'mobile',
                    title: '手机号',
                },

                {
                    field: '',
                    title: '预警',
                    templet: function(d) {
                        return "<div style='color: #D81F1F; cursor: pointer;'><span lay-event='check' style='"+(d.isOpen==0?'':'color:#31c972')+"' >"+ (d.isOpen==0?'关闭':'开启') +"</span></div>"
                        // d.isMonitoring==0?'关闭':'开启'+"
                    }
                },
                {
                    field: '',
                    title: '操作',
                    templet: function(d) {
                        return "<span class='close' lay-event='edits'>修改</span>" + "&nbsp;&nbsp;<span class='close' lay-event='delet'>删除</span>"
                    }
                },
            ]
        ],
        done: function(e) {
            console.log(125,e)
            $("[data-field='vId']").css('display', 'none');
        }
    });

//服务器对应进程查询
    var setid;
    var sta;
    var timeout
    var toring
    table.on('toolbar(test)', function(obj){
        alert(1211111111111111111111)
        if(obj.event === 'add'){
            console.log(111)
        }
    })

    $("#add").click(function( ) {
        // console.log(obj)
        var setid = 1000
        console.log(setid)
        $('#modify_serverid').val('');
        $('#modify_servername').val('');
        // var modify_serverid = top.$('modify_serverid').val();
        // var modify_servername = top.$('modify_servername').val();
        // 获取table 数据，GSToolManagementTable 为table id。
        // var date = table.cache["GSToolManagementTable"];
        // $("#modify_serverid").val(modify_serverid); //姓名
        // $("#modify_servername").val(modify_servername); //手机号

        layer.open({
            type: 1,
            area: ['500px', '470px'],
            title: "添加",
            shadeClose: false,
            shade: 0,
            content: $('#modify_area'),
            closeBtn: 2,
            btn: '确定',
            yes: function(index, layero) {
                console.log(index,layero)
                var modify_serverid = $('#modify_serverid').val();
                var modify_servername = $('#modify_servername').val();
                console.log(modify_serverid,modify_servername)
                layer.close(index)
                // $("body").mLoading("show")
                // var id = data.vId
                // $("#modify_serverid").val(modify_serverid); //姓名
                // $("#modify_servername").val(modify_servername); //手机号




                var regEn = /[`!@#$%^&*()_+<>?:"{},.\/;'[\]-]/im;
                var regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
                var regIp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/; //判断ip
                var phone = /^[0-9]{11}$/;
                var chinese = /^[\u4e00-\u9fa5]{2,5}$/ ;//姓名
                if(modify_serverid == '' || modify_serverid == null || modify_serverid == undefined) {
                    alert("姓名不能为空")
                } else if(regEn.test(modify_serverid) || regCn.test(modify_serverid)) {
                    alert("姓名不能包含特殊字符")
                } else if(!chinese.test(modify_serverid)) {
                    alert("名字为2个到5个的汉字")
                }else if(modify_servername == '' || modify_servername == null || modify_servername == undefined) {
                    alert("手机号不能为空")
                }else if(!phone.test(modify_servername)) {
                    alert("手机号只能为11位的数字")
                }else if(regEn.test(modify_servername) || regCn.test(modify_servername)) {
                    alert("手机号不能包含特殊字符")
                } else {
                    $("body").mLoading("show")
                    $.ajax({
                        type: "get",
                        url: "../saveLinkman",
                        async: true,
                        data: {
                            vId: setid,
                            name:modify_serverid,
                            mobile:modify_servername,

                        },
                        success: function(json) {
                            alert(json.message)
                            $("body").mLoading("hide")
                            tableIns.reload()
                            $(".layui-body").animate({scrollTop:winPos},100);
                        }
                    });

                }
            }
        })
    })
    form.on('submit(GSUpdateIniOff)', function(obj){
        // console.log(obj)
        // var setid = 1000
        // console.log(setid)
        // $('#modify_serverid').val('');
        // $('#modify_servername').val('');
        // // var modify_serverid = top.$('modify_serverid').val();
        // // var modify_servername = top.$('modify_servername').val();
        //  // 获取table 数据，GSToolManagementTable 为table id。
        // var date = table.cache["GSToolManagementTable"];
        // // $("#modify_serverid").val(modify_serverid); //姓名
        // // $("#modify_servername").val(modify_servername); //手机号
        //
        // layer.open({
        //     type: 1,
        //     area: ['500px', '470px'],
        //     title: "添加",
        //     shadeClose: false,
        //     shade: 0,
        //     content: $('#modify_area'),
        //     closeBtn: 2,
        //     btn: '确定',
        //     yes: function(index, layero) {
        //         console.log(index,layero)
        //         var modify_serverid = $('#modify_serverid').val();
        //         var modify_servername = $('#modify_servername').val();
        //         console.log(modify_serverid,modify_servername)
        //         layer.close(index)
        //         // $("body").mLoading("show")
        //         // var id = data.vId
        //         // $("#modify_serverid").val(modify_serverid); //姓名
        //         // $("#modify_servername").val(modify_servername); //手机号
        //
        //
        //
        //
        //         var regEn = /[`!@#$%^&*()_+<>?:"{},.\/;'[\]-]/im;
        //         var regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
        //         var regIp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/; //判断ip
        //         var phone = /^[0-9]{11}$/;
        //         var chinese = /^[\u4e00-\u9fa5]{2,5}$/ ;//姓名
        //         if(modify_serverid == '' || modify_serverid == null || modify_serverid == undefined) {
        //             alert("姓名不能为空")
        //         } else if(regEn.test(modify_serverid) || regCn.test(modify_serverid)) {
        //             alert("姓名不能包含特殊字符")
        //         } else if(!chinese.test(modify_serverid)) {
        //             alert("名字为2个到5个的汉字")
        //         }else if(modify_servername == '' || modify_servername == null || modify_servername == undefined) {
        //             alert("手机号不能为空")
        //         }else if(!phone.test(modify_servername)) {
        //             alert("手机号只能为11位的数字")
        //         }else if(regEn.test(modify_servername) || regCn.test(modify_servername)) {
        //             alert("手机号不能包含特殊字符")
        //         } else {
        //             $("body").mLoading("show")
        //             $.ajax({
        //                 type: "get",
        //                 url: "../saveLinkman",
        //                 async: true,
        //                 data: {
        //                     vId: setid,
        //                     name:modify_serverid,
        //                     mobile:modify_servername,
        //
        //                 },
        //                 success: function(json) {
        //                     alert(json.message)
        //                     $("body").mLoading("hide")
        //                     tableIns.reload()
        //                     $(".layui-body").animate({scrollTop:winPos},100);
        //                 }
        //             });
        //
        //         }
        //     }
        // })

    });
//监听 表头按钮点击事件。开
    form.on('submit(GSUpdateIniOn)', function(){

        var data = table.cache["GSToolManagementTable"];

    });


    table.on('tool(test)', function(obj) {
        console.log(22222,obj)
        var data = obj.data;
        setid = data.vId;
        toring= data.isOpen;
        console.log(toring)
        var modify_serverid = data.name;
        var modify_servername = data.mobile;

        if(obj.event=='check'){
            if(obj.data.isOpen==0){

            }else if(obj.data.isOpen==1){
            }

            console.log(666,obj.data.isMonitoring)
            if($(this).text()=='关闭'){
                $.ajax({
                    type: "get",
                    url: "../updateLinkman",
                    async: true,
                    data: {
                        vId: setid,
                        isOpen:1,
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
                    url: "../updateLinkman",
                    async: true,
                    data: {
                        vId: setid,
                        isOpen:0
                    },
                    success: function(json) {
                        $("body").mLoading("hide")
                        // alert(json.message)
                        //						tableIns.reload()
                        if(json.state==true){
                            $(this).html("关闭");
                            tableIns.reload()
                        }else{

                        }
                    }
                })
            }
            // form.render()
        }else if(obj.event === 'edits') {
            $("#modify_serverid").val(modify_serverid); //姓名
            $("#modify_servername").val(modify_servername); //手机号
            layer.open({
                type: 1,
                area: ['500px', '470px'],
                title: "修改",
                shadeClose:false,
                shade: 0,
                content: $('#modify_area'),
                closeBtn: 2,
                btn: '确定',
                yes: function(index, layero) {
                    layer.close(index)
                    var id = data.vId
                    var modify_serverid = $("#modify_serverid").val(); //姓名
                    var modify_servername = $("#modify_servername").val(); //手机号
                    var regEn = /[`!@#$%^&*()_+<>?:"{},.\/;'[\]-]/im;
                    var regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
                    var regIp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/; //判断ip
                    var phone = /^[0-9]{11}$/
                    var chinese = /^[\u4e00-\u9fa5]{2,5}$/ //姓名
                    if(modify_serverid == '' || modify_serverid == null || modify_serverid == undefined) {
                        alert("姓名不能为空")
                        return false;
                    } else if(regEn.test(modify_serverid) || regCn.test(modify_serverid)) {
                        alert("姓名不能包含特殊字符")
                        return false;
                    } else if(!chinese.test(modify_serverid)) {
                        alert("名字为2个到5个的汉字")
                        return false;
                    }else if(modify_servername == '' || modify_servername == null || modify_servername == undefined) {
                        alert("手机号不能为空")
                        return false;
                    }else if(!phone.test(modify_servername)) {
                        alert("手机号只能为11位的数字")
                        return false;
                    }else if(regEn.test(modify_servername) || regCn.test(modify_servername)) {
                        alert("手机号不能包含特殊字符")
                        return false;
                    }else {
                        $.ajax({
                            type: "get",
                            url: "../updateLinkman",
                            async: true,
                            data: {
                                vId: setid,
                                name:modify_serverid,
                                mobile:modify_servername,

                            },
                            success: function(json) {
                                alert(json.message)
                                tableIns.reload()
                                // $(".layui-body").animate({scrollTop:winPos},100);
                            }
                        });

                    }
                }
            })
        } else if(obj.event === 'delet') {
            //如果点击删除触发的事件
            layer.confirm('是否确认删除', function(index) {
                layer.close(index);
                var id = data.vId
                $.ajax({
                    type: "get",
                    url: "../deleteLinkman",
                    async: true,
                    data: {
                        vId: setid,
                        name:modify_serverid,
                        mobile:modify_servername,
                    },
                    success: function(e) {
                        alert(e.message);
                        tableIns.reload();
                        $(".layui-body").animate({scrollTop:winPos},100);
                    }
                })
            });
        }
    });

});