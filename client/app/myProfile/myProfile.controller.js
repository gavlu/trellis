'use strict';

angular.module('trellisApp')
  .controller('MyprofileCtrl', function ($scope, Auth, userService) {
    $scope.me = Auth.getCurrentUser();
    delete $scope.me['__v'];
    delete $scope.me._id;
    delete $scope.me['$promise'];
    delete $scope.me['$resolved'];
    delete $scope.me.provider;
    delete $scope.me.facebook;
    delete $scope.me.plants;
    delete $scope.me.role;
    $scope.me.interests = [{'type': 'gaming'}, {'type':'photography'}];
    console.log($scope.me);

    $scope.edLevel = ['high school', 'undergradate', 'graduate'];
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
        tags: ""
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

    $scope.checkType = function( val ) {
      return typeof val === 'string' ? true : false;
    };

    $scope.addField = function( key, index ) {
      console.log(key);
      console.log($scope.me);
      if ( $scope.me[key].length > 0 && $scope.me[key][index] !== '' ) {
        console.log('first');
        $scope.me[key].push($scope.typeObj[key]);
      } else if ( $scope.me[key].length === 0 ){
        console.log('second');
        $scope.me[key].push($scope.typeObj[key]);
      }
    };

    $scope.deleteField = function( key, index ) {
      console.log($scope.me[key]);
      $scope.me[key].splice(index, 1);
    };

    $scope.editUser = function( ) {
      $scope.editable = !$scope.editable;
    };

    $scope.updateUser = function() {
      userService.updateUser($scope.me, function(data){
        console.log(data);
      });
    };
  });
