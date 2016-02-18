/**
 * Created by francesco.mirenda on 17/02/2016.
 */
"use strict";

angular.module('hsClefraApp').controller('MainCtrl', function ($scope, serverApiSvc) {
  $scope.test = "scope -> test";
  $scope.dummy = {"a" : "A"};

    serverApiSvc.getMaster(function (data) {
      if (angular.isDefined(data)) {
        console.log(data);
        $scope.dummy = data;
      }
    });


});
