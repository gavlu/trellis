'use strict';

angular.module('trellisApp')
  .controller('TrellisCtrl', function ($scope, Auth, $http, userService, $state, plantService, reminderHelper) {
  	// console.log("TrellisCtrl, hit");
    var vm = this;

    /**** REMINDERS CARDS ****/
    // remindersArray = []   //purely for sidebar function
    var cb = function (plants) {
      $scope.plants = plants;
      console.log("this is plants", plants);
      Auth.getCurrentUser().plants = $scope.plants || [];

      /**** Reminder sidebar functionality ****/
      // $scope.remindersArray = [];
      // var currentDate = new Date();
      // plants.forEach(function(plant){
      //   plant.importantDates.forEach(function(date){
      //     var eventDate = new Date(date.date);
      //     if(reminderHelper.isRecurring(eventDate, currentDate)){
      //       eventDate.setFullYear(currentDate.getFullYear());
      //     }
      //     if( reminderHelper.isApproaching(eventDate, currentDate) ){

      //       $scope.remindersArray.push({
      //         plantName: plant.name,
      //         plantEvent: date.eventName,
      //         eventDate: eventDate,
      //         countdown: (eventDate-currentDate)/1000
      //       });
      //     }
      //   })
      // })
    };

    // Makes sure that it only gets the plants when
    // on the main user home page
    if ( $state.is('trellis.plants') ) {
  	   userService.getPlants(cb);
       console.log(Auth.getCurrentUser());
    }

    /**** Profile Preview ****/

    vm.editPlant = function(plantId){
      $state.go('trellis.editPlant', {
        id: plantId
      })
    };

    vm.deletePlant = function(plant){
      var index = $scope.plants.indexOf(plant);
      plantService.deletePlant(plant._id, function(){
        $scope.plants.splice(index,1);
      });
    };
    /**** END Profile Preview ****/

    vm.plantFilter = function(plantName) {
      var query = new RegExp($scope.name, "i");
      if(query.test(plantName)){
        return true;
      }
    };

    $scope.criteria = "name";
    vm.sortPlants = function(criteria){
      $scope.criteria = criteria;
    };

    $scope.dropdown = [
      {text: "Name", click: "trellis.sortPlants('name')"},
      {text: "Date: newest to oldest", click: "trellis.sortPlants(date)"},
      {text: "Date: oldest to newest", click: "trellis.sortPlants('date')"}
    ];


  })
  .directive('ngEnter', function(){
    return function(scope, element, attrs){
      element.bind('keydown keypress', function(event){
        if (event.which === 13){
          scope.$apply(function(){
            scope.$eval(attrs.ngEnter, {'event': event});
            });
          event.preventDefault();
        }
      });
    };
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
