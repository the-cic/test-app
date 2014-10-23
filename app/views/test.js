'use strict';

angular.module('testView', ['contentData'])
.controller('TestViewCtrl', function($scope, DataService){
	$scope.things = DataService.getData(10);
});




/*
'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function() {

}]);
*/