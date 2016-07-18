angular.module('app', ['ui.router'])
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
		templateUrl: './app/components/pools/pools.html'
		//Add Controller - controller: 'poolsCtrl'
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
		url: '/pool',
		templateUrl: './app/components/pool/pool.html'
		// controller: 'poolCtrl'
	})
	.state('newExpensesState', {
		url: '/newExpense',
		templateUrl: './app/components/newExpenses/newExpenses.html'
		//Add Controller - controller: 'newExpensesCtrl'
	})
	.state('updateExpensesState', {
		url: '/updateExpense',
		templateUrl: './app/components/updateExpenses/updateExpenses.html'
		//Add Controller - controller: 'updateExpensesCtrl'
	})






});