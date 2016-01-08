'use strict';

angular.module('myPasswords.create-password', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/create-password', {
    templateUrl: 'scripts/create-password/create-password.html',
    controller: 'createPasswordCtrl'
  });
}])

.controller('createPasswordCtrl', ['$scope', '$timeout', function($scope, $timeout) {	

	// Get userData path from electron's browser "backend", with filename to save ("passwords.json")
	var remote = require('remote');
	var userDataPath = remote.getCurrentWindow().dataFilePath;
	var fs = require('fs');
	var counter = 0;

    $scope.create = function(password) {

		var passwordData = password;
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
					    $scope.successMessage = 'Password created!';
					    // Set successMessage to false after 5 secs
					    $timeout(function(){
							$scope.successMessage = '';
				       	}, 2000);

					}
				}); 
			// If file is not empty
		  	} else {
		  		// Get password objects
		  		passwordObjects = JSON.parse(data);		  		

		  		// Check if password exists
			  	for(var j = 0; j < passwordObjects.length; j++) {
			  		if(passwordObjects[j].name === passwordData.name) {	
			  		counter += 1;
			  		}		  		
			  	}
			  	// If found at least 1 then its a duplicate
			  	if (counter > 0) {
			  		$scope.errorMessage = 'Password name already exists!';
			  		$timeout(function(){
				    	$scope.errorMessage = '';
						$scope.successMessage = '';
						counter = 0;
			       	}, 2000);
			  	} else {
			  		// Else push the new password in
			  		passwordObjects.push(passwordData);

			  		// Write into the file
					fs.writeFile(userDataPath, JSON.stringify(passwordObjects), function (err) {
						if (err) {
					  		return console.log(err);
						} else {
						  	console.log("The file was saved!");
						  	$scope.successMessage = 'Password created!';
						  	// Set success to false after 5 secs
						  	$timeout(function(){
								$scope.successMessage = '';
					       	}, 2000);
					  	}
					});
			  	}
		  	}		  	
		});

    };

    // Password generator function
    $scope.generatePassword = function() {

    	// Available chars
    	var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
	    var pass = "";
	    for (var i = 0; i < 10; i++) {
	        pass += chars.charAt(Math.floor(Math.random() * chars.length));
	    }
	    var passObj = $scope.password;

	    // Check if password Object has any property (if the user already typed anything)
	    // If not init the password property
	   	if (typeof passObj === 'undefined') {
	   		$scope.password = {	    		
	    		password: pass
	    	};
	    // If user typed already a name or a username grab these properties and add them to the Object
	   	} else {
	   		$scope.password = {
	    		name: $scope.password.name,
	    		username: $scope.password.username,
	    		notes: $scope.password.notes,
	    		password: pass
	    	};
	   	}
    };
}]);