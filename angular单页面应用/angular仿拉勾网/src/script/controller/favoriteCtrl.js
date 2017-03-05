'use strict';
angular.module('app').controller('favoriteCtrl',['$scope','$http',function($scope,$http){
	$http.get('data/myfavorite.json').success(function(resp){
		$scope.list=resp;
	})
	
	
}]);
