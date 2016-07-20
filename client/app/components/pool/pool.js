angular.module('poolApp', [])
.controller('poolCtrl', function($scope, $state, db, $stateParams) {

	$scope.expenses = [];
	$scope.pool = {};

	$scope.participateClick = function (participated, index) {
		if(participated === "yes") {
			$scope.expenses[index].participated = "no";
		} else {
			$scope.expenses[index].participated = "yes";
		}
	};

	$scope.toAddExpense = function () {
		$state.go('newExpensesState', {id: $stateParams.id});
	};

	$scope.toEditExpense = function (id) {
		$state.go('updateExpensesState', {poolid: $stateParams.id, expenseid: id });
	};

	$scope.filterToPool = function () {
		for (var i =0; i < db.pools.length; i++) {
			if (db.pools[i].id === +$stateParams.id) {
				$scope.pool = db.pools[i];
				$scope.pool.total = 0;
				$scope.expenses = db.pools[i].expenses;
				for (var j = 0; j < db.pools[i].expenses.length; j++) {
				$scope.pool.total += +db.pools[i].expenses[j].amount;
					
				}
			}
		}		
	};

});