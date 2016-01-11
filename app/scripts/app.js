'use strict';

// Declare app level module which depends on views, and components
angular.module('myPasswords', [
  'ngRoute',
  'angular-clipboard',
  'ngMaterial',
  'ngAnimate',
  'myPasswords.name-directive',
  'myPasswords.version',
  'myPasswords.passwords',
  'myPasswords.create-password',
  'myPasswords.edit-password'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/passwords'});
}]).
config(function ($mdThemingProvider) {
  $mdThemingProvider
      .theme('default')
      .primaryPalette('light-blue', { 'default': '900', 'hue-1': '800', 'hue-2': '700', 'hue-3': '300' })
      .accentPalette('orange', { 'default': '800', 'hue-1': '600', 'hue-2': '400', 'hue-3': '200' })
      .warnPalette('red')
      .backgroundPalette('light-blue', { 'default': '50'});
}).
controller('mainCtrl', ['$scope', '$route', function($scope, $route) {
  $scope.reloadRoute = function() {
    $route.reload();
  };
}]);