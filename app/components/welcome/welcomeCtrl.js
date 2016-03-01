/**
 * Created by francesco.mirenda on 17/02/2016.
 */
"use strict";

angular.module('hsClefraApp').controller('WelcomeCtrl', function ($scope, $state, serverApiSvc) {
  $scope.token = false;

  $scope.user = {};

  $scope.login = function (){
    console.log($scope.user);
    serverApiSvc.authenticate(function(user){
      console.log(user);
      $state.go('root.bootstrap.main');
    }, $scope.user);
  }


});
