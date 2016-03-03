/**
 * Created by francesco.mirenda on 17/02/2016.
 */
"use strict";

angular.module('hsClefraApp').controller('MainCtrl', function ($scope, AuthenticationService) {
  $scope.test = "Main";

  $scope.logout = function(){
    AuthenticationService.logout();
  }


});
