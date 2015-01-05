'use strict';

describe('Service: monthLen', function () {

  // load the service's module
  beforeEach(module('trellisApp'));

  // instantiate service
  var monthLen;
  beforeEach(inject(function (_monthLen_) {
    monthLen = _monthLen_;
  }));

  it('should do something', function () {
    expect(!!monthLen).toBe(true);
  });

});
