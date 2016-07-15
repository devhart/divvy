angular.module('app', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('state1', {
		url: '/',
		urlTemplate: '/client/src/index.html'
	});





});