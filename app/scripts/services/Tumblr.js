'use strict';

var morepugsServices = angular.module('morepugsApp.tumblr', ['ngResource']);

morepugsServices.factory('Tumblr', ['$resource',
    function ($resource) {
      var apiKey = 'fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4';
      var source = $resource('http://api.tumblr.com/v2/tagged?tag=pug&api_key='+apiKey, null,
        {
          'query': { method:'JSONP', params: {callback: 'JSON_CALLBACK'}, isarray:false },
          'update': { method:'PUT' }
        });
        
      var Tumblr = {
        query: function getData(callback) {
          source.query().$promise.then(function(result) {
            var returned = [];
            angular.forEach(result.response, function(item) {
              // Find right size in alt_sizes
              if(item.photos) {
                var thumbnail = "";
                angular.forEach(item.photos[0].alt_sizes, function(altSize) {
                  if(Math.abs(altSize.width - 200) < 100 && Math.abs(altSize.height - 200) < 100) {
                    thumbnail = altSize.url;
                  }
                });
                
                returned.push({thumbnail:thumbnail, url:item.photos[0].original_size.url, category:'tumblr'});
              }
            });
            
            callback({data:returned, next:result.response[result.response.length-1].timestamp, previous:null});
          });
        },
        
        next: function getData(callback, next) {
          source.query({before:next}).$promise.then(function(result) {
            var returned = [];
            angular.forEach(result.response, function(item) {
              returned.push({thumbnail:item.photos[0].alt_sizes[3].url, url:item.photos[0].alt_sizes[3].url, category:'tumblr'});
            });
            
            callback({data:returned, next:result.response[result.response.length-1].timestamp, previous:null});
          });
        },
      };
      
      return Tumblr;
    }
  ]);
