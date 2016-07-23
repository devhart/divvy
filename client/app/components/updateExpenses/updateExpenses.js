var app = angular.module('updateExpenseApp', []);

app.controller('updateExpensesCtrl', function updateExpensesCtrl($scope, $state, db, $stateParams) {
  $scope.expense = {};

  $scope.toPool = function toPool() {
    $state.go('poolState', { id: $stateParams.poolid });
  };

  $scope.deleteExpense = function deleteExpense() {
    for (var i = 0; i < db.pools.length; i++) {
      if (db.pools[i].id === +$stateParams.poolid) {
        for (var j = 0; j < db.pools[i].expenses.length; j++) {
          if (db.pools[i].expenses[j].id === +$stateParams.expenseid) {
            db.pools[i].expenses.splice(j, 1);
          }
        }
      }
    }
    $state.go('poolState', { id: $stateParams.poolid });
  };

  $scope.editExpense = function editExpense() {
    for (var i = 0; i < db.pools.length; i++) {
      if (db.pools[i].id === +$stateParams.poolid) {
        for (var j = 0; j < db.pools[i].expenses.length; j++) {
          if (db.pools[i].expenses[j].id === +$stateParams.expenseid) {
            db.pools[i].expenses[j].name = $scope.expense.name;
            db.pools[i].expenses[j].amount = $scope.expense.amount;
          }
        }
      }
    }
    $state.go('poolState', { id: $stateParams.poolid });
  };

  $scope.fetchExpense = function fetchExpense() {
    for (var i = 0; i < db.pools.length; i++) {
      if (db.pools[i].id === +$stateParams.poolid) {
        for (var j = 0; j < db.pools[i].expenses.length; j++) {
          if (db.pools[i].expenses[j].id === +$stateParams.expenseid) {
            $scope.expense = db.pools[i].expenses[j];
          }
        }
      }
    }
  };
});
