'use strict';

angular.module('qrBillingApp')
  .service('PaymentAuth', function ($localstorage, $ionicPopup, $cordovaTouchID) {

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
      var pinPopup = $ionicPopup.show({
        template: '<input type="password" ng-model="data.pin">',
        title: 'Enter PIN',
        scope: outerScope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              return outerScope.data.pin;
            }
          }
        ]
      });

      pinPopup.then(function(res) {
        if (res) {
          // TODO: validate on backend
          resolve();
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
      }

    };


  });
