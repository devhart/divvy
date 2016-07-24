var app = angular.module('app', [
  'ngMaterial',
  'ngResource',
  'ui.router',
  'app.auth',
  'newExpenseApp',
  'updateExpenseApp',
  'poolApp',
  'newPoolApp',
  'updatePoolApp'
]);

app.config(function config($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('red');

  $locationProvider.html5Mode(true);

  $httpProvider.interceptors.push('authInterceptor');
  $stateProvider
    .state('logout', {
      url: '/logout',
      controller: function logoutController($state, Auth) {
        Auth.logout();
        $state.go('main');
      }
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


  $urlRouterProvider.otherwise(function goToMain($injector) {
    $injector.get('$state').go('main');
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

app.run(function run($rootScope, $state) {
  $rootScope.$on('$stateChangeError',
    function handleStateChangeError(event, toState, toParams, fromState, fromParams, error) {
      if (error.redirectTo) {
        $state.go(error.redirectTo);
      } else {
        $state.go('error', { status: error.status });
      }
    });
});

// Create modules here to prevent ordering issues with injecting module files.

angular.module('app.auth', ['ngCookies', 'ngResource']);
