<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
<link rel="stylesheet" href="../webapp/layui/css/layui.css">
</head>
<body>
${user}

<form action="http://192.168.0.34:8280/centralOperations/importCSVTemplate.action" method="post" enctype="multipart/form-data">
	uplaod:<input type="file" name="file">
	<br/>
<br/>
	uplaod1:<input type="file" name="file">
	<button type="submit">send</button>
</form>



<br/>
<button id="daoru">导入活动配置表模板</button>
<br/>
<br/>
<button id="daoru2">导入活动配置表模板</button>
<br/>
<br/>
<button id="daoru3">导入活动配置表模板</button>
</body>
<script src="../webapp/layui/layui.js"></script>
<script>
layui.use(['table', 'layer', 'form', 'element','upload'], function () {
	var table = layui.table;
 	var layer = layui.layer;
  	var form = layui.form
	var upload = layui.upload

	$('#daoru').click(function(){
		alert(1)
	})
// 导入活动配置表模板
upload.render({
    elem: '#daoru',
    url: './importCSVTemplate.action',
    accept: 'file',
    done: function (res) {
    alert(res.message);
    tableIns.reload()
    }
});
// 批量导入活动类型
upload.render({
    elem: '#daoru2',
    url: './improtActivityType.action',
    accept: 'file',
    done: function (res) {
    alert(res.message);
    tableIns.reload()
    }
});

	// 批量导入活动奖励
upload.render({
    elem: '#daoru3',
    url: './improtActivityReward.action',
    accept: 'file',
    done: function (res) {
    alert(res.message);
    tableIns.reload()
    }
});
})
</script>
</html>