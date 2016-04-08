/**
 * Created by francesco.mirenda on 03/03/2016.
 */
// register the interceptor as a service
angular.module('hsClefraApp')
  .factory('HttpInterceptor', function($q, $location, AuthenticationProxy) {
  return {
    // optional method
    'request': function($config) {
      var token = AuthenticationProxy.getJwt();
      if(angular.isDefined(token)) {
        $config.headers["Authorization"] = "Bearer " + AuthenticationProxy.getJwt();
      }
      return $config;
    },

    // optional method
    //'requestError': function(rejection) {
    //  // do something on error
    //  if (canRecover(rejection)) {
    //    return responseOrNewPromise
    //  }
    //  return $q.reject(rejection);
    //},



    // optional method
    'responseError': function(response) {
      if (response.status === 401 || response.status === 403) {
        AuthenticationProxy.removeJwt();
        $location.path('/login');
      }
      return response || $q.when(response);
    },

    //'responseError': function (response) {
    //  return $q.reject(response);
    //}
  };
});
