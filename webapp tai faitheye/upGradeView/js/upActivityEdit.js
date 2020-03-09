var activityTypes
var oldDate2
////
var vmnext = new Vue({
  el: '#rewardEquipment',
  data: {
	  message:'helloworld',
	  optionsList:[],
	  optionsListAll:[],
	  numList:'',
	  selected1:'',
	  selected2:'',
	  selected3:'',
	  selected4:'',
	  selected5:'',
	  selectList:[],
    addMoreSelect:[
	{selectValue:'',number:''},
	{selectValue:'',number:''},
	{selectValue:'',number:''},
	{selectValue:'',number:''},
	{selectValue:'',number:''}
    ]
  },
  methods:{
	  delTheDate(obj){
		  vmnext.addMoreSelect.splice(obj,1)
	  },
	  getOptionsInput(query){ 
		  if (query !== '') {
			  vmnext.optionsList = vmnext.optionsListAll.filter(item => {
              return item.goodsName.indexOf(query) > -1
            }).slice(0, 10) // 那么用户搜索的时候, 根据完整的列表来搜, 搜到的结果同样截取前50条, 不足50条忽略即可
        }
		              else {
		            	  vmnext.optionsList = vmnext.optionsListAll.slice(0, 10) // 关键字为空的时候又将完整的列表数据截取前50条渲染回去
          }
	  },
	  setDistrict () {
		  $.post("../getActivityReward.action", function (data) {
			  vmnext.optionsList=data.data.slice(0,10)
				 vmnext.optionsListAll=data.data
			    });
      },
},
created:function(){
	this.setDistrict()
}
})
//渲染限时商店奖励配置
var vm1 = new Vue({
	  el: '#rewardEquipment1',
	  data: {
		  message:'helloworld',
		  optionsList:[],
		  optionsListT:[],
		  optionsListThree:[],
		  optionsListF:[],
		  optionsListFive:[],
		  optionsListAll:[],
		  optionsListAllT:[],
		  optionsListAllThree:[],
		  optionsListAllF:[],
		  optionsListAllFive:[],
		  numList:'',
		  selected1:'',
		  selected2:'',
		  selected3:'',
		  selected4:'',
		  selected5:'',
		  selectList:[],
	    addMoreSelect:[
		{selectValue:'',number:'',isbing:'1'},
		{selectValue:'',number:'',isbing:'1'},
		{selectValue:'',number:'',isbing:'1'},
		{selectValue:'',number:'',isbing:'1'},
		{selectValue:'',number:'',isbing:'1'}
	    ]
	  },
	  methods:{
		  delTheDate(obj){
			  vm1.addMoreSelect.splice(obj,1)
		  },
		  getOptionsInput(query){ 
			  if (query !== '') {
	            vm1.optionsList = vm1.optionsListAll.filter(item => {
	              return item.goodsName.indexOf(query) > -1
	            }).slice(0, 10) // 那么用户搜索的时候, 根据完整的列表来搜, 搜到的结果同样截取前10条, 不足10条忽略即可
	        }
			              else {
	            vm1.optionsList = vm1.optionsListAll.slice(0, 10) // 关键字为空的时候又将完整的列表数据截取前10条渲染回去
	          }
		  },
		  setDistrict () {
			  $.post("../getActivityReward.action", function (data) {
					 vm1.optionsList=data.data.slice(0,10)
					 vm1.optionsListT=data.data.slice(0,10)
					 vm1.optionsListThree=data.data.slice(0,10)
					 vm1.optionsListF=data.data.slice(0,10)
					 vm1.optionsListFive=data.data.slice(0,10)
					 vm1.optionsListAll=data.data
					 vm1.optionsListAllT=data.data
					 vm1.optionsListAllThree=data.data
					 vm1.optionsListAllF=data.data
					 vm1.optionsListAllFive=data.data
				    });
	      },
	},
	created:function(){
		this.setDistrict()
	}
})

////
layui.use(['table', 'layer', 'form', 'element','laydate'], function () {
  var table = layui.table;
  var layer = layui.layer;
  var form = layui.form;
  var laydate = layui.laydate
  //执行一个时间实例
  laydate.render({
    elem: '#data2' //指定元素
  });

  var rewardData;
  getReward()
  function getReward(){
	  $.ajax({
          type: "post",
          url: '../getActivityReward.action',
          async: false,
          data: {
              
          },
          success: function (json) {
        	  rewardData=json
          }
	  })
  }
  var cyclenum=' '
//编辑跳转过来的
	//增加
	  $('#addSelect').click(function(){
		 var newObj={selectValue:'',number:''}
		 vmnext.addMoreSelect.push(newObj)
	  })
	  $('#addSelect1').click(function(){
		  var newObj={selectValue:'',number:'',isbing:'1'}
		  vm1.addMoreSelect.push(newObj)
	  })
	  $('.cancleBtn').click(function(){
		  $('#rewardEquipment').css("display",'none')
		  vmnext.addMoreSelect=[
		{selectValue:'',number:''},
		{selectValue:'',number:''},
		{selectValue:'',number:''},
		{selectValue:'',number:''},
		{selectValue:'',number:''}
	    ]
	  })
	  $('.cancleBtn1').click(function(){
	  $('#rewardEquipment1').css("display",'none')
	  vm1.addMoreSelect=[
	{selectValue:'',number:'',isbing:'1'},
	{selectValue:'',number:'',isbing:'1'},
	{selectValue:'',number:'',isbing:'1'},
	{selectValue:'',number:'',isbing:'1'},
	{selectValue:'',number:'',isbing:'1'}
    ]
  })
	   $('#activename_type').change(function () {
		   var myselect=document.getElementById('activename_type')
	          var index=myselect.selectedIndex ;
	          var textname=myselect.options[index].text
	          $("#activename_name").val(textname)
	   })
activeid()
  function activeid(){
	 $('#activeid_id').val($.cookie('the_cookie_pid'))//活动id
    $('#activename_bianhao').val($.cookie('the_cookie_pname'))//活动编号
    $('#activename_canshu').val($.cookie('the_cookie_pCanNum'))//周期参数
    var activityName=$.cookie('the_cookie_pactivityName')
    $('#activename_name').val(activityName)//活动名称
    var activityId= $('#activeid_id').val()
    var active_bianhao = $('#activename_bianhao').val()
    $.ajax({
          type: "post",
          url: "../getActivityList.action",
          async: true,
          data: {
            activityId: active_bianhao,
          },
          success: function (json) {
        	  var data=json.data[0]
        	var paramFirstId=data.cycleFirstId;
        	var imageSrc=data.textImage;
        	var paramReady=data.paramArr1;
        	var paramReadyTwo=data.paramArr2;
        	var paramReadyThree=data.paramArr3;
        	var paramReadyFour=data.paramArr4;
        	var paramReadyFif=data.paramArr5;
        	var activityType=data.activityType
        	activityTypes = data.activityType
        	console.log(activityType)
//        	$('#activename_type').val(activityType)//周期首位id
        	
        	$('#activename_type option').remove()
        	$('#activename_type ').append("<option>"+activityName+"</option>")
//        	$("#activename_type").find("option[text='+activityName+']").attr("selected",true);
        	$('#activename_shouwei').val(paramFirstId)//周期首位id
        	$('#activename_image').val(imageSrc)//图片资源
        	$('#activename_yuliu').val(paramReady)//预留参数
        	$('#activename_yuliuTwo').val(paramReadyTwo)//预留参数
        	$('#activename_yuliuThree').val(paramReadyThree)//预留参数
        	$('#activename_yuliuFour').val(paramReadyFour)//预留参数
        	$('#activename_yuliuFif').val(paramReadyFif)//预留参数
        	data.firstOpenDayOfWeek//第一个星期几
        	if(data.firstOpenDayOfWeek != -1){
        		$("input[type='checkbox']").prop("checked",true);
        		$("#start_time").val(Number(data.firstOpenDayOfWeek)+1)
        	}
        	//具体日期
        	//活动持续
        	if(data.durationDays == "未配置"){
        		$("#chixuDay").val("")
        	}else{
        		$("#chixuDay").val(data.durationDays)
        	}
        	
        	//活动循环
        	if(data.cycleDays == "未配置"){
        		$("#xunhuanDay").val("")
        	}else{
        		$("#xunhuanDay").val(data.cycleDays)
        	}
        	//多选天数
        	var dataTime = data.startTime
        	dataTime = dataTime.split(";")
        		if(dataTime[0] == "未配置"){
            		$("#time_peizhi input[type='radio']").eq(0).prop("checked",false);
            		$("#time_peizhi input[type='radio']").eq(1).prop("checked",false);
            		$("#time_peizhi input[type='radio']").eq(2).prop("checked",false);
            		$("#time_peizhi input[type='radio']").eq(3).prop("checked",false);
            	}else if(dataTime[0].indexOf("开服") >= 0){
            		$("#time_peizhi input[type='radio']").eq(0).prop("checked",false);
            		$("#time_peizhi input[type='radio']").eq(1).prop("checked",true);
            		$("#time_peizhi input[type='radio']").eq(2).prop("checked",false);
            		$("#time_peizhi input[type='radio']").eq(3).prop("checked",false);
            		dataTime[0] = dataTime[0].substring(0,dataTime[0].length-2)
                	dataTime[0]= dataTime[0].substring(2)
            		$("#data2").val(dataTime[0])
            	}else if(dataTime[0].indexOf("跨服") >= 0){
            		$("#time_peizhi input[type='radio']").eq(0).prop("checked",false);
            		$("#time_peizhi input[type='radio']").eq(1).prop("checked",false);
            		$("#time_peizhi input[type='radio']").eq(2).prop("checked",true);
            		$("#time_peizhi input[type='radio']").eq(3).prop("checked",false);
            		dataTime[0] = dataTime[0].substring(0,dataTime[0].length-2)
                	dataTime[0]= dataTime[0].substring(2)
            		$("#data3").val(dataTime[0])
            	}else if(dataTime[0].indexOf("合服") >= 0){
            		$("#time_peizhi input[type='radio']").eq(0).prop("checked",false);
            		$("#time_peizhi input[type='radio']").eq(1).prop("checked",false);
            		$("#time_peizhi input[type='radio']").eq(2).prop("checked",false);
            		$("#time_peizhi input[type='radio']").eq(3).prop("checked",true);
            		dataTime[0] = dataTime[0].substring(0,dataTime[0].length-2)
                	dataTime[0]= dataTime[0].substring(2)
            		$("#data4").val(dataTime[0])
            	}else{
            		$("#time_peizhi input[type='radio']").eq(0).prop("checked",true);
            		$("#time_peizhi input[type='radio']").eq(1).prop("checked",false);
            		$("#time_peizhi input[type='radio']").eq(2).prop("checked",false);
            		$("#time_peizhi input[type='radio']").eq(3).prop("checked",false);
            		$("#data2").val(dataTime)
            	}
        	
        	
            $("body").mLoading("hide")
          }
        })
    
     //第一个实例
  table.render({
    elem: '#demoBranch'
    // , height: 312
    , url: '../getActivityBranchTemplateList.action' //数据接口
    ,where: {
      isTemplate:0,
      pId: active_bianhao,
  }
    , response: {
      statusName: 'state',
      msgName: 'message',
      statusCode: true,
      countName: 'total',
      dataName: 'data'
    },
   
    request: {
      pageName: 'pageIndex',
      limitName: 'pageSize'
    }
    , cols: [[ //表头

      {
        field: 'attributeId',
        title: '序号'+cyclenum,
        width:150,
        edit: 'text'
      },
      {
        field: 'cycleIndex',
        title: '周期内序号'+cyclenum,
        width:150,
        edit: 'text'
      }
      , {
        field: 'reachCondition',
        title: '达成条件'+cyclenum,
        edit: 'text',
        edit: 'text'
      }
      , {
        field: 'reward',
        title: '奖励'+cyclenum,
//        edit: 'text',
        templet:function(value){
        	var rewardName = [];
        	var rewardstr ="";
        	var count = 0;
        	var Reward = value.reward;
        	Reward = Reward.substring(0,Reward.length-1)
        	Reward= Reward.substring(1)
        	Reward = Reward.split(",")
        	for(var j=0;j<Reward.length;j++){
        		for(var i=0;i<rewardData.data.length;i++){
              		if(rewardData.data[i].rewardId == Reward[j]){
              			Reward[j] = rewardData.data[i].goodsName
              			rewardstr= Reward.join(",")
              			rewardstr = "("+ rewardstr +")"
                  	}
              	}
            }
        	return rewardstr
        }
      }
      , {
        field: 'textImage',
        title: '文件图片资源'+cyclenum,
        edit: 'text'
      }
      , {
        field: 'paramArr1',
        title: '保留参数1'+cyclenum,
        edit: 'text'
      }
      , {
        field: 'paramArr2',
        title: '保留参数2'+cyclenum,
        edit: 'text'
      }
      , {
        field: 'paramArr3',
        title: '保留参数3'+cyclenum,
        edit: 'text'
      }
//      , {
//        field: 'paramArr4',
//        title: '保留参数4'+cyclenum,
//        edit: 'text'
//      }
      , {
        field: 'paramArr5',
        title: '保留参数5'+cyclenum,
        edit: 'text'
      }
      , {
        field: 'operaTion',
        title: '操作'+cyclenum,
        width:350,
        templet: function (value) {
          return `
                    <span id='jiangli' onclick="jiangli_pei()" lay-event='reise' style="margin-right:20px;color:#2fa88d;">奖励配置</span> 
                    <span class='moveUpOrDown up' lay-event='upload'  style="margin-right:20px;color:#82ab2a;">上移</span> 
                    <span class='moveUpOrDown down' lay-event='download'  style="margin-right:20px;color:#9e254f;">下移</span>
                    <span class='start_up' lay-event='del' style="color:#e63838;">删除</span> 
                    
                    `
        }
      }
    ]],
    done:function(res,curr,count){
    	oldDate2 = res.data[0]
    	 var that = this.elem.next();
        res.data.forEach(function (item, index) {
      	  //console.log(item.empName);item表示每列显示的数据
           if (index%2==0) {
                var tr = that.find(".layui-table-box tbody tr[data-index='" + index + "']").css("background-color", "#333333");
            } else{
                var tr = that.find(".layui-table-box tbody tr[data-index='" + index + "']").css("background-color", "#242424");
            } 
        });
    }
  });
  }
 
  
  
//表格编辑
  table.on('edit(test)', function(obj){
	    var value = obj.value //得到修改后的值
	    var preValue=$(this).prev().text()//修改之前的值
	    var $this = $(this);
	    var tr = $this.parents('tr');
	    var trIndex = tr.data('index');
	    var dataOld=table.cache["demoBranch"]
	    if(!value){
	    	layer.msg('序号不能为空,请重新修改');
	    	dataOld[trIndex].attributeId=preValue
	    	var limitss = dataOld.length
		    table.render({
			      elem: '#demoBranch',
			      id: 'demoBranch'
			      // , height: 312
			      ,data:dataOld
			      ,limit:limitss
			      ,cols: [[ //表头
			        {
			          field: 'attributeId',
			          title: '序号',
			          width: 150,
			          type: 'space',
			          edit: 'text'
			        },
			        {
			          field: 'cycleIndex',
			          title: '周期内序号'+cyclenum,
			          width: 150,
			          edit: 'text'
			        }
			        
			        , {
			          field: 'reachCondition',
			          title: '达成条件'+cyclenum,
			          edit: 'text',
			        }
			        , {
			          field: 'reward',
			          title: '奖励'+cyclenum,
//			          edit: 'text',
			          templet:function(value){
			        	  var rewardName = [];
  	                	var rewardstr ="";
  	                	var count = 0;
  	                	var Reward = value.reward;
  	                	Reward = Reward.substring(0,Reward.length-1)
  	                	Reward= Reward.substring(1)
  	                	Reward = Reward.split(",")
  	                	for(var j=0;j<Reward.length;j++){
  	                		for(var i=0;i<rewardData.data.length;i++){
                            		if(rewardData.data[i].rewardId == Reward[j]){
                            			Reward[j] = rewardData.data[i].goodsName
                            			rewardstr= Reward.join(",")
                            			rewardstr = "("+ rewardstr +")"
      	                      	}
                            	}
                          }
  	                	return rewardstr
		                }
			        }
			        , {
			          field: 'textImage',
			          title: '文件图片资源'+cyclenum,
			          edit: 'text'
			        }
			        , {
			          field: 'paramArr1',
			          title: '保留参数1'+cyclenum,
			          edit: 'text'
			        }
			        , {
			          field: 'paramArr2',
			          title: '保留参数2'+cyclenum,
			          edit: 'text'
			        }
			        , {
			          field: 'paramArr3',
			          title: '保留参数3'+cyclenum,
			          edit: 'text'
			        }
//			        , {
//			          field: 'paramArr4',
//			          title: '保留参数4'+cyclenum,
//			          edit: 'text'
//			        }
			        , {
			          field: 'paramArr5',
			          title: '保留参数5'+cyclenum,
			          edit: 'text'
			        }
			        , {
			          field: 'operaTion',
			          title: '操作'+cyclenum,
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

			      ]]
			    });
	    }
	    var checkOnlyId=[]
	    for(var i=0;i<dataOld.length;i++){
	    	checkOnlyId.push(parseInt(dataOld[i].attributeId))
	    }
	    var nary = checkOnlyId.sort();
	    for(var i=0;i< nary.length;i++) {
	        if(nary[i] === nary[i+1]) {
	        	 layer.msg('序号重复');
	        	 dataOld[trIndex].attributeId=null
	        	 var limitss = dataOld.length
				    table.render({
					      elem: '#demoBranch',
					      id: 'demoBranch'
					      // , height: 312
					      ,data:dataOld
					      ,limit:limitss
					      ,cols: [[ //表头

					          {
					            field: 'attributeId',
					            title: '序号'+cyclenum,
					            width:150,
					            edit: 'text'
					          },
					          {
					            field: 'cycleIndex',
					            title: '周期内序号'+cyclenum,
					            width:150,
					            edit: 'text'
					          }
					          , {
					            field: 'reachCondition',
					            title: '达成条件'+cyclenum,
					            edit: 'text',
					            edit: 'text'
					          }
					          , {
					            field: 'reward',
					            title: '奖励'+cyclenum,
//					            edit: 'text',
					            templet:function(value){
					            	var rewardName = [];
		    	                	var rewardstr ="";
		    	                	var count = 0;
		    	                	var Reward = value.reward;
		    	                	Reward = Reward.substring(0,Reward.length-1)
		    	                	Reward= Reward.substring(1)
		    	                	Reward = Reward.split(",")
		    	                	for(var j=0;j<Reward.length;j++){
		    	                		for(var i=0;i<rewardData.data.length;i++){
		                              		if(rewardData.data[i].rewardId == Reward[j]){
		                              			Reward[j] = rewardData.data[i].goodsName
		                              			rewardstr= Reward.join(",")
		                              			rewardstr = "("+ rewardstr +")"
		        	                      	}
		                              	}
		                            }
		    	                	return rewardstr
				                }
					          }
					          , {
					            field: 'textImage',
					            title: '文件图片资源'+cyclenum,
					            edit: 'text'
					          }
					          , {
					            field: 'paramArr1',
					            title: '保留参数1'+cyclenum,
					            edit: 'text'
					          }
					          , {
					            field: 'paramArr2',
					            title: '保留参数2'+cyclenum,
					            edit: 'text'
					          }
					          , {
					            field: 'paramArr3',
					            title: '保留参数3'+cyclenum,
					            edit: 'text'
					          }
//					          , {
//					            field: 'paramArr4',
//					            title: '保留参数4'+cyclenum,
//					            edit: 'text'
//					          }
					          , {
					            field: 'paramArr5',
					            title: '保留参数5'+cyclenum,
					            edit: 'text'
					          }
					          , {
					            field: 'operaTion',
					            title: '操作'+cyclenum,
					            width:350,
					            templet: function (value) {
					              return `
					                        <span id='jiangli' onclick="jiangli_pei()" lay-event='reise' style="margin-right:20px;color:#2fa88d;">奖励配置</span> 
					                        <span class='moveUpOrDown up' lay-event='upload'  style="margin-right:20px;color:#82ab2a;">上移</span> 
					                        <span class='moveUpOrDown down' lay-event='download'  style="margin-right:20px;color:#9e254f;">下移</span>
					                        <span class='start_up' lay-event='del' style="color:#e63838;">删除</span> 
					                        
					                        `
					            }
					          }
					        ]]
					    });
	        }
	    }
  });


  //单个删除
  table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
    var data = obj.data //拿到这一行数据
    var layEvent = obj.event
    var data_tr=$(this)
     var tr = $(data_tr).parents('tr');
    var trIndex = tr.data('index');
    var newattributeId = data.attributeId;
    if (layEvent === 'del') { //删除
    	layer.open({
			type: 1,
			area: ['300px', '150px'],
			title: "删除",
			shadeClose: false,
			shade: 0,
			content: $('#deleteTop'),
			closeBtn: 0,
			btn: ['确定','取消'],
			yes: function(index, layero) {
				  obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
			       layer.close(index);//向服务端发送删除指令
			}
		})
    }
   //上移
    else if(layEvent === 'upload'){
    	//   alert("up")
    	var tr=$(data_tr).parent().parent().parent();
    	if($(tr).prev().html()==null){
    		alert("已经是最顶部了！");
    		return;
    	}else{
    		$(tr).insertBefore($(tr).prev());
    	}
    //下移
    }else if(layEvent === 'download'){
        //    alert("download")
    	var tr=$(data_tr).parent().parent().parent();
    	if($(tr).next().html()==null){
    		alert("已经是最底部了!");
    		return;
    	}else{
    		$(tr).insertAfter($(tr).next());
    	}
    }else if(layEvent==='reise'){
    	var index;
    	for(var i=0;i<$(".layui-table-body table tr").length;i++){
    		if($(".layui-table-body table tr")[i].className == "layui-table-click" ||$(".layui-table-body table tr")[i].className == "layui-table-hover"){
    			index = i;
    		}
    	}
    	var attributeid=data.attributeId
        var activityid=data.activityId
        $("#rewardEquipment").css('display','block')
        console.log($("#activename_type").val())
        if($("#activename_type").val() == "限时商店" || $("#activename_type").val() == "折扣商店"){
      	    $("#rewardEquipment").css('display','none')
    		$("#rewardEquipment1").css('display','block')
    	}
       //// 
   //保存
    $('#saveSelect').off('click').click(function(){
  	  var array=[]
  	  var Array=[]
  	vmnext.optionsListAll.forEach(function(item){
  		  for(var i=0;i<vmnext.addMoreSelect.length;i++){
  			  if(vmnext.addMoreSelect[i].selectValue===item.goodsName){
//  				  vm.addMoreSelect[i].selectValue=item.rewardId
  				vmnext.addMoreSelect[i].selectValue=item.goodsName
  				vmnext.addMoreSelect[i].id=item.rewardId
  			  }
  		  }
  	  })
  	  var newArray = vmnext.addMoreSelect.filter(d => d);
  	for(var i=0;i<newArray.length;i++){
  		if(newArray[i].number == ""&& newArray[i].selectValue !="" || newArray[i].number != ""&& newArray[i].selectValue ==""||newArray[i].number == ""&& newArray[i].selectValue ==""){
			  alert("请输入完整奖励配置")
			  return false
		  }else{
			  break;
		  }
  	  }
  	  for(var i=0;i<newArray.length;i++){
  		if(newArray[i].number !=""){
			  var rewardNum = Number(newArray[i].number)
			  if( !(/(^[1-9]\d*$)/.test(rewardNum))){
				  alert('请输入正整数')
				  return false;
			  }
			  if(newArray[i].selectValue&&newArray[i].number){
	  			  array.push(newArray[i].id)
	  			  array.push(newArray[i].number)
	  			  Array.push(newArray[i].selectValue)
	  			  Array.push(newArray[i].number)
	  		  }
		  }
  	  }
//  	  console.log(array)
  	  var params=array.join(',')
  	  var submitParams="("+params+")"
  	var arr3_add = $("table .layui-table-click")
  	var dataAll=table.cache["demoBranch"]
  	var str_reward = arr3_add[0].childNodes[3].childNodes[0].childNodes[0].textContent;
	  str_reward = str_reward.substring(0,str_reward.length-1)
  	  str_reward= str_reward.substring(1)
  	  str_reward = str_reward.split(",")
  	  if(str_reward[2] == 1 || str_reward[4] == 1||str_reward[6] == 1||str_reward[8] == 1||str_reward[10] == 1){
  		var params=array.join(',')
    	  var submitParams="("+params+","+1+")"
    	  obj.data.reward =submitParams
    	  dataAll[index] =obj.data
  	  }else{
  		var params=array.join(',')
    	  var submitParams="("+params+")"
    	  obj.data.reward =submitParams
    	  dataAll[index] =obj.data
  	  }
      	$.ajax({
      		type:"get",
      		url:"../updateActivityBranch.action",
      		async:true,
      		data: {
      			attributeId:attributeid,
      			activityId:activityid,
      			reward:submitParams
      		},
      		success: function(json) {
      			$("#rewardEquipment").css('display','none')
      			vmnext.addMoreSelect=[
		{selectValue:'',number:''},
		{selectValue:'',number:''},
		{selectValue:'',number:''},
		{selectValue:'',number:''},
		{selectValue:'',number:''}
	    ]
//      			 vm.addMoreSelect=[{selectValue:'',number:''},{selectValue:'',number:''},{selectValue:'',number:''},{selectValue:'',number:''},{selectValue:'',number:''}]
  				$("body").mLoading("hide")
  			    var activename_type = $('#activename_type').val()
//  			    var dataAll=table.cache["demoBranch"]
//  				dataAll[trIndex].reward=submitParams
//  			    data.reward = submitParams
//  			    location.reload();
  			    //第一个实例
  			    var limits = dataAll.length;
  			    table.render({
  			      elem: '#demoBranch',
  			      id: 'demoBranch'
  			      // , height: 312
  			      ,data:dataAll
  			      ,limit:limits
  			      ,cols: [[ //表头
  			        {
  			          field: 'attributeId',
  			          title: '序号',
  			          width: 150,
  			          type: 'space',
  			          edit: 'text'
  			        },
  			        {
  			          field: 'cycleIndex',
  			          title: '周期内序号'+cyclenum,
  			          width: 150,
  			          edit: 'text'
  			        }
  			        
  			        , {
  			          field: 'reachCondition',
  			          title: '达成条件'+cyclenum,
  			          edit: 'text',
  			        }
  			        , {
//  			          field: 'reward',
  			          field: Array,
  			          title: '奖励'+cyclenum,
//  			          edit: 'text',
  			        templet:function(value){
  			        	var rewardName = [];
	                	var rewardstr ="";
	                	var count = 0;
	                	var Reward = value.reward;
	                	Reward = Reward.substring(0,Reward.length-1)
	                	Reward= Reward.substring(1)
	                	Reward = Reward.split(",")
	                	for(var j=0;j<Reward.length;j++){
	                		for(var i=0;i<rewardData.data.length;i++){
                          		if(rewardData.data[i].rewardId == Reward[j]){
                          			Reward[j] = rewardData.data[i].goodsName
                          			rewardstr= Reward.join(",")
                          			rewardstr = "("+ rewardstr +")"
    	                      	}
                          	}
                        }
	                	return rewardstr
	                }
  			        }
  			        , {
  			          field: 'textImage',
  			          title: '文件图片资源'+cyclenum,
  			          edit: 'text'
  			        }
  			        , {
  			          field: 'paramArr1',
  			          title: '保留参数1'+cyclenum,
  			          edit: 'text'
  			        }
  			        , {
  			          field: 'paramArr2',
  			          title: '保留参数2'+cyclenum,
  			          edit: 'text'
  			        }
  			        , {
  			          field: 'paramArr3',
  			          title: '保留参数3'+cyclenum,
  			          edit: 'text'
  			        }
//  			        , {
//  			          field: 'paramArr4',
//  			          title: '保留参数4'+cyclenum,
//  			          edit: 'text'
//  			        }
  			        , {
  			          field: 'paramArr5',
  			          title: '保留参数5'+cyclenum,
  			          edit: 'text'
  			        }
  			        , {
  			          field: 'operaTion',
  			          title: '操作'+cyclenum,
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

  			      ]]
  			    });
  			  
  			}
      	})
  	  
    })
    //限时商店奖励保存
  $('#saveSelect1').off('click').click(function(){
	  var array=[]
  	  var Array=[]
  	  vm1.optionsListAll.forEach(function(item){
  		  for(var i=0;i<vm1.addMoreSelect.length;i++){
  			  if(vm1.addMoreSelect[i].selectValue===item.goodsName){
//  				  vm.addMoreSelect[i].selectValue=item.rewardId
  				vm1.addMoreSelect[i].selectValue=item.goodsName
  				vm1.addMoreSelect[i].id=item.rewardId
  			  }
  		  }
  	  })
  	  var newArray = vm1.addMoreSelect.filter(d => d);
  	for(var i=0;i<newArray.length;i++){
  		if(newArray[i].number == ""&& newArray[i].selectValue !="" || newArray[i].number != ""&& newArray[i].selectValue ==""||newArray[i].number == ""&& newArray[i].selectValue ==""){
			  alert("请输入完整奖励配置")
			  return false
		  }else{
			  break;
		  }
  	  }
  	  for(var i=0;i<newArray.length;i++){
  		if(newArray[i].number !=""){
			  var rewardNum = Number(newArray[i].number)
			  if( !(/(^[1-9]\d*$)/.test(rewardNum))){
				  alert('请输入正整数')
				  return false;
			  }
			  if(newArray[i].selectValue&&newArray[i].number&&newArray[i].isbing){
				  array.push(newArray[i].selectValue)
				  array.push(newArray[i].number)
				  array.push(newArray[i].isbing)
				  Array.push(newArray[i].id)
				  Array.push(newArray[i].number)
				  Array.push(newArray[i].isbing)
			  }else if(newArray[i].selectValue&&newArray[i].number){
				  array.push(newArray[i].selectValue)
				  array.push(newArray[i].number)
				  Array.push(newArray[i].id)
				  Array.push(newArray[i].number)
			  }
		  }
  	  }
//  	  console.log(array)
  	  var params=array.join(',')
  	  var submitParams="("+params+")"
  	  var params2=Array.join(',')
	  var submitParams2="("+params2+")"
//  	var arr3_add = $("table .layui-table-click")
  	var dataAll=table.cache["demoBranch"]
//  	var str_reward = arr3_add[0].childNodes[3].childNodes[0].childNodes[0].textContent;
//	  str_reward = str_reward.substring(0,str_reward.length-1)
//  	  str_reward= str_reward.substring(1)
//  	  str_reward = str_reward.split(",")
//  	  if(str_reward[2] == 1 || str_reward[4] == 1||str_reward[6] == 1||str_reward[8] == 1||str_reward[10] == 1){
//  		var params=array.join(',')
//    	  var submitParams="("+params+","+1+")"
//    	  obj.data.reward =submitParams
//    	  dataAll[index] =obj.data
//  	  }else{
//  		var params=array.join(',')
//    	  var submitParams="("+params+")"
//    	  obj.data.reward =submitParams
//    	  dataAll[index] =obj.data
//  	  }
	  obj.data.reward =submitParams2
	  dataAll[index] =obj.data
      	$.ajax({
      		type:"get",
      		url:"../updateActivityBranch.action",
      		async:true,
      		data: {
      			attributeId:attributeid,
      			activityId:activityid,
      			reward:submitParams2
      		},
      		success: function(json) {
      			$("#rewardEquipment1").css('display','none')
      			vm1.addMoreSelect=[
		{selectValue:'',number:'',isbing:'1'},
		{selectValue:'',number:'',isbing:'1'},
		{selectValue:'',number:'',isbing:'1'},
		{selectValue:'',number:'',isbing:'1'},
		{selectValue:'',number:'',isbing:'1'}
	    ]
//      			 vm.addMoreSelect=[{selectValue:'',number:''},{selectValue:'',number:''},{selectValue:'',number:''},{selectValue:'',number:''},{selectValue:'',number:''}]
  				$("body").mLoading("hide")
  			    var activename_type = $('#activename_type').val()
//  			    var dataAll=table.cache["demoBranch"]
//  				dataAll[trIndex].reward=submitParams
//  			    data.reward = submitParams
//  			    location.reload();
  			    //第一个实例
  			    var limits = dataAll.length;
  			    table.render({
  			      elem: '#demoBranch',
  			      id: 'demoBranch'
  			      // , height: 312
  			      ,data:dataAll
  			      ,limit:limits
  			      ,cols: [[ //表头
  			        {
  			          field: 'attributeId',
  			          title: '序号',
  			          width: 150,
  			          type: 'space',
  			          edit: 'text'
  			        },
  			        {
  			          field: 'cycleIndex',
  			          title: '周期内序号'+cyclenum,
  			          width: 150,
  			          edit: 'text'
  			        }
  			        
  			        , {
  			          field: 'reachCondition',
  			          title: '达成条件'+cyclenum,
  			          edit: 'text',
  			        }
  			        , {
//  			          field: 'reward',
  			          field: Array,
  			          title: '奖励'+cyclenum,
//  			          edit: 'text',
  			        templet:function(value){
  			        	var rewardName = [];
	                	var rewardstr ="";
	                	var count = 0;
	                	var Reward = value.reward;
	                	Reward = Reward.substring(0,Reward.length-1)
	                	Reward= Reward.substring(1)
	                	Reward = Reward.split(",")
	                	for(var j=0;j<Reward.length;j++){
	                		for(var i=0;i<rewardData.data.length;i++){
                          		if(rewardData.data[i].rewardId == Reward[j]){
                          			Reward[j] = rewardData.data[i].goodsName
                          			rewardstr= Reward.join(",")
                          			rewardstr = "("+ rewardstr +")"
    	                      	}
                          	}
                        }
	                	return rewardstr
	                }
  			        }
  			        , {
  			          field: 'textImage',
  			          title: '文件图片资源'+cyclenum,
  			          edit: 'text'
  			        }
  			        , {
  			          field: 'paramArr1',
  			          title: '保留参数1'+cyclenum,
  			          edit: 'text'
  			        }
  			        , {
  			          field: 'paramArr2',
  			          title: '保留参数2'+cyclenum,
  			          edit: 'text'
  			        }
  			        , {
  			          field: 'paramArr3',
  			          title: '保留参数3'+cyclenum,
  			          edit: 'text'
  			        }
//  			        , {
//  			          field: 'paramArr4',
//  			          title: '保留参数4'+cyclenum,
//  			          edit: 'text'
//  			        }
  			        , {
  			          field: 'paramArr5',
  			          title: '保留参数5'+cyclenum,
  			          edit: 'text'
  			        }
  			        , {
  			          field: 'operaTion',
  			          title: '操作'+cyclenum,
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

  			      ]]
  			    });
  			  
  			}
      	})
  })
    
//      var i=6;
//      var formAppend=document.getElementById('formPeiZhi')
//	  if(formAppend.contains(document.getElementById('addDiv'))){
//		  formAppend.removeChild(document.getElementById('addDiv'))
//	  }
//    	layer.open({
//    	    type: 1,
//    	    title: ["活动奖励配置", 'text-align:center;'],
//    	    content: $("#jiangli_peizhi"),
//    	    area: ['500px', '500px'],
//          btn: ['增加','保存'],
//          yes: function(){
//            var length=$('.yihang').length-1
//            var appendContent = document.querySelectorAll('.yihang')[length]
//            // var appendContent = $('.yihang').last();
//            var htmlCon = '<div class="yihang" style="margin-top:20px;display:inline-block;"><div class="shengming_one"><select name="city" lay-verify="" lay-search class="shengmingyaoshuiB" id="reward'+i+'" placeholder="请输入"></select></div><span class="shengmingspan">数量</span><input type="text" class="jiangli_peizhi_input" id="num'+i+'"> <input type="button" class="delContent" value="删除" onclick="delTheData($(this))"></button></div>'
//            var myScript= document.createElement("script");
//            myScript.type = "text/javascript";
//            myScript.appendChild(document.createTextNode("function delTheData(obj){var parents=obj.parent();parents.remove(); console.log(length)}"));
//            document.body.appendChild(myScript);
//            function wupinB() {
//			$.post("../getActivityReward.action", function (data) {
//			  $.each(data.data, function (index, item) {
//			    $('.shengmingyaoshuiB').append(new Option(item.goodsName, item.rewardId,));
//			  });
//			  $(".shengmingyaoshuiB").prepend("<option value=''></option>");
//			  form.render('select')
//			    });
//			  }
//            wupinB()
//            var divAdd=document.createElement('div')
//            divAdd.id='addDiv'
//            divAdd.innerHTML=htmlCon
//            formAppend.appendChild(divAdd)
//            i=i+1
//          },
//    	    btn2: function (index) {
//            var params
//            var array=[]
//            var goalsLength=$('.yihang').length//总选择物品即选择框
//            // console.log(goalsLength)
//    	    	var attributeid=data.attributeId
//            var activityid=data.activityId
//            for(var i=1;i<=goalsLength;i++){
//              if($('#reward'+i+'').val()==''){
//                $('#num'+i+'').val()==''
//              }
//                array.push($('#reward'+i+'').val())
//                array.push($('#num'+i+'').val())
//            }
//    	    	var arr = array.filter(function (s) {
//    	    	    return s; // 注：IE9(不包含IE9)以下的版本没有trim()方法
//    	    	});
//    	    	params=arr.join(',')
//    	    	var htm="("+params+")"
////    	    	console.log(arr)
////    	    	console.log(htm)
//    	    	$.ajax({
//    	    		type:"get",
//    	    		url:"../updateActivityBranch.action",
//    	    		async:true,
//    	    		data: {
//    	    			attributeId:attributeid,
//    	    			activityId:activityid,
//    	    			reward:htm
//    	    		},
//    	    		success: function(json) {
//    					layer.close(index);
//						$("body").mLoading("hide")
//    	    			activeid()
//					}
//    	    	})
//    	    }
//    	  })
    }
  })
//增加活动分支按钮
$(".addBranchBtn").click(function () {
	var oldDate = table.cache["demoBranch"];
	var newDateChange=oldDate.filter(value => Object.keys(value).length !== 0);
	var len=newDateChange.length;
	if(len == null || len == 0 || len == ""){
		var newList= oldDate2
	}
	else{
		var lastList = newDateChange[len-1]
		   lastList.LAY_TABLE_INDEX = lastList.LAY_TABLE_INDEX+1
		   var atributeid
		   if(lastList.attributeId==null||lastList.attributeId==undefined||lastList.attributeId==0){
			   atributeid=1
		   }else{
			   atributeid=parseInt(lastList.attributeId)+1
		   }
		   var cycleIndex=lastList.cycleIndex
		   var reachCondition=lastList.reachCondition
		   var reward=lastList.reward
		   var textImage=lastList.textImage
		   var paramArr1=lastList.paramArr1
		   var paramArr2=lastList.paramArr2
		   var paramArr3=lastList.paramArr3
		   var paramArr4=lastList.paramArr4
		   var paramArr5=lastList.paramArr5
		   var newList= {"attributeId":atributeid,"cycleIndex":cycleIndex,"reachCondition":reachCondition,"reward":reward,"textImage":textImage,"paramArr1":paramArr1,"paramArr2":paramArr2,"paramArr3":paramArr3,"paramArr4":paramArr4,"paramArr5":paramArr5,}
		//   console.log(lastList)
		//   console.log(lastList.LAY_TABLE_INDEX)
		    newList.activityId=lastList.activityId+1
	}

   newDateChange.push(newList)
   var limits = newDateChange.length;
	    table.render({
	        elem: '#demoBranch',
	        id: 'demoBranch'
        	,data: newDateChange
        	,limit:limits
	        , cols: [[ //表头
	          // {
	          //   field: 'attributeId',
	          //   title: '序号',
	          //   width: 150,
	          //   edit: 'text'
	          // },
	          {
	            field: 'attributeId',
	            title: '序号'+cyclenum,
	            width: 150,
	            type: 'space',
	            edit: 'text'
	          },
	          {
	            field: 'cycleIndex',
	            title: '周期内序号'+cyclenum,
	            width: 150,
	            edit: 'text'
	          }
	          
	          , {
	            field: 'reachCondition',
	            title: '达成条件'+cyclenum,
	            edit: 'text',
	          }
	          , {
	            field: 'reward',
	            title: '奖励'+cyclenum,
//	            edit: 'text',
	            templet:function(value){
	            	var rewardName = [];
                	var rewardstr ="";
                	var count = 0;
                	var Reward = value.reward;
                	Reward = Reward.substring(0,Reward.length-1)
                	Reward= Reward.substring(1)
                	Reward = Reward.split(",")
                	for(var j=0;j<Reward.length;j++){
                		for(var i=0;i<rewardData.data.length;i++){
                      		if(rewardData.data[i].rewardId == Reward[j]){
                      			Reward[j] = rewardData.data[i].goodsName
                      			rewardstr= Reward.join(",")
                      			rewardstr = "("+ rewardstr +")"
	                      	}
                      	}
                    }
                	return rewardstr
                }
	          }
	          , {
	            field: 'textImage',
	            title: '文件图片资源'+cyclenum,
	            edit: 'text'
	          }
	          , {
	            field: 'paramArr1',
	            title: '保留参数1'+cyclenum,
	            edit: 'text'
	          }
	          , {
	            field: 'paramArr2',
	            title: '保留参数2'+cyclenum,
	            edit: 'text'
	          }
	          , {
	            field: 'paramArr3',
	            title: '保留参数3'+cyclenum,
	            edit: 'text'
	          }
//	          , {
//	            field: 'paramArr4',
//	            title: '保留参数4'+cyclenum,
//	            edit: 'text'
//	          }
	          , {
	            field: 'paramArr5',
	            title: '保留参数5'+cyclenum,
	            edit: 'text'
	          }
	          , {
	            field: 'operaTion',
	            title: '操作'+cyclenum,
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

	        ]]
	      });
 
     });
  
  // 打开一个活动时间配置
  $(".time_to").click(function () {
    layer.open({
      type: 1,
      title: ["活动时间配置", 'text-align:center;','border-bottom:none !important;'],
      content: $("#time_peizhi"),
      area: ['500px', '600px'],
      btn:['保存','取消'],
      closeBtn:0,
      yes:function(index){
        var activityid=$("#activename_bianhao").val()
        // $('input:radio:first').attr('checked', 'checked');//设置一个默认的按钮选项
        var obj = document.getElementsByName("statusDate");
        var mulobj = document.getElementsByName("statusWeek");
        var flag 
        var openServerDate
        var firstopendayofweek
        var firstopenday
        var inputCheck  = /^[\s]*$/
        var chixuDate=$("#chixuDay").val()
        var xunhuanDate=$("#xunhuanDay").val()
        var startTime=$('#data2').val()
        if(activityid == ''||inputCheck.test(activityid)){
        	alert("活动编号不能为空")
        }
        for(var i=0; i<obj.length; i ++){
              if(obj[i].checked==true){
                flag=obj[i].value
              }
          }
          if(flag==2){
            openServerDate='';
            startTime=startTime;
          }
          else if(flag==1){
            openServerDate=$('#data1').val()
            startTime=''
            	if( !(/(^[0-9]\d*$)/.test($('#data1').val()))){
        			layer.msg("开服时间应为正整数")
        			return false;
        		}
          }
          else if(flag==3){
            openServerDate=$('#data3').val()
            startTime=''
            	if( !(/(^[0-9]\d*$)/.test($('#data3').val()))){
        			layer.msg("跨服时间应为正整数")
        			return false;
        		}
          }
          else if(flag==4){
            openServerDate=$('#data4').val()
            startTime=''
            	if( !(/(^[0-9]\d*$)/.test($('#data4').val()))){
        			layer.msg("合服时间应为正整数")
        			return false;
        		}	
           }
          if(mulobj[0].checked==true){
            firstopendayofweek=1
            firstopenday=$('#start_time').val()-1
            if( !(/(^[1-9]\d*$)/.test($('#start_time').val()))){
    			layer.msg("星期值应为正整数")
    			return false;
    		}
            if(firstopenday>=8){
              	alert("星期输入值为1~7")
              	return false
              }
          } else if(mulobj[0].checked==false){
            firstopendayofweek=-1
            firstopenday=-1
          }
          if( !(/(^[0-9]\d*$)/.test(xunhuanDate)) && xunhuanDate !=""){
    			layer.msg("活动循环天数应为正整数")
    			return false;
    		}
          if(chixuDate != ""){
            if( !(/(^[1-9]\d*$)/.test(chixuDate))){
      			layer.msg("活动持续天数应为正整数")
      			return false;
      		}
          }
          // console.log(firstopendayofweek)
          // console.log(firstopenday)
          // console.log(openServerDate)
          // console.log(firstopenday)
          // console.log(flag)
          // console.log(startTime)
        $.ajax({
          type: "get",
          url: "../updateActivity.action",
          async: true,
          data:{
            activityId:activityid,//唯一id
            openType:flag,//单选框
            firstOpenDayOfWeek:firstopenday ,////多选框天
            openSpencificDate:startTime,//日期
            openServerDate:openServerDate,//单选框天
            firstOpenDay:firstopendayofweek,//多选框勾选
            durationDays:chixuDate,//持续时间
            cycleDays:xunhuanDate///循环时间
          },
          success:function(e){
            layer.close(index);
            $("body").mLoading("hide")
          }
        })
      }
    })
  })

 // 保存
 $(".Preservation").click(function () {
  // var array = table.checkStatus('demo').data
  var arrayAll = table.cache["demoBranch"]////table分条数组
  var array=[]
  for(var i=0;i<arrayAll.length;i++){
	  if(arrayAll[i]!=[]&&arrayAll[i]!=''&&arrayAll[i]!=undefined&&arrayAll[i]!=null){
		  array.push(arrayAll[i])
	  }
  }
  var activityid=$("#activename_bianhao").val();
  if(activityid<=37){
  	alert("活动编号不能在1-37区间");
  	return false;
  }
      var obj = document.getElementsByName("statusDate");
      var mulobj = document.getElementsByName("statusWeek");
      var flag 
      var openServerDate
      var firstopendayofweek
      var firstopenday
      var chixuDate=$("#chixuDay").val()
      var xunhuanDate=$("#xunhuanDay").val()
      var startTime=$('#data2').val()
      for(var i=0; i<obj.length; i ++){
            if(obj[i].checked==true){
              flag=obj[i].value
            }
        }
        if(flag==2){
          openServerDate='';
          startTime=startTime;
        }
        else if(flag==1){
          openServerDate=$('#data1').val()
          startTime=''

        }
        else if(flag==3){
          openServerDate=$('#data3').val()
          startTime=''
        }
        else if(flag==4){
          openServerDate=$('#data4').val()
          startTime=''
         }
        if(mulobj.checked==true){
          firstopendayofweek=1
          firstopenday=$('#start_time').val()
        } else if(mulobj.checked==false){
          firstopendayofweek=-1
          firstopenday=-1
        }
  var activeid_id = $("#activeid_id").val()//活动ID
  var activename_name = $("#activename_name").val()//活动名称
  var activename_type = $('#activename_type').val()//活动类型
  var activename_typecanshu = $("#activename_typecanshu").val() //周期参数类型
  var activename_canshu = $("#activename_canshu").val()//周期参数
  var activename_shouwei = $("#activename_shouwei").val() //首位id
  var activename_image = $("#activename_image").val()//文字图片
  var activename_yuliu = $("#activename_yuliu").val()//预留
   var activename_yuliuTwo = $("#activename_yuliuTwo").val()//预留
    var activename_yuliuThree = $("#activename_yuliuThree").val()//预留
     var activename_yuliuFour = $("#activename_yuliuFour").val()//预留
      var activename_yuliuFif = $("#activename_yuliuFif").val()//预留
  var activename_bianhao = $("#activename_bianhao").val()//活动编号
  // var list = [{ attributeId: activeid_id,activityName:activename_name,ctivityType:activename_type, cycleParamType:activename_typecanshu, cycleParamNum: activename_canshu,cycleFirstId:activename_shouwei,textImage: activename_image, paramArr1: activename_yuliu, rows:array2}]
  $.ajax({
    type: "post",
    dataType: "json",
    url: "../saveEditActivity.action",////编辑页面保存按钮
    async: true,
    contentType:'application/json;charset=UTF-8',
    data: JSON.stringify({
      attributeId: activeid_id,
      activityName:activename_name,
      activityType:activityTypes,
      cycleParamType:activename_typecanshu,
      cycleParamNum: activename_canshu,
      cycleFirstId:activename_shouwei,
      textImage: activename_image,
      paramArr1: activename_yuliu,
      paramArr2: activename_yuliuTwo,
      paramArr3: activename_yuliuThree,
      paramArr4: activename_yuliuFour,
      paramArr5: activename_yuliuFif,
      openType:flag,//单选框
      firstOpenDayOfWeek:firstopendayofweek,//多选框勾选
      openspencificDate:startTime,//日期
      openserverdate:openServerDate,//单选框天
      firstOpenDay:firstopenday,////多选框天
      durationDays:chixuDate,//持续时间
      cycleDays:xunhuanDate,///循环时间
      activityId: activename_bianhao,
      rows:array
      // list:JSON.stringify(list)
    }),
    success: function (e) {
      alert(e.message)
      $("body").mLoading("hide")
    
    }
  })
})


//删除奖励配置当前项
//$('.delContent').click(function(){
//  var obj=$(this);
//  var parents=obj.parent();
//  parents.remove();
//  // console.log(obj)
//  // console.log(parents)
//  // $(obj).remove();
//})

  //活动类型select
//  onarea()
  function onarea() {
    $.post("../getActivityType.action", function (data) {
      $.each(data.data, function (index, item) {
        $('.qiehuan').append(new Option(item.activityName, item.activityId));
      });
//      $(".qiehuan").prepend("<option value='' style='opcity:0.3;'>请选择</option>");
      $(".qiehuan").each(function () {
    	  var cookactivityType=$.cookie('the_cookie_pactivityType')
    	  if(cookactivityType==''||cookactivityType==null||cookactivityType==undefined){
    		  $(".qiehuan").val('请选择');
    	  }else{
    		  $(this).find("option").eq(cookactivityType).attr("selected", "selected")
    	  }
      })
      form.render('select')
    });
  }
  // 生命药水select
//  wupin()
//  function wupin() {
//    $.post("../getActivityReward.action", function (data) {
////    var data=data.data.slice(0, 10)
//      $.each(data.data, function (index, item) {
//        $('.shengmingyaoshui').append(new Option(item.goodsName, item.rewardId,));
//      });
//      $(".shengmingyaoshui").prepend("<option value=''></option>");
//      $(".shengmingyaoshui").each(function () {
//        $(this).find("option").eq(0).attr("selected", "selected")
//      })
//      form.render('select')
//    });
//
//  }
});
