'use strict';

angular.module('qrBillingApp')
  .service('PaymentService', function ($http, Config) {

    this.saveCardData = function (stripeToken) {
      var promise = $http.post(Config.apiUrl + '/api/stripe/' + stripeToken);
      return promise;
    };

  });
