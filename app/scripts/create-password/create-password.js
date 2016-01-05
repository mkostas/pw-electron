'use strict';

angular.module('myPasswords.create-password', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/create-password', {
    templateUrl: 'scripts/create-password/create-password.html',
    controller: 'createPasswordCtrl'
  });
}])

.controller('createPasswordCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {	

	// Get userData path from electron's browser "backend", with filename to save ("passwords.json")
	var remote = require('remote');
	var userDataPath = remote.getCurrentWindow().dataFilePath;
	var fs = require('fs');

    $scope.create = function(password) {
    	$scope.success = false;

		var passwordData = $scope.password;
		passwordData.id = new Date().toISOString();

		fs.readFile(userDataPath, 'utf-8', function (err, data) {
			var passwordObjects = [];
			// If file is empty			
		  	if (data === '') {
		  		passwordObjects.push(passwordData);

		  		// Write into the file
		  		fs.writeFile(userDataPath, JSON.stringify(passwordObjects), function (err) {
				    if(err) {
				        return console.log(err);
				    } else {
					    console.log("The file was saved!");
					    $scope.success = true;
					    // Set success to false after 5 secs
					    $timeout(function(){
							$scope.success = false;
				       	}, 5000);

					}
				}); 
			// If file is not empty
		  	} else {
		  		passwordObjects = JSON.parse(data);
		  		passwordObjects.push(passwordData);

		  		// Write into the file
				fs.writeFile(userDataPath, JSON.stringify(passwordObjects), function (err) {
					if (err) {
				  		return console.log(err);
					} else {
					  	console.log("The file was saved!");
					  	$scope.success = true;
					  	// Set success to false after 5 secs
					  	$timeout(function(){
							$scope.success = false;
				       	}, 5000);
				  	}
				});
		  	}		  	
		});

    };
}]);