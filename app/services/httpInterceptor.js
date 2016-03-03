/**
 * Created by francesco.mirenda on 03/03/2016.
 */
// register the interceptor as a service
angular.module('hsClefraApp')
  .factory('HttpInterceptor', function($q, AuthenticationProxy) {
  return {
    // optional method
    'request': function(config) {
      config.headers.authorization = "Bearer " + AuthenticationProxy.getJwt();
      return config;
    },

    // optional method
    'requestError': function(rejection) {
      // do something on error
      if (canRecover(rejection)) {
        return responseOrNewPromise
      }
      return $q.reject(rejection);
    },



    // optional method
    'response': function(response) {
      // do something on success
      return response;
    },

    // optional method
    'responseError': function(rejection) {
      // do something on error
      if (canRecover(rejection)) {
        return responseOrNewPromise
      }
      return $q.reject(rejection);
    }
  };
});
