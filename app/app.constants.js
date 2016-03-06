/**
 * Created by francesco.mirenda on 17/02/2016.
 */
'use strict';

angular.module('hsClefraApp')
  .constant('serverApiUrls', (function () {
      var differentHost = 'http://localhost:8085/clefra';
      //var differentHost = 'http://192.168.1.16:8080/clefra';

    var apiPath = differentHost + '/rest/api';

    return {
      // api urls
      apiPath: apiPath,
      getMaster: apiPath + '/master',
      insertMaster: apiPath + '/master',
      deleteMaster: apiPath + '/master',
      authentication: apiPath + '/authentication',
      getUser: apiPath + '/user'
    }
    })())
  .constant('defaultLanguage', 'it');
