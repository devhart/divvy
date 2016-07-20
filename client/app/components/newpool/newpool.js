angular.module('newPoolApp', [])
.controller('newPoolCtrl', function($scope, $state, db) {
  
  $scope.toPools = function () {
    $state.go('poolsState');
  };

  $scope.addPool = function (pool) {
    pool.id = Math.floor(Math.random()*10000);
    pool.createdBy = 1;
    pool.expenses = [];
    pool.status = 'open';
    db.pools.push(pool);
    $state.go('poolsState');
  };

});