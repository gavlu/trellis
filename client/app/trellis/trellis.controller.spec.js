'use strict';

describe('Controller: TrellisCtrl', function () {

  // load the controller's module
  beforeEach(module('trellisApp'));

  var TrellisCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TrellisCtrl = $controller('TrellisCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
