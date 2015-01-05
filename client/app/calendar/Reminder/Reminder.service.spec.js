'use strict';

describe('Service: Reminder', function () {

  // load the service's module
  beforeEach(module('trellisApp'));

  // instantiate service
  var Reminder;
  beforeEach(inject(function (_Reminder_) {
    Reminder = _Reminder_;
  }));

  it('should do something', function () {
    expect(!!Reminder).toBe(true);
  });

});
