'use strict';

angular.module('trellisApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('trellis', {
        url: '/trellis',
        templateUrl: 'app/trellis/trellis.html',
        controller: 'TrellisCtrl'
      });
  });