'use strict';

angular.module('qrBillingApp')
  .service('PaymentService', function ($http, Config, $q) {

    this.cards = [];

    // READ
    this.loadCards = function () {
      var self = this;
      $http.get(Config.apiUrl + '/api/stripe').then(function (response) {
        // TODO: handle errors
        angular.extend(self.cards, response.data.cardList);
      });
    };

    this.loadCards();

    // DELETE: Client + Server
    this.deleteCard = function (card) {
      // Client part
      var index = _.findIndex(this.cards, card);
      this.cards.splice(index, 1);

      // Server part
      var promise = $http.delete(Config.apiUrl + '/api/stripe/' + card.id);

      return promise;
    };

    // CREATE: Client + Server
    this.createCard = function (cardToken) {
      var self = this;

      // Server part
      var promise = $http.post(Config.apiUrl + '/api/stripe/' + cardToken);
      promise.then(function (response) {
        // TODO: handle errors
        // Client part
        self.cards.push(response.data.card);
      });
      return promise;
    };

  });
