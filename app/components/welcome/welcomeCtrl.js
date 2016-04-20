/**
 * Created by francesco.mirenda on 17/02/2016.
 */
"use strict";

angular.module('hsClefraApp').controller('WelcomeCtrl', function ($scope, AuthenticationService, $state, $rootScope) {

  $scope.logout = function(){
    AuthenticationService.logout();
  }

  $rootScope.$on("$stateChangeSuccess", function(event){
    if (AuthenticationService.isAuthenticated()){
      // User is authenticated
      $state.go('root.bootstrap.main');
    }
    event.preventDefault();
  });
});
