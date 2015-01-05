'use strict';

angular.module('trellisApp')
  .factory('days', function () {

    // Public API here
    return {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday'
    };
  });
