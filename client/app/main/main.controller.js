var app = angular.module('app');

app.controller('MainCtrl', function MainCtrl($scope, Auth) {
  $scope.login = Auth.login;
});
