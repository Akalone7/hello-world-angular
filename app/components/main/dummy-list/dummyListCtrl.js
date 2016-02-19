/**
 * Created by francesco.mirenda on 17/02/2016.
 */
"use strict";

angular.module('hsClefraApp').controller('DummyListCtrl', function ($scope, serverApiSvc, $rootScope) {
  $scope.test = "scope -> test";

  var loadData = function (){
    serverApiSvc.getMaster(function (data) {
      if (angular.isDefined(data)) {
        console.log(data);
        $scope.dummies = data;
      }
    });
  };
  loadData();

  $scope.removeDummy = function (id){
    serverApiSvc.deleteMaster(function (data) {
      if (angular.isDefined(data)) {
        console.log(data);
        loadData();
      }
    }, id);
  }

  $rootScope.$on('$stateChangeSuccess',  function(event, toState, toParams, fromState, fromParams){
    loadData();
  });

});
