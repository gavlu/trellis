'use strict';

angular.module('trellisApp')
  .controller('TrellisCtrl', function ($scope, Auth, $http, userService, $state, plantService) {
  	console.log("TrellisCtrl, hit");


    // Callback for getPlants function below
    var cb = function (plants) {
      $scope.plants = plants;
      console.log($scope.plants);
      Auth.getCurrentUser().plants = $scope.plants || [];
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
  		// console.log(email.test(emailOrPhone) + "!!")
  		if(email.test(emailOrPhone)) {
  			input.email = emailOrPhone;

  			// console.log(input);
  			$state.go('trellis.searchView', {
  				"inputType": "email",
  				"input": input.email
  			});
  		} else {
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

    $scope.deletePlant = function(plantId, index){
      plantService.deletePlant(plantId, function(){
        $scope.plants.splice(index,1);
      });
    };

    $scope.plantFilter = function(plantName) {
      var query = new RegExp($scope.name, "i");
      if(query.test(plantName)){
        return true;
      }
    };

    $scope.test = [1,2,3,4,5,6,7];
    $scope.urgent = [1,2,3,4,5,6];
  });
