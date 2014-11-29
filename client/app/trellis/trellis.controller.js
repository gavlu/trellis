'use strict';

angular.module('trellisApp')
  .controller('TrellisCtrl', function ($scope, Auth, $http, userService) {
  	console.log("hit");

  	userService.getPlants()
  	.success(function(plants, status){
  		console.log(plants);
  	})
  	.error(function(err, status) {
  		console.log("You have no plants!");
  	});
    $scope.test = [1,2,3,4,5,6,7];
    $scope.urgent = [1,2,3,4,5,6];
  });
