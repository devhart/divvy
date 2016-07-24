var app = angular.module('app', [
  'ngMaterial',
  'ngResource',
  'ui.router',
  'app.auth',
  'poolApp',
  'newExpenseApp',
  'updateExpenseApp',
  'poolsApp',
  'newPoolApp',
  'updatePoolApp'
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

app.run(function run($rootScope, $state, Auth) {
  $rootScope.$on('$stateChangeStart', function handleStartChangeState(event, next) {
    if (next.auth && !Auth.isLoggedIn()) {
      event.preventDefault();
      $state.go('loginState');
    }
  });
});

// Create modules here to prevent ordering issues with injecting module files.

angular.module('app.auth', ['ngCookies']);
