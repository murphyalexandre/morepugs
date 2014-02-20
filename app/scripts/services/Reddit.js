'use strict';

var morepugsServices = angular.module('morepugsApp.services', ['ngResource']);

morepugsServices.factory('Reddit', ['$resource',
    function ($resource) {
      return $resource('http://www.reddit.com/r/pugs/new.json', null,
        {
          'query': { method:'GET', isarray:false },
          'update': { method:'PUT' }
        });
    }
  ]);
