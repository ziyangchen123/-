/*以下开始编写js代码*/
/*外围放置全局变量*/
var myStorageLocal;
var myStorageSession;
var userNameVar;
var userMobileVar;
var tbody0;
//定义js函数
function funInit() {

	//		获取本地存储引擎1
	myStorageLocal = window.localStorage;
	//		获取本地存储引擎2
	myStorageSession = window.sessionStorage;
	//		获取用户姓名的值
	userNameVar = $("#userName").val();
	//		获取用户手机的值
	userMobileVar = $("#userMobile").val();

}
//定义用户更新
function funUpdate(userName0, userMobile) {
	$("#userName").val(userName0);
	$("#userMobile").val(userMobile);
}

function funDelete(id0) {
	if(window.confirm("是否删除？")) {
		$.ajax({
			type: 'get',
			url: 'http://127.0.0.1:3000/?intResult=0',
			dataType: "jsonp",
			
			jsonp: "jsoncallback",
			data:"id="+id0,
			success: function(msg) {
				console.log(msg);
			},
			error: function(msg) {

			}
		});
	}
}
$(document).ready(function() {
	funInit();
	//	本增开始
	$("#frmGuest").submit(function() {
		//		console.log("ok!");
		//		return false;

		myStorageLocal.setItem("userName", userNameVar);
		myStorageSession.setItem("userName", userNameVar);
	});
	//	本增结束

	//本删开始
	$("#btnUserDeleteLocal").click(function() {
		myStorageLocal.removeItem("userName");
		myStorageSession.removeItem("userName");
	});
	//	本删结束

	//本改开始
	$("#btnUserUpdateLocal").click(function() {
		myStorageLocal.setItem("userName", userNameVar);
		myStorageSession.setItem("userName", userNameVar)
	});
	//本改结束

	//本单开始
	$("#btnUserSelectOneLocal").click(function() {
		console.log(myStorageLocal.getItem("userName"));

	});
	//本单结束

	$("#btnUserSelectAllLocal").click(function() {
			for(var i = localStorage.length - 1; i >= 0; i--) {
				console.log('the' + (i + 1) + '条数据的键值为' + localStorage.key(i) + '数据为' + localStorage.getItem(localStorage.key(i)))
			}
		})
		//本序列化开始
	$("#btnUserSerialize").click(function() {
		console.log($("#frmGuest").serialize())
	});
	//本序列化结束

	//网获-1和1开始
	$("#btnUserNetGet").click(function() {
		$.ajax({
			type: 'get',
			url: 'http://127.0.0.1:8020/web_20170208/data/myData.txt',
			success: function(msg) {
				if(msg == -1) {
					console.log("ok!");
					$("#info").html("失败了");
				} else {
					$("#info").html("成功了");
				}
			},
			error: function(msg) {

			}
		});
	});

	//网获-1和1结束

	//网获json开始
	$("#btnUserNetGetJson").click(function() {
		$.ajax({
			type: 'get',
			url: 'http://127.0.0.1:8020/web_20170208/data/myJson.json',
			success: function(msg) {
				for(var i = 0; i < msg.length; i++) {
					console.log(msg[i].id)
				}
			}
		});
	});
	//网获json结束
	//跨域 获取 -1开始 
	$("#btnUserNetCroxyMinus1").click(function() {
		$.ajax({
			type: 'get',
			url: 'http://127.0.0.1:3000/?intResult=0',
			dataType: "jsonp",
			jsonp: "jsoncallback",
			success: function(msg) {
				console.log(msg);
			},
			error: function(msg) {

			}
		});
	});
	//跨域获取1结束

	//跨域 获取 json开始 
	$("#btnUserNetCroxyJson").click(function() {
		$.ajax({
			type: 'get',
			url: 'http://127.0.0.1:3000/?intResult=1',
			dataType: "jsonp",
			jsonp: "jsoncallback",
			contentType: "application/json;utf-8",
			success: function(msg) {
				console.log(msg);
				tbody0 = "";
				for(var i = 0; i < msg.length; i++) {
					//console.log(msg[i].userName);
					tbody0 += "<tr>";
					tbody0 += "<td>" + msg[i].id + "</td>";
					tbody0 += "<td>" + msg[i].userName + "</td>";
					tbody0 += "<td>" + msg[i].userMobile + "</td>";
					tbody0 += "<td>" + msg[i].recordDate + "</td>";
					tbody0 += "<td>" + "<a href='javascript:void(0)' onclick=funUpdate('" + msg[i].userName + "'," + msg[i].userMobile + ")>更新</a>" + "</td>";
					tbody0 += "<td>" + "<a href='javascript:void(0)' onclick=funDelete(" + msg[i].id + ")>删除</a>" + "</td>";
					tbody0 += "</tr>";

				}
				$("#tbody0").html(tbody0);
			},
			error: function(msg) {

			}
		});
	});
	//跨域获取json结束

});