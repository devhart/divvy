
angular.module('app', [
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
])

.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $mdThemingProvider) {

  $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('red');

  $urlRouterProvider.otherwise(function($injector) {
    $injector.get('$state').go('poolsState');
  });
  // $locationProvider.html5Mode(true);

  $httpProvider.interceptors.push('authInterceptor');
  $stateProvider
  .state('loginState', {
    url: '/login',
    auth: false,
    templateUrl: './app/components/login/login.html'
    //Placeholder for LOGIN CONTROLLER (if needed)
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
    },
  });
})
.factory('db', function($http){
  var obj = {};

  obj.pools = [];
  obj.pools[0] = {
    id: 1,
    name: 'Wine Tour',
    status: 'open',
    createdBy: 1,
    users: [{id:1, name: 'John'},{id:2, name: 'Sarah'},{id:3, name: 'Sally'},{id:4, name: 'Steve'}],
    image: 'data:image/jpeg;base64,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',
    expenses: [{
      id: 1,
      name: 'Napkins', 
      amount: 15,
      createdBy: 1,
    },
    {
      id: 2,
      name: 'Cups',
      amount: 25,
      createdBy: 1,
    }]
  };  

  return obj;
})
.factory('authInterceptor', function ($rootScope, $q, $cookies, $injector) {
  return {
  // Add authorization token to headers
    request: function(config) {
      config.headers = config.headers || {};
      if ($cookies.get('token')) {
        config.headers.Authorization = 'Bearer ' + $cookies.get('token');
      }
      return config;
    },

    // Intercept 401s and redirect you to login
    responseError: function(response) {
      if (response.status === 401) {
        $cookies.remove('token');
        // Use injector to get around circular dependency.
        $injector.get('$state').go('loginState');
      }
      return $q.reject(response);
    }
  }
})
.factory('User', function($resource) {
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
})
.factory('Auth', function(User, $cookies, $window) {
  var currentUser = {};
  if($cookies.get('token')) {
    currentUser = User.me();
  }
  return {
    logout: function() {
      $cookies.remove('token');
      currentUser = {};
    },
    login: function() {
      $window.location.href = '/auth/facebook';
    },
    getCurrentUser: function(){
      return currentUser
    },
    isLoggedIn: function() {
      return currentUser.hasOwnProperty('name')
    },
    isLoggedInAsync: function() {
      if ($cookies.get('token')) {
        return User.me();
      } else {
        return currentUser;
      }
    }
  };
})
.run(function($rootScope, $state, Auth) {
  $rootScope.$on('$stateChangeStart', function(event, next,  params) {
    console.log('next', next);
    console.log('next.auth', next.auth);
    console.log('!Auth.isLoggedIn()', !Auth.isLoggedIn())
    if (next.auth && !Auth.isLoggedIn()) { // only checking via auth servcie
      event.preventDefault();
      $state.go('loginState');
    }
  });
})
