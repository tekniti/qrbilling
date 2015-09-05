'use strict';

angular.module('qrBillingApp')
  .controller('MainCtrl', function ($scope, $cordovaBarcodeScanner, $http, Config) {
    $scope.invoice = null;
    $scope.paymentFeedback = null;
    $scope.feedback = null;

    $scope.startPayment = function () {
      $http.post(Config.apiUrl + '/api/invoices/pay/' + $scope.invoice._id)
        .success(function (response) {
          $scope.invoice = response;
          $scope.paymentFeedback = 'Successfully paid';
        })
        .error(function (response) {
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
