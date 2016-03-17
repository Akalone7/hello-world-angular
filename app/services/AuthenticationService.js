/**
 * Created by francesco.mirenda on 03/03/2016.
 */
"use strict";
angular.module('hsClefraApp')
.service('AuthenticationService', function (AuthenticationProxy, serverApiSvc) {

    var inMemoryToken;
    var inMemoryJwt;

    this.isAuthenticated = function () {
        return inMemoryToken;
    };


    this.authenticate = function (user, successCallback, failureCallback){
      console.log(user);
      serverApiSvc.authenticate(user, function (data){
        if(data.jwt) {
          inMemoryToken = true;
          inMemoryJwt = data.jwt;
          AuthenticationProxy.setJwt(inMemoryJwt);
          successCallback();
        } else {
          failureCallback();
        }
      });
    };

    this.logout = function(){
      inMemoryJwt = undefined;
      inMemoryToken = undefined;
      AuthenticationProxy.setJwt(inMemoryJwt);
    };

    this.getJwt = function (){
      return inMemoryJwt;
    }
});