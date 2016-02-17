'use strict';

/**
 * @ngdoc service
 * @name app.langSvc
 *
 * @description
 * Defines the supported languages.
 *
 * @requires ListFac
 */
angular.module('hsClefraApp')
    .service('LangSvc', function (ListFac) {

        var langList = new ListFac();

        //English
        langList.add({
            id: 'en',
            value: 'en-US',
            availableFormatFiles: ['en', 'en-us', 'en-gb']
        });


        //Italian
        langList.add({
            id: 'it',
            value: 'it-IT',
            availableFormatFiles: ['it', 'it-it']
        });

        langList.searchLangByValue = function (value) {
            var resultKey = null;
            angular.forEach(this.list, function (item, key) {
                if (item.value === value) {
                    resultKey = key;
                }
            });
            return this.list[resultKey];
        };

        langList.getDefaultLang = function (lang) {
            var resultKey = null;
            angular.forEach(this.list, function (item, key) {
                if (item.id === lang) {
                    resultKey = key;
                }
            });
            return this.list[resultKey];
        };

        return langList;
    });
