'use strict';
// controller is too long and could benefit from putting some thing in factories
angular.module('trellisApp')
.controller('MyprofileCtrl', function ($scope, Auth, userService) {
	/* jshint validthis: true */
	var vm             = this;
	vm.addField    = addField;
	vm.deleteField = deleteField;
	vm.setEditable = setEditable;
	vm.show        = show;
	vm.showBox     = showBox;
	vm.updateUser  = updateUser;
	vm.uploadImage = uploadImage;
	vm.typeObj 		 = {
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

	$scope.me = angular.copy( Auth.getCurrentUser() );
  // why
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

	function show(inputField) {
		if ( $scope.tempMe[inputField] ) {
			if ( typeof $scope.tempMe[inputField] === 'object' && $scope.tempMe[inputField].length === 0 ) {
				return $scope.selectedIcons.indexOf(inputField) > -1 ? true : false;
			}
			if ( $scope.selectedIcons.indexOf(inputField) === -1) { $scope.selectedIcons.push(inputField); }
			return true;
		} else {
			return $scope.selectedIcons.indexOf(inputField) > -1;
		}
	}

	function addField( key, index ) {
		if( key === 'tags' ){
			$scope.tempMe.interests[index].tags.push('');
		} else {
			$scope.tempMe[key].push(angular.copy(vm.typeObj[key]));
		}
	}

	function deleteField( key, index ) {
		if( key === 'tags' ){
			$scope.tempMe.interests[index].tags.splice($scope.tempMe.interests[index].tags.length-1, 1);
		} else {
			$scope.tempMe[key].splice($scope.tempMe[key].length-1, 1);
		}
	}

	function setEditable() {
		if ( $scope.editable === true ) { angular.copy($scope.me, $scope.tempMe); }
		$scope.editable = !$scope.editable;
	}

	function updateUser() {
		_.merge( Auth.getCurrentUser(), $scope.tempMe, function( a, b ) { return b; } );
		userService.updateUser($scope.tempMe, function(data){
			console.log(data);
			$scope.me = angular.copy($scope.tempMe);
			$scope.editable = !$scope.editable;
		});
	}

	//For education select boxes
	function showBox(school){
		if(school!==$scope.edLevel[0]&&school!==$scope.edLevel[1]&&school!==$scope.edLevel[2]&&school!==undefined){
			return true;
		} else {
			return false;
		}
	}

	// FILEPICKER IMAGE UPLOAD CODE

	filepicker.setKey("AoRIJarp2S3uQNeH3nBQ2z");
	function uploadImage() {
		filepicker.pick(
			{
				mimetypes: ['image/*'],
				container: 'modal',
				services:['COMPUTER'],
				maxSize: 10*1024*1024
			},
			function(Blob){
				$scope.tempMe.picture = Blob.url;
				$scope.$digest();
				console.log(JSON.stringify(Blob));
			},
			function(FPError){
				console.log(FPError.toString());
			}
		);
	}

});
