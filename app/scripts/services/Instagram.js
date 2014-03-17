'use strict';

var morepugsServices = angular.module('morepugsApp.instagram', ['ngResource']);

morepugsServices.factory('Instagram', ['$resource',
    function ($resource) {
      var accessToken = '655254013.f59def8.8ccf80640a0d4c89ac3cc2c652a17cf8';
      
      var source = $resource('https://api.instagram.com/v1/tags/pug/media/recent?access_token='+accessToken, null,
        {
          'query': { method:'JSONP', params: {callback: 'JSON_CALLBACK'}, isarray:false },
          'update': { method:'PUT' }
        });
        
      var Instagram = {
        query: function getData(callback) {
          source.query().$promise.then(function(result) {
            var returned = [];
            console.log('Instagram data', result);
            angular.forEach(result.data, function(item) {
              returned.push({thumbnail:item.images.thumbnail.url, url:item.link, category:'instagram'});
            });
            
            callback({data:returned, next:result.pagination.next_max_tag_id, previous:result.pagination.min_tag_id});
          });
        },
        
        next: function getData(callback, next) {
          source.query({max_tag_id:next}).$promise.then(function(result) {
            var returned = [];
            angular.forEach(result.data, function(item) {
              returned.push({thumbnail:item.images.thumbnail.url, url:item.images.thumbnail.url, category:'instagram'});
            });
            
            callback({data:returned, next:result.pagination.next_max_tag_id, previous:result.pagination.min_tag_id});
          });
        }
      };
      
      return Instagram;
    }
  ]);
  
  
  
