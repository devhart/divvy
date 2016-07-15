angular.module('app', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('loginState', {
		url: '/login',
		urlTemplate: '/components/login/login.html'
		//Placeholder for LOGIN CONTROLLER (if needed)
	})
	.state('poolsState', {
		url: '/pools',
		urlTemplate: '/components/pools/pools.html'
		//Add Controller - controller: 'poolsCtrl'
	})
	.state('newPoolState', {
		url: '/newPool',
		urlTemplate: '/components/newpool/newpool.html'
		//Add Controller - controller: 'newPoolCtrl'
	})
	.state('updatePoolState', {
		url: '/updatePool',
		urlTemplate: '/components/updatepool/updatepool.html'
		//Add Controller - controller: 'updatePoolCtrl'
	})
	.state('poolState', {
		url: '/pool',
		urlTemplate: '/components/pool/pool.html'
		//Add Controller - controller: 'poolCtrl'
	})
	.state('newExpensesState', {
		url: '/newExpense',
		urlTemplate: '/components/newExpenses/newExpenses.html'
		//Add Controller - controller: 'newExpensesCtrl'
	})
	.state('updateExpensesState', {
		url: '/updateExpense',
		urlTemplate: '/components/updateExpenses/updateExpenses.html'
		//Add Controller - controller: 'updateExpensesCtrl'
	})






});