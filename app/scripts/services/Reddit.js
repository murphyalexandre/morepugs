'use strict';

var morepugsServices = angular.module('morepugsApp.reddit', ['ngResource']);

morepugsServices.factory('Reddit', ['$resource',
    function ($resource) {
      var source = $resource('http://www.reddit.com/r/pugs/new.json', null,
        {
          'query': { method:'GET', isarray:false },
          'update': { method:'PUT' }
        });
        
      var ytVideoRegex = /http\:\/\/www\.youtube\.com\/watch\?v=(\w{11})/;
        
      function getYTThumbnail(url) {
        var videoId = url.match(ytVideoRegex);
        if(videoId)
          return 'http://img.youtube.com/vi/'+(videoId.pop())+'/0.jpg';
        return undefined;
      }
        
      // Here we wrap the call so we can standarize how the input is sent to the controller
      // for all the services.
      var Reddit = {
        // calls $resource.query() to retrieve the remote data.
        query: function getData(callback) {
          source.query().$promise.then(function(result) {
            var returned = [];
            angular.forEach(result.data.children, function(item) {
              var thumbnail = getYTThumbnail(item.data.url);
              if(!thumbnail) thumbnail = item.data.url;
              
              returned.push({thumbnail:thumbnail, url:item.data.url, category:'reddit'});
            });
            
            callback({data:returned, next:result.data.after, previous:result.data.before});
          });
        },
        
        next: function getData(callback, next) {
          source.query({after:next}).$promise.then(function(result) {
            var returned = [];
            angular.forEach(result.data.children, function(item) {
              var thumbnail = getYTThumbnail(item.data.url);
              if(!thumbnail) thumbnail = item.data.url;
              
              returned.push({thumbnail:thumbnail, url:item.data.url, category:'reddit'});
            });
            
            callback({data:returned, next:result.data.after, previous:result.data.before});
          });
        }
      };

      return Reddit;
    }
  ]);
