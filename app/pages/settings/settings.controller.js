'use strict';

angular.module('qrBillingApp')
  .controller('SettingsCtrl', function (
    $scope,
    $state,
    $ionicPopup,
    PaymentAuth,
    $cordovaTouchID,
    Auth,
    User
  ) {
    //PaymentAuth.setMethod('');

    $scope.inputData = {
      newPin: undefined
    };

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

    $scope.saveChanges = function (form) {

      if (form.$invalid) return;

      var finalResolve = function () {
        PaymentAuth.setMethod($scope.selectedAuthMethod);
        $state.go('tabs.main');
      };

      var reject = function () {
        $ionicPopup.alert({
          title: 'Access denied',
          template: 'Authentication failed, please try again.'
        });
      };

      // Saves pin into localStorage and into the db if needed
      var tryToResolve = function () {
        // Save changes
        if ($scope.selectedAuthMethod === 'pin') {
          var serverError = function () {
            $ionicPopup.alert({
              title: 'Something failed',
              template: 'Sorry, we couldn\'t save your pin to the server, please try again later.'
            });
          };

          var promise = User.setPin({ id: Auth.getCurrentUser()._id }, { pin: $scope.inputData.newPin }).$promise;
          promise.then(finalResolve, serverError);
        } else {
          finalResolve();
        }
      };

      var originalMethod = PaymentAuth.getMethod();

      if (originalMethod) {
        PaymentAuth.authenticate($scope, tryToResolve, reject);
      } else {
        tryToResolve();
      }

    };


  });
