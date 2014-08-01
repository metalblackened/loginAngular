/**
 * user.service Modul
 *
 * Description
 */
angular.module('user.service', [])
  .factory('dataUser', function($q, $timeout, $http, $location, $rootScope, $window) {

    angular.element($window)
      .on('storage', function(event) {
        if (event.key === 'usernameSession') {
          $rootScope.$apply();
        }
      });

    return  {
      //================================================
      // checamos ssi el proveedor esta logeado
      //================================================
      loggedin: function(role) {
        // Initialize a new promise
        var deferred = $q.defer();

        // Make an AJAX call to check if the user is logged in
        $http.get('/loggedin')
          .success(function(user) {
            // Authenticated
            if (user !== '0' && user.local.role == role) {
              username = user.local.username;
              $timeout(deferred.resolve, 0);
            }

            // Not Authenticated
            else {
              $rootScope.message = 'You need to log in.';
              $timeout(function() {
                deferred.reject();
              }, 0);
              $location.url('/login');
            }
          });

        return deferred.promise;
      },
      setData: function(val) {
        $window.localStorage && $window.localStorage.setItem('usernameSession', val);
        return this;
      },
      getData: function() {
        return $window.localStorage && $window.localStorage.getItem('usernameSession');
      }
    };
  });