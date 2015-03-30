'use strict';

/* Services */

var FIFAWorldCupServices = angular.module('FIFAWorldCupServices', ['ngResource']);

FIFAWorldCupServices.factory('Phone', ['$resource',
  function($resource){
    return $resource('phones/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);

FIFAWorldCupServices
  .factory('dataFactory', ['$http', function($http) {

    var urlBase = 'http://worldcup.sfg.io/';
    var dataFactory = {};

    dataFactory.getMatches = function () {
      return $http.get(urlBase+'/matches');
    };

    dataFactory.getGroups = function () {
        return $http.get(urlBase + '/teams/group_results');
    };

    dataFactory.getTeams = function(){
        return $http.get(urlBase + '/teams/results');
    }

    dataFactory.getTeam = function (countryId) {
        return $http.get(urlBase+'/', countryId);
    };

        /*dataFactory.updateCustomer = function (cust) {
            return $http.put(urlBase + '/' + cust.ID, cust)
        };

        dataFactory.deleteCustomer = function (id) {
            return $http.delete(urlBase + '/' + id);
        };

        dataFactory.getOrders = function (id) {
            return $http.get(urlBase + '/' + id + '/orders');
        };*/

    return dataFactory;
}]);
