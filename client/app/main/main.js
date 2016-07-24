var app = angular.module('app');

app.config(function config($stateProvider) {
  $stateProvider.state('main', {
    url: '/',
    template: '<main flex layout></main>',
    resolve: {
      redirectToPools: ['$q', 'Auth', function redirectToPools($q, Auth) {
        var deferred = $q.defer();
        Auth.isLoggedInAsync().then(function handleLoginState(loggedIn) {
          loggedIn ? deferred.reject({ redirectTo: 'poolsState' }) : deferred.resolve();
        });
        return deferred.promise;
      }]
    }
  });
});

app.component('main', {
  templateUrl: 'app/main/main.html',
  controller: 'MainCtrl'
});
