'use strict';

angular.module('hsClefraApp')
  .controller('ContainerCtrl', function ($scope, $state, $window, $element) {
    $scope.state = $state;

    var containerResize = function () {
      angular.element($element).find('#main-tab-container').height( angular.element($window).height() - angular.element($element).find("nav").outerHeight());
    };
    $scope.$on("$viewContentLoaded", containerResize);

    angular.element($window).bind("resize", containerResize);

  });
