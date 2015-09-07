'use strict';

angular.module('qrBillingApp')
  .controller('TabsCtrl', function ($scope, Auth, $state) {
    $scope.isLoggedIn = function() {return true}; //Auth.isLoggedIn;

    $scope.logout = function () {
      Auth.logout();
      $state.go('signin');
    };
  });
