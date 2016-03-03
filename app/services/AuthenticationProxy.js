/**
 * Created by francesco.mirenda on 03/03/2016.
 */
"use strict";
angular.module('hsClefraApp')
  .service('AuthenticationProxy', function () {
    var inMemoryJwt;

    this.setJwt = function(jwtToSet){
      inMemoryJwt = jwtToSet;
    };

    this.getJwt = function (){
      return inMemoryJwt;
    }

  });
