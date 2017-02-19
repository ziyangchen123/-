//引入express模块,如果没有,则需要完成引用cnpm install express
//var express =  require("express"); 
const HTTP = require('http');
const URL = require("url");
var arg;
var arrays;
const HOSTNAME = '127.0.0.1';
const PORT = 3000;
var resG;
var data = [{id:10,userName:'laozhang1',userMobile:130},{id:11,userName:'laozhang2',userMobile:131},{id:12,userName:'laozhang3',userMobile:133}];

function fun0(){
		resG.end(arg.jsoncallback+'('+'-1'+')');
}
function fun1(){
	resG.end(arg.jsoncallback+'('+JSON.stringify(data)+')');
}

const server = HTTP.createServer((req, res) => {
	resG=res;
	res.statusCode = 200;
    //res.setHeader('Content-Type', 'text/plain');
   
  arg = URL.parse(req.url, true).query;
  //接受的第一个参数值
  console.log(arg.intResult);
  console.log("ok1"+arg.id)
  /*
  //获取到的制定的URL的参数
  arrays=String(URL.parse(req.url).query).split("&");
  if(arrays.length>0){
    //打印数组的所有的值
	 arrays.forEach(function(item,index){  
	    console.log(item+'---'+index);  
	});
  }
  else{
  		console.log(URL.parse(req.url).query);
  }
    console.log(arrays[0]);  
  */
  switch (arg.intResult){
  	case "0":
  				fun0();
  		break;
  	case "1":
  				fun1();
  	default:
  		break;
  }

});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
  //控制台输出内容
  console.log("陈有为");
});


