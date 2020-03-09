var submitParams;
var attributeid;
var activityid;
var oldDate2;
var alldata;//全局表格数据
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

layui.use(['table', 'layer', 'form', 'element','laydate'], function () {
  var table = layui.table;
  var layer = layui.layer;
  var form = layui.form
  var laydate = layui.laydate
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
  $('.cancleBtn1').click(function(){
	  $('#rewardEquipment1').css("display",'none')
	  vma.addMoreSelecta=[
	{selectValue:'',number:''},
    ]
  })
  table.render({
            elem: '#demo',
            id: 'demo'
            // , height: 312
            , url: '../getCloudShopConfList.action' //数据接口
            , where: {
              isTemplate: 1,
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
            , cols: [
            [
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
  //
   //单个删除
//   var length=$('.yihang').length-1
  table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
    var data = obj.data //拿到这一行数据
    var layEvent = obj.event
//    console.log(data)
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
      return false
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
//      var i=6;
      attributeid=data.attributeId
      activityid=data.activityId
      $("#rewardEquipment").css('display','block')
 //保存
  $('#saveSelect').off('click').click(function(){
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
	  table.render({
	        elem: '#demo',
	        id: 'demo'
        	,data: alldata
        	,page:false
        	,limit:1000
	        , cols: [[ //表头
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
	            	alldata = res.data
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
	  })
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
  })
  function reloadTable(){
	  table.render({
	        elem: '#demo',
	        id: 'demo'
      	,data: alldata
      	,page:false
      	,limit:1000
	        , cols: [[ //表头
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
//                  edit: 'text',
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
//                  edit: 'text',
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
//                  edit: 'text',
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
//                  edit: 'text',
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
//                  edit: 'text',
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
	  })
  }
   table.on('edit(test)', function(obj){
    var value = obj.value //得到修改后的值
    var preValue=$(this).prev().text()//修改之前的值
    var $this = $(this);
    var tr = $this.parents('tr');
    var trIndex = tr.data('index');
    var dataOld=table.cache["demo"]
    if(!value){
    	layer.msg('序号不能为空,请重新修改');
    	dataOld[trIndex].attributeId=preValue
	    table.render({
		      elem: '#demo',
		      id: 'demo'
		      // , height: 312
		      ,data:dataOld
		      ,cols: [[ //表头
//		    	  {
//	                    field: 'activityId',
//	                    title: '编号',
//	                    width: 150,
//	                    type: 'space',
//	                    edit: 'text',
//	                },
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
//	                    edit: 'text',
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
//	                    edit: 'text',
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
//	                    edit: 'text',
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
//	                    edit: 'text',
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
//	                    edit: 'text',
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
    var checkOnlyId=[]
    for(var i=0;i<dataOld.length;i++){
    	checkOnlyId.push(parseInt(dataOld[i].attributeId))
    }
    var nary = checkOnlyId.sort();
    for(var i=0; i<nary.length;i++) {
        if(nary[i] === nary[i+1]) {
        	 layer.msg('序号重复');
        	 dataOld[trIndex].attributeId=null
			    table.render({
				      elem: '#demo',
				      id: 'demo'
				      // , height: 312
				      ,data:dataOld
				      ,cols: [[ //表头
//				    	  {
//			                    field: 'activityId',
//			                    title: '编号',
//			                    width: 150,
//			                    type: 'space',
//			                    edit: 'text',
//			                },
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
//			                    edit: 'text',
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
//			                    edit: 'text',
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
//			                    edit: 'text',
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
//			                    edit: 'text',
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
//			                    edit: 'text',
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
    }
  });

  // 保存
  $(".Preservation").click(function () {
    var arrayOld =table.cache["demo"]////table分条数组
    var arrayOld2 = $("table tbody tr")
    var array=[]
    for(var i=0;i<arrayOld.length;i++){
  	  if(arrayOld[i]!=[]&&arrayOld[i]!=''&&arrayOld[i]!=undefined&&arrayOld[i]!=null){
  		  array.push(arrayOld[i])
  	  }
    }
    var activename_type = $('#activename_type').val();//活动类型
    var array2 = [];
    var array3=[];
    for(var i=0;i<arrayOld2.length;i++){
    	if(arrayOld2[i]!=[]&&arrayOld2[i]!=''&&arrayOld2[i]!=undefined&&arrayOld2[i]!=null){
    		  console.log(arrayOld2[i].childNodes[0].innerText)
    		  var array2 = {
    			  activityId:null,
    			  activityType:activename_type,
//    			  attributeId:arrayOld2[i].childNodes[0].textContent,
    			  attributeId:arrayOld[i].attributeId,
    			  serverLevel:arrayOld[i].serverLevel,
    			  activityDay: arrayOld[i].activityDay,
    			  saleStartTime: arrayOld[i].saleStartTime,
    			  saleEndTime: arrayOld[i].saleEndTime,
    			  robberyStartTime: arrayOld[i].robberyStartTime,
    			  robberyEndTime: arrayOld[i].robberyEndTime,
    			  awardOpeningTime: arrayOld[i].awardOpeningTime,
    			  continueTomorrow: arrayOld[i].continueTomorrow,
    			  numberReleases: arrayOld[i].numberReleases,
    			  currency: arrayOld[i].currency,
    			  buyingPrice: arrayOld[i].buyingPrice,
    			  buyingPriceAdd: arrayOld[i].buyingPriceAdd,
    			  robberyPrice: arrayOld[i].robberyPrice,
    			  robberyPriceAdd: arrayOld[i].robberyPriceAdd,
    			  numberBig: arrayOld[i].numberBig,
    			  bigReward: arrayOld[i].bigReward,
    			  bigValue: arrayOld[i].bigValue,
    			  bigRewardNumber: arrayOld[i].bigRewardNumber,
    			  basicReward1: arrayOld[i].basicReward1,
    			  basicReward1Number: arrayOld[i].basicReward1Number,
    			  basicReward1Weight: arrayOld[i].basicReward1Weight,
    			  basicReward2: arrayOld[i].basicReward2,
    			  basicReward2Number: arrayOld[i].basicReward2Number,
    			  basicReward2Weight: arrayOld[i].basicReward2Weight,
    			  basicReward3: arrayOld[i].basicReward3,
    			  basicReward3Number: arrayOld[i].basicReward3Number,
    			  basicReward3Weight: arrayOld[i].basicReward3Weight,
    			  basicReward4: arrayOld[i].basicReward4,
    			  basicReward4Number: arrayOld[i].basicReward4Number,
    			  basicReward4Weight: arrayOld[i].basicReward4Weight,
    			  minBuyCountNeedForBigReward: arrayOld[i].minBuyCountNeedForBigReward,
//    			  firstOpenDay:firstopenday
    		  }
    		  array3.push(array2)
    	  }
    }
    console.log(arrayOld2)
    console.log(array3)
    
//        for(var i=0; i<obj.length; i ++){
              
//    	        for(var i=0;i<array3.length;i++){
//    	        	array3[i].activityId=null
//    	        	array3[i].pId=activename_bianhao
//    	        	array3[i].firstOpenDay=firstopenday
//    	        }
    	        $.ajax({
    	          type: "post",
    	          dataType: "json",
    	          url: "../saveCloudShop.action",
    	          async: true,
    	          contentType:'application/json;charset=UTF-8',
    	          data: JSON.stringify({
    	        	  pId:"",
    	            rows:array3
    	          }),
    	          success: function (e) {
    	        	 alert(e.message)
    	            $("body").mLoading("hide")
    	          }
    	        })
//        }
  })
//增加活动模板
$(".addBranchBtn").click(function () {
	var isnull=[];
	var Lock;
	var oldDate = table.cache["demo"];
//	判断如果活动分支为空
	if(oldDate.length !==0){
		for(var i=0;i<oldDate.length;i++){
			if(oldDate[i].length !==0){
				isnull.push(true);
			}
			else{
				isnull.push(false);
			}
		}
		for(var i=0;i<isnull.length;i++){
			if(isnull[i] == false){
				Lock= false;
			}else{
				Lock = true;
				break;
			}
		}
		if(Lock != false){
			var newDateChange=oldDate.filter(value => Object.keys(value).length !== 0);
			var len=newDateChange.length;
		   var lastList = newDateChange[len-1]
		   lastList.LAY_TABLE_INDEX = lastList.LAY_TABLE_INDEX+1
		   var atributeid
		   if(lastList.attributeId==null||lastList.attributeId==undefined||lastList.attributeId==0){
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
		var newList= {"attributeId":atributeid,"serverLevel":serverLevel,"activityDay":activityDay,"saleStartTime":saleStartTime,"saleEndTime":saleEndTime,"robberyStartTime":robberyStartTime,"robberyEndTime":robberyEndTime,"awardOpeningTime":awardOpeningTime,"continueTomorrow":continueTomorrow,"numberReleases":numberReleases,"currency":currency,"buyingPrice":buyingPrice,"buyingPriceAdd":buyingPriceAdd,"robberyPrice":robberyPrice,"robberyPriceAdd":robberyPriceAdd,"numberBig":numberBig,"bigReward":bigReward,"bigValue":bigValue,"bigRewardNumber":bigRewardNumber,"basicReward1":basicReward1,"basicReward1Number":basicReward1Number,"basicReward1Weight":basicReward1Weight,"basicReward2":basicReward2,"basicReward2Number":basicReward2Number,"basicReward2Weight":basicReward2Weight,"basicReward3":basicReward3,"basicReward3Number":basicReward3Number,"basicReward3Weight":basicReward3Weight,"basicReward4":basicReward4,"basicReward4Number":basicReward4Number,"basicReward4Weight":basicReward4Weight,"minBuyCountNeedForBigReward":minBuyCountNeedForBigReward,}
		 newList.activityId=lastList.activityId+1
		}
		else{
			console.log(oldDate2)
			var newList= {"attributeId":oldDate2.attributeId,"serverLevel":oldDate2.serverLevel,"activityDay":oldDate2.activityDay,"saleStartTime":oldDate2.saleStartTime,"saleEndTime":oldDate2.saleEndTime,"robberyStartTime":oldDate2.robberyStartTime,"robberyEndTime":oldDate2.robberyEndTime,"awardOpeningTime":oldDate2.awardOpeningTime,"continueTomorrow":oldDate2.continueTomorrow,"numberReleases":oldDate2.numberReleases,"currency":oldDate2.currency,"buyingPrice":oldDate2.buyingPrice,"buyingPriceAdd":oldDate2.buyingPriceAdd,"robberyPrice":oldDate2.robberyPrice,"robberyPriceAdd":oldDate2.robberyPriceAdd,"numberBig":oldDate2.numberBig,"bigReward":oldDate2.bigReward,"bigValue":oldDate2.bigValue,"bigRewardNumber":oldDate2.bigRewardNumber,"basicReward1":oldDate2.basicReward1,"basicReward1Number":oldDate2.basicReward1Number,"basicReward1Weight":oldDate2.basicReward1Weight,"basicReward2":oldDate2.basicReward2,"basicReward2Number":oldDate2.basicReward2Number,"basicReward2Weight":oldDate2.basicReward2Weight,"basicReward3":oldDate2.basicReward3,"basicReward3Number":oldDate2.basicReward3Number,"basicReward3Weight":oldDate2.basicReward3Weight,"basicReward4":oldDate2.basicReward4,"basicReward4Number":oldDate2.basicReward4Number,"basicReward4Weight":oldDate2.basicReward4Weight,"minBuyCountNeedForBigReward":oldDate2.minBuyCountNeedForBigReward,}
			var newDateChange=oldDate.filter(value => Object.keys(value).length !== 0);
		}
	}
	else{
		var newList= {"attributeId":oldDate2.attributeId,"serverLevel":oldDate2.serverLevel,"activityDay":oldDate2.activityDay,"saleStartTime":oldDate2.saleStartTime,"saleEndTime":oldDate2.saleEndTime,"robberyStartTime":oldDate2.robberyStartTime,"robberyEndTime":oldDate2.robberyEndTime,"awardOpeningTime":oldDate2.awardOpeningTime,"continueTomorrow":oldDate2.continueTomorrow,"numberReleases":oldDate2.numberReleases,"currency":oldDate2.currency,"buyingPrice":oldDate2.buyingPrice,"buyingPriceAdd":oldDate2.buyingPriceAdd,"robberyPrice":oldDate2.robberyPrice,"robberyPriceAdd":oldDate2.robberyPriceAdd,"numberBig":oldDate2.numberBig,"bigReward":oldDate2.bigReward,"bigValue":oldDate2.bigValue,"bigRewardNumber":oldDate2.bigRewardNumber,"basicReward1":oldDate2.basicReward1,"basicReward1Number":oldDate2.basicReward1Number,"basicReward1Weight":oldDate2.basicReward1Weight,"basicReward2":oldDate2.basicReward2,"basicReward2Number":oldDate2.basicReward2Number,"basicReward2Weight":oldDate2.basicReward2Weight,"basicReward3":oldDate2.basicReward3,"basicReward3Number":oldDate2.basicReward3Number,"basicReward3Weight":oldDate2.basicReward3Weight,"basicReward4":oldDate2.basicReward4,"basicReward4Number":oldDate2.basicReward4Number,"basicReward4Weight":oldDate2.basicReward4Weight,"minBuyCountNeedForBigReward":oldDate2.minBuyCountNeedForBigReward,}
		var newDateChange=oldDate.filter(value => Object.keys(value).length !== 0);
	}
   newDateChange.push(newList)
	    table.render({
	        elem: '#demo',
	        id: 'demo'
        	,data: newDateChange
        	,page:false
        	,limit:1000
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
            	alldata = res.data
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
     });
})

