'use strict';

angular.module('myPasswords.name-directive', [])

// It checks if the username entered by user exist
.directive('nameDirective', function($q) {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {

      var remote = require('remote');
      var userDataPath = remote.getCurrentWindow().dataFilePath;
      var fs = require('fs');

      // Read file with passwords
      fs.readFile(userDataPath, 'utf-8', function (err, data) {       
        var passwordObjects = JSON.parse(data);
        var names = [];

        // Get names from passwords and push it in array
        for (var x in passwordObjects) if (passwordObjects.hasOwnProperty(x)) {
          // Do not push the current password's name in array (for edit only)
          if (passwordObjects[x].name !== ctrl.$modelValue)
            names.push(passwordObjects[x].name);
        }     

        ctrl.$asyncValidators.name = function(modelValue, viewValue) {

          if (ctrl.$isEmpty(modelValue)) {
            // consider empty model valid
            return $q.when();
          }

          var def = $q.defer();

          if (names.indexOf(modelValue) === -1) {
            // The name is available
            def.resolve();
          } else {
            // The name not available
            def.reject();
          }

          return def.promise;
        };
      });
    }
  };
});