'use strict';

angular.module('contentData',[])
.service('DataService', function(){
	this.someDataItem = function(){
		return {
			name : 'some'+Math.floor(Math.random()*1000),
			data : Math.round(Math.random() * 1000000)
		};
	};
	this.getData = function(count){
		var data = [];
		
		for (var i = 0; i < count; i++) {
			data.push(this.someDataItem());
		}
		
		return data;
	}
});
