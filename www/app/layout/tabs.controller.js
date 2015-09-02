'use strict';

angular.module('qrBillingApp')
  .controller('TabsCtrl', function ($scope, Auth, $location) {
    $scope.isLoggedIn = function() {return true}; //Auth.isLoggedIn;

    $scope.logout = function () {
      Auth.logout();
      $location.path('/login');
    };
  });
