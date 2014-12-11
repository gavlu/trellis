'use strict';

angular.module('trellisApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('trellis', {
      	abstract: true,
        url: '/trellis',
        templateUrl: 'app/trellis/trellis.html',
        controller: 'TrellisTemplateCtrl'
      })
      .state('trellis.plants', {
      	url: '',
      	templateUrl: 'app/trellis/trellis.plants.html',
        controller: 'TrellisCtrl'
      })
  })