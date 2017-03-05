/**
* app ledirective('appTab',function(){
	return{
	restrict
	}
})
*
* Description
*/
angular.module('app').directive('appTab',function(){
	return{
		restrict:'A',
		replaec:true,
		scope:{
			list:'=',
			tabClick:'&'
		},
		templateUrl:'view/template/tab.html',
		link:function(scope){
			scope.click=function(tab){
				scope.selectId=tab.id;
				scope.tabClick(tab);
			}
		}
	};
})