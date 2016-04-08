/**
 * Created by francesco.mirenda on 01/03/2016.
 */
angular.module('hsClefraApp')
  .controller('LoginCtrl', function ( $scope, $state, serverApiSvc, AuthenticationService, $filter, $rootScope) {

    $scope.user = {};
    $scope.failedLogin = "";

    $scope.login = function () {
      AuthenticationService.authenticate($scope.user, function () {
        console.log($scope.user);
        $state.go('root.bootstrap.main');
        $rootScope.loadUserDetails();
      }, function (){
        $scope.failedLogin = $filter('translate')("lFailedLogin")
      });
    };

  });