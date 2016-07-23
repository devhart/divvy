var app = angular.module('app');

app.config(function config($stateProvider) {
  $stateProvider.state('main', {
    url: '/',
    template: '<main flex layout></main>'
  });
});

app.component('main', {
  templateUrl: 'app/main/main.html',
  controller: 'MainCtrl'
});
