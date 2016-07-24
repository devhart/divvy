var app = angular.module('app');

app.controller('NavbarCtrl', function NavbarCtrl($scope, $window, Auth) {
  Auth.getCurrentUserAsync().then(function handleUser(user) {
    $scope.user = user;
  });
});
