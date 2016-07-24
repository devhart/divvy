var app = angular.module('app.auth');

app.factory('User', function User($resource) {
  return $resource('/api/users/:userId/:controller/:selector', {
    userId: '@_id'
  }, {
    me: {
      method: 'GET',
      params: {
        controller: 'me'
      }
    },
    expensePools: {
      method: 'GET',
      params: {
        controller: 'me',
        selector: 'expense-pools'
      },
      isArray: true
    }
  });
});
