var app = angular.module('app', [
  'ngMaterial',
  'ngResource',
  'ui.router',
  'app.auth'
]);

app.config(function config($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('red');

  $locationProvider.html5Mode(true);

  $httpProvider.interceptors.push('authInterceptor');
  $stateProvider.state('logout', {
    url: '/logout',
    controller: function logoutController($state, Auth) {
      Auth.logout();
      $state.go('main');
    }
  });


  $urlRouterProvider.otherwise(function goToMain($injector) {
    $injector.get('$state').go('main');
  });
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
