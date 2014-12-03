'use strict';

angular.module('trellisApp')
  .controller('TrellisCtrl', function ($scope, Auth, $http, userService, $state, plantService) {
  	console.log("TrellisCtrl, hit");

    var cb = function (plants) {
      $scope.plants = plants;
      console.log($scope.plants);
      Auth.getCurrentUser().plants = $scope.plants || [];
    };

    // Makes sure that it only gets the plants when
    // on the main user home page
    if ( $state.is('trellis.plants') ) {
  	   userService.getPlants(cb);
       console.log(Auth.getCurrentUser());
    }

    $scope.editPlant = function(plantId){
      $state.go('trellis.editPlant', {
        id: plantId
      })
    }

    $scope.deletePlant = function(plantId, index){
      plantService.deletePlant(plantId, function(){
        $scope.plants.splice(index,1);
      });
    };

    $scope.plantFilter = function(plantName) {
      var query = new RegExp($scope.name, "i");
      if(query.test(plantName)){
        return true;
      }
    };

    $scope.criteria = "name";
    $scope.sortPlants = function(criteria){
      $scope.criteria = criteria;
    };


    $scope.dropdown = [
      {text: "Name", click: "sortPlants('name')"},
      {text: "Date: newest to oldest", click: "sortPlants(date)"},
      {text: "Date: oldest to newest", click: "sortPlants('date')"}
    ];

    $scope.test = [1,2,3,4,5,6,7];
    $scope.urgent = [1,2,3,4,5,6];
  });
