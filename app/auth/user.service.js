'use strict';

angular.module('qrBillingApp')
  .factory('User', function ($resource, Config) {
    return $resource(Config.apiUrl + '/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
