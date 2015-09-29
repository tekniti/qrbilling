'use strict';

angular.module('qrBillingApp')
  .controller('TabsCtrl', function ($scope, Auth, $state, PaymentAuth) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.paymentAuthData = PaymentAuth.data;
    console.log('tabs', PaymentAuth.data.authMethod);

    $scope.logout = function () {
      Auth.logout();
      $state.go('signin');
    };
  });
