angular.module('poolsApp', [])
.controller('poolsCtrl', function($scope, $state, db) {

  $scope.pools = db.pools;

  $scope.addPool = function () {
    $state.go('newPoolState');
  };

  $scope.goToPool = function(id) {
    $state.go('poolState', {id: id})
  };
});