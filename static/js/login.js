layui.use('form', function() {
    var form = layui.form;
});
//登录跳转
function logins() {
	var account = $("#account").val();
	var pasd = $("#password").val();
	$.ajax({
		type: "get",
		url: "../admin/loginAccount",
		async: true,
		data: {
            account: account,
            password: pasd
		},
		success: function(json) {
			if(json.state == true){
                $.cookie('jsonString', JSON.stringify(json), { expires: 1, path: '/' });
                window.location.href="ServerOverviewAndMonitor.html";
			}else{
				alert(json.message);
			}
		}
	});
}

