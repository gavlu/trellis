'use strict';

angular.module('trellisApp')
  .factory('reminderService', function ( userService, $q ) {

    function isRecurring( inputDate, currentDate ) {
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
    }

    function isApproaching( inputDate, currentDate ) {
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

    function GetReminders() {
      return $q(function(resolve, reject) {
        userService.getPlants(function(plants){
          var currentDate = new Date();
          var remindersArray = [];
          plants.forEach(function(plant, outsideindex){
            plant.importantDates.forEach(function(date, insideindex){
              var eventDate = new Date(date.date);
              if(isRecurring(eventDate, currentDate)){
                eventDate.setFullYear(currentDate.getFullYear());
              }
              if( isApproaching(eventDate, currentDate) ){
                remindersArray.push({
                  plantName: plant.name,
                  plantEvent: date.eventName,
                  eventDate: eventDate,
                  countdown: (eventDate-currentDate)/1000
                });
              }
            });
          });
          resolve(remindersArray);
        });
      });
    }

    return {
      getReminders: GetReminders,
      reminders: []
    };
  });
