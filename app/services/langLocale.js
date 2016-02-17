'use strict';

/**
 * @ngdoc service
 * @name langLocaleProvider
 *
 * @description
 * The service manages the language and format handling by loading the files from the server.
 *
 */
angular.module('hsClefraApp')

    .provider('langLocale', function () {
        var defaultLang, currentLanguage;

        return {
            setDefaultLang: function (lang) {
              currentLanguage = defaultLang = lang;
            },

            $get: function ($translateLocalStorage, $translate, LangSvc) {
                return {

                    getListSupportedLanguages: LangSvc.list,
                    getLang: function () {
                        var cookieLang = $translateLocalStorage.get('NG_TRANSLATE_LANG_KEY');
                        if (angular.isUndefined(currentLanguage) && angular.isDefined(cookieLang)) {
                            currentLanguage = LangSvc.getDefaultLang(cookieLang);
                        }
                        return currentLanguage;
                    },
                    getDefaultLang: function () {
                        return defaultLang;
                    },
                    setLanguage: function () {
                      $translate.use(currentLanguage);
                      $translateLocalStorage.set('NG_TRANSLATE_LANG_KEY', defaultLang);
                    }
                };
            }
        };
    });
