'use strict';

angular.module('qrBillingApp')
  .factory('User', function ($resource, Config) {
    return $resource(Config.apiUrl + '/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      comparePin: {
        method: 'POST',
        params: {
          controller: 'comparePin'
        }
      },
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      setPin: {
        method: 'PUT',
        params: {
          controller:'pin'
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
