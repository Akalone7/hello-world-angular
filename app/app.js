/**
 * Created by francesco.mirenda on 17/02/2016.
 */
"use strict";
/**
 * @ngdoc overview
 * @name cdrApp
 * @description
 * # cdrApp
 *
 * Main module of the application.
 * TODO Remove unused
 */
var app = angular
  .module('hsClefraApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pascalprecht.translate',
    'tmh.dynamicLocale',
    'ui.router',
    'ui.bootstrap',
    'ui.select',
    'ct.ui.router.extras',
    'angular-float-labels'
  ]);

app.config(function ($stateProvider, $stickyStateProvider, $urlRouterProvider, $httpProvider, $translateProvider, langLocaleProvider, tmhDynamicLocaleProvider,  defaultLanguage) {


  $httpProvider.interceptors.push('HttpInterceptor');

  langLocaleProvider.setDefaultLang(defaultLanguage);
  $translateProvider.useLocalStorage();
  $translateProvider.useStaticFilesLoader({
    prefix: 'resources/',
    suffix: '.json'
  });

  $translateProvider.useSanitizeValueStrategy('sanitize');

  tmhDynamicLocaleProvider.localeLocationPattern('resources/angular-locale_{{locale}}.js');
  tmhDynamicLocaleProvider.useCookieStorage();


  $urlRouterProvider.otherwise('/');
  //    $stickyStateProvider.enableDebug(true);

  var states = [];

  states.push({
    name: 'root',
    url: '',
    abstract: true,
    template: '<ui-view/>'
  });

  states.push({
    name: 'root.bootstrap',
    url: '/',
    controller: "ContainerCtrl as container",
    templateUrl: 'app/components/container/container.tpl.html',
    deepStateRedirect: {
      default: "root.bootstrap.welcome"
    }
  });

  //Welcome state
  states.push({
    name: 'root.bootstrap.welcome',
    url: 'login',
    views: {
      'welcomeTab': {
        controller: 'LoginCtrl as main',
        templateUrl: 'app/components/welcome/login/login.tpl.html'
      }
    },
    authenticate:false,
    sticky: true
  });

  // main states

  states.push({
    name: 'root.bootstrap.main',
    url: 'main',
    views: {
      'mainTab': {
        controller: 'MainCtrl as main',
        templateUrl: 'app/components/main/main.tpl.html',
      },
    },
    deepStateRedirect: {
      default: "root.bootstrap.main.controlPanel"
    },
    authenticate:true,
    sticky: true
  });

  states.push({
    name: 'root.bootstrap.main.controlPanel',
    url: '/controlPanel',
    views: {
      'controlPanelTab': {
        controller: 'ControlPanelCtrl as controlPanel',
        templateUrl: 'app/components/main/control-panel/control-panel.tpl.html',
      },
    },
    authenticate:true,
    sticky: true
  });

  states.push({
    name: 'root.bootstrap.main.dummyList',
    url: '/dummyList',
    views: {
      'dummyListTab': {
        controller: 'DummyListCtrl as dummyList',
        templateUrl: 'app/components/main/dummy-list/dummy-list.tpl.html'
      }
    },
    authenticate:true,
    sticky: true
  });

  states.push({
    name: 'root.bootstrap.main.dummyInsert',
    url: '/dummyInsert',
    views: {
      'dummyInsertTab': {
        controller: 'DummyInsertCtrl as dummyInsert',
        templateUrl: 'app/components/main/dummy-insert/dummy-insert.tpl.html'
      }
    },
    authenticate:true,
    sticky: true
  });

  angular.forEach(states, function (state) {
    $stateProvider.state(state);
  });

})
  .run(function (langLocale, tmhDynamicLocale, polyfill,$rootScope, $state, AuthenticationService, serverApiSvc) {
    langLocale.setLanguage();
    tmhDynamicLocale.set('it');
    polyfill.init();

    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      if (toState.authenticate && !AuthenticationService.isAuthenticated()){
        // User isn’t authenticated
        $state.go('root.bootstrap.welcome');
        event.preventDefault();
      }
    });

    serverApiSvc.getUserDetails(function (data) {
      if (angular.isDefined(data)) {
        $rootScope.user = {};
        console.log(data);
        $rootScope.user.name = data.name;
        $rootScope.user.surname = data.surname;
        var options = $rootScope.user.name.split(' ');
        if (options.length >= 2) {
          $rootScope.initials = options[0][0] + $rootScope.user.surname;
        } else {
          $rootScope.initials = $rootScope.user.name[0][0] + $rootScope.user.surname[0][0];
        }
      }
    });

  });

