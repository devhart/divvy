var module = angular.module('app.auth');

module.factory('Auth', function Auth($cookies, $q, $window, User) {
  var currentUser = {};
  if ($cookies.get('token')) {
    currentUser = User.me();
  }

  var logout = function logout() {
    $cookies.remove('token');
    currentUser = {};
  };

  var login = {
    facebook: function facebook() {
      $window.location = '/auth/facebook';
    }
  };

  var getCurrentUser = function getCurrentUser() {
    return currentUser;
  };

  var getCurrentUserAsync = function getCurrentUserAsync() {
    var promiseOrUser = currentUser.hasOwnProperty('$promise') ? currentUser.$promise : currentUser;
    return $q.when(promiseOrUser).then(function handleUser(user) {
      return user;
    });
  };

  var isLoggedIn = function isLoggedIn() {
    return currentUser.hasOwnProperty('name');
  };

  var isLoggedInAsync = function isLoggedInAsync() {
    return getCurrentUserAsync().then(function checkUserLoginStatus(user) {
      return user.hasOwnProperty('name');
    });
  };

  var required = function authRequired() {
    var deferred = $q.defer();
    isLoggedInAsync().then(function handleLoginState(loggedIn) {
      if (loggedIn) {
        deferred.resolve({});
      } else {
        deferred.reject({redirectTo: 'login'});
      }
    });
    return deferred.promise;
  };

  return {
    logout: logout,
    login: login,
    getCurrentUser: getCurrentUser,
    getCurrentUserAsync: getCurrentUserAsync,
    isLoggedIn: isLoggedIn,
    isLoggedInAsync: isLoggedInAsync,
    required: required
  };
});
