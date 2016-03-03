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


    this.authenticate = function (user, successCallback){
      console.log(user);
      serverApiSvc.authenticate(user, function (jwt){
        if(angular.isDefined(jwt)) {
          inMemoryToken = true;
          inMemoryJwt = jwt;
          AuthenticationProxy.setJwt(inMemoryJwt);
          successCallback();
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