angular.module('newExpenseApp', [])
.controller('newExpensesCtrl', function($scope, $state, db, $stateParams) {

  $scope.currentPool = '';
  
  $scope.toPool = function () {
    $state.go('poolState', {id:$stateParams.id});
  };

  $scope.addExpense = function (expense) {
    console.log('adding a new expense', expense);
    expense.id = Math.floor(Math.random()*10000);
    expense.createdBy = 1;

    for (var i =0; i < db.pools.length; i++) {
      if (db.pools[i].id === +$stateParams.id) {
        db.pools[i].expenses.push(expense);
      }
    } 
    $state.go('poolState', {id: +$stateParams.id});
  };

});