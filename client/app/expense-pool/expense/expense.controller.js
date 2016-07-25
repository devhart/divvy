var app = angular.module('app');

app.controller('AddExpensePoolExpenseDialogCtrl',
  function AddExpensePoolExpenseDialogCtrl($scope, $mdDialog, Expense, expensePool) {
    $scope.hide = function hide() {
      $mdDialog.hide();
    };
    $scope.cancel = function cancel() {
      $mdDialog.cancel();
    };
    $scope.submit = function submit() {
      if ($scope.isValid()) {
        Expense.save({ expensePoolId: expensePool._id }, { name: $scope.name, amount: $scope.amount }).$promise
          .then(function handleSavedExpense(expense) {
            $mdDialog.hide(expense);
          });
        // TODO: Handle error responses from the server.
      }
    };

    $scope.currencyRegex = /^[0-9]+(\.[0-9]{1,2})?$/;

    // TODO: Improve this validation and display error messages.
    $scope.isValid = function isValid() {
      return $scope.amount && $scope.currencyRegex.test($scope.amount) && $scope.name;
    };
  });
