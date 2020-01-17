$(function () {
  // $("#punish1").click(function () {
  //   $("#add_area").show()
  // })
  $(".falsebtn").click(function () {
    $("#add_area").hide()
  })


})




var sendTime;
//设置默认时间
today()
function today() {
  var today = new Date();
  var y = today.getFullYear();
  var m = today.getMonth() + 1;
  var d = today.getDate();
  var a = today.getHours();
  var b = today.getMinutes();
  var c = today.getSeconds();
  if (m >= 1 && m < 10) {
    m = "0" + m
  }
  if (d >= 1 && d < 10) {
    d = "0" + d
  }
  sendTime = y + "-" + m + "-" + d + " " + a + ":" + b + ":" + c;
  $(".time").text(sendTime)
}


layui.use(['table', 'form', 'laydate', 'element', 'upload'], function () {
  var table = layui.table;
  var form = layui.form;
  var laydate = layui.laydate;
  var element = layui.element;
  var upload = layui.upload;





  // 开始时间
  element.init();
  laydate.render({
    elem: '#test1',
    type: 'datetime',//日期可选时分秒
    lang: 'en', //国际化
    format: 'yyyy-MM-dd H:m:s',
    theme: '日期', //自定义类名
    value: "",
    trigger: 'click',

    done: function (res) {
      sendTime = res
      $("#test1").text(sendTime)
    }
  });
  //结束时间2
  laydate.render({
    elem: '#test2',
    id: 'idTest',
    type: 'datetime',//日期可选时分秒
    lang: 'en', //国际化
    format: 'yyyy-MM-dd H:m:s',
    theme: '日期2', //自定义类名
    value: "",
    trigger: 'click',

    done: function (res) {
      sendTime = res
      $("#test2").text(sendTime)
    }
  });


  //  区服
  Subordinate_area()

  function Subordinate_area() {
    $.post("../getServerListNoPage", function (data) {
      var array = [];
      $.each(data.rows, function (index, item) {
        array.push(item.serverId)
        $('#allserver').append(new Option(item.serverName, item.serverId));
      });
      var jsons = array.join(' ')

      $("#allserver").prepend("<option value=" + jsons + " selected='selected'>全区全服</option>");

      form.render('select')
    });
  }

  var tableIns = table.render({
    elem: '#test',
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
    }
    , url: '../selPunishList'
    , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
    , page: true
    ,
    cols: [[

      {
        field: 'playerUid',
        title: '玩家UID',
        // width:100
      },

      {
        field: 'playerName',

        title: '玩家账号'
      }
      , {
        field: 'playerNumber',

        title: '玩家名称'
      }
      , {
        field: 'server',

        title: '所在区服'
      }
      , {
        field: 'punish',

        title: '处罚内容',
        templet: function (d) {
          var type
          // if (d.punish == '') {
          //   return type = '<span></span>'
          // }
          if (d.punish == null) {
            return type = '<span></span>'
          }
          if (d.punish == 0) {
            return type = '<span>禁止登陆</span>'
          } else
            if (d.punish == 1) {
              return type = '<span>踢人下线</span>'
            }



        }
      }
      , {
        field: 'startime',
        title: '添加时间',

      } //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
      , {
        field: 'endtime',

        title: '结束时间'
      }
      , {
        field: 'del',
        title: '更改处罚',
        width: '10%', minWidth: 100,
        templet: function (value) {
          return `
          <span class='start_up' lay-event='edit' style="cursor: pointer;">更改处罚</span> 
          
        `
        }
      }
      , {
        field: 'chufa',
        title: '结束处罚',

        templet: function (value) {
          return `
         
          <span class='start_down' lay-event='chufa' style="cursor: pointer;" >结束处罚</span> 
          `
        }
      }
    ]]


  });


  // 结束处罚
  table.on('tool(test)', function (obj) {
    var data = obj.data
    var layEvent = obj.event
    var id = data.pid;
    var playerUidnew = data.playerUid;
    var playerNumbernew = data.playerNumber;
    var servernew = data.server;
    var playerNamenew = data.playerName;
    var punishnew = data.punish    //修改$('#xiela').val() 
    var startimenew = data.startime
    var endtimenew = data.endtime;
    if (obj.event === 'chufa') { //删除
      layer.confirm('真结束处罚吗', function (index) {
        obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
        layer.close(index);//向服务端发送删除指令
        $("body").mLoading("show")
        $.ajax({
          type: "post",
          url: "../deletePunish",
          async: true,
          data: {
            pIds: id,
            playerUid: playerUidnew,
            startime: startimenew,
            punish: punishnew,
            playerName: playerNamenew,
            playerNumber: playerNumbernew,
            server: servernew,
            endtime: endtimenew,
          },
          success: function (e) {
            alert(e.message)
            $("body").mLoading("hide")
          }
        })
      });
      return false
    }
    if (obj.event == 'edit') {
      layer.open({
        type: 1,
        title: "更改处罚",
        content: $("#genggai"),
        area: ['500px', '600px']
      })
      form.val("esit_form", {
        pId: id,
        playerName: playerNamenew,
        punish: $('#xiela').val(),
        playerUid: playerUidnew,
        playerNumber: playerNumbernew,
        server: servernew,
        startime: startimenew,
        endtime: endtimenew,

      })
      form.on('submit(formDemo)', function (data) {

        $.ajax({
          type: "post",
          url: "../updatePunish",
          async: true,
          data: {
            pId: id,
            punish: $('#xiela').val(),
            playerName: playerNamenew,
            playerUid: playerUidnew,
            playerNumber: playerNumbernew,
            server: servernew,
            endtime: endtimenew,
            startime: startimenew,
          },
          success: function (e) {
            alert(e.message)

            $("body").mLoading("hide")

            tableIns.reload()
            location.closeAll()
          }

        })

        //  $.post("/updatePunish",data.field,function(flag){

        //     if(flag){
        //       layer.msg("更改成功",{icon:6})
        //       layer.closeAll();
        //       layey.reload('demo',{})
        //       console.log(data.field)
        //     }else{
        //       layer.msg("更改失败",{icon:5})
        //     }
        //  })
        layer.closeAll();
        return false //阻止表单跳转
      })

    }

  })


  // 待处罚列表
  $("#punish1").click(function () {


    var tableIns = table.render({
      toolbar: '#toolbarDemo',
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
      elem: '#demo2'
      , height: 312
      , url: '../selTabulation' //数据接口
      , page: true //开启分页
      , cols: [[ //表头
        {
          type: 'checkbox',
          field: 'pId',
        },


        {
          field: 'playerUid',
          title: '玩家UID',
          minWidth: 100
        }
        , {
          field: 'playerNumber',
          title: '玩家名称',
        }
        , {
          field: 'server',
          title: '所在区服',
        }
        , {
          field: 'endtime',
          title: '结束时间',
        }
        , {
          field: 'del',
          title: '操作',
          templet: function (value) {
            return `
            <span class='start_up' lay-event='del' >删除</span> 
            
            `
          }
        }


      ]]
    })

    //导入名单
    upload.render({
      elem: '#btndaoru',
      url: '../sendTabulation',
      accept: 'file',
      done: function (res) {
        alert(res.message);
        tableIns.reload()
      }
    });

    // 删除
    table.on('tool(test)', function (obj) {
      var data = obj.data;//拿到这行数据
      // console.log(data)
      var layEvent = obj.event
      var id = data.pid;
      var newpunsihint1 = $("#punsihint1").val();
      var playerUidnew = data.playerUid;
      var playerNamenew = data.playerNumber;
      var servernew = data.server;
      var endtimenew = data.endtime;
      if (layEvent === 'del') { //删除
        layer.confirm('真的删除行么', function (index) {
          obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
          layer.close(index);//向服务端发送删除指令
          $("body").mLoading("show")
          $.ajax({
            type: "post",
            url: "../deleteByTabulation",
            async: true,
            data: {
              pIds: id,

            },
            success: function (e) {
              alert(e.message)
              $("body").mLoading("hide")
            }
          })
        });
        return false
      }
      if (layEvent === 'del2') {
        obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
        $("body").mLoading("show")
        $.ajax({
          type: "post",
          url: "../confirmPunish",
          async: true,
          data: {
            punish: newpunsihint1,
            pId: id,
            playerUid: playerUidnew,
            playerNumber: playerNamenew,
            server: servernew,
            endtime: endtimenew,
          },
          success: function (e) {
            alert(e.message)
            $("body").mLoading("hide")
            tableIns.reload()
            location.closeAll()

          }

        })
        location.closeAll()

      }

    })


 //批量删除
 $("#but-removeBatch").click(function () {
  // console.log(table.checkStatus('demo2'))
  var array = table.checkStatus('demo2').data
  console.log(table.checkStatus('demo2').data)
  if (array.length == 0) {
    layer.msg("请选择要删除的记录")
  } else {
    var arr = []
    for (var i in array) {
      arr.push(array[i].pid)
      // console.log(dids.push(array[i].pid))
    }
    var jsons = arr.join(',')
    if (jsons == "") {
      alert("操作成功")
      $("body").mLoading("hide")
      return false;
  }
  $.ajax({
    type: "post",
    url: '../deleteByTabulation',
    async: true,
    data: {
        pIds: jsons,

    },
    success: function (res) {
        alert(res.message);
        $("body").mLoading("hide")
        
        tableIns.reload()
    }
});

  }
})

//批量处罚
$("#but-removepunish").click(function (obj) {
  var data = obj.data
  var newpunsihint1 = $("#punsihint1").val();
  var array = table.checkStatus('demo2').data
  console.log(table.checkStatus('demo2').data)
  if (array.length == 0) {
    layer.msg("请选择要删除的记录")
  } else {
    var arr = []
    for (var i in array) {
      arr.push(array[i].pid)
      // console.log(dids.push(array[i].pid))
    }
    var jsons = arr.join(',')
    if (jsons == "") {
      alert("操作成功")
      $("body").mLoading("hide")
      return false;
  }
  $.ajax({
    type: "post",
    url: '../confirmPunish',
    async: true,
    data: {
        pIds: jsons,
        punish:newpunsihint1,

    },
    success: function (res) {
        alert(res.message);
        $("body").mLoading("hide")
        
        tableIns.reload()
    }
});

  }
})






    layer.open({
      type: 1,
      title: "待处罚列表",
      shadeClose: false,
      shade: 0,
      content: $("#add_area"),
      area: ['800px', '600px'],
      btn: ["关闭"],

      yes: function (index, layero) {
        location.reload()
        tableIns.reload()
      },


    })

  })
















  //点击查询
  $("#query").click(function () {
    var server = $("#allserver").val();
    var starttime = $("#test1").val();
    var endtime = $("#test2").val();
    var sotrall = $("#allserver2").val();
    table.render({
      elem: '#test',
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
      }
      , url: '../selPunishList'
      , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
      , page: true
      , where: {
        serverId: server,
        startime: starttime,
        endtime: endtime,
        punish: sotrall
      },
      cols: [[
        {
          field: 'playerName',
          width: '16%',
          title: '玩家名称'
        }
        , {
          field: 'playerNumber',
          width: '16%',
          title: '玩家账号'
        }
        , {
          field: 'server',
          width: '16%',
          title: '所在区服'
        }
        , {
          field: 'punish',
          width: '16%',
          title: '处罚内容'
        }
        , {
          field: 'startime',
          title: '添加时间',
          width: '16%', minWidth: 100
        } //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
        , {
          field: 'endtime',
          width: '16%',
          title: '结束时间'
        }
      ]]
    });
    location.reload()
  })



});

