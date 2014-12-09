'use strict';

angular.module('trellisApp')
  .controller('EditplantCtrl', function ($scope, $stateParams, plantService, $state) {
    $scope.master = {};
    var plantId = $stateParams.id;
    $scope.editPlant;
    plantService.getPlant(plantId, function(plant) {
    	console.log("RETURNED plant");
    	console.log(plant);
    	$scope.editPlant = plant;
    	$scope.master = angular.copy(plant);
    })

    $scope.typeObj = {
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

    $scope.addField = function( key, index ) {
        if( key == "tags" ){
        	$scope.editPlant.interests[index].tags.push("")
        }
        else if ( key == "reminders" ) {
        	$scope.editPlant.reminders.push("");
        }
        else {
        	$scope.editPlant[key].push(angular.copy($scope.typeObj[key]));
        }
    };

    $scope.deleteField = function( key, index ) {
      console.log($scope.editPlant[key]);
      if( key == "tags" ){
      	$scope.editPlant.interests[index].tags.splice($scope.editPlant.interests[index].tags.length-1, 1);
      }
      else {
      	$scope.editPlant[key].splice($scope.editPlant[key].length-1, 1);
      }
    };

    $scope.update = function (input) {
    	console.log($scope.editPlant);
    	if(input === 'save'){
	    	plantService.updatePlant($scope.editPlant, function(updated) {
	    		console.log("Here's your updated plant: ");
	    		console.log(updated);
	    		$scope.saved = true;
	    	})
	    }
	    else if(input === 'reset'){
	    	console.log("save @ reset, hit");
	    	$scope.saved = false;
	    	$scope.editPlant = angular.copy($scope.master);
	    }
    }

    /**** Icon functionality ****/
    $scope.saved = false;
    $scope.show = function(){
    	if($scope.saved && $scope.form.$pristine){
    		return true;
    	}
    }
  });
