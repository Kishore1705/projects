var app = angular.module('testApp',['ui.router','ngStorage',
'angularUtils.directives.dirPagination','ui.bootstrap'])
.value('domain','http://localhost:9056/')
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider    
        .state('login', {
            url: '/login',
            templateUrl: 'Templates/login.html',
            controller: 'AuthController',
            authorize: false
		})
		.state('register', {
            url: '/register',
            templateUrl: 'Templates/register.html',
            controller: 'RegisterController',
            authorize: false
        })
		.state('dashboard', {
            url: '/dashboard',
            templateUrl: 'Templates/dashboard.html',
            controller: 'DashboardController',
            authorize: true
        })
})
.run(function($rootScope,$state,$log,AuthService,domain){
	$rootScope.$on("$stateChangeStart",function(evt,to,from){
		if(to.authorize){
			if(!AuthService.getAuthStatus()){
				$state.go('login');
				evt.preventDefault();
			}
		}
	});
	$rootScope.$on("$routeChangeSuccess",function(evt,to,from){		
	});
})
.service('HttpService', HttpService)
.factory('AuthService', AuthService)
.factory('DashboardService', DashboardService)
.factory('RegisterService', RegisterService)
.controller('AuthController', AuthController)
.controller('RegisterController', RegisterController)
.controller('DashboardController', DashboardController);