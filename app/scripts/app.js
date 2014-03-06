'use strict';

angular.module('morepugsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  
  'morepugsApp.reddit',
  'morepugsApp.tumblr',
  'morepugsApp.instagram',
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
