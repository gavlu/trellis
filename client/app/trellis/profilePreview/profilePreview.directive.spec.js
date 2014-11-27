'use strict';

describe('Directive: profilePreview', function () {

  // load the directive's module and view
  beforeEach(module('trellisApp'));
  beforeEach(module('app/trellis/profilePreview/profilePreview.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<profile-preview></profile-preview>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the profilePreview directive');
  }));
});