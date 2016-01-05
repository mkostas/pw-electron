'use strict';

// Declare app level module which depends on views, and components
angular.module('myPasswords', [
  'ngRoute',
  'angular-clipboard',
  'ngMaterial',
  'ngAnimate',
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
    .primaryPalette('cyan')
    .accentPalette('orange')
    .warnPalette('red')
    .backgroundPalette('blue-grey');
});
