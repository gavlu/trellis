'use strict';

angular.module('trellisApp')
  .factory('searchHelper', function () {
    return {
      makeSearchObj: function (stateParams) {
        var searchObj;
        if(stateParams.inputType == "phone"){
          searchObj = {
            "phone": stateParams.input
          }
          return searchObj;
        }
        else {
          searchObj = {
            "email": stateParams.input
          }
          return searchObj;
        }
      }
    };
  });
