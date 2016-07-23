var app = angular.module('newPoolApp', []);

app.controller('newPoolCtrl', function newPoolCtrl($scope, $state, db) {
  $scope.toPools = function toPools() {
    $state.go('poolsState');
  };

  $scope.addPool = function addPool(pool) {
    pool.id = Math.floor(Math.random() * 10000);
    pool.createdBy = 1;
    pool.expenses = [];
    pool.status = 'open';
    db.pools.push(pool);
    $state.go('poolsState');
  };
});
