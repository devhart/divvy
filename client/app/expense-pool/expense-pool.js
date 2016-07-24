var app = angular.module('app');

app.config(function config($stateProvider) {
  $stateProvider.state('expense-pools', {
    url: '/expense-pools',
    abstract: true,
    template: '<ui-view flex layout></ui-view>',
    resolve: {
      authRequired: function authRequired(Auth) {
        return Auth.required();
      }
    }
  }).state('expense-pools.list', {
    parent: 'expense-pools',
    url: '',
    template: '<pools-list flex layout></pools-list>'
  }).state('expense-pools.detail', {
    parent: 'expense-pools',
    url: '/:expensePoolId',
    template: '<pools-detail flex layout></pools-detail>'
  });
});

app.component('poolsList', {
  templateUrl: 'app/expense-pool/expense-pool.list.html',
  controller: 'ExpensePoolListCtrl'
});

app.component('poolsDetail', {
  templateUrl: 'app/expense-pool/expense-pool.detail.html',
  controller: 'ExpensePoolDetailCtrl'
});
