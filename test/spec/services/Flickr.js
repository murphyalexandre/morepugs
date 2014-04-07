'use strict';

describe('Service: Flickr', function () {

  // load the service's module
  beforeEach(module('morepugsApp'));

  // instantiate service
  var Flickr;
  beforeEach(inject(function (_Flickr_) {
    Flickr = _Flickr_;
  }));

  it('should do something', function () {
    expect(!!Flickr).toBe(true);
  });

});
