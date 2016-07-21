angular.module('newExpenseApp', [])
.factory('newExpenses', function($http) {
    return {
      addExpense: function(data, poolId) {
       return $http({  
         method: 'POST',
         url: '/api/expense-pools/' + poolId + '/',
         data: data
       })
       .then(function(resp) {
         console.log('toPool resp:', resp);
         return resp;
       });
      },
    }
  })
.controller('newExpensesCtrl', function($scope, $state, db, $stateParams, newExpenses) {

  $scope.currentPool = '';
  
  $scope.toPool = function () {
    $state.go('poolState', {id:$stateParams.id});
  };

  $scope.addExpense = function (expense) {
    expense.amount = parseFloat(expense.amount);
    newExpenses.addExpense(expense, $stateParams.id);
    $scope.expense.name = '';
    $scope.expense.amount = '';
    // console.log('adding a new expense', expense);
    // expense.id = Math.floor(Math.random()*10000);
    // expense.createdBy = 1;

    // for (var i =0; i < db.pools.length; i++) {
    //   if (db.pools[i].id === +$stateParams.id) {
    //     db.pools[i].expenses.push(expense);
    //   }
    // } 
    // $state.go('poolState', {id: +$stateParams.id});
  };

});