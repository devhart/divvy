angular.module('poolApp', [])
.controller('poolCtrl', function($scope, $state, db, $stateParams) {

	$scope.expenses = [];
	// $scope.expenses = [{name: 'salad/salad dressing', amount: 10, participated: "yes"}, {name: 'chips & salsa', amount: 20, participated: "yes"}, 
	// {name: 'hotdog supplies', amount: 30, participated: "yes"}];

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

	$scope.filterToPool = function () {
		for (var i =0; i < db.pools.length; i++) {
			if (db.pools[i].id === +$stateParams.id) {
				$scope.expenses = db.pools[i].expenses;
			}
		}		
	};

});