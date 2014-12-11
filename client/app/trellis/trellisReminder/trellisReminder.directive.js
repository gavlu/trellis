'use strict';

angular.module('trellisApp')
  .directive('trellisReminder', function () {
    return {
      templateUrl: 'app/trellis/trellisReminder/trellisReminder.html',
      restrict: 'E',
      // scope: {
      // 	reminder: '=info'
      // }
    };
  });