var app = angular.module('newExpenseApp.services', []);

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
