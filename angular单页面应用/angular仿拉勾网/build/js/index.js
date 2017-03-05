'use strict';

angular.module('app',['ui.router','validation','ngCookies']);

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
/**
*  Module
*
* Description
*/
angular.module('app').config(['$provide',function($provide){
	$provide.decorator('$http',['$delegate','$q',function($delegate,$q){
		 var get=$delegate.get;
		$delegate.post=function(url,data,config){
			var def=$q.defer();
			get(url).success(function(resp){
				def.resolve(resp);
			}).error(function(err){
				def.reject(err);
			})
			return{
				success:function(cb){
					def.promise.then(cb);
				},
				error:function(cb){
					def.promise.then(null,cb);
				}
			}

		}
		return $delegate;
	}])
}])
'use strict';

angular.module('app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state('main',{
		url:'/main',
		templateUrl:'view/main.html',
		controller:'mainCtrl'
	})
	.state('position',{
		url:'/position:id',
		templateUrl:'view/position.html',
		controller:'positionCtrl'
	})
	.state('company',{
		url:'/company/:id',
		templateUrl:'view/company.html',
		controller:'companyCtrl'
	})
	.state('search',{
		url:'/search',
		templateUrl:'view/search.html',
		controller:'searchCtrl'
	})
	.state('login',{
		url:'/login',
		templateUrl:'view/login.html',
		controller:'loginCtrl'
	})
	.state('me',{
		url:'/me',
		templateUrl:'view/me.html',
		controller:'meCtrl'
	})
	.state('register',{
		url:'/register',
		templateUrl:'view/register.html',
		controller:'registerCtrl'
	})
	.state('post',{
		url:'/post',
		templateUrl:'view/post.html',
		controller:'postCtrl'
	})
	.state('favorite',{
		url:'/favorite',
		templateUrl:'view/favorite.html',
		controller:'favoriteCtrl'
	});
	$urlRouterProvider.otherwise('main');
}]);

/**
*  Module
*
* Description
*/
angular.module('app').config(['$validationProvider',function($validationProvider) {
	var expression={
  		phone:/^1[\d]{10}$/,
  		password:function(value){
  			var str=value+ '';
  			return str.length > 5;
  		},
  		required:function(value){
  			return !!value;
  		}
	};
	var defaultMsg={
			phone:{
				success:'',
				error:'必须是11位手机号'
			},
			password:{
				success:'',
				error:'长度至少6位'
			},
			required:{
				success:'',
				error:'不能为空'
			}

	};
	$validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}]);
'use strict';
angular.module('app').controller('companyCtrl',['$scope','$http','$state',function($scope,$http,$state){
	$http.get('data/company.json?id='+$state.params.id).success(function(resp){
		$scope.company=resp;
		// $scope.$broadcast('abc',{id:1});

	})
	// $scope.$on('cba',function(event,data){
	// 				console.log(event,data);
	// 			});
}]);

'use strict';
angular.module('app').controller('favoriteCtrl',['$scope','$http',function($scope,$http){
	$http.get('data/myfavorite.json').success(function(resp){
		$scope.list=resp;
	})
	
	
}]);

'use strict';
angular.module('app').controller('loginCtrl',['$scope','$http','$state','cache',function($scope,$http,$state,cache){
$scope.submit=function(){
	$http.post('data/login.json',$scope.user).success(function(resp){
		cache.put('id',resp.id);
		cache.put('name',resp.name);
		cache.put('image',resp.image)
		$state.go('main');
	})
}
	
	
}]);

'use strict';
angular.module('app').controller('mainCtrl',['$scope','$http',function($scope,$http){

	 $http.get('/data/positionList.json').success(
	 	function(resp){
	 		$scope.list=resp;
	 	}
	 	)
	
}]);

'use strict';
angular.module('app').controller('meCtrl',['$scope','$http','cache','$state',function($scope,$http,cache,$state){

if (cache.get('name')) {

	$scope.name=cache.get('name');
	$scope.image=cache.get('image');
	
}
	$scope.logout=function(){
	cache.remove('id');
	cache.remove('name');
	cache.remove('image');
	 $state.go('main');
	}
	
}]);

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

'use strict';
angular.module('app').controller('postCtrl',['$scope','$http',function($scope,$http){
	$scope.tabList=[{
		id:'all',
		name:'全部'
	},
	{
		id:'pass',
		name:'面试邀请'
	},
	{
		id:'fail',
		name:'不合适'
	}];
	$http.get('data/myPost.json').success(function(resp){
		$scope.positionList=resp;
	});
	$scope.filterObj={};
	$scope.tClick=function(id,name){
		switch(id){
			case 'all':
				delete $scope.filterObj.state;
				break;
				case 'pass':
				 $scope.filterObj.state='1';
				break;
				case 'fail':
				 $scope.filterObj.state='-1';
				break;
				default:
		}
	}
}]);

'use strict';
angular.module('app').controller('registerCtrl',['$scope','$http','$interval','$state',function($scope,$http,$interval,$state){
$scope.submit=function(){
	$http.post('data/regist.json',$scope.user).success(function(resp){
		$state.go('login');
	})
}
	var count=60;
	$scope.send=function(){
		$http.get('data/code.json').success(function(resp){
			if (1===resp.state) {
				count=60;
				$scope.time='60s';
			var interval=$interval(function(){
					if (count<=0)
					 {
					 	$interval.cancel(interval);
					 	$scope.time='';
						return;
					}
					else{
						count--;
						$scope.time=count+'s';
					}

				},1000)
			}
		})
	}
}]);

'use strict';
angular.module('app').controller('searchCtrl',['$scope','$http','dict',function($scope,$http,dict){
	$scope.name='';
	$scope.search=function(){
	$http.get('data/positionList.json').success(function(resp){
		$scope.positionList=resp;
	})
	};
	var tabId='';
	$scope.filterObj={};
	$scope.search();
	$scope.sheet={};
	$scope.tabList=[{
		id:'city',
		name:'城市'
	},
	{
		id:'salary',
		name:'薪水'
	},
	{
		id:'scale',
		name:'公司规模'
	}];
	$scope.tClick=function(id,name){
		tabId=id;
		$scope.sheet.list=dict[id];
		$scope.sheet.visible=true;
	};
	$scope.sClick=function(id,name){

		if (id) {
			angular.forEach($scope.tabList,function(item){
				if(item.id==tabId){
					item.name=name;
				}
			});
			$scope.filterObj[tabId+'Id']=id;

		}
		else{
			delete $scope.filterObj[tabId+'Id'];
			angular.forEach($scope.tabList,function(item){
				if(item.id==tabId){
					switch(item.id){
						case 'city':
							item.name='城市';
							break;
						case 'salary':
							item.name='薪水';
							break;
						case 'scale':
							item.name='公司规模';
							break;
						default:
					}
				}
			});
		}
	}
}]);

/**
*  Module
*
* Description
*/
angular.module('app').filter('filterByObj',[function () {
	// body...
	return function(list,obj){
		var result=[];
		angular.forEach(list,function(item){
			var isEqual=true;
			for(var e in obj){

				if (item[e]!==obj[e]) {
					isEqual=false;
				}
			}
			if (isEqual) {
				result.push(item);
			}

		});
		return result;
	}
}])
angular.module('app')
.directive('appCompany',[function(){
	return{
		restrict:'A',
		replace:true,
		scope:{
			com:'='
		},
		templateUrl:'view/template/company.html'
	}
}])
angular.module('app').directive('appFoot',[function () {
	// body...
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/foot.html'
	}
}])
angular.module('app')
.directive('appHead',['cache',function(cache){
	return{

		restrict:'A',
		replace:true,
		templateUrl:'view/template/head.html',
		link:function(scope){
			scope.name=cache.get('name')||'';
		}
	}
}])
angular.module('app')
.directive('appHeadBar',[function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/headBar.html',
		scope:{
			text:'@'
		},
		link:function($scope){
			$scope.back=function(){
				window.history.back();	
			};
			// $scope.$on('abc',function(event,data){
			// 		console.log(event,data);
			// 	});

			// $scope.$emit('cba',{id:2});
		}
	}
}]);
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
angular.module('app').directive('appPositionInfo',['$http',function($http){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/positionInfo.html',
		scope:{
			isActive:'=',
			isLogin:'=',
			pos:'='
		},
		link:function($scope){
			$scope.$watch('pos',function(newval){
				if (newval) {
					$scope.pos.select=$scope.pos.select||false;
					$scope.imgPath=$scope.pos.select ? 'image/star-active.png' : 'image/star.png';
						
						}
					});
			
			$scope.favorite=function(){

				$http.post('data/favorite.json',{
					id:$scope.pos.id,
					select:!$scope.pos.select
				}).success(function(resp){
					$scope.pos.select=!$scope.pos.select;
					$scope.imgPath=$scope.pos.select?'image/star-active.png':'image/star.png'

				})
			}
		}
	}
}])

angular.module('app')
.directive('appPositionList',['$http',function($http){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/positionList.html',
		scope:{
			data:'=',
			filterObj:'=',
			isFavorite:'='
		},
		link:function(scope){
			
			scope.select=function(item){
				$http.post('data/favorite.json',{
					id:item.id,
					select:!item.select
				}).success(function(resp){
					item.select=!item.select;
				})
				
			}
		}
	}
}])
angular.module('app').directive('appSheet',function(){
	return{
		restrict:'A',
		replaec:true,
		templateUrl:'view/template/sheet.html',
		scope:{
			list:'=',
			visible:'=',
			select:'&'
		}
	};
})
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

angular.module('app').service('cache', ['$cookies', function($cookies){
	this.put=function(key,value){
		$cookies.put(key,value);
	};
	this.get=function(key){
		return $cookies.get(key);
	}
	this.remove=function(key){
		$cookies.remove(key);
	}
}])