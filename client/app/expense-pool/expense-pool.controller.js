var app = angular.module('app');

app.controller('ExpensePoolCtrl', function PoolsCtrl($scope, User) {
  $scope.pools = User.expensePools();
});

app.controller('ExpensePoolListCtrl', function PoolsCtrl($scope, $mdDialog, $state, ExpensePool) {
  $scope.addPool = function addPool(e) {
    var addPoolOptions = $mdDialog.prompt()
      .title('Add a new expense pool')
      .textContent('Choose a name...')
      .placeholder('Expense pool name')
      .ariaLabel('Expense pool name')
      .targetEvent(e)
      .ok('Create!')
      .cancel('Cancel');

    $mdDialog.show(addPoolOptions).then(function handleOk(result) {
      if (result) {
        ExpensePool.save({}, { name: result }).$promise.then(function handleSave(response) {
          $scope.goToPoolDetail(null, response.expensePool);
        });
      }
    });
  };

  $scope.goToPoolDetail = function goToPool(event, pool) {
    $state.go('expense-pools.detail', { expensePoolId: pool._id });
  };
});

app.controller('ExpensePoolDetailCtrl', function PoolsCtrl($scope, $mdDialog, $stateParams, ExpensePool, Expense) {
  ExpensePool.get({ expensePoolId: $stateParams.expensePoolId }).$promise
    .then(function handleResponse(pool) {
      $scope.images = {};
      pool.Users.forEach(function addAvatarImage(user) {
        $scope.images[user._id] = JSON.parse(user.facebook).picture.data.url;
      });
      $scope.pool = pool;
    });

  $scope.addExpense = function addExpense(e) {
    // TODO: Update this with custom template to include amount
    var addExpenseOptions = $mdDialog.prompt()
      .title('Add a new expense')
      .textContent('Choose a name...')
      .placeholder('Expense name')
      .ariaLabel('Expense name')
      .targetEvent(e)
      .ok('Create!')
      .cancel('Cancel');

    $mdDialog.show(addExpenseOptions).then(function handleOk(result) {
      if (result) {
        Expense.save({expensePoolId: $scope.pool._id}, { name: result }).$promise.then(function handleSave(response) {
          $scope.pool.Expenses.unshift(response);
        });
      }
    });
  };
});
