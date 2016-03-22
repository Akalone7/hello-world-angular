/**
 * Created by francesco.mirenda on 03/03/2016.
 */
"use strict";
angular.module('hsClefraApp')
  .service('AuthenticationProxy', function ($window) {
    var inMemoryJwt;

    this.setJwt = function(jwtToSet){
      $window.localStorage['jwtToken'] = jwtToSet;
    };

    this.getJwt = function (){
      return $window.localStorage['jwtToken'];
    }

    this.removeJwt = function (){
      $window.localStorage.removeItem('jwtToken');
    }

  });
