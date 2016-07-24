var app = angular.module('app');

app.config(function config($stateProvider) {
  $stateProvider.state('expense-pools', {
    url: '/expense-pools',
    abstract: true,
    template: '<pools flex layout="column"></pools>',
    resolve: {
      authRequired: function authRequired(Auth) {
        return Auth.required();
      }
    }
  }).state('expense-pools.list', {
    parent: 'expense-pools',
    url: '',
    templateUrl: 'app/expense-pool/expense-pool.list.html',
    controller: 'ExpensePoolListCtrl'
  }).state('expense-pools.detail', {
    parent: 'expense-pools',
    url: '/:expensePoolId',
    templateUrl: 'app/expense-pool/expense-pool.detail.html',
    controller: 'ExpensePoolDetailCtrl'
  });
});

app.component('pools', {
  templateUrl: 'app/expense-pool/expense-pool.html',
  controller: 'ExpensePoolCtrl'
});
