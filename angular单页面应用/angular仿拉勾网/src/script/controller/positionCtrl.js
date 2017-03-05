'use strict';
angular.module('app').controller('positionCtrl',['$log','$scope','$http','$state','$q','cache',function($log,$scope,$http,$state,$q,cache){
	// cache.put('to','day');	
	$scope.isLogin=!!cache.get('name');
	$scope.message=$scope.isLogin?'投个简历':'去登录';
	function getPosition(){
		var def=$q.defer();
		$http.get('/data/position.json?id='+$state.params.id).success(function(resp){
		$scope.position=resp;
		if (resp.posted) {
			$scope.message='已投递';
		};
		def.resolve(resp);
	}).error(function(err){
		def.reject(err);
	});
		return def.promise;
	}
	function getCompany(id){
		$http.get('/data/company.json?id='+id).success(function(resp){
		$scope.company=resp;
	})
}
	getPosition().then(function(obj){
		getCompany(obj.companyId);
	});

	$scope.go=function(){
		if ($scope.message !== '已投递') {
			if ($scope.isLogin ) {
			$http.post('data/handle.json',{
				id:$scope.position.id
			}).success(function(resp){
				$log.info(resp);
				$scope.message='已投递';
			});
		}
		else{
			$state.go('login');
		};
		};

	}
}]);
