angular.module('app').directive('appFoot',[function () {
	// body...
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/foot.html'
	}
}])