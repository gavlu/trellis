'use strict';

angular.module('trellisApp')
  .controller('EditplantCtrl', function ($scope, $stateParams, plantService, $state, contactFrequency) {
    var vm      = this,
        plantId = $stateParams.id;
    vm.addField    = addField;
    vm.deleteField = deleteField;
    vm.show        = show;
    vm.showBox     = showBox;
    vm.typeObj     = {
      "family": {
        name: "",
        relation: ""
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
    vm.update      = update;
    vm.uploadImage = uploadImage;

    $scope.master    = {};
    $scope.editPlant = {};
    plantService.getPlant(plantId, function(plant) {
    	$scope.editPlant = plant;
      console.log(plant);
    	$scope.master = angular.copy(plant);
    });

    $scope.edLevel = ['high school', 'undergradate', 'graduate', 'other'];

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
      {value: 'employer', label: '<i class="fa fa-briefcase"></i> Employer'},
      {value: 'education', label: '<i class="fa fa-graduation-cap"></i> Education'},
      {value: 'projects', label: '<i class="fa fa-wrench"></i> Projects'},
      {value: 'interests', label: '<i class="fa fa-comments"></i> Interests'},
      {value: 'importantDates', label: '<i class="fa fa-calendar"></i> Important Dates'},
      {value: 'notes', label: '<i class="fa fa-pencil"></i> Notes'},
      {value: 'reminders', label: '<i class="fa fa-star"></i> Reminders'}
    ];

    function show(inputField) {
      if ( $scope.editPlant[inputField] ) {
        if ( typeof $scope.editPlant[inputField] === 'object' && $scope.editPlant[inputField].length === 0 ) {
          return $scope.selectedIcons.indexOf(inputField) > -1 ? true : false;
        }
        if ( $scope.selectedIcons.indexOf(inputField) === -1) { $scope.selectedIcons.push(inputField); }
        return true;
      } else {
        return $scope.selectedIcons.indexOf(inputField) > -1;
      }
    };

    function addField( key, index ) {
      if( key === "tags" ){
      	$scope.editPlant.interests[index].tags.push("")
      }
      else if ( key === "reminders" ) {
      	$scope.editPlant.reminders.push("");
      }
      else {
      	$scope.editPlant[key].push(angular.copy(vm.typeObj[key]));
      }
    };

    function deleteField( key, index ) {
      if( key === "tags" ){
      	$scope.editPlant.interests[index].tags.splice($scope.editPlant.interests[index].tags.length-1, 1);
      }
      else {
      	$scope.editPlant[key].splice($scope.editPlant[key].length-1, 1);
      }
    };

    function update(input) {
    	if(input === 'save'){
        $scope.editPlant.contactFrequency = {
          recurrence_start: $scope.frequencyData.start,
          schedule: contactFrequency.buildSchedule($scope.selectedWeeks, $scope.selectedDays, $scope.timeOfDay),
          recurrence_end: $scope.frequencyData.end
        };
	    	plantService.updatePlant($scope.editPlant, function(updated) {
	    		$scope.saved = true;
          $state.go('trellis.plants');
	    	})
	    }
	    else if(input === 'reset'){
	    	$scope.saved = false;
	    	$scope.editPlant = angular.copy($scope.master);
	    }
    };

    //For education select boxes
    function showBox(school){
      if(school!==$scope.edLevel[0]&&school!==$scope.edLevel[1]&&school!==$scope.edLevel[2]&&school!==undefined){
        return true;
      } else {
        return false;
      }
    };


    /********* CONTACT FREQUENCY ********/

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
    function uploadImage() {
      filepicker.pick(
        {
          mimetypes: ['image/*'],
          container: 'modal',
          services:['COMPUTER'],
          maxSize: 10*1024*1024
        },
        function(Blob){
          $scope.editPlant.picture = Blob.url;
          $scope.$digest();
          console.log(JSON.stringify(Blob));
        },
        function(FPError){
          console.log(FPError.toString());
        }
      );
    };

  });
