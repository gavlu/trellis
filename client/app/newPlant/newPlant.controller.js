'use strict';

angular.module('trellisApp')
  .controller('NewplantCtrl', function ($scope) {
    $scope.selectedIcon = "Gear";
	$scope.selectedIcons = ['Gear','Globe','Heart','Camera'];
	$scope.icons = [
	    {value: 'Gear', label: '<i class="fa fa-gear"></i> Gear'},
	    {value: 'Globe', label: '<i class="fa fa-globe"></i> Globe'},
	    {value: 'Heart', label: '<i class="fa fa-heart"></i> Heart'},
	    {value: 'Camera', label: '<i class="fa fa-camera"></i> Camera'}
	];
  });