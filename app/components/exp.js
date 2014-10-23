'use strict';

/*
only need to require wtfModule to get next modules in app

angular.module('app', [..., 'wtfModule'])...

*/

angular.module('wtfModule', ['upYoursModule', 'someModule'])
.service('wtfService', function(){
	this.doStuff = function(){
		return 'stuff';
	}
});

angular.module('someModule',[])
.directive('someDirective', function(){
	return {
		restrict: 'A',
		template : 'SOMETHING OR OTHER {{1|upYours}}',
		link: function(scope, element, attrs){
			console.log('what?');
		}
	}
});

angular.module('upYoursModule',[])
.filter('upYours', function(wtfService){
	return function(text) {
		return 'up yours ' + wtfService.doStuff() + '!';
	};
});

/*

'use strict';

angular.module('myApp.version', [
  'myApp.version.interpolate-filter',
  'myApp.version.version-directive'
])

.value('version', '0.1');

'use strict';

angular.module('myApp.version.version-directive', [])

.directive('appVersion', ['version', function(version) {
  return function(scope, elm, attrs) {
    elm.text(version);
  };
}]);


'use strict';

angular.module('myApp.version.interpolate-filter', [])

.filter('interpolate', ['version', function(version) {
  return function(text) {
    return String(text).replace(/\%VERSION\%/mg, version);
  };
}]);

*/