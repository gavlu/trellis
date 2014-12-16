'use strict';

describe('Service: reminderService', function () {

  // load the service's module
  beforeEach(module('trellisApp'));

  // instantiate service
  var reminderService;
  beforeEach(inject(function (_reminderService_) {
    reminderService = _reminderService_;
  }));

  it('should do something', function () {
    expect(!!reminderService).toBe(true);
  });

});
