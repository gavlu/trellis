'use strict';

describe('Controller: NewplantCtrl', function () {

  // load the controller's module
  beforeEach(module('trellisApp'));

  var NewplantCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewplantCtrl = $controller('NewplantCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
