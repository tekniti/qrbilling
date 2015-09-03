// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('qrBillingApp', [
  'ionic',
  'ngCordova',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'angularPayments'
])

.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $stateProvider) {

  // Here comes the routing

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "app/layout/tabs.html",
      controller: 'TabsCtrl'
    })
    .state('tabs.main', {
      url: '/main',
      views: {
        'main-tab': {
          templateUrl: 'app/pages/main/main.html',
          controller: 'MainCtrl'
        }
      }
    })
    .state('tabs.payment', {
      url: '/payment',
      views: {
        'payment-tab': {
          templateUrl: 'app/pages/payment/payment.html',
          controller: 'PaymentCtrl'
        }
      }
    })
    .state('signin', {
      url: '/signin',
      templateUrl: 'app/pages/signin/signin.html',
      controller: 'SigninCtrl'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/pages/signup/signup.html',
      controller: 'SignupCtrl'
    });

  // TODO: here we could read cookies, and sign in automatically?

  $urlRouterProvider.otherwise('/signin');

  //$locationProvider.html5Mode(true);
  $httpProvider.interceptors.push('authInterceptor');
})

.factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
  return {
    // Add authorization token to headers
    request: function (config) {
      config.headers = config.headers || {};
      if ($cookieStore.get('token')) {
        config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
      }
      return config;
    },

    // Intercept 401s and redirect you to login
    responseError: function(response) {
      if(response.status === 401) {
        $location.path('/login');
        // remove any stale tokens
        $cookieStore.remove('token');
        return $q.reject(response);
      }
      else {
        return $q.reject(response);
      }
    }
  };
})

.run(function($ionicPlatform, $rootScope, $location, Auth) {
  Stripe.setPublishableKey('pk_test_ekwQxo3lq9GUGIMcgyDjRxDO');

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  // Redirect to login if route requires auth and you're not logged in
  $rootScope.$on('$stateChangeStart', function (event, next) {
    Auth.isLoggedInAsync(function(loggedIn) {
      if (next.authenticate && !loggedIn) {
        event.preventDefault();
        $location.path('/login');
      }
    });
  });
});
