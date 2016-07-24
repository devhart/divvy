var module = angular.module('app.auth');

module.factory('Auth', function Auth(User, $cookies) {
  var currentUser = {};
  if ($cookies.get('token')) {
    currentUser = User.me();
  }
  return {
    logout: function logout() {
      $cookies.remove('token');
      currentUser = {};
    },
    getCurrentUser: function getCurrentUser() {
      return currentUser;
    },
    isLoggedIn: function isLoggedIn() {
      return currentUser.hasOwnProperty('name');
    },
    isLoggedInAsync: function isLoggedInAsync() {
      if ($cookies.get('token')) {
        return User.me();
      }
      return currentUser;
    }
  };
});
