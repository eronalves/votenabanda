'use strict';

/**
 * @ngdoc function
 * @name votenabandaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the votenabandaApp
 */
votacaoApp.controller('MainCtrl', function ($scope, goLocation) {
   $scope.go = goLocation.go;
});
