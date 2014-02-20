'use strict';

angular.module('morepugsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  
  'morepugsApp.services',
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
