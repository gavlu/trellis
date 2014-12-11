'use strict';

angular.module('trellisApp')
  .factory('reminderHelper', function () {
    return {
      isRecurring: function (inputDate, currentDate) {
        // console.log("Is Recurring, true")
        // console.log(inputDate);
        // console.log(currentDate);
        // console.log(((inputDate-currentDate)/(1000*3600*24)) < -1)
        // console.log("----------------")
        if( ((inputDate-currentDate)/(1000*3600*24)) < -1 ) {
          // console.log("Date should recur");
          return true;
        }
        return false;
      },
      isApproaching: function (inputDate, currentDate) {
        // console.log("Is Approaching, true")
        // console.log(inputDate);
        // console.log(currentDate);
        // console.log("----------------")
        if(((inputDate - currentDate)/(1000*3600*24)) < 3 &&
          ((inputDate - currentDate)/(1000*3600*24)) > -1){
          return true;
        }
        return false;
      }
    }
  })
  .controller('TrellisCtrl', function ($scope, remindersArray, Auth, $http, userService, $state, plantService, reminderHelper) {
  	// console.log("TrellisCtrl, hit");
    var vm = this;
    
    console.log("THIS IS TWICE?")

    /**** REMINDERS CARDS ****/
    $scope.remindersArray = remindersArray;   //purely for sidebar function
    var cb = function (plants) {
      $scope.plants = plants;
      // console.log($scope.plants);
      Auth.getCurrentUser().plants = $scope.plants || [];

      /**** Reminder sidebar functionality ****/
      var currentDate = new Date();
      plants.forEach(function(plant){
        plant.importantDates.forEach(function(date){
          var eventDate = new Date(date.date);
          if(reminderHelper.isRecurring(eventDate, currentDate)){
            eventDate.setFullYear(currentDate.getFullYear());
          }
          if( reminderHelper.isApproaching(eventDate, currentDate) ){
            
            remindersArray.push({
              plantName: plant.name,
              plantEvent: date.eventName,
              eventDate: eventDate,
              countdown: (eventDate-currentDate)/1000
            });
          }
        })
      })
    };

    // Makes sure that it only gets the plants when
    // on the main user home page
    if ( $state.is('trellis.plants') ) {
  	   userService.getPlants(cb);
       console.log(Auth.getCurrentUser());
    }

    $scope.search = function(emailOrPhone) {
      $scope.emailOrPhone = "";
      var email = new RegExp("@"),
          input = {};
      if(email.test(emailOrPhone)) {
        input.email = emailOrPhone;
        $state.go('trellis.searchView', {
          "inputType": "email",
          "input": input.email
        });
      } 
      else {
        var temp = emailOrPhone.replace(/[^0-9]/g, '');
        if ( temp.length === 10 ) {
          temp = temp.substr(0, 3)+'_'+temp.substr(3, 3)+'_'+temp.substr(6, 4);
        } else if ( temp.length === 7 ) {
          temp = temp.substr(0,3)+'_'+temp.substr(3,4);
        }
        input.phone = temp;

        
        $state.go('trellis.searchView', {
          "inputType": "phone",
          "input": input.phone
        });
      }
    };


    /**** Profile Preview ****/

    $scope.editPlant = function(plantId){
      $state.go('trellis.editPlant', {
        id: plantId
      })
    }

    $scope.deletePlant = function(plant){
      var index = $scope.plants.indexOf(plant);
      plantService.deletePlant(plant._id, function(){
        // console.log($scope.plants)
        $scope.plants.splice(index,1);
      });
    };
    /**** END Profile Preview ****/




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
  })



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
