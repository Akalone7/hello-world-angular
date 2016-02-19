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

    });
