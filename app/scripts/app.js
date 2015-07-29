'use strict';

/**
 * @ngdoc overview
 * @name votenabandaApp
 * @description
 * # votenabandaApp
 *
 * Main module of the application.
 */
var votacaoApp = angular
  .module('votenabandaApp', [
    'ngResource',
    'ngRoute',
    'underscore',
    'youtube-embed'
  ]);


votacaoApp.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/votacao', {
        templateUrl: 'views/votacao.html',
        controller: 'VotacaoCtrl'
      })
      .when('/obrigado', {
        templateUrl: 'views/obrigado.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
