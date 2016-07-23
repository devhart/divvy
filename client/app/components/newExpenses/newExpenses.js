var app = angular.module('newExpenseApp', []);

app.factory('newExpenses', function newExpense($http) {
  return {
    addExpense: function addExpense(data, poolId) {
      return $http({
        method: 'POST',
        url: '/api/expense-pools/' + poolId + '/',
        data: data
      }).then(function afterAddExpense(resp) {
        console.log('toPool resp:', resp);
        return resp;
      });
    }
  };
});

app.controller('newExpensesCtrl', function newExpenseCtrl($scope, $state, db, $stateParams, newExpenses) {
  $scope.currentPool = '';

  $scope.toPool = function toPool() {
    $state.go('poolState', { id: $stateParams.id });
  };

  $scope.addExpense = function addExpense(expense) {
    expense.amount = parseFloat(expense.amount);
    newExpenses.addExpense(expense, $stateParams.id);
    $scope.expense.name = '';
    $scope.expense.amount = '';
  };
});
