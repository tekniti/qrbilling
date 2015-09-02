'use strict';

angular.module('qrBillingApp').controller('SignupCtrl', function ($scope, Auth, $location) {

  $scope.user = {};

  $scope.signUp = function () {

    Auth.createUser({
      name: $scope.user.name,
      email: $scope.user.email,
      password: $scope.user.password
    })
    .then( function() {
      // Logged in, redirect to home
      $location.path('/tab/main');
    })
    .catch( function(err) {
      $scope.msg = 'Invalid input';
        console.log(err.message);
    });

  };

});
