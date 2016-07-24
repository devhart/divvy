var app = angular.module('app', [
  'poolApp',
  'ui.router',
  'newExpenseApp',
  'updateExpenseApp',
  'poolsApp',
  'newPoolApp',
  'updatePoolApp',
  'ngResource',
  'ngCookies',
  'ngMaterial'
]);

app.config(function config($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('red');

  $urlRouterProvider.otherwise(function goToPoolsState($injector) {
    $injector.get('$state').go('poolsState');
  });

  $locationProvider.html5Mode(true);

  $httpProvider.interceptors.push('authInterceptor');
  $stateProvider
    .state('loginState', {
      url: '/login',
      auth: false,
      templateUrl: './app/components/login/login.html'
    })
    .state('poolsState', {
      url: '/pools',
      templateUrl: './app/components/pools/pools.html',
      controller: 'poolsCtrl',
      auth: true
    })
    .state('newPoolState', {
      url: '/newPool',
      templateUrl: './app/components/newpool/newpool.html',
      controller: 'newPoolCtrl'
    })
    .state('updatePoolState', {
      url: '/updatePool/:id',
      templateUrl: './app/components/updatepool/updatepool.html',
      controller: 'updatePoolCtrl',
      params: {
        id: null
      }
    })
    .state('poolState', {
      url: '/pool/:id',
      templateUrl: './app/components/pool/pool.html',
      controller: 'poolCtrl',
      params: {
        id: null
      }
    })
    .state('newExpensesState', {
      url: '/pool/:id/newExpense',
      templateUrl: './app/components/newExpenses/newExpenses.html',
      controller: 'newExpensesCtrl',
      params: {
        id: null
      }
    })
    .state('updateExpensesState', {
      url: '/pool/:poolid/updateExpense/:expenseid',
      templateUrl: './app/components/updateExpenses/updateExpenses.html',
      controller: 'updateExpensesCtrl',
      params: {
        poolid: null,
        expenseid: null
      }
    });
});

app.factory('db', function db() {
  var obj = {};

  obj.pools = [];
  obj.pools[0] = {
    id: 1,
    name: 'Wine Tour',
    status: 'open',
    createdBy: 1,
    users: [{ id: 1, name: 'John' }, { id: 2, name: 'Sarah' }, { id: 3, name: 'Sally' }, { id: 4, name: 'Steve' }],
    expenses: [{
      id: 1,
      name: 'Napkins',
      amount: 15,
      createdBy: 1
    }, {
      id: 2,
      name: 'Cups',
      amount: 25,
      createdBy: 1
    }]
  };

  return obj;
});

app.factory('authInterceptor', function authInterceptor($rootScope, $q, $cookies, $injector) {
  return {
    // Add authorization token to headers
    request: function handleRequest(config) {
      config.headers = config.headers || {};
      if ($cookies.get('token')) {
        config.headers.Authorization = 'Bearer ' + $cookies.get('token');
      }
      return config;
    },

    // Intercept 401s and redirect you to login
    responseError: function handleResponseError(response) {
      if (response.status === 401) {
        $cookies.remove('token');
        // Use injector to get around circular dependency.
        $injector.get('$state').go('loginState');
      }
      return $q.reject(response);
    }
  };
});

app.factory('User', function User($resource) {
  return $resource('/api/users/:userId/:controller', {
    userId: '@_id'
  }, {
    me: {
      method: 'GET',
      params: {
        controller: 'me'
      }
    }
  });
});

app.factory('Auth', function Auth(User, $cookies, $window) {
  var currentUser = {};
  if ($cookies.get('token')) {
    currentUser = User.me();
  }
  return {
    logout: function logout() {
      $cookies.remove('token');
      currentUser = {};
    },
    login: function login() {
      $window.location.href = '/auth/facebook';
    },
    getCurrentUser: function getCurrentUser() {
      return currentUser;
    },
    isLoggedIn: function isLoggedIn() {
      return currentUser.hasOwnProperty('name');
    },
    isLoggedInAsync: function isLoggedInAsync() {
      if ($cookies.get('token')) {
        return User.me();
      }
      return currentUser;
    }
  };
});

app.run(function run($rootScope, $state, Auth) {
  $rootScope.$on('$stateChangeStart', function handleStartChangeState(event, next) {
    if (next.auth && !Auth.isLoggedIn()) {
      event.preventDefault();
      $state.go('loginState');
    }
  });
});
