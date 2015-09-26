'use strict';

angular.module('qrBillingApp')
  .controller('SigninCtrl', function ($scope, Auth, $state, $cordovaTouchID, $ionicPopup) {

    console.log('SigninCtrl inited');
    $ionicPopup.alert({
      title: 'Some Info',
      template: 'SigninCtrl inited'
    });

    $cordovaTouchID.checkSupport().then(function() {

      // success, TouchID supported
      console.log('touchID supported');
      $ionicPopup.alert({
        title: 'touchID supported',
        template: 'touchID supported'
      });

      $cordovaTouchID.authenticate("Authenticate to pay").then(function() {
        // success
        console.log('touchID success');
        $ionicPopup.alert({
          title: 'touchID success',
          template: 'touchID success'
        });
      }, function () {
        // error
        console.log('touchID error');
        $ionicPopup.alert({
          title: 'touchID error',
          template: 'touchID error'
        });
      });

    }, function (error) {

      if (error) {
        console.log('support error');
        $ionicPopup.alert({
          title: 'support error',
          template: error
        });
      }

    });


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
        console.log('Catched error at signin process: ', err);
        $scope.msg = 'Invalid email or password';
      });
    }

  });
