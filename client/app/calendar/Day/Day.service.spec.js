'use strict';

describe('Service: Day', function () {

  // load the service's module
  beforeEach(module('trellisApp'));

  // instantiate service
  var Day;
  beforeEach(inject(function (_Day_) {
    Day = _Day_;
  }));

  it('should do something', function () {
    expect(!!Day).toBe(true);
  });

});
