'use strict';

var morepugsServices = angular.module('morepugsApp.flickr', ['ngResource']);

morepugsServices.factory('Flickr', ['$resource',
    function ($resource) {
      var apiKey = '3ebc311ca7b835748c4d644013430495';
      var url = 'http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg';

      var source = $resource('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+apiKey+'&tags=pug', null,
        {
          'query': { method:'JSONP', params: {format: 'json', jsoncallback: 'JSON_CALLBACK'} },
          'update': { method:'PUT' }
        });

      var Flickr = {
        query: function getData(callback) {
          source.query().$promise.then(function(result) {
            var returned = [];
            angular.forEach(result.photos.photo, function(item) {
              var url = 'http://farm'+item.farm+'.staticflickr.com/'+item.server+'/'+item.id+'_'+item.secret;
              returned.push({thumbnail:url+'_m.jpg', url:url+'.jpg', category:'flickr'});
            });

            callback({data:returned, next:result.photos.page+1, previous:null});
          });
        },

        next: function getData(callback, next) {
          source.query({page:next}).$promise.then(function(result) {
            var returned = [];
            angular.forEach(result.photos.photo, function(item) {
              var url = 'http://farm'+item.farm+'.staticflickr.com/'+item.server+'/'+item.id+'_'+item.secret;
              returned.push({thumbnail:url+'_m.jpg', url:url+'.jpg', category:'flickr'});
            });

            callback({data:returned, next:next+1, previous:next-1});
          });
        }
      };

      return Flickr;
    }
  ]);



