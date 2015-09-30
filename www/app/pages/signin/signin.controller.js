'use strict';

angular.module('qrBillingApp')
  .controller('SigninCtrl', function ($scope, Auth, $state, $cordovaTouchID, $ionicPopup) {

    $scope.user = {
      email: 'test@test.com',
      password: 'test',
    };

    $scope.signIn = function (user) {
      //// TODO: just test
      //touchIdFunc();
      //return;
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
        console.log('Catched error at signin process: ', err);
        $scope.msg = 'Invalid email or password';
      });

    };



  });
