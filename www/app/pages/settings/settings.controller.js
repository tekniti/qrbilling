'use strict';

angular.module('qrBillingApp')
  .controller('SettingsCtrl', function (
    $scope,
    $state,
    $ionicPopup,
    PaymentAuth,
    $cordovaTouchID
  ) {
    console.log(PaymentAuth.data.authMethod);
    PaymentAuth.setMethod('');

    // Options for the auth selectbox
    $scope.availableMethods = [
      { value: 'pin', title: 'PIN' },
    ];

    // Stored auth method
    var originalAuthMethod = PaymentAuth.getMethod();

    // Default in the selectbox
    $scope.selectedAuthMethod = originalAuthMethod || 'pin';

    // Check the fingerprint support
    var checkFingerprintSupport = function () {
      var resolve = function() {
        $scope.availableMethods.push({ value: 'fingerprint', title: 'Fingerprint' });
      };
      var reject = angular.noop;
      $cordovaTouchID.checkSupport().then(resolve, reject);
    };

    // Check if the device is ready
    document.addEventListener('deviceready', checkFingerprintSupport, false);

    var authenticate = function (resolve) {
      var reject = function () {
        console.log('rejected, do a redirect...');
        $ionicPopup.alert({
          title: 'Access denied',
          template: 'Authentication failed, please try again.'
        });
      };
      PaymentAuth.authenticate($scope, resolve, reject);
    };

    $scope.saveChanges = function () {
      var resolve = function () {
        console.log('resolved, nothing to do...');
        // Save changes
        PaymentAuth.setMethod($scope.selectedAuthMethod);
        $state.go('tabs.main');
      };

      if (!originalAuthMethod) {
        resolve();
      } else {
        authenticate(resolve);
      }
    };


  });
