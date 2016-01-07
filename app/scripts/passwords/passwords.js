'use strict';

angular.module('myPasswords.passwords', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/passwords', {
    templateUrl: 'scripts/passwords/passwords.html',
    controller: 'passwordsCtrl'
  });
}])

.controller('passwordsCtrl', ['$scope', '$http', '$mdDialog', '$timeout', function($scope, $http, $mdDialog, $timeout) {

  // Get userData path from electron's browser "backend", with filename ("passwords.json")
  var remote = require('remote');
  var userDataPath = remote.getCurrentWindow().dataFilePath;
  var fs = require('fs');

  $http.get(userDataPath)
      .then(function(res){
          $scope.passwords = res.data;          
      });

  // Delete button
  //==========================================================================>
  $scope.delete = function(event, objId, objName) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
          .clickOutsideToClose(true)
          .theme('dialog')
          .title('Would you like to remove this password?')
          .textContent(objName)
          .ariaLabel('Remove')
          .targetEvent(event)
          .ok('Remove!')
          .cancel('Cancel');
      // User confirmed delete
      $mdDialog.show(confirm).then(function() {
          // Get all the passwords
          var passwordObjects = $scope.passwords;
          // Find the one with the id provided and remove it from array
          for(var i = 0; i < passwordObjects.length; i++) {
              if(passwordObjects[i].id == objId) {
                  passwordObjects.splice(i, 1);
                  break;
              }
          }
          // Write the other passwords to passwords.json
          fs.writeFile(userDataPath, JSON.stringify(passwordObjects), function (err) {
              if(err) {
                  return console.log(err);
              } else {
                console.log("The file was saved!");
                $scope.success = true;
                // Set success to false after 5 secs
                $timeout(function(){
                    $scope.success = false;
                }, 2000);
            }
          });
      // User canceled delete 
      }, function() {
          console.log('cancel');
      });
  };

}]);