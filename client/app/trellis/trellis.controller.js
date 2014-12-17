'use strict';

angular.module('trellisApp')
  .controller('TrellisCtrl', function ($scope, Auth, $http, userService, $state, plantService) {
  	// console.log("TrellisCtrl, hit");
    var vm = this;
    vm.editPlant   = editPlant;
    vm.deletePlant = deletePlant;
    vm.plantFilter = plantFilter;
    vm.sortPlants  = sortPlants;

    /**** REMINDERS CARDS ****/
    var cb = function (plants) {
      $scope.plants = plants;
      console.log("this is plants", plants);
      Auth.getCurrentUser().plants = $scope.plants || [];
    };

    // Makes sure that it only gets the plants when
    // on the main user home page
    if ( $state.is('trellis.plants') ) {
  	   userService.getPlants(cb);
       console.log(Auth.getCurrentUser());
    }

    /**** Profile Preview ****/

    function editPlant(plantId){
      $state.go('trellis.editPlant', {
        id: plantId
      })
    };

    function deletePlant(plant){
      var index = $scope.plants.indexOf(plant);
      plantService.deletePlant(plant._id, function(){
        $scope.plants.splice(index,1);
      });
    };
    /**** END Profile Preview ****/

    function plantFilter(plantName) {
      var query = new RegExp($scope.name, "i");
      if(query.test(plantName)){
        return true;
      }
    };

    $scope.criteria = "name";
    function sortPlants(criteria){
      $scope.criteria = criteria;
    };

    $scope.dropdown = [
      {text: "Name", click: "trellis.sortPlants('name')"},
      {text: "Date: newest to oldest", click: "trellis.sortPlants(date)"},
      {text: "Date: oldest to newest", click: "trellis.sortPlants('date')"}
    ];


  });

/****   MINI REMINDER FEATURE
          maybe add later

$scope.makeNewReminder = false;
$scope.addReminder = function(action, plantId, newReminder) {
  if(action == 'adding'){
    $scope.makeNewReminder = true;
  }
  else if( action == 'saving') {
    $scope.makeNewReminder = false;
    userService.updateUser(newReminder, function(){

    })
  }
}

****/
