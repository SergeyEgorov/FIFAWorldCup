'use strict';

/* App Module */

var phonecatApp = angular.module('FIFAWorldCup', [
  'ngRoute',

  'FIFAWorldCupControllers',
  'phonecatFilters',
  'FIFAWorldCupServices'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      }).
      when('/statistics', {
        templateUrl: 'views/statistics.html',
        controller: 'StatisticsCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
