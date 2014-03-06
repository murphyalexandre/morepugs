'use strict';

angular.module('morepugsApp')
  .controller('MainCtrl', ['$scope', '$filter', 'Reddit', 'Tumblr', 'Instagram',
    function ($scope, $filter, Reddit, Tumblr, Instagram) {
      $scope.data = [];
      $scope.filteredData = [];
      $scope.next = {'reddit':null, 'tumblr':null, 'instagram':null};
      $scope.categories = [{name:'reddit', active:true}, {name:'tumblr', active:true}, {name:'instagram', active:true}];
      
      $scope.redditBusy = false;
      $scope.tumblrBusy = false;
      $scope.instagramBusy = false;
      
      $scope.isBusy = function() {
        return $scope.redditBusy && $scope.tumblrBusy && $scope.instagramBusy;
      };
      
      // Callbacks to add data async
      $scope.redditDataCb = function(data) {
        angular.forEach(data.data, function(item) {
          $scope.data.push(item);
          $scope.filteredData.push(item);
        });
        
        $scope.next.reddit = data.next;
        
        $scope.redditBusy = false;        
      };
      
      $scope.tumblrDataCb = function(data) {
        angular.forEach(data.data, function(item) {
          $scope.data.push(item);
          $scope.filteredData.push(item);
        });
        
        $scope.next.tumblr = data.next;
        
        $scope.tumblrBusy = false;
      };
      
      $scope.instagramDataCb = function(data) {
        angular.forEach(data.data, function(item) {
          $scope.data.push(item);
          $scope.filteredData.push(item);
        });
        
        $scope.next.instagram = data.next;
        
        $scope.instagramBusy = false;
      };
      
      $scope.toggleCategory = function(category) {
        category.active = !category.active;
        
        // Filter data
        $scope.filterByActive();
      };
      
      $scope.filterByActive = function() {
        $scope.filteredData.length = 0;
        $scope.filteredData = [];
        angular.forEach($scope.categories, function(cat) {
          if(cat.active) {
            var temp = $filter('filter')($scope.data, {category: cat.name});
            angular.forEach(temp, function(item) {
              $scope.filteredData.push(item);
            });
          }
        });
      };
      
      $scope.addMoreItems = function() {
        if($scope.isBusy()) return;
        $scope.redditBusy = true;
        $scope.tumblrBusy = true;
        $scope.instagramBusy = true;
      
        // Call services
        Reddit.next($scope.redditDataCb, $scope.next.reddit);
        Tumblr.next($scope.tumblrDataCb, $scope.next.tumblr);
        Instagram.next($scope.instagramDataCb, $scope.next.instagram);
      };
      
      $scope.more = function() {
        $scope.addMoreItems();
      };
      
      angular.element(document).ready(function () {
        // Call services
        Reddit.query($scope.redditDataCb);
        Tumblr.query($scope.tumblrDataCb);
        Instagram.query($scope.instagramDataCb);
      });
    }
  ]);
