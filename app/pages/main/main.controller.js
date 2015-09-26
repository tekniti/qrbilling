'use strict';

angular.module('qrBillingApp')
  .controller('MainCtrl', function (
    $cordovaBarcodeScanner,
    $cordovaTouchID,
    $scope,
    $state,
    $http,
    Config,
    Auth,
    PaymentService
  ) {

    $cordovaTouchID.checkSupport().then(function() {
      // success, TouchID supported
    }, function (error) {
      if (error) {
        console.log('checkSupport cb', error);
        return;
      }

      $cordovaTouchID.authenticate("Authenticate to pay").then(function() {
        // success
        console.log('success');
      }, function () {
        // error
        console.log('error');
      });
    });


    $scope.cards = PaymentService.cards;
    $scope.paymentInProgress = null;
    $scope.invoice = null;
    // TEST - to show payment option
    $scope.invoice = {
      _id: '55eaab46cda54f8c1403fd8e',
      due_ate: new Date().getTime(),
      paid_date: new Date().getTime(),
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
