angular.module('newExpenseApp', [])
.controller('newExpensesCtrl', function($scope, $state) {

  $scope.toPool = function () {
    $state.go('poolState');
  };

  $scope.addExpense = function (expense) {
    console.log('adding a new expense', expense);
  };

});