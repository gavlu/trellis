'use strict';

angular.module('trellisApp')
.controller('MyprofileCtrl', function ($scope, Auth, userService) {
	$scope.me = {};
	angular.copy( Auth.getCurrentUser(), $scope.me );
	delete $scope.me.__v;
	delete $scope.me._id;
	delete $scope.me.$promise;
	delete $scope.me.$resolved;
	delete $scope.me.provider;
	delete $scope.me.facebook;
	delete $scope.me.plants;
	delete $scope.me.role;
	console.log($scope.me);

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

	$scope.checkType = function( val ) {
		return typeof val === 'string' ? true : false;
	};

	$scope.addField = function( key, index ) {
		$scope.me[key].push(new $scope[key]);
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
			$scope.editable = !$scope.editable;
		});
	};

	//For education radio buttons
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
	};

	//For education select boxes
	$scope.showBox = function(school){
		console.log(school, "Stufffffffff");
		if(school!==$scope.edLevel[0]&&school!==$scope.edLevel[1]&&school!==$scope.edLevel[2]&&school!==undefined){
			return true;
		} else {
			return false;
		}
	};
});
