/**
 * Created by francesco.mirenda on 01/03/2016.
 */
angular.module('hsClefraApp')
  .controller('LoginCtrl', function ( $scope, $state, serverApiSvc, AuthenticationService) {

    $scope.user = {};

    $scope.login = function () {
      AuthenticationService.authenticate($scope.user, function () {
        console.log($scope.user);
          $state.go('root.bootstrap.main');
      });
    };

    //$scope.login = function() {
    //  $http({
    //    url: 'http://localhost:8085/sessions/create',
    //    method: 'POST',
    //    data: $scope.user
    //  }).then(function(response) {
    //    store.set('jwt', response.data.id_token);
    //    $state.go('home');
    //  }, function(error) {
    //    alert(error.data);
    //  });
    //}


  });