/**
 * Created by Clelia on 06/03/2016.
 */

"use strict";

angular.module('hsClefraApp').controller('ControlPanelCtrl', function ($scope, $state, $element, $window, serverApiSvc) {

    $scope.user = {};

    serverApiSvc.getUserDetails(function (data) {
            if (angular.isDefined(data)) {
                console.log(data);
                $scope.user = data;
            }
        });

  var containerResize = function () {
    angular.element($element).find('#wizardSteps').height( angular.element($window).height() - 2*angular.element($element).find("nav").outerHeight());
  };

  $scope.$on("$viewContentLoaded", containerResize);

  angular.element($window).bind("resize", containerResize);
});
