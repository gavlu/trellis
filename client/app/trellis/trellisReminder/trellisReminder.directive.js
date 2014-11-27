'use strict';

angular.module('trellisApp')
  .directive('trellisReminder', function () {
    return {
      templateUrl: 'app/trellis/trellisReminder/trellisReminder.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
      }
    };
  });