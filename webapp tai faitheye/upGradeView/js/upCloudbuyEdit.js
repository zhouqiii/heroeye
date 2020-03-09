var alldata;//全局表格数据
var oldDate2
var vm = new Vue({
  el: '#rewardEquipment',
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
	{selectValue:'',number:''},
	{selectValue:'',number:''},
	{selectValue:'',number:''},
	{selectValue:'',number:''},
	{selectValue:'',number:''}
    ]
  },
  methods:{
	  delTheDate(obj){
		  vm.addMoreSelect.splice(obj,1)
	  },
	  getOptionsInput(query){ 
		  if (query !== '') {
            vm.optionsList = vm.optionsListAll.filter(item => {
              return item.goodsName.indexOf(query) > -1
            }).slice(0, 10) // 那么用户搜索的时候, 根据完整的列表来搜, 搜到的结果同样截取前10条, 不足10条忽略即可
        }
		              else {
            vm.optionsList = vm.optionsListAll.slice(0, 10) // 关键字为空的时候又将完整的列表数据截取前10条渲染回去
          }
	  },
	  setDistrict () {
		  $.post("../getActivityReward.action", function (data) {
				 vm.optionsList=data.data.slice(0,10)
				 vm.optionsListT=data.data.slice(0,10)
				 vm.optionsListThree=data.data.slice(0,10)
				 vm.optionsListF=data.data.slice(0,10)
				 vm.optionsListFive=data.data.slice(0,10)
				 vm.optionsListAll=data.data
				 vm.optionsListAllT=data.data
				 vm.optionsListAllThree=data.data
				 vm.optionsListAllF=data.data
				 vm.optionsListAllFive=data.data
			    });
      },
},
created:function(){
	this.setDistrict()
}
})
var vma = new Vue({
	  el: '#rewardEquipment1',
	  data: {
		  optionsLista:[],
		  optionsListAlla:[],
		  numList:'',
		  selecteda:'',
		  selectLista:[],
	    addMoreSelecta:[
		{selectValue:'',number:''},
	    ]
	  },
	  methods:{
		  delTheDate(obj){
			  vma.addMoreSelecta.splice(obj,1)
		  },
		  getOptionsInput(query){ 
			  if (query !== '') {
				  vma.optionsLista = vma.optionsListAlla.filter(item => {
	              return item.goodsName.indexOf(query) > -1
	            }).slice(0, 10) // 那么用户搜索的时候, 根据完整的列表来搜, 搜到的结果同样截取前10条, 不足10条忽略即可
	        }
			              else {
			      vma.optionsLista = vma.optionsListAlla.slice(0, 10) // 关键字为空的时候又将完整的列表数据截取前10条渲染回去
	          }
		  },
		  setDistrict () {
			  $.post("../getActivityReward.action", function (data) {
				  vma.optionsLista=data.data.slice(0,10)
					 vma.optionsListAlla=data.data
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
  $('.cancleBtn1').click(function(){
	  $('#rewardEquipment1').css("display",'none')
	  vma.addMoreSelecta=[
	{selectValue:'',number:''},
    ]
  })
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
		 vm.addMoreSelect.push(newObj)
	  })
	  $('.cancleBtn').click(function(){
		  $('#rewardEquipment').css("display",'none')
		  vm.addMoreSelect=[
		{selectValue:'',number:''},
		{selectValue:'',number:''},
		{selectValue:'',number:''},
		{selectValue:'',number:''},
		{selectValue:'',number:''}
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
	  var pid = $.cookie('the_cookie_pname')
	  
	 $('#activeid_id').val($.cookie('the_cookie_pid'))//活动id
    $('#activename_bianhao').val($.cookie('the_cookie_pname'))//活动编号
    $('#activename_canshu').val($.cookie('the_cookie_pCanNum'))//周期参数
    var activityName=$.cookie('the_cookie_pactivityName')
    $('#activename_name').val(activityName)//活动名称
    var activityId= $('#activeid_id').val()
    var active_bianhao = $('#activename_bianhao').val()
    $.ajax({
          type: "post",
          url: "../getCloudShopConfList.action",
          async: true,
          data: {
        	  pid: pid,
          },
          success: function (json) {
        	
            $("body").mLoading("hide")
          }
        })
     //第一个实例
  table.render({
    elem: '#demoBranch'
    // , height: 312
    , url: '../getCloudShopConfList.action' //数据接口
    ,where: {
      pId: pid,
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
    , cols: [[ 
    	{
            field: 'attributeId',
            title: '序号',
            width: 150,
            type: 'space',
            edit: 'text',
            event: 'checkOnlyId'
        },
        {
            field: 'serverLevel',
            title: '服务器等级',
            width: 150,
            edit: 'text'
        }, {
            field: 'activityDay',
            title: '活动自然天数',
            width: 150,
            edit: 'text',
        }, {
            field: 'saleStartTime',
            title: '发售开始时间',
            width: 150,
            edit: 'text'
        }, {
            field: 'saleEndTime',
            title: '发售截止时间',
            width: 150,
            edit: 'text'
        }, {
            field: 'robberyStartTime',
            title: '抢购开始时间',
            width: 150,
            edit: 'text'
        }, {
            field: 'robberyEndTime',
            title: '抢购截止时间',
            width: 150,
            edit: 'text'
        }, {
            field: 'awardOpeningTime',
            title: '开奖时间',
            width: 150,
            edit: 'text'
        }, {
            field: 'continueTomorrow',
            title: '次日是否有活动',
            width: 150,
            edit: 'text'
        }, {
            field: 'numberReleases',
            title: '投放数量',
            width: 150,
            edit: 'text'
        }, {
            field: 'currency',
            title: '货币类型',
            width: 150,
            edit: 'text'
        }, {
            field: 'buyingPrice',
            title: '购买价格',
            width: 150,
            edit: 'text'
        }, {
            field: 'buyingPriceAdd',
            title: '购买价格增量',
            width: 150,
            edit: 'text'
        }, {
            field: 'robberyPrice',
            title: '抢购价格',
            width: 150,
            edit: 'text'
        }, {
            field: 'robberyPriceAdd',
            title: '抢购价格增量',
            width: 150,
            edit: 'text'
        }, {
            field: 'numberBig',
            title: '投放大奖份数',
            width: 150,
            edit: 'text'
        }, {
            field: 'bigReward',
            title: '大奖的道具id',
            width: 250,
//            edit: 'text',
            templet:function(value){
            	var rewardName = [];
            	var Reward = value.bigReward;
            	Reward = Reward.substring(0,Reward.length-1)
            	Reward= Reward.substring(1)
            	Reward = Reward.split(",")
            	$(this).id = Reward
                for(var i=0;i<rewardData.data.length;i++){
                	for(var j=0;j<Reward.length;j++){
                		if(rewardData.data[i].rewardId == Reward[j]){
                      		rewardName.push(rewardData.data[i].goodsName)
                      			  
                      	}
                	}
                }
            	rewardName = rewardName.join(",")
          	return  "("+rewardName +")"
            }
        }, {
            field: 'bigValue',
            title: '大奖的道具价值',
            width: 150,
            edit: 'text'
        },
        {
            field: 'bigRewardNumber',
            title: '大奖的道具数量',
            width: 150,
            edit: 'text'
        }, {
            field: 'basicReward1',
            title: '保底奖励1道具id',
            width: 150,
//            edit: 'text',
            templet:function(value){
            	var rewardName = "";
            	var Reward = value.basicReward1;
            	$(this).id = Reward
                for(var i=0;i<rewardData.data.length;i++){
                  	if(rewardData.data[i].rewardId == Reward){
                  		rewardName = rewardData.data[i].goodsName
                  			  
                  	}
                }
          	return  rewardName 
            }
        },
        {
            field: 'basicReward1Number',
            title: '保底奖励1道具数量',
            width: 150,
            edit: 'text'
        }, {
            field: 'basicReward1Weight',
            title: '保底奖励1权重',
            width: 150,
            edit: 'text'
        },
        {
            field: 'basicReward2',
            title: '保底奖励2道具id',
            width: 150,
//            edit: 'text',
            templet:function(value){
            	var rewardName = "";
            	var Reward = value.basicReward2;
            	$(this).id = Reward
                for(var i=0;i<rewardData.data.length;i++){
                  	if(rewardData.data[i].rewardId == Reward){
                  		rewardName = rewardData.data[i].goodsName
                  			  
                  	}
                }
          	return  rewardName 
            }
        }, {
            field: 'basicReward2Number',
            title: '保底奖励2道具数量',
            width: 150,
            edit: 'text'
        }, {
            field: 'basicReward2Weight',
            title: '保底奖励2权重',
            width: 150,
            edit: 'text'
        },
        {
            field: 'basicReward3',
            title: '保底奖励3道具id',
            width: 150,
//            edit: 'text',
            templet:function(value){
            	var rewardName = "";
            	var Reward = value.basicReward3;
            	$(this).id = Reward
                for(var i=0;i<rewardData.data.length;i++){
                  	if(rewardData.data[i].rewardId == Reward){
                  		rewardName = rewardData.data[i].goodsName
                  			  
                  	}
                }
          	return  rewardName 
            }
        }, {
            field: 'basicReward3Number',
            title: '保底奖励3道具数量',
            width: 150,
            edit: 'text'
        }, {
            field: 'basicReward3Weight',
            title: '保底奖励3权重',
            width: 150,
            edit: 'text'
        },
        {
            field: 'basicReward4',
            title: '保底奖励4道具id',
            width: 150,
//            edit: 'text',
            templet:function(value){
            	var rewardName = "";
            	var Reward = value.basicReward4;
            	$(this).id = Reward
                for(var i=0;i<rewardData.data.length;i++){
                  	if(rewardData.data[i].rewardId == Reward){
                  		rewardName = rewardData.data[i].goodsName
                  			  
                  	}
                }
          	return  rewardName 
            }
        }, {
            field: 'basicReward4Number',
            title: '保底奖励4道具数量',
            width: 150,
            edit: 'text'
        }, {
            field: 'basicReward4Weight',
            title: '保底奖励4权重',
            width: 150,
            edit: 'text'
        }, {
            field: 'minBuyCountNeedForBigReward',
            title: '至少购买多少份才能开大奖',
            width: 150,
            edit: 'text'
        }, {
            field: 'operaTion',
            title: '操作' + cyclenum,
            width: 350,
            templet: function (value) {
                return `
                	 <span lay-event='reise' style="margin-right:20px;color:#2fa88d;">大奖道具配置</span> 
                	 <br>
                	 <span lay-event='reise1' style="margin-right:15px;color:#2fa88d;">奖励1配置</span> 
                	 <span lay-event='reise2' style="margin-right:15px;color:#2fa88d;">奖励2配置</span> 
                	 <span lay-event='reise3' style="margin-right:15px;color:#2fa88d;">奖励3配置</span> 
                	 <span lay-event='reise4' style="color:#2fa88d;">奖励4配置</span>
                	 <br>
                     <span class='moveUpOrDown up' lay-event='upload'  style="margin-right:20px;color:#82ab2a;">上移</span> 
                     <span class='moveUpOrDown down' lay-event='download'  style="margin-right:20px;color:#9e254f;">下移</span>
                     <span class='start_up' lay-event='del' style="color:#e63838;">删除</span> 
                     
                     `
            }
        }
    ]],
    done:function(res,curr,count){
    	alldata = res.data
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
		    table.render({
			      elem: '#demoBranch',
			      id: 'demoBranch'
			      // , height: 312
			      ,data:dataOld
			      ,cols: [[
			    	  {
		                    field: 'attributeId',
		                    title: '序号',
		                    width: 150,
		                    type: 'space',
		                    edit: 'text',
		                    event: 'checkOnlyId'
		                },
		                {
		                    field: 'serverLevel',
		                    title: '服务器等级',
		                    width: 150,
		                    edit: 'text'
		                }, {
		                    field: 'activityDay',
		                    title: '活动自然天数',
		                    width: 150,
		                    edit: 'text',
		                }, {
		                    field: 'saleStartTime',
		                    title: '发售开始时间',
		                    width: 150,
		                    edit: 'text'
		                }, {
		                    field: 'saleEndTime',
		                    title: '发售截止时间',
		                    width: 150,
		                    edit: 'text'
		                }, {
		                    field: 'robberyStartTime',
		                    title: '抢购开始时间',
		                    width: 150,
		                    edit: 'text'
		                }, {
		                    field: 'robberyEndTime',
		                    title: '抢购截止时间',
		                    width: 150,
		                    edit: 'text'
		                }, {
		                    field: 'awardOpeningTime',
		                    title: '开奖时间',
		                    width: 150,
		                    edit: 'text'
		                }, {
		                    field: 'continueTomorrow',
		                    title: '次日是否有活动',
		                    width: 150,
		                    edit: 'text'
		                }, {
		                    field: 'numberReleases',
		                    title: '投放数量',
		                    width: 150,
		                    edit: 'text'
		                }, {
		                    field: 'currency',
		                    title: '货币类型',
		                    width: 150,
		                    edit: 'text'
		                }, {
		                    field: 'buyingPrice',
		                    title: '购买价格',
		                    width: 150,
		                    edit: 'text'
		                }, {
		                    field: 'buyingPriceAdd',
		                    title: '购买价格增量',
		                    width: 150,
		                    edit: 'text'
		                }, {
		                    field: 'robberyPrice',
		                    title: '抢购价格',
		                    width: 150,
		                    edit: 'text'
		                }, {
		                    field: 'robberyPriceAdd',
		                    title: '抢购价格增量',
		                    width: 150,
		                    edit: 'text'
		                }, {
		                    field: 'numberBig',
		                    title: '投放大奖份数',
		                    width: 150,
		                    edit: 'text'
		                }, {
		                    field: 'bigReward',
		                    title: '大奖的道具id',
		                    width: 250,
//		                    edit: 'text',
		                    templet:function(value){
		                    	var rewardName = [];
		                    	var Reward = value.bigReward;
		                    	Reward = Reward.substring(0,Reward.length-1)
		                    	Reward= Reward.substring(1)
		                    	Reward = Reward.split(",")
		                    	$(this).id = Reward
		                        for(var i=0;i<rewardData.data.length;i++){
		                        	for(var j=0;j<Reward.length;j++){
		                        		if(rewardData.data[i].rewardId == Reward[j]){
		                              		rewardName.push(rewardData.data[i].goodsName)
		                              			  
		                              	}
		                        	}
		                        }
		                    	rewardName = rewardName.join(",")
		                  	return  "("+rewardName +")"
		                    }
		                }, {
		                    field: 'bigValue',
		                    title: '大奖的道具价值',
		                    width: 150,
		                    edit: 'text'
		                },
		                {
		                    field: 'bigRewardNumber',
		                    title: '大奖的道具数量',
		                    width: 150,
		                    edit: 'text'
		                }, {
		                    field: 'basicReward1',
		                    title: '保底奖励1道具id',
		                    width: 150,
//		                    edit: 'text',
		                    templet:function(value){
		                    	var rewardName = "";
		                    	var Reward = value.basicReward1;
		                    	$(this).id = Reward
		                        for(var i=0;i<rewardData.data.length;i++){
		                          	if(rewardData.data[i].rewardId == Reward){
		                          		rewardName = rewardData.data[i].goodsName
		                          			  
		                          	}
		                        }
		                  	return  rewardName 
		                    }
		                },
		                {
		                    field: 'basicReward1Number',
		                    title: '保底奖励1道具数量',
		                    width: 150,
		                    edit: 'text'
		                }, {
		                    field: 'basicReward1Weight',
		                    title: '保底奖励1权重',
		                    width: 150,
		                    edit: 'text'
		                },
		                {
		                    field: 'basicReward2',
		                    title: '保底奖励2道具id',
		                    width: 150,
//		                    edit: 'text',
		                    templet:function(value){
		                    	var rewardName = "";
		                    	var Reward = value.basicReward2;
		                    	$(this).id = Reward
		                        for(var i=0;i<rewardData.data.length;i++){
		                          	if(rewardData.data[i].rewardId == Reward){
		                          		rewardName = rewardData.data[i].goodsName
		                          			  
		                          	}
		                        }
		                  	return  rewardName 
		                    }
		                }, {
		                    field: 'basicReward2Number',
		                    title: '保底奖励2道具数量',
		                    width: 150,
		                    edit: 'text'
		                }, {
		                    field: 'basicReward2Weight',
		                    title: '保底奖励2权重',
		                    width: 150,
		                    edit: 'text'
		                },
		                {
		                    field: 'basicReward3',
		                    title: '保底奖励3道具id',
		                    width: 150,
//		                    edit: 'text',
		                    templet:function(value){
		                    	var rewardName = "";
		                    	var Reward = value.basicReward3;
		                    	$(this).id = Reward
		                        for(var i=0;i<rewardData.data.length;i++){
		                          	if(rewardData.data[i].rewardId == Reward){
		                          		rewardName = rewardData.data[i].goodsName
		                          			  
		                          	}
		                        }
		                  	return  rewardName 
		                    }
		                }, {
		                    field: 'basicReward3Number',
		                    title: '保底奖励3道具数量',
		                    width: 150,
		                    edit: 'text'
		                }, {
		                    field: 'basicReward3Weight',
		                    title: '保底奖励3权重',
		                    width: 150,
		                    edit: 'text'
		                },
		                {
		                    field: 'basicReward4',
		                    title: '保底奖励4道具id',
		                    width: 150,
//		                    edit: 'text',
		                    templet:function(value){
		                    	var rewardName = "";
		                    	var Reward = value.basicReward4;
		                    	$(this).id = Reward
		                        for(var i=0;i<rewardData.data.length;i++){
		                          	if(rewardData.data[i].rewardId == Reward){
		                          		rewardName = rewardData.data[i].goodsName
		                          			  
		                          	}
		                        }
		                  	return  rewardName 
		                    }
		                }, {
		                    field: 'basicReward4Number',
		                    title: '保底奖励4道具数量',
		                    width: 150,
		                    edit: 'text'
		                }, {
		                    field: 'basicReward4Weight',
		                    title: '保底奖励4权重',
		                    width: 150,
		                    edit: 'text'
		                }, {
		                    field: 'minBuyCountNeedForBigReward',
		                    title: '至少购买多少份才能开大奖',
		                    width: 150,
		                    edit: 'text'
		                }, {
		                    field: 'operaTion',
		                    title: '操作' + cyclenum,
		                    width: 350,
		                    templet: function (value) {
		                        return `
		                        	 <span lay-event='reise' style="margin-right:20px;color:#2fa88d;">大奖道具配置</span> 
		                        	 <br>
		                        	 <span lay-event='reise1' style="margin-right:15px;color:#2fa88d;">奖励1配置</span> 
		                        	 <span lay-event='reise2' style="margin-right:15px;color:#2fa88d;">奖励2配置</span> 
		                        	 <span lay-event='reise3' style="margin-right:15px;color:#2fa88d;">奖励3配置</span> 
		                        	 <span lay-event='reise4' style="color:#2fa88d;">奖励4配置</span>
		                        	 <br>
		                             <span class='moveUpOrDown up' lay-event='upload'  style="margin-right:20px;color:#82ab2a;">上移</span> 
		                             <span class='moveUpOrDown down' lay-event='download'  style="margin-right:20px;color:#9e254f;">下移</span>
		                             <span class='start_up' lay-event='del' style="color:#e63838;">删除</span> 
		                             
		                             `
		                    }
		                }
			      ]],
			      done:function(res,curr,count){
			    	  var that = this.elem.next();
			          res.data.forEach(function (item, index) {
			        	  //console.log(item.empName);item表示每列显示的数据
			             if (index%2==0) {
			                  var tr = that.find(".layui-table-box tbody tr[data-index='" + index + "']").css("background-color", "#333333");
			              } else{
			                  var tr = that.find(".layui-table-box tbody tr[data-index='" + index + "']").css("background-color", "#242424");
			              } 
			          });
			      	alldata = res.data
//			      	oldDate2 = res.data[0]
			      }
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
				    table.render({
					      elem: '#demoBranch',
					      id: 'demoBranch'
					      // , height: 312
					      ,data:dataOld
					      ,cols: [[ //表头

					    	  {
				                    field: 'attributeId',
				                    title: '序号',
				                    width: 150,
				                    type: 'space',
				                    edit: 'text',
				                    event: 'checkOnlyId'
				                },
				                {
				                    field: 'serverLevel',
				                    title: '服务器等级',
				                    width: 150,
				                    edit: 'text'
				                }, {
				                    field: 'activityDay',
				                    title: '活动自然天数',
				                    width: 150,
				                    edit: 'text',
				                }, {
				                    field: 'saleStartTime',
				                    title: '发售开始时间',
				                    width: 150,
				                    edit: 'text'
				                }, {
				                    field: 'saleEndTime',
				                    title: '发售截止时间',
				                    width: 150,
				                    edit: 'text'
				                }, {
				                    field: 'robberyStartTime',
				                    title: '抢购开始时间',
				                    width: 150,
				                    edit: 'text'
				                }, {
				                    field: 'robberyEndTime',
				                    title: '抢购截止时间',
				                    width: 150,
				                    edit: 'text'
				                }, {
				                    field: 'awardOpeningTime',
				                    title: '开奖时间',
				                    width: 150,
				                    edit: 'text'
				                }, {
				                    field: 'continueTomorrow',
				                    title: '次日是否有活动',
				                    width: 150,
				                    edit: 'text'
				                }, {
				                    field: 'numberReleases',
				                    title: '投放数量',
				                    width: 150,
				                    edit: 'text'
				                }, {
				                    field: 'currency',
				                    title: '货币类型',
				                    width: 150,
				                    edit: 'text'
				                }, {
				                    field: 'buyingPrice',
				                    title: '购买价格',
				                    width: 150,
				                    edit: 'text'
				                }, {
				                    field: 'buyingPriceAdd',
				                    title: '购买价格增量',
				                    width: 150,
				                    edit: 'text'
				                }, {
				                    field: 'robberyPrice',
				                    title: '抢购价格',
				                    width: 150,
				                    edit: 'text'
				                }, {
				                    field: 'robberyPriceAdd',
				                    title: '抢购价格增量',
				                    width: 150,
				                    edit: 'text'
				                }, {
				                    field: 'numberBig',
				                    title: '投放大奖份数',
				                    width: 150,
				                    edit: 'text'
				                }, {
				                    field: 'bigReward',
				                    title: '大奖的道具id',
				                    width: 250,
//				                    edit: 'text',
				                    templet:function(value){
				                    	var rewardName = [];
				                    	var Reward = value.bigReward;
				                    	Reward = Reward.substring(0,Reward.length-1)
				                    	Reward= Reward.substring(1)
				                    	Reward = Reward.split(",")
				                    	$(this).id = Reward
				                        for(var i=0;i<rewardData.data.length;i++){
				                        	for(var j=0;j<Reward.length;j++){
				                        		if(rewardData.data[i].rewardId == Reward[j]){
				                              		rewardName.push(rewardData.data[i].goodsName)
				                              			  
				                              	}
				                        	}
				                        }
				                    	rewardName = rewardName.join(",")
				                  	return  "("+rewardName +")"
				                    }
				                }, {
				                    field: 'bigValue',
				                    title: '大奖的道具价值',
				                    width: 150,
				                    edit: 'text'
				                },
				                {
				                    field: 'bigRewardNumber',
				                    title: '大奖的道具数量',
				                    width: 150,
				                    edit: 'text'
				                }, {
				                    field: 'basicReward1',
				                    title: '保底奖励1道具id',
				                    width: 150,
//				                    edit: 'text',
				                    templet:function(value){
				                    	var rewardName = "";
				                    	var Reward = value.basicReward1;
				                    	$(this).id = Reward
				                        for(var i=0;i<rewardData.data.length;i++){
				                          	if(rewardData.data[i].rewardId == Reward){
				                          		rewardName = rewardData.data[i].goodsName
				                          			  
				                          	}
				                        }
				                  	return  rewardName 
				                    }
				                },
				                {
				                    field: 'basicReward1Number',
				                    title: '保底奖励1道具数量',
				                    width: 150,
				                    edit: 'text'
				                }, {
				                    field: 'basicReward1Weight',
				                    title: '保底奖励1权重',
				                    width: 150,
				                    edit: 'text'
				                },
				                {
				                    field: 'basicReward2',
				                    title: '保底奖励2道具id',
				                    width: 150,
//				                    edit: 'text',
				                    templet:function(value){
				                    	var rewardName = "";
				                    	var Reward = value.basicReward2;
				                    	$(this).id = Reward
				                        for(var i=0;i<rewardData.data.length;i++){
				                          	if(rewardData.data[i].rewardId == Reward){
				                          		rewardName = rewardData.data[i].goodsName
				                          			  
				                          	}
				                        }
				                  	return  rewardName 
				                    }
				                }, {
				                    field: 'basicReward2Number',
				                    title: '保底奖励2道具数量',
				                    width: 150,
				                    edit: 'text'
				                }, {
				                    field: 'basicReward2Weight',
				                    title: '保底奖励2权重',
				                    width: 150,
				                    edit: 'text'
				                },
				                {
				                    field: 'basicReward3',
				                    title: '保底奖励3道具id',
				                    width: 150,
//				                    edit: 'text',
				                    templet:function(value){
				                    	var rewardName = "";
				                    	var Reward = value.basicReward3;
				                    	$(this).id = Reward
				                        for(var i=0;i<rewardData.data.length;i++){
				                          	if(rewardData.data[i].rewardId == Reward){
				                          		rewardName = rewardData.data[i].goodsName
				                          			  
				                          	}
				                        }
				                  	return  rewardName 
				                    }
				                }, {
				                    field: 'basicReward3Number',
				                    title: '保底奖励3道具数量',
				                    width: 150,
				                    edit: 'text'
				                }, {
				                    field: 'basicReward3Weight',
				                    title: '保底奖励3权重',
				                    width: 150,
				                    edit: 'text'
				                },
				                {
				                    field: 'basicReward4',
				                    title: '保底奖励4道具id',
				                    width: 150,
//				                    edit: 'text',
				                    templet:function(value){
				                    	var rewardName = "";
				                    	var Reward = value.basicReward4;
				                    	$(this).id = Reward
				                        for(var i=0;i<rewardData.data.length;i++){
				                          	if(rewardData.data[i].rewardId == Reward){
				                          		rewardName = rewardData.data[i].goodsName
				                          			  
				                          	}
				                        }
				                  	return  rewardName 
				                    }
				                }, {
				                    field: 'basicReward4Number',
				                    title: '保底奖励4道具数量',
				                    width: 150,
				                    edit: 'text'
				                }, {
				                    field: 'basicReward4Weight',
				                    title: '保底奖励4权重',
				                    width: 150,
				                    edit: 'text'
				                }, {
				                    field: 'minBuyCountNeedForBigReward',
				                    title: '至少购买多少份才能开大奖',
				                    width: 150,
				                    edit: 'text'
				                }, {
				                    field: 'operaTion',
				                    title: '操作' + cyclenum,
				                    width: 350,
				                    templet: function (value) {
				                        return `
				                        	 <span lay-event='reise' style="margin-right:20px;color:#2fa88d;">大奖道具配置</span> 
				                        	 <br>
				                        	 <span lay-event='reise1' style="margin-right:15px;color:#2fa88d;">奖励1配置</span> 
				                        	 <span lay-event='reise2' style="margin-right:15px;color:#2fa88d;">奖励2配置</span> 
				                        	 <span lay-event='reise3' style="margin-right:15px;color:#2fa88d;">奖励3配置</span> 
				                        	 <span lay-event='reise4' style="color:#2fa88d;">奖励4配置</span>
				                        	 <br>
				                             <span class='moveUpOrDown up' lay-event='upload'  style="margin-right:20px;color:#82ab2a;">上移</span> 
				                             <span class='moveUpOrDown down' lay-event='download'  style="margin-right:20px;color:#9e254f;">下移</span>
				                             <span class='start_up' lay-event='del' style="color:#e63838;">删除</span> 
				                             
				                             `
				                    }
				                }
					        ]],
					        done:function(res,curr,count){
					        	 var that = this.elem.next();
						          res.data.forEach(function (item, index) {
						        	  //console.log(item.empName);item表示每列显示的数据
						             if (index%2==0) {
						                  var tr = that.find(".layui-table-box tbody tr[data-index='" + index + "']").css("background-color", "#333333");
						              } else{
						                  var tr = that.find(".layui-table-box tbody tr[data-index='" + index + "']").css("background-color", "#242424");
						              } 
						          });
					        	alldata = res.data
//					        	oldDate2 = res.data[0]
					        }
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
    		if($(".layui-table-body table tr")[i].className == "layui-table-click"){
    			index = i;
    		}
    	}
    	var attributeid=data.attributeId
        var activityid=data.activityId
        $("#rewardEquipment").css('display','block')
   //保存
    $('#saveSelect').off('click').click(function(){
    	for(var i=0;i<$(".layui-table-body table tr").length;i++){
    		if($(".layui-table-body table tr")[i].className == "layui-table-click"){
    			index = i;
    		}
    	}
  	  var array=[]
  	  for(var i=0;i<alldata.length;i++){
		  if(i == index){
			  delete alldata[i]
		  }
	  }
  	for(var i=0;i<alldata.length;i++){
		  if(i == index){
			  delete alldata[i]
//			  alldata.splice(i,1);
		  }
	  }
	  var arrayValue=[]
	  var array=[]
	  var submitParams2
	  vm.optionsListAll.forEach(function(item){
		  for(var i=0;i<vm.addMoreSelect.length;i++){
			  if(vm.addMoreSelect[i].selectValue===item.goodsName){
				  vm.addMoreSelect[i].selectValue=item.rewardId
				  vm.addMoreSelect[i].id=item.goodsName
			  }
		  }
	  })
	  var newArray = vm.addMoreSelect.filter(d => d);
	  for(var i=0;i<newArray.length;i++){
		  if(newArray[i].selectValue){
			  arrayValue.push(newArray[i].selectValue)
			  array.push(newArray[i].id)
		  }
	  }
	  var params=array.join(',')
	  submitParams="("+params+")"
	  var params2=arrayValue.join(',')
	  submitParams2="("+params2+")"
	  var arr3_add = $("table .layui-table-click")
		arr3_add[0].childNodes[16].childNodes[0].textContent = submitParams;
	  $("#rewardEquipment").css('display','none')
			 vm.optionsListAll.forEach(function(item){
				  for(var i=0;i<vm.addMoreSelect.length;i++){
						  vm.addMoreSelect[i].selectValue=""
							  vm.addMoreSelect[i].number = ""
				  }
			  })
	  obj.data.bigReward =submitParams2
	  alldata[index] =obj.data
//      	$.ajax({
//      		type:"get",
//      		url:"../updateActivityBranch.action",
//      		async:true,
//      		data: {
//      			attributeId:attributeid,
//      			activityId:activityid,
//      			reward:submitParams2
//      		},
//      		success: function(json) {
      			$("#rewardEquipment").css('display','none')
  				$("body").mLoading("hide")
  			    var activename_type = $('#activename_type').val()
  			    var dataAll=table.cache["demoBranch"]
//  				dataAll[trIndex].reward=submitParams
//  			    data.reward = submitParams
//  			    location.reload();
	  reloadTable()
  			  
//  			}
//      	})
  	  
    })
    }else if(layEvent==='reise1'){
    	var index;
    	for(var i=0;i<$(".layui-table-body table tr").length;i++){
    		if($(".layui-table-body table tr")[i].className == "layui-table-click" ||$(".layui-table-body table tr")[i].className == "layui-table-hover"){
    			index = i;
    		}
    	}
//      var i=6;
      attributeid=data.attributeId
      activityid=data.activityId
      $("#rewardEquipment1").css('display','block')
 //保存
  $('#saveSelect1').off('click').click(function(){
	  for(var i=0;i<alldata.length;i++){
		  if(i == index){
			  delete alldata[i]
//			  alldata.splice(i,1);
		  }
	  }
	  var arrayValue
	  var array
	  var submitParams2
	  vma.optionsListAlla.forEach(function(item){
		  for(var i=0;i<vma.addMoreSelecta.length;i++){
			  if(vma.addMoreSelecta[i].selectValue===item.goodsName){
				  vma.addMoreSelecta[i].selectValue=item.rewardId
				  vma.addMoreSelecta[i].id=item.goodsName
			  }
		  }
	  })
	  var newArray = vma.addMoreSelecta.filter(d => d);
	  for(var i=0;i<newArray.length;i++){
		  if(newArray[i].selectValue){
			  arrayValue=newArray[i].selectValue
			  array=newArray[i].id
		  }
	  }
	  var arr3_add = $("table .layui-table-click")
		arr3_add[0].childNodes[19].childNodes[0].textContent = array;
	  $("#rewardEquipment1").css('display','none')
			 vma.optionsListAlla.forEach(function(item){
				  for(var i=0;i<vma.addMoreSelecta.length;i++){
						  vma.addMoreSelecta[i].selectValue=""
							  vma.addMoreSelecta[i].number = ""
				  }
			  })
	  obj.data.basicReward1 =arrayValue
	  alldata[index] =obj.data
	  reloadTable()
  })
    }else if(layEvent==='reise2'){
    	var index;
    	for(var i=0;i<$(".layui-table-body table tr").length;i++){
    		if($(".layui-table-body table tr")[i].className == "layui-table-click" ||$(".layui-table-body table tr")[i].className == "layui-table-hover"){
    			index = i;
    		}
    	}
//      var i=6;
      attributeid=data.attributeId
      activityid=data.activityId
      $("#rewardEquipment1").css('display','block')
 //保存
  $('#saveSelect1').off('click').click(function(){
	  for(var i=0;i<alldata.length;i++){
		  if(i == index){
			  delete alldata[i]
//			  alldata.splice(i,1);
		  }
	  }
	  var arrayValue
	  var array
	  var submitParams2
	  vma.optionsListAlla.forEach(function(item){
		  for(var i=0;i<vma.addMoreSelecta.length;i++){
			  if(vma.addMoreSelecta[i].selectValue===item.goodsName){
				  vma.addMoreSelecta[i].selectValue=item.rewardId
				  vma.addMoreSelecta[i].id=item.goodsName
			  }
		  }
	  })
	  var newArray = vma.addMoreSelecta.filter(d => d);
	  for(var i=0;i<newArray.length;i++){
		  if(newArray[i].selectValue){
			  arrayValue=newArray[i].selectValue
			  array=newArray[i].id
		  }
	  }
	  var arr3_add = $("table .layui-table-click")
		arr3_add[0].childNodes[22].childNodes[0].textContent = array;
	  $("#rewardEquipment1").css('display','none')
			 vma.optionsListAlla.forEach(function(item){
				  for(var i=0;i<vma.addMoreSelecta.length;i++){
						  vma.addMoreSelecta[i].selectValue=""
							  vma.addMoreSelecta[i].number = ""
				  }
			  })
	  obj.data.basicReward2 =arrayValue
	  alldata[index] =obj.data
	  reloadTable()
  })
    }else if(layEvent==='reise3'){
    	var index;
    	for(var i=0;i<$(".layui-table-body table tr").length;i++){
    		if($(".layui-table-body table tr")[i].className == "layui-table-click" ||$(".layui-table-body table tr")[i].className == "layui-table-hover"){
    			index = i;
    		}
    	}
//      var i=6;
      attributeid=data.attributeId
      activityid=data.activityId
      $("#rewardEquipment1").css('display','block')
 //保存
  $('#saveSelect1').off('click').click(function(){
	  for(var i=0;i<alldata.length;i++){
		  if(i == index){
			  delete alldata[i]
//			  alldata.splice(i,1);
		  }
	  }
	  var arrayValue
	  var array
	  vma.optionsListAlla.forEach(function(item){
		  for(var i=0;i<vma.addMoreSelecta.length;i++){
			  if(vma.addMoreSelecta[i].selectValue===item.goodsName){
				  vma.addMoreSelecta[i].selectValue=item.rewardId
				  vma.addMoreSelecta[i].id=item.goodsName
			  }
		  }
	  })
	  var newArray = vma.addMoreSelecta.filter(d => d);
	  for(var i=0;i<newArray.length;i++){
		  if(newArray[i].selectValue){
			  arrayValue=newArray[i].selectValue
			  array=newArray[i].id
		  }
	  }
	  var arr3_add = $("table .layui-table-click")
		arr3_add[0].childNodes[25].childNodes[0].textContent = array;
	  $("#rewardEquipment1").css('display','none')
			 vma.optionsListAlla.forEach(function(item){
				  for(var i=0;i<vma.addMoreSelecta.length;i++){
						  vma.addMoreSelecta[i].selectValue=""
							  vma.addMoreSelecta[i].number = ""
				  }
			  })
	  obj.data.basicReward3 =arrayValue
	  alldata[index] =obj.data
	  reloadTable()
  })
    }else if(layEvent==='reise4'){
    	var index;
    	for(var i=0;i<$(".layui-table-body table tr").length;i++){
    		if($(".layui-table-body table tr")[i].className == "layui-table-click" ||$(".layui-table-body table tr")[i].className == "layui-table-hover"){
    			index = i;
    		}
    	}
//      var i=6;
      attributeid=data.attributeId
      activityid=data.activityId
      $("#rewardEquipment1").css('display','block')
 //保存
  $('#saveSelect1').off('click').click(function(){
	  for(var i=0;i<alldata.length;i++){
		  if(i == index){
			  delete alldata[i]
//			  alldata.splice(i,1);
		  }
	  }
	  var arrayValue
	  var array
	  var submitParams2
	  vma.optionsListAlla.forEach(function(item){
		  for(var i=0;i<vma.addMoreSelecta.length;i++){
			  if(vma.addMoreSelecta[i].selectValue===item.goodsName){
				  vma.addMoreSelecta[i].selectValue=item.rewardId
				  vma.addMoreSelecta[i].id=item.goodsName
			  }
		  }
	  })
	  var newArray = vma.addMoreSelecta.filter(d => d);
	  for(var i=0;i<newArray.length;i++){
		  if(newArray[i].selectValue){
			  arrayValue=newArray[i].selectValue
			  array=newArray[i].id
		  }
	  }
	  var arr3_add = $("table .layui-table-click")
		arr3_add[0].childNodes[28].childNodes[0].textContent = array;
	  $("#rewardEquipment1").css('display','none')
			 vma.optionsListAlla.forEach(function(item){
				  for(var i=0;i<vma.addMoreSelecta.length;i++){
						  vma.addMoreSelecta[i].selectValue=""
							  vma.addMoreSelecta[i].number = ""
				  }
			  })
	  obj.data.basicReward4 =arrayValue
	  alldata[index] =obj.data
	  reloadTable()
  })
    }
    function reloadTable(){
    	table.render({
		      elem: '#demoBranch',
		      id: 'demoBranch'
		      // , height: 312
		      ,data:alldata
		      ,cols: [[ 
		    	{
                    field: 'attributeId',
                    title: '序号',
                    width: 150,
                    type: 'space',
                    edit: 'text',
                    event: 'checkOnlyId'
                },
                {
                    field: 'serverLevel',
                    title: '服务器等级',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'activityDay',
                    title: '活动自然天数',
                    width: 150,
                    edit: 'text',
                }, {
                    field: 'saleStartTime',
                    title: '发售开始时间',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'saleEndTime',
                    title: '发售截止时间',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'robberyStartTime',
                    title: '抢购开始时间',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'robberyEndTime',
                    title: '抢购截止时间',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'awardOpeningTime',
                    title: '开奖时间',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'continueTomorrow',
                    title: '次日是否有活动',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'numberReleases',
                    title: '投放数量',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'currency',
                    title: '货币类型',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'buyingPrice',
                    title: '购买价格',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'buyingPriceAdd',
                    title: '购买价格增量',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'robberyPrice',
                    title: '抢购价格',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'robberyPriceAdd',
                    title: '抢购价格增量',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'numberBig',
                    title: '投放大奖份数',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'bigReward',
                    title: '大奖的道具id',
                    width: 250,
//                    edit: 'text',
                    templet:function(value){
                    	var rewardName = [];
                    	var Reward = value.bigReward;
                    	Reward = Reward.substring(0,Reward.length-1)
                    	Reward= Reward.substring(1)
                    	Reward = Reward.split(",")
                    	$(this).id = Reward
                        for(var i=0;i<rewardData.data.length;i++){
                        	for(var j=0;j<Reward.length;j++){
                        		if(rewardData.data[i].rewardId == Reward[j]){
                              		rewardName.push(rewardData.data[i].goodsName)
                              			  
                              	}
                        	}
                        }
                    	rewardName = rewardName.join(",")
                  	return  "("+rewardName +")"
                    }
                }, {
                    field: 'bigValue',
                    title: '大奖的道具价值',
                    width: 150,
                    edit: 'text'
                },
                {
                    field: 'bigRewardNumber',
                    title: '大奖的道具数量',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'basicReward1',
                    title: '保底奖励1道具id',
                    width: 150,
//                    edit: 'text',
                    templet:function(value){
                    	var rewardName = "";
                    	var Reward = value.basicReward1;
                    	$(this).id = Reward
                        for(var i=0;i<rewardData.data.length;i++){
                          	if(rewardData.data[i].rewardId == Reward){
                          		rewardName = rewardData.data[i].goodsName
                          			  
                          	}
                        }
                  	return  rewardName 
                    }
                },
                {
                    field: 'basicReward1Number',
                    title: '保底奖励1道具数量',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'basicReward1Weight',
                    title: '保底奖励1权重',
                    width: 150,
                    edit: 'text'
                },
                {
                    field: 'basicReward2',
                    title: '保底奖励2道具id',
                    width: 150,
//                    edit: 'text',
                    templet:function(value){
                    	var rewardName = "";
                    	var Reward = value.basicReward2;
                    	$(this).id = Reward
                        for(var i=0;i<rewardData.data.length;i++){
                          	if(rewardData.data[i].rewardId == Reward){
                          		rewardName = rewardData.data[i].goodsName
                          			  
                          	}
                        }
                  	return  rewardName 
                    }
                }, {
                    field: 'basicReward2Number',
                    title: '保底奖励2道具数量',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'basicReward2Weight',
                    title: '保底奖励2权重',
                    width: 150,
                    edit: 'text'
                },
                {
                    field: 'basicReward3',
                    title: '保底奖励3道具id',
                    width: 150,
//                    edit: 'text',
                    templet:function(value){
                    	var rewardName = "";
                    	var Reward = value.basicReward3;
                    	$(this).id = Reward
                        for(var i=0;i<rewardData.data.length;i++){
                          	if(rewardData.data[i].rewardId == Reward){
                          		rewardName = rewardData.data[i].goodsName
                          			  
                          	}
                        }
                  	return  rewardName 
                    }
                }, {
                    field: 'basicReward3Number',
                    title: '保底奖励3道具数量',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'basicReward3Weight',
                    title: '保底奖励3权重',
                    width: 150,
                    edit: 'text'
                },
                {
                    field: 'basicReward4',
                    title: '保底奖励4道具id',
                    width: 150,
//                    edit: 'text',
                    templet:function(value){
                    	var rewardName = "";
                    	var Reward = value.basicReward4;
                    	$(this).id = Reward
                        for(var i=0;i<rewardData.data.length;i++){
                          	if(rewardData.data[i].rewardId == Reward){
                          		rewardName = rewardData.data[i].goodsName
                          			  
                          	}
                        }
                  	return  rewardName 
                    }
                }, {
                    field: 'basicReward4Number',
                    title: '保底奖励4道具数量',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'basicReward4Weight',
                    title: '保底奖励4权重',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'minBuyCountNeedForBigReward',
                    title: '至少购买多少份才能开大奖',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'operaTion',
                    title: '操作' + cyclenum,
                    width: 350,
                    templet: function (value) {
                        return `
                        	 <span lay-event='reise' style="margin-right:20px;color:#2fa88d;">大奖道具配置</span> 
                        	 <br>
                        	 <span lay-event='reise1' style="margin-right:15px;color:#2fa88d;">奖励1配置</span> 
                        	 <span lay-event='reise2' style="margin-right:15px;color:#2fa88d;">奖励2配置</span> 
                        	 <span lay-event='reise3' style="margin-right:15px;color:#2fa88d;">奖励3配置</span> 
                        	 <span lay-event='reise4' style="color:#2fa88d;">奖励4配置</span>
                        	 <br>
                             <span class='moveUpOrDown up' lay-event='upload'  style="margin-right:20px;color:#82ab2a;">上移</span> 
                             <span class='moveUpOrDown down' lay-event='download'  style="margin-right:20px;color:#9e254f;">下移</span>
                             <span class='start_up' lay-event='del' style="color:#e63838;">删除</span> 
                             
                             `
                    }
                }
		      ]],
		      done:function(res,curr,count){
		    	  var that = this.elem.next();
		          res.data.forEach(function (item, index) {
		        	  //console.log(item.empName);item表示每列显示的数据
		             if (index%2==0) {
		                  var tr = that.find(".layui-table-box tbody tr[data-index='" + index + "']").css("background-color", "#333333");
		              } else{
		                  var tr = that.find(".layui-table-box tbody tr[data-index='" + index + "']").css("background-color", "#242424");
		              } 
		          });
		      	alldata = res.data
//		      	oldDate2 = res.data[0]
		      }
		    });
    }
  })
//增加活动分支按钮
$(".addBranchBtn").click(function () {
	var oldDate = table.cache["demoBranch"];
	var newDateChange=oldDate.filter(value => Object.keys(value).length !== 0);
	var len=newDateChange.length;
	if(len == null || len == 0 || len == ""){
		var newList= oldDate2
	}else{
    var lastList = newDateChange[len-1]
   lastList.LAY_TABLE_INDEX = lastList.LAY_TABLE_INDEX+1
   var atributeid
   if(lastList==undefined||lastList.attributeId==null||lastList.attributeId==undefined||lastList.attributeId==0||lastList==undefined){
	   atributeid=100
   }else{
	   atributeid=parseInt(lastList.attributeId)+100
   }
    var serverLevel=lastList.serverLevel
	var activityDay=lastList.activityDay
	var saleStartTime=lastList.saleStartTime
	var saleEndTime=lastList.saleEndTime
	var robberyStartTime=lastList.robberyStartTime
	var robberyEndTime=lastList.robberyEndTime
	var awardOpeningTime=lastList.awardOpeningTime
	var continueTomorrow=lastList.continueTomorrow
	var numberReleases=lastList.numberReleases
	var currency=lastList.currency
	var buyingPrice=lastList.buyingPrice
	var buyingPriceAdd=lastList.buyingPriceAdd
	var robberyPrice=lastList.robberyPrice
	var robberyPriceAdd=lastList.robberyPriceAdd
	var numberBig=lastList.numberBig
	var bigReward=lastList.bigReward
	var bigValue=lastList.bigValue
	var bigRewardNumber=lastList.bigRewardNumber
	var basicReward1=lastList.basicReward1
	var basicReward1Number=lastList.basicReward1Number
	var basicReward1Weight=lastList.basicReward1Weight
	var basicReward2=lastList.basicReward2
	var basicReward2Number=lastList.basicReward2Number
	var basicReward2Weight=lastList.basicReward2Weight
	var basicReward3=lastList.basicReward3
	var basicReward3Number=lastList.basicReward3Number
	var basicReward3Weight=lastList.basicReward3Weight
	var basicReward4=lastList.basicReward4
	var basicReward4Number=lastList.basicReward4Number
	var basicReward4Weight=lastList.basicReward4Weight
	var minBuyCountNeedForBigReward=lastList.minBuyCountNeedForBigReward
	var activityId = lastList.activityId+1
	var newList= {"activityId":activityId,"attributeId":atributeid,"serverLevel":serverLevel,"activityDay":activityDay,"saleStartTime":saleStartTime,"saleEndTime":saleEndTime,"robberyStartTime":robberyStartTime,"robberyEndTime":robberyEndTime,"awardOpeningTime":awardOpeningTime,"continueTomorrow":continueTomorrow,"numberReleases":numberReleases,"currency":currency,"buyingPrice":buyingPrice,"buyingPriceAdd":buyingPriceAdd,"robberyPrice":robberyPrice,"robberyPriceAdd":robberyPriceAdd,"numberBig":numberBig,"bigReward":bigReward,"bigValue":bigValue,"bigRewardNumber":bigRewardNumber,"basicReward1":basicReward1,"basicReward1Number":basicReward1Number,"basicReward1Weight":basicReward1Weight,"basicReward2":basicReward2,"basicReward2Number":basicReward2Number,"basicReward2Weight":basicReward2Weight,"basicReward3":basicReward3,"basicReward3Number":basicReward3Number,"basicReward3Weight":basicReward3Weight,"basicReward4":basicReward4,"basicReward4Number":basicReward4Number,"basicReward4Weight":basicReward4Weight,"minBuyCountNeedForBigReward":minBuyCountNeedForBigReward,}
//   console.log(lastList)
//   console.log(lastList.LAY_TABLE_INDEX)
//    newList.activityId=lastList.activityId+1
	}
   newDateChange.push(newList)
	    table.render({
	        elem: '#demoBranch',
	        id: 'demoBranch'
        	,data: newDateChange
	        , cols: [[ 
	        	{
                    field: 'attributeId',
                    title: '序号',
                    width: 150,
                    type: 'space',
                    edit: 'text',
                    event: 'checkOnlyId'
                },
                {
                    field: 'serverLevel',
                    title: '服务器等级',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'activityDay',
                    title: '活动自然天数',
                    width: 150,
                    edit: 'text',
                }, {
                    field: 'saleStartTime',
                    title: '发售开始时间',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'saleEndTime',
                    title: '发售截止时间',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'robberyStartTime',
                    title: '抢购开始时间',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'robberyEndTime',
                    title: '抢购截止时间',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'awardOpeningTime',
                    title: '开奖时间',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'continueTomorrow',
                    title: '次日是否有活动',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'numberReleases',
                    title: '投放数量',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'currency',
                    title: '货币类型',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'buyingPrice',
                    title: '购买价格',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'buyingPriceAdd',
                    title: '购买价格增量',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'robberyPrice',
                    title: '抢购价格',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'robberyPriceAdd',
                    title: '抢购价格增量',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'numberBig',
                    title: '投放大奖份数',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'bigReward',
                    title: '大奖的道具id',
                    width: 250,
//                    edit: 'text',
                    templet:function(value){
                    	var rewardName = [];
                    	var Reward = value.bigReward;
                    	Reward = Reward.substring(0,Reward.length-1)
                    	Reward= Reward.substring(1)
                    	Reward = Reward.split(",")
                    	$(this).id = Reward
                        for(var i=0;i<rewardData.data.length;i++){
                        	for(var j=0;j<Reward.length;j++){
                        		if(rewardData.data[i].rewardId == Reward[j]){
                              		rewardName.push(rewardData.data[i].goodsName)
                              			  
                              	}
                        	}
                        }
                    	rewardName = rewardName.join(",")
                  	return  "("+rewardName +")"
                    }
                }, {
                    field: 'bigValue',
                    title: '大奖的道具价值',
                    width: 150,
                    edit: 'text'
                },
                {
                    field: 'bigRewardNumber',
                    title: '大奖的道具数量',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'basicReward1',
                    title: '保底奖励1道具id',
                    width: 150,
//                    edit: 'text',
                    templet:function(value){
                    	var rewardName = "";
                    	var Reward = value.basicReward1;
                    	$(this).id = Reward
                        for(var i=0;i<rewardData.data.length;i++){
                          	if(rewardData.data[i].rewardId == Reward){
                          		rewardName = rewardData.data[i].goodsName
                          			  
                          	}
                        }
                  	return  rewardName 
                    }
                },
                {
                    field: 'basicReward1Number',
                    title: '保底奖励1道具数量',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'basicReward1Weight',
                    title: '保底奖励1权重',
                    width: 150,
                    edit: 'text'
                },
                {
                    field: 'basicReward2',
                    title: '保底奖励2道具id',
                    width: 150,
//                    edit: 'text',
                    templet:function(value){
                    	var rewardName = "";
                    	var Reward = value.basicReward2;
                    	$(this).id = Reward
                        for(var i=0;i<rewardData.data.length;i++){
                          	if(rewardData.data[i].rewardId == Reward){
                          		rewardName = rewardData.data[i].goodsName
                          			  
                          	}
                        }
                  	return  rewardName 
                    }
                }, {
                    field: 'basicReward2Number',
                    title: '保底奖励2道具数量',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'basicReward2Weight',
                    title: '保底奖励2权重',
                    width: 150,
                    edit: 'text'
                },
                {
                    field: 'basicReward3',
                    title: '保底奖励3道具id',
                    width: 150,
//                    edit: 'text',
                    templet:function(value){
                    	var rewardName = "";
                    	var Reward = value.basicReward3;
                    	$(this).id = Reward
                        for(var i=0;i<rewardData.data.length;i++){
                          	if(rewardData.data[i].rewardId == Reward){
                          		rewardName = rewardData.data[i].goodsName
                          			  
                          	}
                        }
                  	return  rewardName 
                    }
                }, {
                    field: 'basicReward3Number',
                    title: '保底奖励3道具数量',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'basicReward3Weight',
                    title: '保底奖励3权重',
                    width: 150,
                    edit: 'text'
                },
                {
                    field: 'basicReward4',
                    title: '保底奖励4道具id',
                    width: 150,
//                    edit: 'text',
                    templet:function(value){
                    	var rewardName = "";
                    	var Reward = value.basicReward4;
                    	$(this).id = Reward
                        for(var i=0;i<rewardData.data.length;i++){
                          	if(rewardData.data[i].rewardId == Reward){
                          		rewardName = rewardData.data[i].goodsName
                          			  
                          	}
                        }
                  	return  rewardName 
                    }
                }, {
                    field: 'basicReward4Number',
                    title: '保底奖励4道具数量',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'basicReward4Weight',
                    title: '保底奖励4权重',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'minBuyCountNeedForBigReward',
                    title: '至少购买多少份才能开大奖',
                    width: 150,
                    edit: 'text'
                }, {
                    field: 'operaTion',
                    title: '操作' + cyclenum,
                    width: 350,
                    templet: function (value) {
                        return `
                        	 <span lay-event='reise' style="margin-right:20px;color:#2fa88d;">大奖道具配置</span> 
                        	 <br>
                        	 <span lay-event='reise1' style="margin-right:15px;color:#2fa88d;">奖励1配置</span> 
                        	 <span lay-event='reise2' style="margin-right:15px;color:#2fa88d;">奖励2配置</span> 
                        	 <span lay-event='reise3' style="margin-right:15px;color:#2fa88d;">奖励3配置</span> 
                        	 <span lay-event='reise4' style="color:#2fa88d;">奖励4配置</span>
                        	 <br>
                             <span class='moveUpOrDown up' lay-event='upload'  style="margin-right:20px;color:#82ab2a;">上移</span> 
                             <span class='moveUpOrDown down' lay-event='download'  style="margin-right:20px;color:#9e254f;">下移</span>
                             <span class='start_up' lay-event='del' style="color:#e63838;">删除</span> 
                             
                             `
                    }
                }
	        ]],
	        done:function(res,curr,count){
	        	 var that = this.elem.next();
		          res.data.forEach(function (item, index) {
		        	  //console.log(item.empName);item表示每列显示的数据
		             if (index%2==0) {
		                  var tr = that.find(".layui-table-box tbody tr[data-index='" + index + "']").css("background-color", "#333333");
		              } else{
		                  var tr = that.find(".layui-table-box tbody tr[data-index='" + index + "']").css("background-color", "#242424");
		              } 
		          });
	        	alldata = res.data
//	        	oldDate2 = res.data[0]
	        }
	      });
 
     });

 // 保存
 $(".Preservation").click(function () {
	 var pid = $.cookie('the_cookie_pname')
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
          firstopenday=''
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
    url: "../saveEditCloudShop.action",////编辑页面保存按钮
    async: true,
    contentType:'application/json;charset=UTF-8',
    data: JSON.stringify({
    	pId:pid,
        rows:array
      // list:JSON.stringify(list)
    }),
    success: function (e) {
      alert(e.message)
      $("body").mLoading("hide")
    
    }
  })
})
});
