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
		$state.go('newExpensesState');
	};

	$scope.filterToPool = function () {
		console.log($stateParams)
		for (var i =0; i < db.pools.length; i++) {
			console.log('db.pools', db.pools[i].id)
			if (db.pools[i].id === +$stateParams.id) {
				$scope.expenses = db.pools[i].expenses;
			}
		}		
	};

});