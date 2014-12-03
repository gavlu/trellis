'use strict';

describe('Controller: EditplantCtrl', function () {

  // load the controller's module
  beforeEach(module('trellisApp'));

  var EditplantCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditplantCtrl = $controller('EditplantCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
