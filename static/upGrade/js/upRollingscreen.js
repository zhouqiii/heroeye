
$(function () {
 // 添加滚屏
 $(".add").click(function(){
   $(".add").addClass("activebk")
   $(".mescreen1").show()
})
   


   $('.fhbtn').click(function(){
    $('.mescreen').hide()
    $(".add").removeClass('activebk')
   })



var isClick = true;
	$(".addtype").on("click",function(){
		if(isClick) {
			isClick = false;
			//事件
			// console.log($(this).attr("data-val"));
			//定时器
			setTimeout(function() {
				isClick = true;
			}, 5000);//一秒内不能重复点击
		}
	});


});


  



   
