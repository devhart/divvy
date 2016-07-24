var app = angular.module('app');

app.controller('ExpensePoolCtrl', function PoolsCtrl($scope, User) {
  $scope.pools = User.expensePools();
});

app.controller('ExpensePoolListCtrl', function PoolsCtrl($scope, $mdDialog, $state, ExpensePool) {
  $scope.addPool = function addPool(e) {
    var addPoolPromptOptions = $mdDialog.prompt()
      .title('Add a new expense pool')
      .textContent('Choose a name...')
      .placeholder('Expense pool name')
      .ariaLabel('Expense pool name')
      .targetEvent(e)
      .ok('Create!')
      .cancel('Cancel');

    $mdDialog.show(addPoolPromptOptions).then(function handlePromptOk(result) {
      if (result) {
        ExpensePool.save({}, {name: result}).$promise.then(function handleSave(response) {
          $scope.goToPoolDetail(response.expensePool);
        });
      }
    });
  };

  $scope.goToPoolDetail = function goToPool(pool) {
    $state.go('expense-pools.detail', { expensePoolId: pool._id });
  };
});

app.controller('ExpensePoolDetailCtrl', function PoolsCtrl($scope, $stateParams, ExpensePool) {
  $scope.pool = ExpensePool.get({expensePoolId: $stateParams.expensePoolId});
});
