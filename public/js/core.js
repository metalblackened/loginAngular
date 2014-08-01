var app = angular.module("app", ["ngRoute","signupCtrl","loginCtrl","proveedorCtrl","user.service"]);

app.config(function ($routeProvider, $locationProvider) {

	

     //================================================
    // Check if the user is connected
    //================================================
    var adminLoggedin = function($q, $timeout, $http, $location, $rootScope){
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user){
        // Authenticated
        if (user !== '0' && user.local.role == "admin")
          $timeout(deferred.resolve, 0);

        // Not Authenticated
        else {
          $rootScope.message = 'You need to log in.';
          $timeout(function(){deferred.reject();}, 0);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };
    //==============================

	$locationProvider.html5Mode(true);
    $routeProvider
      .when('/',{
      	templateUrl:'views/routes.html'
      }) 
      .when('/login',
      {
        templateUrl: "views/login.html",
        controller : "loginController"
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller : 'proveedorController',
        resolve: {
          loggedin: function (dataUser){
            return dataUser.loggedin("proveedor");
          }
        }
      })
      .when('/signup',{
      	templateUrl : "views/signup.html",
      	controller: "signupController",
        resolve: {
          loggedin: function (dataUser){
            return dataUser.loggedin("admin");
          }
        }
      })
      
});
