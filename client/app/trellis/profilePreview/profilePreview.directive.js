'use strict';

angular.module('trellisApp')
  .directive('profilePreview', function () {
    return {
      templateUrl: 'app/trellis/profilePreview/profilePreview.html',
      restrict: 'E',
      // scope: {},
      link: function (scope, element, attrs) {
      }
    };
  });