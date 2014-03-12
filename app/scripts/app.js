'use strict';

angular.module('morepugsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  
  'angular-md5',
  
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
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
