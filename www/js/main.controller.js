angular.module('starter').controller('MainCtrl', function($scope, $cordovaBarcodeScanner) {

  $scope.sysMessage = 'No scanning data';

  $scope.startScanning = function () {
    $cordovaBarcodeScanner
      .scan()
      .then(function(barcodeData) {
        console.log(barcodeData);
        $scope.sysMessage = barcodeData;
      }, function(error) {
        console.log(error);
        $scope.sysMessage = error;
      });
  }
});
