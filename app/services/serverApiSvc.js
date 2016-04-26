'use strict';

angular.module('hsClefraApp')
    .service('serverApiSvc', function ($interval, httpConnectionLayerSvc, serverApiUrls) {
    function buildRequest(url, id) {
      var ret = url;
      if(angular.isDefined(id))
        {
          ret += '/' + id;
        }
        return ret;
    }

    this.getMaster = function (successCallback, id) {
      var request = buildRequest(serverApiUrls.getMaster, id);
      return httpConnectionLayerSvc.receive(request, successCallback);
    };

    this.insertMaster = function (successCallback, dataToSend) {
      var request = buildRequest(serverApiUrls.insertMaster);
      return httpConnectionLayerSvc.send(request, dataToSend, successCallback);
    };

    this.deleteMaster = function (successCallback, id) {
      var request = buildRequest(serverApiUrls.insertMaster, id);
      return httpConnectionLayerSvc.delete(request, successCallback);
    };

    this.authenticate = function (dataToSend, successCallback) {
      var request = buildRequest(serverApiUrls.authentication);
      return httpConnectionLayerSvc.send(request, dataToSend, successCallback);
    };

    this.getUserDetails = function (successCallback, id) {
      var request = buildRequest(serverApiUrls.getUser, id);
      return httpConnectionLayerSvc.receive(request, successCallback);
    };

    this.insertUser = function (successCallback, dataToSend) {
      var request = buildRequest(serverApiUrls.insertUser);
      return httpConnectionLayerSvc.send(request, dataToSend, successCallback);
    };
    this.checkUsername = function (successCallback, username) {
      var request = buildRequest(serverApiUrls.checkUsername, username);
      return httpConnectionLayerSvc.receive(request, successCallback);
    };
    this.getLastSeasonDay = function (successCallback) {
         var request = buildRequest(serverApiUrls.getLastSeasonDay);
            return httpConnectionLayerSvc.receive(request, successCallback);
        };
        this.getSeasonDay = function (successCallback, param) {
            var request = buildRequest(serverApiUrls.getSeasonDay);
            return httpConnectionLayerSvc.receive(request, successCallback, param);
        };
  });