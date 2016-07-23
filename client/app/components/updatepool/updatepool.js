var app = angular.module('updatePoolApp', []);

app.controller('updatePoolCtrl', function updatePoolCtrl($scope, $state, db, $stateParams) {
  $scope.pool = {};

  $scope.toPools = function toPools() {
    $state.go('poolsState');
  };

  $scope.closePool = function closePool() {
    for (var i = 0; i < db.pools.length; i++) {
      if (db.pools[i].id === +$stateParams.id) {
        db.pools[i].status = 'closed';
      }
    }
  };

  $scope.deletePool = function deletePool() {
    for (var i = 0; i < db.pools.length; i++) {
      if (db.pools[i].id === +$stateParams.id) {
        db.pools.splice(i, 1);
      }
    }
    $state.go('poolsState');
  };

  $scope.editPool = function editPool() {
    for (var i = 0; i < db.pools.length; i++) {
      if (db.pools[i].id === +$stateParams.id) {
        db.pools[i] = $scope.pool;
      }
    }
    $state.go('poolsState');
  };

  $scope.filterToPool = function filterToPool() {
    for (var i = 0; i < db.pools.length; i++) {
      if (db.pools[i].id === +$stateParams.id) {
        $scope.pool = db.pools[i];
      }
    }
  };
});
