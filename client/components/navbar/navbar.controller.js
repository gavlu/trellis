'use strict';

angular.module('trellisApp')
  .controller('NavbarCtrl', function ($scope, $location, $http, Auth, $state, userService) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/trellis'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };


    $scope.search = function(emailOrPhone) {
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

  });