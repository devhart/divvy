var app = angular.module('app');

/**
 * NOTE: This is a completely unmaintainable way to select users to add to the expensePool.
 * Every time this dialog is opened, the entire app user table is sent to the client.
 */
app.controller('AddExpensePoolUsersDialogCtrl',
  function AddExpensePoolUsersDialogCtrl($scope, $mdDialog, $q, ExpensePool, User, expensePool) {
    $scope.hide = function hide() {
      $mdDialog.hide();
    };

    $scope.cancel = function cancel() {
      $mdDialog.cancel();
    };

    // TODO: Handle server errors.
    $scope.done = function submit() {
      $scope.pending = true;
      $q.all($scope.selected.map(function addUser(user) {
        return ExpensePool.addUser({ expensePoolId: expensePool._id }, { userId: user._id });
      })).then(function allAdded(addedUsers) {
        $mdDialog.hide(addedUsers);
      });
    };

    $scope.pool = expensePool;

    // NOTE: Hash table used to filter out users that are already members expense pool
    $scope.membersHash = Object.create(null);
    expensePool.Users.forEach(function indexUser(user) {
      $scope.membersHash[user._id] = true;
    });

    $scope.selected = [];

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(contact) {
        return (contact._lowername.indexOf(lowercaseQuery) !== -1) ||
          (contact._loweremail.indexOf(lowercaseQuery) !== -1);
      };
    }

    $scope.querySearch = function querySearch(criteria) {
      return criteria ? $scope.allUsers.filter(createFilterFor(criteria)) : [];
    };

    User.query().$promise.then(function handleUserQuery(users) {
      $scope.allUsers = users.filter(function notMemberFilter(user) {
        return !(user._id in $scope.membersHash);
      }).map(function transformForQuery(user) {
        user._lowername = user.name.toLowerCase();
        user._loweremail = user.email.toLowerCase();
        return user;
      });
    });
  });
