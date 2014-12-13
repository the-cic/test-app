

angular.module('app', ['ngRoute', 'ngResource', 'wtfModule', 'testView', 'hexView'])

.config(function($routeProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;

    $routeProvider
		.when('/test', {
			templateUrl: 'views/test.html',
			controller: 'TestViewCtrl'
		})
		.when('/map', {
			templateUrl: 'views/hex.html',
			controller: 'HexViewCtrl'
		})
        .otherwise({
            redirectTo: '/map'
        });
    }
);
