/**
 * Created by francesco.mirenda on 01/03/2016.
 */
angular.module('hsClefraApp')
  .controller('LoginCtrl', function ( $scope, $state, serverApiSvc, AuthenticationService, $filter) {

    $scope.user = {};
    $scope.failedLogin;

    $scope.login = function () {
      AuthenticationService.authenticate($scope.user, function () {
        console.log($scope.user);
          $state.go('root.bootstrap.main');
      }, function (){
        $scope.failedLogin = $filter('translate')("lFailedLogin")
      });
    };

  });