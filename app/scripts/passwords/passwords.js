'use strict';

angular.module('myPasswords.passwords', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/passwords', {
    templateUrl: 'scripts/passwords/passwords.html',
    controller: 'passwordsCtrl'
  });
}])

.controller('passwordsCtrl', ['$scope', '$http', function($scope, $http) {

  // Get userData path from electron's browser "backend", with filename ("passwords.json")
  var remote = require('remote');
  var userDataPath = remote.getCurrentWindow().dataFilePath;
  // $scope.passwords = userDataPath;

    $http.get(userDataPath)
      .then(function(res){
          $scope.passwords = res.data;          
      });

  $scope.textToCopy = 'I can copy by clicking!'; 
  $scope.success = function () {
      console.log('Copied!');
  };
  $scope.fail = function (err) {
      console.error('Error!', err);
  };
}]);