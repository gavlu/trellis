'use strict';

describe('Directive: trellisReminder', function () {

  // load the directive's module and view
  beforeEach(module('trellisApp'));
  beforeEach(module('app/trellis/trellisReminder/trellisReminder.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<trellis-reminder></trellis-reminder>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the trellisReminder directive');
  }));
});