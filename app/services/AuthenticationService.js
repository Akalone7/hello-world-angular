/**
 * Created by francesco.mirenda on 03/03/2016.
 */
"use strict";
angular.module('hsClefraApp')
.service('AuthenticationService', function (AuthenticationProxy, serverApiSvc) {

    var inMemoryJwt;

    this.isAuthenticated = function () {
        return (angular.isDefined(AuthenticationProxy.getJwt()));
    };


    this.authenticate = function (user, successCallback, failureCallback){
      console.log(user);
      serverApiSvc.authenticate(user, function (data){
        if(data.jwt) {
          AuthenticationProxy.setJwt(data.jwt);
          successCallback();
        } else {
          failureCallback();
        }
      });
    };

    this.logout = function(){
      AuthenticationProxy.removeJwt();
    };

});