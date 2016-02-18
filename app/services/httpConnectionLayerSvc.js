'use strict';

angular.module('hsClefraApp')
    .service('httpConnectionLayerSvc', function ($http, $log, $q) {

        function send(url, dataToSend, successCallback, failureCallback) {
            // return the chained promise
            return $http.post(url, dataToSend).then(
                // success
                  function (response) {
                    if (angular.isFunction(successCallback)) {
                        successCallback(response.data, response.status, response.headers, response.config);
                    }
                    // forward the response to the next promise

                    return response;
                },
                // error
                function (response) {
                    if (angular.isFunction(failureCallback)) {
                        failureCallback(response.data, response.status, response.headers, response.config);
                        return response;
                    }

                    // we could not recover this problem so we have to return (forward to the next promise) a promise which is resolved as rejected
                    return $q.reject(response);
                }
            );
        }
        this.send = send;

        function receive(url, successCallback, failureCallback, params) {
          if(angular.isUndefined(params))
          {
            params = {};
          }
          $http.get(url, {params: params}).then(
          // success
          function (response) {
              if (angular.isFunction(successCallback)) {
                  successCallback(response.data, response.status, response.headers, response.config);
              }
              // forward the response to the next promise
              return response;
          },
          // error
          function (response) {
              if (angular.isFunction(failureCallback)) {
                  failureCallback(response.data, response.status, response.headers, response.config);
              }

              // we could not recover this problem so we have to return (forward to the next promise) a promise which is resolved as rejected
              return $q.reject(response);
          }

          );
        }

        this.receive = receive;

    function del(url, successCallback, failureCallback) {
      $http.delete(url).then(
        // success
        function (response) {
          if (angular.isFunction(successCallback)) {
            successCallback(response.status, response.headers, response.config);
          }
          // forward the response to the next promise
          return response;
        },
        // error
        function (response) {
          if (angular.isFunction(failureCallback)) {
            failureCallback(response.status, response.headers, response.config);
          }

          // we could not recover this problem so we have to return (forward to the next promise) a promise which is resolved as rejected
          return $q.reject(response);
        }
      );
    }

    this.delete = del;


    function put(url, dataToSend, successCallback, failureCallback) {
      $http.put(url, dataToSend).then(
        // success
        function (response) {
          if (angular.isFunction(successCallback)) {
            successCallback(response.data,response.status, response.headers, response.config);
          }
          // forward the response to the next promise
          return response;
        },
        // error
        function (response) {
          if (angular.isFunction(failureCallback)) {
            failureCallback(response.status, response.headers, response.config);
          }

          // we could not recover this problem so we have to return (forward to the next promise) a promise which is resolved as rejected
          return $q.reject(response);
        }
      );
    }

    this.put= put;


        this.sendAndGetBuffer = function (url, dataToSend, successCallback, failureCallback) {
            var config = {
                responseType: 'arraybuffer' // the response is handled as binary data instead of a string
            };
            return send(url, dataToSend, successCallback, failureCallback, config);
        };
    }
    );
