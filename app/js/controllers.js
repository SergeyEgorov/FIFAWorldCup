'use strict';

/* Controllers */

var FIFAWorldCupControllers = angular.module('FIFAWorldCupControllers', ['nvd3ChartDirectives']);

FIFAWorldCupControllers.controller('NavigationCtrl', ['$scope', '$location',
  function($scope, $location){
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
  }]);

FIFAWorldCupControllers.controller('StatisticsCtrl',['$scope', 'dataFactory',
  function($scope, dataFactory){
    $scope.groupsStatistic = [];
    dataFactory.getGroups()
        .success(function(response){
            console.log(response);
            response.forEach(function(val, ind){
                $scope.groupsStatistic.push({
                    "letter": val.group.letter,
                    "teams": []
                });
                val.group.teams.forEach(function(value){
                    $scope.groupsStatistic[ind].teams.push({
                        key: value.team.country,
                        y: value.team.points
                    });
                });
            });

            $scope.xFunction = function() {
                return function(d) {
                    return d.key;
                };
            }
            $scope.yFunction = function() {
                return function(d) {
                    return d.y;
                };
            }

            $scope.descriptionFunction = function() {
                return function(d) {
                    return d.key;
                }
            }
        })
        .error(function(error){
            $scope.status = 'Unable to load customer data: ' + error.message;
        })
  }]);

FIFAWorldCupControllers.controller('HomeCtrl', ['$scope', 'dataFactory',
    function($scope, dataFactory) {
        $scope.resultsTable = [];
        dataFactory.getGroups()
            .success(function (response) {
                $scope.groups = response;
                console.log(response);
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });

        dataFactory.getMatches()
            .success(function (response) {
                var i = response.length-1;
                for(i; i > 47; i--){
                    switch(i){
                        case 63:
                            response[i].championat_part = 'final';
                            break;
                        case 61:case 60:
                            response[i].championat_part = 'semifinal';
                            break;
                        case 59:case 58:case 57:case 56:
                            response[i].championat_part = 'quarterfinal';
                            break;
                    }
                    $scope.resultsTable.push(response[i]);
                }
                console.log($scope.resultsTable);
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });

    }]);
