'use strict';
angular.module('app').directive('appPositionClass', [function(){
	return {
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Commen		
		replace: true,
		scope:{
			com:'='
		},
		templateUrl: 'view/template/positionClass.html',
		//transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link:function($scope){

			$scope.showPositionList=function(idx){
			$scope.positionList=$scope.com.positionClass[idx].positionList;
			$scope.isActive=idx;
		}
		$scope.$watch('com',function(newval){
			if (newval) { $scope.showPositionList(0);};
		})
			

		}
	}
}]);