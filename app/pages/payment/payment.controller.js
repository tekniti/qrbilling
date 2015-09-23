'use strict';

angular.module('qrBillingApp')
  .controller('PaymentCtrl', function ($scope, PaymentService, Auth, $ionicPopup) {
    // just for testing
    // These variables should stay out of the cardModel because of the 3rd party plugin
    $scope.number='4242424242424242';
    $scope.expiry='12/2019';
    $scope.cvc='123';

    $scope.cardModel = {
      addInProgress: null
    };

    $scope.cards = PaymentService.cards

    $scope.deleteCard = function (card) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Confirmation',
        template: 'Are you sure you want to delete this card?'
      });

      confirmPopup.then(function(res) {
        if(res) {
          // Delete card from the frontend
          var promise = PaymentService.deleteCard(card);
        } else {
          return;
        }
      });
    };

    $scope.user = Auth.getCurrentUser();

    // Adds card to Stripe Customer
    $scope.cardTokenCallback = function(status, response) {

      if(response.error) {
        // 4242424242424242
        $scope.cardModel.addInProgress = false;
        $scope.msg = response.error.message;
      } else {
        var cardToken = response.id;
        var promise = PaymentService.createCard(cardToken);

        promise.success(function (response) {
          $scope.cardModel.addInProgress = false;
          $scope.msg = 'Successfully saved.';
          $scope.user = Auth.reloadUser();
        }).error(function (response) {
          $scope.cardModel.addInProgress = false;
          $scope.msg = 'Something, somewhere failed, please try again later.';
          console.log(response );
        });
      }
    };

  });
