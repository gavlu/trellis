'use strict';

angular.module('trellisApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('trellis.myProfile', {
        url: '/myProfile',
        templateUrl: 'app/myProfile/myProfile.html',
        controller: 'MyprofileCtrl',
        authenticate: true
      });
  });