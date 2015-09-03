'use strict';

angular.module('qrBillingApp')
  .controller('PaymentCtrl', function ($scope, PaymentService, Auth) {
    // just for testing
    //$scope.number='4242424242424242';
    //$scope.expiry='12/2019';
    //$scope.cvc='123';

    $scope.user = Auth.getCurrentUser();

    $scope.handleStripe = function(status, response) {
      if(response.error) {
        // 4242424242424242
        $scope.msg = response.error.message;
      } else {
        var cardToken = response.id;
        console.log(cardToken);
        var promise = PaymentService.saveCardData(cardToken);

        promise.success(function (response) {
          $scope.msg = 'Successfully saved.';
        }).error(function (response) {
          $scope.msg = 'Something, somewhere failed, please try again later.';
        });
      }
    };

  });
