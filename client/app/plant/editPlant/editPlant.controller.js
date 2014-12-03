'use strict';

angular.module('trellisApp')
  .controller('EditplantCtrl', function ($scope, $stateParams, plantService) {
    console.log($stateParams.id);
    var plantId = $stateParams.id;
    plantService.getPlant(plantId, function(plant) {
    	$scope.editPlant = plant;
    })
    
    console.log($scope.editPlant);
  });
