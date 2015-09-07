'use strict';

angular.module('qrBillingApp')
  .controller('SigninCtrl', function ($scope, Auth, $state) {


    $scope.signIn = function (user) {
      if (!user) {
        $scope.msg = 'Invalid credentials.';
        return;
      }

      $scope.msg = undefined;

      Auth.login({
        email: user.email,
        password: user.password
      })
      .then( function() {
        // Logged in, redirect to home
        $state.go('tabs.main');
      })
      .catch( function(err) {
        $scope.msg = 'Invalid email or password';
        console.log('error', err);
      });
    }

  });
