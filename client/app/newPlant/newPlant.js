'use strict';

angular.module('trellisApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('trellis.newPlant', {
        url: '/newPlant',
        templateUrl: 'app/newPlant/newPlant.html',
        controller: 'NewplantCtrl',
        authenticate: true
      });
  });