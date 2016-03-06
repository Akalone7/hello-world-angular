/**
 * Created by Clelia on 06/03/2016.
 */

"use strict";

angular.module('hsClefraApp').controller('ControlPanelCtrl', function ($scope, $state, serverApiSvc) {

    $scope.user = {};

    serverApiSvc.getUserDetails(function (data) {
            if (angular.isDefined(data)) {
                console.log(data);
                $scope.user = data;
            }
        });
});
