'use strict';

angular.module('trellisApp')
  .factory('Reminder', function () {

    // Public API here
    return function(name, date, notes){
      this.name = name;
      this.date = date;
      this.notes = notes;
    };
  });
