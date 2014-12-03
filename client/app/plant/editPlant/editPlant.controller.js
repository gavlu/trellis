'use strict';

angular.module('trellisApp')
  .controller('EditplantCtrl', function ($scope, $stateParams, plantService) {
    var plantId = $stateParams.id;
    $scope.editPlant;
    plantService.getPlant(plantId, function(plant) {
    	console.log("RETURNED plant");
    	console.log(plant);
    	$scope.editPlant = plant;	
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
  });
