'use strict';

angular.module('qrBillingApp')
  .controller('SigninCtrl', function ($scope, Auth, $state, $ionicPopup) {

    $scope.user = {
      email: 'test@test.com',
      password: 'test',
    };

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
        console.log('Catched error at signin process: ', err, JSON.stringify(err));
        $scope.msg = 'Invalid email or password';
      });

    };



  });
