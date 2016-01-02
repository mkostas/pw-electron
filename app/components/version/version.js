'use strict';

angular.module('myPasswords.version', [
  'myPasswords.version.interpolate-filter',
  'myPasswords.version.version-directive'
])

.value('version', '0.1');
