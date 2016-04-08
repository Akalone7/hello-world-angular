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
  $scope.matches = [match1, match2, match3];
});
