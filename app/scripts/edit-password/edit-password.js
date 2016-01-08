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
	var counter = 0;
	$scope.successMessage = '';
	$scope.errorMessage = '';


	// Get userData path from electron's browser "backend", with filename ("passwords.json")
	var remote = require('remote');
	var userDataPath = remote.getCurrentWindow().dataFilePath;
	var fs = require('fs');

	// Get all the passwords
	$http.get(userDataPath).then(
		function(res) {
	      	var passwordObjects = res.data;
	      	// Find the password with the id provided and populate fields
	      	for(var i = 0; i < passwordObjects.length; i++) {
				if(passwordObjects[i].id === passwordId) {
					$scope.password = passwordObjects[i];
					var passwordData = $scope.password;
					break;
				}
			}

			// Edit function
			$scope.edit = function() {
		  		// Use object position index to remove the password
			  	passwordObjects.splice(i, 1);
			  	passwordData.id = new Date().toISOString();
			  	passwordObjects.push(passwordData);

			  	// Check if password exists
			  	for(var j = 0; j < passwordObjects.length; j++) {
			  		if(passwordObjects[j].name === passwordData.name) {		  			
			  			counter += 1;
			  		}
			  	}

			  	// If found more than one then its a duplicate
			  	if (counter > 1) {
			  		$scope.errorMessage = 'Password name already exists!';
			  		$timeout(function(){
				    	$scope.errorMessage = '';
						$scope.successMessage = '';
						counter = 0;
			       	}, 2000);
			  	} else {
			  		// Else Write into the file
			  		fs.writeFile(userDataPath, JSON.stringify(passwordObjects, null, '\t'), function (err) {
					    if(err) {
					        return console.error(err);
					    } else {
						    console.log("The file was edited!");
						    $scope.successMessage = 'Password edited!';
						    // Set successMessage to false after 5 secs
						    $timeout(function(){
						    	$scope.errorMessage = '';
								$scope.successMessage = '';
								counter = 0;
					       	}, 2000);

						}
					});
			  	}	  	
			};
	  	},
	  	function error(err) {
  			console.error(err);
  		});
}]);