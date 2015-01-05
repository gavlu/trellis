'use strict';

angular.module('trellisApp')
  .factory('Day', function () {

    // Public API here
    return function(dateNum){
      this.date = dateNum;
      this.events = [];
    };
  });
