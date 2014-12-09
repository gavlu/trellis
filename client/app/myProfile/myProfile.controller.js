'use strict';

angular.module('trellisApp')
.controller('MyprofileCtrl', function ($scope, Auth, userService) {

	var vm = this;

	$scope.me = angular.copy( Auth.getCurrentUser() );
	delete $scope.me.__v;
	delete $scope.me._id;
	delete $scope.me.$promise;
	delete $scope.me.$resolved;
	delete $scope.me.provider;
	delete $scope.me.facebook;
	delete $scope.me.plants;
	delete $scope.me.role;
	$scope.tempMe = angular.copy($scope.me);

	$scope.edLevel = ['high school', 'undergradate', 'graduate', 'other'];

	vm.typeObj = {
		'family': {
			name: '',
			relation: ''
		},
		'education': {
			level: '',
			name: ''
		},
		'interests': {
			type: '',
			tags: []
		},
		'projects': {
			type: '',
			name: '',
			description: '',
			link: ''
		},
		'otherFields': {
			title: '',
			body: ''
		}
	};

	$scope.addField = function( key, index ) {
		console.log(key, index);
		if( key === 'tags' ){
			$scope.tempMe.interests[index].tags.push('');
		} else {
			$scope.tempMe[key].push(angular.copy(vm.typeObj[key]));
		}
	};

	$scope.deleteField = function( key, index ) {
		console.log($scope.tempMe[key]);
		$scope.tempMe[key].splice(index, 1);
	};

	$scope.setEditable = function( ) {
		if ( $scope.editable === true ) { angular.copy($scope.me, $scope.tempMe); }
		$scope.editable = !$scope.editable;
	};

	$scope.updateUser = function() {
		userService.updateUser($scope.tempMe, function(data){
			console.log(data);
			$scope.me = angular.copy($scope.tempMe);
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

	$scope.selectedIcon = "";
	$scope.selectedIcons = [];
	$scope.icons = [
	{value: 'phone', label: '<i class="fa fa-phone"></i> Phone'},
	{value: 'age', label: '<i class="fa fa-birthday-cake"></i> Age'},
	{value: 'relationship', label: '<i class="fa fa-heart"></i> Relationship'},
	{value: 'family', label: '<i class="fa fa-sitemap"></i> Family'},
	{value: 'hometown', label: '<i class="fa fa-globe"></i> Hometown'},
	{value: 'currentCity', label: '<i class="fa fa-dot-circle-o"></i> Current City'},
	{value: 'employer', label: '<i class="fa fa-briefcase"></i> Employer'},
	{value: 'education', label: '<i class="fa fa-graduation-cap"></i> Education'},
	{value: 'projects', label: '<i class="fa fa-wrench"></i> Projects'},
	{value: 'interests', label: '<i class="fa fa-comments"></i> Interests'},
	{value: 'notes', label: '<i class="fa fa-pencil"></i> Notes'}
	];

	$scope.show = function(inputField) {
		if ( $scope.tempMe[inputField] ) {
			if ( typeof $scope.tempMe[inputField] === 'object' && $scope.tempMe[inputField].length === 0 ) {
				return false;
			}
			if ( $scope.selectedIcons.indexOf(inputField) === -1) { $scope.selectedIcons.push(inputField); }
			return true;
		} else {
			return $scope.selectedIcons.indexOf(inputField) > -1;
		}
	};


});
