var app = angular.module('app');

app.factory('ExpensePool', function ExpensePool($resource) {
  return $resource('/api/expense-pools/:expensePoolId/:controller', {
    expensePoolId: '@_id'
  }, {
    addUser: {
      method: 'POST',
      params: {
        controller: 'users'
      }
    },
    listUsers: {
      method: 'GET',
      params: {
        controller: 'users'
      },
      isArray: true
    }
  });
});
