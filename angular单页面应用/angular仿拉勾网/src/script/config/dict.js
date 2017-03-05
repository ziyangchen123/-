/**
* app levalue('dict',{})
*
* Description
*/
angular.module('app').value('dict', {})
.run(['$http','dict', function($http,dict){

		$http.get('data/city.json').success(function(resp){
		dict.city=resp;
	});
		


		$http.get('data/salary.json').success(function(resp){
		dict.salary=resp;
	});
		

		$http.get('data/scale.json').success(function(resp){
		dict.scale=resp;
	
	});
	
}])
// var app=angular.module('app', []);
// app.run(['$http', function($http){
// 	app.value('dict', {});
// 	$http.get('data/city.json').success(function(resp){
// 		dict.city=resp;
// 	});

// }])