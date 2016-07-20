angular.module('updatePoolApp', [])
.controller('updatePoolCtrl', function($scope, $state, db, $stateParams) {
  
  $scope.pool = {};

  $scope.toPools = function () {
    $state.go('poolsState');
  };

  $scope.closePool = function () {
    for (var i =0; i < db.pools.length; i++) {
      if (db.pools[i].id === +$stateParams.id) {
        db.pools[i].status = 'closed';
      }
    } 
  };

  $scope.deletePool = function () {
    

    for (var i =0; i < db.pools.length; i++) {
      if (db.pools[i].id === +$stateParams.id) {
        db.pools.splice(i,1);
      }
    } 

    $state.go('poolsState');

  };

  $scope.editPool = function () {
    
    for (var i =0; i < db.pools.length; i++) {
      if (db.pools[i].id === +$stateParams.id) {
        db.pools[i] = $scope.pool;
      }
    } 

    $state.go('poolsState');
  };

  $scope.filterToPool = function () {
    for (var i =0; i < db.pools.length; i++) {
      if (db.pools[i].id === +$stateParams.id) {
        $scope.pool = db.pools[i];
      }
    }   
  };

});