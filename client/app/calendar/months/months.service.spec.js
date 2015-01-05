'use strict';

describe('Service: months', function () {

  // load the service's module
  beforeEach(module('trellisApp'));

  // instantiate service
  var months;
  beforeEach(inject(function (_months_) {
    months = _months_;
  }));

  it('should do something', function () {
    expect(!!months).toBe(true);
  });

});
