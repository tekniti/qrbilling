'use strict';

angular.module('qrBillingApp')
  .service('PaymentAuth', function ($localstorage, $ionicPopup, $cordovaTouchID, Auth, User) {

    this.data = {
      authenticated: false,
      authMethod: $localstorage.get('auth_method')
    };

    this.isAuthenticated = function () {
      return authenticated;
    };

    this.setMethod = function (methodName) {
      this.data.authMethod = methodName;
      $localstorage.set('auth_method', methodName);
    };

    this.getMethod = function () {
      this.data.authMethod = $localstorage.get('auth_method');
      return this.data.authMethod;
    };

    this.fingerprintAuth = function (resolve, reject) {
      $cordovaTouchID.authenticate("Please authenticate yourself.").then(resolve, reject);
    };

    this.pinAuth = function (outerScope, resolve, reject) {
      outerScope.pinData = {
        data: undefined
      };
      var pinPopup = $ionicPopup.show({
        template: '<input type="password" ng-model="pinData.data">',
        title: 'Enter your original PIN',
        scope: outerScope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Confirm</b>',
            type: 'button-positive',
            onTap: function(e) {
              return outerScope.pinData.data;
            }
          }
        ]
      });

      pinPopup.then(function(oldPin) {
        if (oldPin) {
          var promise = User.comparePin({ id: Auth.getCurrentUser()._id }, { oldPin: oldPin }).$promise;
          promise.then(resolve, reject);
        } else {
          reject();
        }
      });
    };

    this.authenticate = function (outerScope, resolve, reject) {
      var authMethod = this.getMethod();

      if (authMethod === 'pin') {
        this.pinAuth(outerScope, resolve, reject);
      } else if (authMethod === 'fingerprint') {
        this.fingerprintAuth(resolve, reject);
      } else {
        reject();
      }

    };


  });
