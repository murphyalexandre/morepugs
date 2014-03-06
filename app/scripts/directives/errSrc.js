'use strict';

angular.module('morepugsApp')
  .directive('errSrc', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        element.bind('error', function() {
          element.attr('src', attrs.errSrc);
        });
      }
    };
  });

