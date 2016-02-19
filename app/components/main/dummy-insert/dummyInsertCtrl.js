/**
 * Created by francesco.mirenda on 17/02/2016.
 */
"use strict";

angular.module('hsClefraApp').controller('DummyInsertCtrl', function ($scope, $state, serverApiSvc) {

    $scope.dummy = {};

  $scope.insertDummy = function () {
    serverApiSvc.insertMaster(function (data) {
      if (angular.isDefined(data)) {
        console.log(data);
        $state.go('root.bootstrap.main.dummyList');
      }
    }, $scope.dummy);
  };


});
