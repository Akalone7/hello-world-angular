/**
 * Created by francesco.mirenda on 17/02/2016.
 */
"use strict";

angular.module('hsClefraApp').controller('SeasonCtrl', function ($scope, serverApiSvc, $rootScope) {
 //TODO Chiamare Api.
  var match1 = {
    home : "Milan",
    result : "0 - 0",
    away : "Inter"
  };
  var match2 = {
    home : "Roma",
    result : "0 - 0",
    away : "Lazio"
  };
  var match3 = {
    home : "Juventus",
    result : "0 - 0",
    away : "Torino"
  };
 // $scope.seasonDay =

  $scope.daysOfSeason = 10;
  $scope.getNumber = function(num) {
    return new Array(num);
  };

  $scope.getSeasonDay = function (day){
        serverApiSvc.getSeasonDay(function (data) {
          if(angular.isDefined(data)) {
              $scope.seasonDay = data;
          }
        }, day
        )
  }
  $scope.getSeasonDay(1);


});
