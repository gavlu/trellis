angular.module("trellisApp")
	.factory('reminderService', function (userService, reminderHelper, $q){
		function GetReminders() {
			return $q(function(resolve, reject) {
				userService.getPlants(function(plants){
					var currentDate = new Date();
					var remindersArray = [];
					plants.forEach(function(plant, outsideindex){
					  plant.importantDates.forEach(function(date, insideindex){
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
					resolve(remindersArray);
				})
			});
		}
		return {
			getReminders: GetReminders,
			reminders: []
		}
	})
	.controller('TrellisTemplateCtrl', function ($rootScope, $scope, $state, reminderService){
		var vm = this;

		$scope.remindersArray = reminderService.reminders;

		vm.search = function(emailOrPhone) {
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
	})