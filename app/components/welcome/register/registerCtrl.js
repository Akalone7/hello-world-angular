/**
 * Created by francesco.mirenda on 01/03/2016.
 */
angular.module('hsClefraApp')
  .controller('RegisterCtrl', function ( $scope, $state, serverApiSvc, AuthenticationService, $filter, $rootScope) {

    $scope.user = {};
    $scope.failedLogin = "";

    $scope.translationData = {
      username : $scope.user.username,
      minLength : 6
    };

    $scope.local = {
      getUsername : function (val){
        if(val){
          $scope.user.username = val;
          $scope.translationData.username = val;//TODO ??? non funziona ???
        }

        return $scope.user.username;
    }
  };

    $scope.signUp = function (){
      serverApiSvc.insertUser(function (response){
        console.log(response);
      }, $scope.user);
    }

  });