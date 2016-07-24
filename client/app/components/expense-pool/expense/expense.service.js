var app = angular.module('app');

app.factory('Expense', function Expense($resource) {
  return $resource('/api/expense-pools/:expensePoolId/expenses/:expenseId', {
    expensePoolId: '@ExpensePoolId',
    expenseId: '@_id'
  });
});
