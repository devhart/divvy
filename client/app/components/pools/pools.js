var app = angular.module('poolsApp', []);

app.controller('poolsCtrl', function poolsCtrl($scope, $state, $stateParams, db) {
  $scope.pools = db.pools;

  $scope.addPool = function addPool() {
    $state.go('newPoolState');
  };

  $scope.goToPool = function goToPool(id) {
    $state.go('poolState', { id: id });
  };

  $scope.editPool = function editPool(id) {
    $state.go('updatePoolState', { id: id });
  };

  $scope.filterToPool = function filterToPool() {
    for (var i = 0; i < db.pools.length; i++) {
      if (db.pools[i].id === +$stateParams.id) {
        $scope.expenses = db.pools[i].expenses;
      }
    }
  };
});
