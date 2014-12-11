'use strict';

angular.module('trellisApp')
  .controller('EditplantCtrl', function ($scope, $stateParams, plantService, $state) {
    var vm      = this,
        plantId = $stateParams.id;

    $scope.master    = {};
    $scope.editPlant = {};
    plantService.getPlant(plantId, function(plant) {
    	$scope.editPlant = plant;
    	$scope.master = angular.copy(plant);
    });

    $scope.selectedIcon = "";
    $scope.selectedIcons = [];
    $scope.icons = [
      {value: 'email', label: '<i class="fa fa-send"></i> Email'},
      {value: 'phone', label: '<i class="fa fa-phone"></i> Phone'},
      {value: 'age', label: '<i class="fa fa-birthday-cake"></i> Age'},
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

    vm.show = function(inputField) {
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

    vm.typeObj = {
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

    vm.addField = function( key, index ) {
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

    vm.deleteField = function( key, index ) {
      if( key === "tags" ){
      	$scope.editPlant.interests[index].tags.splice($scope.editPlant.interests[index].tags.length-1, 1);
      }
      else {
      	$scope.editPlant[key].splice($scope.editPlant[key].length-1, 1);
      }
    };

    vm.update = function (input) {
    	if(input === 'save'){
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
