/**
 * Created by francesco.mirenda on 17/02/2016.
 */
"use strict";

angular.module('hsClefraApp').controller('WelcomeCtrl', function ($scope, AuthenticationService, serverApiSvc) {

  $scope.logout = function(){
    AuthenticationService.logout();
  }

});
