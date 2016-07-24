var app = angular.module('app');

app.controller('LoginCtrl', function LoginCtrl($scope, Auth) {
  $scope.login = Auth.login;
});
