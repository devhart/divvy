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
          $scope.pools.unshift(response);
          $scope.goToPoolDetail(null, response);
        });
      }
    });
  };

  $scope.goToPoolDetail = function goToPool(event, pool) {
    $state.go('expense-pools.detail', { expensePoolId: pool._id });
  };
});

app.controller('ExpensePoolDetailCtrl', function PoolsCtrl($scope, $mdDialog, $mdMedia, $stateParams, ExpensePool) {
  ExpensePool.get({ expensePoolId: $stateParams.expensePoolId }).$promise.then(function handleResponse(pool) {
    $scope.pool = pool;
  });

  // TODO: The two dialog functions could be generalized into a dialog service to keep DRY.
  $scope.addExpense = function addExpense(e) {
    $mdDialog.show({
      controller: 'AddExpensePoolExpenseDialogCtrl',
      templateUrl: 'app/expense-pool/expense/expense.add-dialog.html',
      parent: angular.element(document.body),
      targetEvent: e,
      clickOutsideToClose: true,
      fullscreen: $mdMedia('sm') || $mdMedia('xs'),
      locals: {
        expensePool: $scope.pool
      }
    }).then(function handleHide(result) {
      if (result) {
        $scope.pool.Expenses.unshift(result);
      }
    });
  };

  $scope.addUsers = function addExpense(e) {
    $mdDialog.show({
      controller: 'AddExpensePoolUsersDialogCtrl',
      templateUrl: 'app/expense-pool/user/user.add-dialog.html',
      parent: angular.element(document.body),
      targetEvent: e,
      clickOutsideToClose: true,
      fullscreen: $mdMedia('sm') || $mdMedia('xs'),
      locals: {
        expensePool: $scope.pool
      }
    }).then(function handleHide(results) {
      console.log(results);
      if (results && results.length) {
        [].push.apply($scope.pool.Users, results);
      }
    });
  };
});
