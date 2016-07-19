angular.module('app', ['poolApp', 'ui.router', 'newExpenseApp', 'poolsApp'])
.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('loginState', {
		url: '/login',
		templateUrl: './app/components/login/login.html'
		//Placeholder for LOGIN CONTROLLER (if needed)
	})
	.state('poolsState', {
		url: '/pools',
		templateUrl: './app/components/pools/pools.html',
		controller: 'poolsCtrl'
	})
	.state('newPoolState', {
		url: '/newPool',
		templateUrl: './app/components/newpool/newpool.html'
		//Add Controller - controller: 'newPoolCtrl'
	})
	.state('updatePoolState', {
		url: '/updatePool',
		templateUrl: './app/components/updatepool/updatepool.html'
		//Add Controller - controller: 'updatePoolCtrl'
	})
	.state('poolState', {
		url: '/pool/:id',
		templateUrl: './app/components/pool/pool.html',
		controller: 'poolCtrl',
		params: {
			id: null
		}
	})
	.state('newExpensesState', {
		url: '/newExpense',
		templateUrl: './app/components/newExpenses/newExpenses.html',
		controller: 'newExpensesCtrl'
	})
	.state('updateExpensesState', {
		url: '/updateExpense',
		templateUrl: './app/components/updateExpenses/updateExpenses.html'
		//Add Controller - controller: 'updateExpensesCtrl'
	})
})
.factory('db', function(){
	var obj = {};

	obj.pools = [];
	obj.pools[0] = {
		id: 1,
		name: 'Wine Tour',
		open: true,
		expenses: [{
			id: 1,
			name: 'Napkins', 
			amount: 15,
			participated: "yes"
		},
		{
			id: 2,
			name: 'Cups',
			amount: 25,
			participated: "yes"
		}]
	};		

	return obj;
})