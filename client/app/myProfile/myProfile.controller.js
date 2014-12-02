'use strict';

angular.module('trellisApp')
  .controller('MyprofileCtrl', function ($scope, Auth, userService) {
    $scope.me = Auth.getCurrentUser();
    delete $scope.me['__v'];
    delete $scope.me._id;
    delete $scope.me['$promise'];
    delete $scope.me['$resolved'];
    delete $scope.me.email;
    delete $scope.me.provider;
    delete $scope.me.facebook;
    delete $scope.me.role;
    delete $scope.me.plants;
    // $scope.me.interests = [{'name': 'gaming'}, {'name':'photography'}];
    // console.log($scope.me);

    $scope.checkType = function( val ) {
      return typeof val === 'string' ? true : false;
    };

    $scope.addField = function( key, index ) {
      console.log(key);
      console.log($scope.me);
      if ( $scope.me[key].length > 0 && $scope.me[key][index] !== '' ) {
        console.log('first');
        $scope.me[key].push({'name': ''});
      } else if ( $scope.me[key].length === 0 ){
        console.log('second');
        $scope.me[key].push({'name': ''});
      }
    };

    $scope.deleteField = function( key, index ) {
      console.log($scope.me[key]);
      $scope.me[key].splice(index, 1);
    };

    $scope.updateUser = function() {
      userService.updateUser($scope.me, function(data){
        console.log(data);
      });
    };
  });
