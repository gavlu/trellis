'use strict';

angular.module('trellisApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('trellis.editPlant', {
        url: '/editPlant/:id',
        templateUrl: 'app/plant/editPlant/editPlant.html',
        controller: 'EditplantCtrl as epc'
      });
  });