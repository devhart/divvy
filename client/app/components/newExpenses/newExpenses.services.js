angular.module('newExpenseApp.services', [])

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
  });