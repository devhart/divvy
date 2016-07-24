var module = angular.module('app.auth');

module.factory('authInterceptor', function authInterceptor($rootScope, $q, $cookies, $injector) {
  return {
    // Add authorization token to headers
    request: function handleRequest(config) {
      config.headers = config.headers || {};
      if ($cookies.get('token')) {
        config.headers.Authorization = 'Bearer ' + $cookies.get('token');
      }
      return config;
    },

    // Intercept 401s and redirect you to login
    responseError: function handleResponseError(response) {
      if (response.status === 401) {
        $cookies.remove('token');
        // Use injector to get around circular dependency.
        $injector.get('$state').go('login');
      }
      return $q.reject(response);
    }
  };
});
