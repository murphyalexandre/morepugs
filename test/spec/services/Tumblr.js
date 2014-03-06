'use strict';

describe('Service: Tumblr', function () {

  // load the service's module
  beforeEach(module('morepugsApp'));

  // instantiate service
  var Tumblr;
  beforeEach(inject(function (_Tumblr_) {
    Tumblr = _Tumblr_;
  }));

  it('should do something', function () {
    expect(!!Tumblr).toBe(true);
  });

});
