'use strict';

angular.module('trellisApp')
.controller('MyprofileCtrl', function ($scope, Auth, userService) {
	$scope.me = {};
	for (var variable in Auth.getCurrentUser()) {
		if (Auth.getCurrentUser().hasOwnProperty(variable)) {
			$scope.me[variable] = Auth.getCurrentUser()[variable];
		}
	}
	delete $scope.me.__v;
	delete $scope.me._id;
	delete $scope.me.$promise;
	delete $scope.me.$resolved;
	delete $scope.me.provider;
	delete $scope.me.facebook;
	delete $scope.me.plants;
	delete $scope.me.role;
	$scope.me.interests = [{'type': 'gaming'}, {'type':'photography'}];

	$scope.edLevel = ['high school', 'undergradate', 'graduate', 'other'];

	$scope.family = function(name, relation){
		this.name = name;
		this.relation = relation;
	};

	$scope.education = function(name, level){
		this.name = name;
		this.level = level;
	};

	$scope.importantDates = function(eventName, date, eventDescription){
		this.eventName = eventName;
		this.date = date;
		this.eventDescription = eventDescription;
	};

	$scope.interests = function(type, tags){
		this.type = type;
		this.tags = tags;
	};

	$scope.projects = function(name, type, link, projectDescription){
		this.name = name;
		this.type = type;
		this.link = link;
		this.projectDescription = projectDescription;
	};

	$scope.otherFields = function(title, body){
		this.title = title;
		this.body = body;
	};

	// $scope.typeObj = {
	// 	"family": {
	// 		name: "",
	// 		relation: ""
	// 	},
	// 	"education": {
	// 		level: "",
	// 		name: ""
	// 	},
	// 	"importantDates": {
	// 		eventName: "",
	// 		date: "",
	// 		description: ""
	// 	},
	// 	"interests": {
	// 		type: "",
	// 		tags: ""
	// 	},
	// 	"projects": {
	// 		type: "",
	// 		name: "",
	// 		description: "",
	// 		link: ""
	// 	},
	// 	"otherFields": {
	// 		title: "",
	// 		body: ""
	// 	}

	$scope.checkType = function( val ) {
		return typeof val === 'string' ? true : false;
	};

	$scope.addField = function( key, index ) {
		// console.log(key);
		// console.log($scope.me);
		$scope.me[key].push(new $scope[key]);
		// if ( $scope.me[key].length > 0 && $scope.me[key][index] !== '' ) {
		// 	// console.log('first');
		// 	$scope.me[key].push($scope.typeObj[key]);
		// } else if ( $scope.me[key].length === 0 ){
		// 	// console.log('second');
		// }
	};

	$scope.deleteField = function( key, index ) {
		console.log($scope.me[key]);
		$scope.me[key].splice(index, 1);
	};

	$scope.editUser = function( ) {
		$scope.editable = !$scope.editable;
	};

	$scope.updateUser = function() {
		userService.updateUser($scope.me, function(data){
			console.log(data);
		});
	};

	$scope.other = {};
	$scope.otherEd = function(edLevel, edIndex){
		console.log($scope.other);
		if(edLevel === 'other'){
			console.log('true!!!!!!!!!!!!!');
			$scope.other[edIndex] = true;
			console.log($scope.other);
			console.log($scope.other[edIndex]);
		}else{
			console.log('false!!!!!!!!!!!!!'); 
			$scope.other[edIndex] = false;	
		}
	}
});
