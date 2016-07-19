angular.module('app', ['poolApp', 'ui.router', 'newExpenseApp', 'poolsApp', 'newPoolApp', 'updatePoolApp'])
.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/login');

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
		templateUrl: './app/components/newpool/newpool.html',
		controller: 'newPoolCtrl'
	})
	.state('updatePoolState', {
		url: '/updatePool/:id',
		templateUrl: './app/components/updatepool/updatepool.html',
		controller: 'updatePoolCtrl',
		params: {
			id: null
		}
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
		url: '/pool/:id/newExpense',
		templateUrl: './app/components/newExpenses/newExpenses.html',
		controller: 'newExpensesCtrl',
		params: {
			id: null
		}
	})
	.state('updateExpensesState', {
		url: '/pool/:id/updateExpense',
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
		status: 'open',
		createdBy: 1,
		expenses: [{
			id: 1,
			name: 'Napkins', 
			amount: 15,
			createdBy: 1,
			participated: "yes"
		},
		{
			id: 2,
			name: 'Cups',
			amount: 25,
			createdBy: 1,
			participated: "yes"
		}]
	};		

	return obj;
})