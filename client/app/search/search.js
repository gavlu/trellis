'use strict';

angular.module('trellisApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('trellis.searchView', {
      	url: '/search/:inputType/:input',
      	templateUrl: 'app/search/search.html',
      	controller: 'SearchCtrl'
      })
  });