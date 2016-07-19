angular.module('poolsApp', [])
.controller('poolsCtrl', function($scope, $state, db) {

  $scope.pools = db.pools;

  $scope.addPool = function () {
    $state.go('newPoolState');
  };

  $scope.goToPool = function(id) {
    $state.go('poolState', {id: id})
  };

  $scope.editPool = function(id) {
    $state.go('updatePoolState', {id: id})
  }

  $scope.filterToPool = function () {
    for (var i =0; i < db.pools.length; i++) {
      if (db.pools[i].id === +$stateParams.id) {
        $scope.expenses = db.pools[i].expenses;
      }
    }   
  };
});