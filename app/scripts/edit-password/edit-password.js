'use strict';

angular.module('myPasswords.edit-password', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/edit-password/:id', {
    templateUrl: 'scripts/edit-password/edit-password.html',
    controller: 'editPasswordCtrl'
  });
}])

.controller('editPasswordCtrl', ['$scope', '$http', '$timeout', '$routeParams' , function($scope, $http, $timeout, $routeParams) {
	// Get password ID from url parameter
	var passwordId = $routeParams.id;
	$scope.successMessage = '';

	// Get userData path from electron's browser "backend", with filename ("passwords.json")
	var remote = require('remote');
	var userDataPath = remote.getCurrentWindow().dataFilePath;
	var fs = require('fs');

	// Populate edit-form with password object
	$http.get(userDataPath).then(
		function(res) {
	      	var passwordObjects = res.data;
	      	// Find the password with the id provided and populate fields
	      	for(var i = 0; i < passwordObjects.length; i++) {
				if(passwordObjects[i].id === passwordId) {
					$scope.password = passwordObjects[i];
					break;
				}
			}
		},
	  	function error(err) {
  			console.error(err);
  		}
  	);

	// Edit function
	$scope.edit = function() {

		fs.readFile(userDataPath, 'utf-8', function (err, data) {
			var passwordObjects = JSON.parse(data);	

			for(var i = 0; i < passwordObjects.length; i++) {
				if(passwordObjects[i].id === passwordId) {
					passwordObjects.splice(i, 1);
					var passwordData = {
						id: new Date().toISOString(),
						name: $scope.password.name,
						username: $scope.password.username,
						password: $scope.password.password,
						notes: $scope.password.notes
					};
	  				passwordObjects.push(passwordData);

	  				fs.writeFile(userDataPath, JSON.stringify(passwordObjects, null, '\t'), function (err) {
					    if(err) {
					        return console.log(err);
					    } else {
						    console.log("The file was saved!");
						    $scope.successMessage = 'Password edited!';
						}
					}); 

				}
			}
		});	  	
	};
	  	
}]);