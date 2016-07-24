var app = angular.module('app');

app.config(function config($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    template: '<div layout="column" layout-align="center center" flex><login></login></div>'
  });
});

app.component('login', {
  templateUrl: 'app/components/login/login.html',
  controller: 'LoginCtrl'
});
