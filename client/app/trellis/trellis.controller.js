'use strict';

angular.module('trellisApp')
  .controller('TrellisCtrl', function ($scope, Auth) {
    $scope.test = [1,2,3,4,5,6,7];
    $scope.urgent = [1,2,3,4,5,6];
  });
