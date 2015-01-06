'use strict';

describe('Service: contactFrequency', function () {

  // load the service's module
  beforeEach(module('trellisApp'));

  // instantiate service
  var contactFrequency;
  beforeEach(inject(function (_contactFrequency_) {
    contactFrequency = _contactFrequency_;
  }));

  it('should do something', function () {
    expect(!!contactFrequency).toBe(true);
  });

});
