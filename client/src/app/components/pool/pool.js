angular.module('poolApp', [])
.controller('poolCtrl', function($scope, $state) {

	$scope.expenses = [{expense: 'salad/salad dressing', amount: 10, participated: "yes"}, {expense: 'chips & salsa', amount: 20, participated: "yes"}, 
	{expense: 'hotdog supplies', amount: 30, participated: "yes"}];

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

});