'use strict';

angular.module('trellisApp')
  .controller('NewplantCtrl', function ($scope, $state, Auth, plantService, userService, contactFrequency) {

    var vm = this;
    $scope.newPlant = {
    	name: "",
      picture: "/assets/images/empty_profile.png",
    	email: "",
    	phone: [""],
    	age: "",
    	// contactFrequency: {
     //    recurrence_start: "",
     //    recurrence_end: "",
     //    frequency: "",
     //    timesPer: "",
     //    days_of_week: []
     //  },
    	relationship: {
    		status: "",
    		partner: ""
    	},
    	hometown: "",
    	currentCity: "",
    	family: [{
  			name: "",
  			relation: ""
  		}],
      employment: {
        employer: "",
        position: ""
      },
  		education: [{
  			level: "other",
  			name: ""
  		}],
  		importantDates: [{
  			eventName: "",
  			date: "",
  			description: ""
  		}],
  		interests: [{
  			type: "",
  			tags: [""]
  		}],
  		projects: [{
  			type: "",
  			name: "",
  			description: "",
  			link: ""
  		}],
  		otherFields: [{
  			title: "",
  			body: ""
  		}],
  		reminders: [],
  		ownerId: Auth.getCurrentUser()._id
    };

    $scope.edLevel = ['high school', 'undergradate', 'graduate', 'other'];

    $scope.newMaster = angular.copy($scope.newPlant);

    $scope.selectedIcon = "";
  	$scope.selectedIcons = [];
  	$scope.icons = [
	    {value: 'email', label: '<i class="fa fa-send"></i> Email'},
	    {value: 'phone', label: '<i class="fa fa-phone"></i> Phone'},
	    {value: 'age', label: '<i class="fa fa-birthday-cake"></i> Age'},
	    {value: 'contactFrequency', label: '<i class="fa fa-clock-o"></i> Contact Frequency'},
	    {value: 'relationship', label: '<i class="fa fa-heart"></i> Relationship'},
	    {value: 'family', label: '<i class="fa fa-sitemap"></i> Family'},
	    {value: 'hometown', label: '<i class="fa fa-globe"></i> Hometown'},
	    {value: 'currentCity', label: '<i class="fa fa-dot-circle-o"></i> Current City'},
	    {value: 'employment', label: '<i class="fa fa-briefcase"></i> Employment'},
	    {value: 'education', label: '<i class="fa fa-graduation-cap"></i> Education'},
	    {value: 'projects', label: '<i class="fa fa-wrench"></i> Projects'},
	    {value: 'interests', label: '<i class="fa fa-comments"></i> Interests'},
	    {value: 'importantDates', label: '<i class="fa fa-calendar"></i> Important Dates'},
	    {value: 'notes', label: '<i class="fa fa-pencil"></i> Notes'},
	    {value: 'reminders', label: '<i class="fa fa-star"></i> Reminders'}
  	];

  	vm.show = function(inputField) {
  		return $scope.selectedIcons.indexOf(inputField) > -1;
  	};

  	vm.typeObj = {
      "contactFrequency": {
        recurrence_start: "",
        recurrence_end: "",
        type: "",
        day_of_week: "",
        month: "",
        day_of_month: ""
      },
  		"family": {
  			name: "",
  			relation: ""
  		},
      "employment": {
        employer: "",
        position: ""
      },
  		"education": {
  			level: "",
  			name: ""
  		},
  		"importantDates": {
  			eventName: "",
  			date: "",
  			description: ""
  		},
  		"interests": {
  			type: "",
  			tags: []
  		},
  		"projects": {
  			type: "",
  			name: "",
  			description: "",
  			link: ""
  		},
  		"otherFields": {
  			title: "",
  			body: ""
  		}
  	};

  	vm.addField = function( key, index ) {
	    if( key === "tags" ){
	    	$scope.newPlant.interests[index].tags.push("")
	    }
	    else if ( key === "reminders" ) {
	    	$scope.newPlant.reminders.push("");
	    }
	    else {
	    	$scope.newPlant[key].push(angular.copy(vm.typeObj[key]));
	    }
  	};

  	vm.deleteField = function( key, index ) {
  	  if( key === "tags" ){
  	  	$scope.newPlant.interests[index].tags.splice($scope.newPlant.interests[index].tags.length-1, 1);
  	  }
  	  else {
  	  	$scope.newPlant[key].splice($scope.newPlant[key].length-1, 1);
  	  }
  	};

  	vm.create = function (input) {
    	if(input === 'save'){
        console.log("Function is functioning")
        // Add the contact frequency to newPlant
        $scope.newPlant.contactFrequency = {
          recurrence_start: $scope.frequencyData.start,
          schedule: contactFrequency.buildSchedule($scope.selectedWeeks, $scope.selectedDays, $scope.timeOfDay),
          recurrence_end: $scope.frequencyData.end
        };
        console.log("contact frequency", $scope.newPlant.contactFrequency);

	    	plantService.createPlant($scope.newPlant, function(created) {
          console.log($scope.newPlant);
          console.log(Auth.getCurrentUser());
	    		userService.addToPlants(created, function(){
	    			$state.go('trellis.plants');
	    		});
	    	})
	    }
	    else if(input === 'cancel'){
	    	$scope.saved = false;
	    	$scope.newPlant = angular.copy($scope.master);
	    	$state.go('trellis.plants');
	    }
    }

    //For education select boxes
    vm.showBox = function(school){
      if(school!==$scope.edLevel[0]&&school!==$scope.edLevel[1]&&school!==$scope.edLevel[2]&&school!==undefined){
        return true;
      } else {
        return false;
      }
    };

    // CONTACT FREQUENCY
    // Create frequency data
    $scope.frequencyData = {}
    $scope.timeOfDay = new Date();
    $scope.timeOfDay.setMinutes(Math.ceil(($scope.timeOfDay.getMinutes())/15)*15);

    later.date.localTime();

    vm.frequencyShow = function(input){
      return input == $scope.selectedFrequency;
    }

    // For contact frequency btns
    $scope.selectedFrequency = "";
    $scope.frequency = contactFrequency.frequency

    $scope.selectedDays = [];
    $scope.days = contactFrequency.days

    $scope.selectedWeeks = [];
    $scope.weeks = contactFrequency.weeks

        // for testing
        vm.buildSchedule = function() {
          $scope.sched = contactFrequency.buildSchedule($scope.selectedWeeks, $scope.selectedDays, $scope.timeOfDay)
          $scope.occurences = later.schedule($scope.sched).next(100, $scope.frequencyData.start, $scope.frequencyData.end)
          console.log($scope.occurences);
        }


    // FILEPICKER IMAGE UPLOAD CODE

    filepicker.setKey("AoRIJarp2S3uQNeH3nBQ2z");
    vm.uploadImage = function() {
      filepicker.pick(
        {
          mimetypes: ['image/*'],
          container: 'modal',
          services:['COMPUTER'],
          maxSize: 10*1024*1024
        },
        function(Blob){
          $scope.newPlant.picture = Blob.url;
          $scope.$digest();
          console.log(JSON.stringify(Blob));
        },
        function(FPError){
          console.log(FPError.toString());
        }
      );
    };

  });