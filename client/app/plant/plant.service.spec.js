'use strict';

describe('Service: plant', function () {

  // load the service's module
  beforeEach(module('trellisApp'));

  // instantiate service
  var plant;
  beforeEach(inject(function (_plant_) {
    plant = _plant_;
  }));

  it('should do something', function () {
    expect(!!plant).toBe(true);
  });

});
