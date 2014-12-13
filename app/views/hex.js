'use strict';

angular.module('hexView', ['contentData'])
.value('ProbabilityMap', {
	'6-0-0' : [3, 3],

	'5-0-1' : [2, 4],
	'5-1-0' : [4, 2],

	'4-0-2' : [2, 4],
	'4-1-1' : [3, 3],
	'4-2-0' : [4, 2],

	'3-0-3' : [1, 5],
	'3-1-2' : [2, 4],
	'3-2-1' : [4, 2],
	'3-3-0' : [5, 1],

	'2-0-4' : [1, 5],
	'2-1-3' : [2, 4],
	'2-2-2' : [3, 3],
	'2-3-1' : [4, 2],
	'2-4-0' : [5, 1],

	'1-0-5' : [0, 6],
	'1-1-4' : [1, 5],
	'1-2-3' : [2, 4],
	'1-3-2' : [4, 2],
	'1-4-1' : [5, 1],
	'1-5-0' : [6, 0],

	'0-0-6' : [0, 6],
	'0-1-5' : [1, 5],
	'0-2-4' : [2, 4],
	'0-3-3' : [3, 3],
	'0-4-2' : [4, 2],
	'0-5-1' : [5, 1],
	'0-6-0' : [6, 0],
	
})
.controller('HexViewCtrl', function($scope, $log, DataService, ProbabilityMap){
	$scope.mapWidth = 11;
	$scope.mapHeight = 11;
	$scope.ProbabilityMap = ProbabilityMap;
	
	$scope.clearMap = function(){
		var lines = [];
		for (var i=0; i < $scope.mapHeight; i++) {
			var line = [];
			for (var j=0; j < $scope.mapWidth; j++) {
				line.push(null);
			}
			lines.push(line);
		}
		$scope.lines = lines;		
	}
	
	$scope.clearMap();
	
	$scope.clickTile = function(u, v) {
		if ($scope.getCell(u,v) !== null) {
			return;
		}
		var nCount = $scope.countNeighbours(u, v);
		var probability = ProbabilityMap[nCount[0] + '-' + nCount[1] + '-' + nCount[2]];
		$log.info(u+', '+v);
		//$log.info(nCount);
		//$log.info(probability);
		var value = true;
		if (probability !== undefined) {
			var die = Math.floor(Math.random() * 6) + 1;
			value = die <= probability[0];
		}
		$scope.setCell(u, v, value);
	};
	
	$scope.hasCell = function(u, v){
		return !(u < 0 || v < 0 || u >= $scope.mapWidth * 2 || v >= $scope.mapHeight);
	}
	
	$scope.getCell = function(u, v){
		if (!$scope.hasCell(u, v)) {
			return null;
		}
		return $scope.lines[v][Math.floor(u / 2)];
	};
	
	$scope.setCell = function(u, v, value){
		$scope.lines[v][Math.floor(u / 2)] = value;
	};
	
	$scope.isCellSet = function(u, v){
		var value = $scope.getCell(u, v);
		return value !== null;
	}
	
	$scope.countNeighbours = function(u, v){
		var values = [];
		values.push($scope.getCell(u - 1, v - 1));
		values.push($scope.getCell(u + 1, v - 1));
		values.push($scope.getCell(u - 2, v));
		values.push($scope.getCell(u + 2, v));
		values.push($scope.getCell(u - 1, v + 1));
		values.push($scope.getCell(u + 1, v + 1));
		
		var nullCount = 0;
		var trueCount = 0;
		var falseCount = 0;
		
		for (var i = 0; i < values.length; i++) {
			nullCount += values[i] === null ? 1 : 0;
			trueCount += values[i] === true ? 1 : 0;
			falseCount += values[i] === false ? 1 : 0;
		}
		
		return [nullCount, trueCount, falseCount];
	};
	
	$scope.changeProbability = function(key, dif){
		if (ProbabilityMap[key]) {
			if (dif > 0 && ProbabilityMap[key][0] < 6) {
				ProbabilityMap[key][0]++;
				ProbabilityMap[key][1]--;
			}
			else
			if (dif < 0 && ProbabilityMap[key][0] > 0) {
				ProbabilityMap[key][0]--;
				ProbabilityMap[key][1]++;
			}
		}
	}
	
	$scope.autoFillMap = function(){
		$scope.clearMap();
		
		var v = Math.floor($scope.mapHeight / 2);
		var u = Math.floor($scope.mapWidth / 2) * 2;
		u -= v % 2 == 0 ? 1 : 0;
		
		$scope.clickTile(u, v);
		u += 2;
		$scope.clickTile(u, v);
		u -= 1;
		v += 1;
		var count = 0;
		var maxCount = $scope.mapHeight * $scope.mapWidth * 1.2;
		while (/*$scope.hasCell(u,v) &&*/ count < maxCount) {
			count++;
			if ($scope.hasCell(u,v)) {
				$scope.clickTile(u, v);
			}
			if ($scope.isCellSet(u-1, v-1)) {
				if ($scope.isCellSet(u-2, v)) {
					if ($scope.isCellSet(u-1, v+1)) {
						u += 1;
						v += 1;
					} else {
						u -= 1;
						v += 1;
					}
				} else {
					u -= 2;
				}
			} else 
			if ($scope.isCellSet(u+1, v-1)) {
				u -= 1;
				v -= 1;
			}
			else
			if ($scope.isCellSet(u+2, v)) {
				u += 1;
				v -= 1;
			}
			else
			if ($scope.isCellSet(u+1, v+1)) {
				u += 2;
			}
			else
			if ($scope.isCellSet(u-1, v+1)) {
				u += 1;
				v += 1;
			}
		}
		for (v = 0; v < $scope.mapHeight; v++) {
			for (var i = 0; i < $scope.mapWidth; i++) {
				u = v % 2 == 0 ? i * 2 + 1 : i * 2;
				if (!$scope.isCellSet(u,v)) {
					$scope.clickTile(u, v);
				}				
			}
		}
	}
});


