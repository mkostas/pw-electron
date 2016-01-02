'use strict';

angular.module('myPasswords.create-password', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/create-password', {
    templateUrl: 'scripts/create-password/create-password.html',
    controller: 'createPasswordCtrl'
  });
}])

.controller('createPasswordCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {	

    $scope.create = function(password) {
    	$scope.success = false;

		var passwordData = $scope.password;
		passwordData.id = new Date().toISOString();

		// passwordData = JSON.stringify(passwordData);

		var fs = require('fs');

		fs.readFile(__dirname + '/tmp/passwords.json', 'utf-8', function (err, data) {
			var passwordObjects = [];
			// Empty file			
		  	if (data === '') {		  		
		  		passwordObjects.push(passwordData);

		  		// Write into the file
		  		fs.writeFile(__dirname + '/tmp/passwords.json', JSON.stringify(passwordObjects), function (err) {
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
			// Non empty file
		  	} else {
		  		passwordObjects = JSON.parse(data);
		  		passwordObjects.push(passwordData);

		  		// Write into the file
				fs.writeFile(__dirname + '/tmp/passwords.json', JSON.stringify(passwordObjects), function (err) {
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