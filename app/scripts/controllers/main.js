'use strict';

angular.module('morepugsApp')
  .controller('MainCtrl', ['$scope', 'Reddit',
    function ($scope, Reddit) {
      $scope.redditData = null;
      
      angular.element(document).ready(function () {
        console.log('Hello World');
        
        $scope.redditData = Reddit.query();
        $scope.redditData.$promise.then(function(result) {
          console.log('Received data from Reddit:', result);
          $scope.redditData = result.data;
        });
      });
    }
  ]);
