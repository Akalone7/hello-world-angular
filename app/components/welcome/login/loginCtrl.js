/**
 * Created by francesco.mirenda on 01/03/2016.
 */
angular.module( 'hsClefraApp')
  .controller( 'LoginCtrl', function LoginController( $scope, $http, store, $state, serverApiSvc) {

    $scope.user = {};

    $scope.login = function (){
      console.log($scope.user);
      serverApiSvc.authenticate(function(user){
        console.log(user);
        $state.go('root.bootstrap.main');
      }, $scope.user);
    }

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