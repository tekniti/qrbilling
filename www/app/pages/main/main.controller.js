'use strict';

angular.module('qrBillingApp')
  .controller('MainCtrl', function (
    $cordovaBarcodeScanner,
    $cordovaTouchID,
    $ionicPopup,
    $scope,
    $state,
    $http,
    Config,
    Auth,
    PaymentService,
    PaymentAuth
  ) {


    $scope.cards = PaymentService.cards;
    $scope.paymentInProgress = null;
    $scope.invoice = null;
    // TEST - to show payment option
    $scope.invoice = {
      _id: '55eaab46cda54f8c1403fd8e',
      due_ate: new Date().getTime(),
      //paid_date: new Date().getTime(),
      amount: '100',
    };

    $scope.paymentFeedback = null;
    $scope.feedback = null;


    $scope.navigateTo = function (stateString) {
      $state.go(stateString);
    };

    $scope.$watch(Auth.getCurrentUser, function (newValue, oldValue) {
      $scope.user = newValue;
    });

    $scope.user = Auth.getCurrentUser();

    $scope.startPayment = function (selectedCardId) {
      $scope.paymentInProgress = true;

      var resolve = function () {
        $http.post(Config.apiUrl + '/api/invoices/pay/' + $scope.invoice._id, { cardId: selectedCardId })
          .success(function (response) {
            $scope.invoice = response;
            $scope.paymentInProgress = false;
            $scope.paymentFeedback = 'Successfully paid';
          })
          .error(function (response) {
            $scope.paymentInProgress = false;
            $scope.paymentFeedback = 'Sorry, something failed.';
          });
      };

      var reject = function () {
        $scope.paymentInProgress = false;
        $ionicPopup.alert({
          title: 'Access denied',
          template: 'Authentication failed, please try again.'
        });
      };

      PaymentAuth.authenticate($scope, resolve, reject);
    };

    $scope.startScanning = function () {
      $cordovaBarcodeScanner
        .scan()
        .then(function(barcodeData) {

          $http.get(barcodeData.text)
            .success(function (response) {
              $scope.feedback = 'Invoice info';
              $scope.invoice = response;
            })
            .error(function (response) {
              console.log('Get invoice info error', response)
              $scope.feedback = 'Sorry, something failed.';
            });

        }, function(error) {
          console.log('Scanning error', error);
          $scope.feedback = 'Sorry, something failed.';
        });
    }
  });
