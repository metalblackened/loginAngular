/**
* signupCtrl Modul

*
* Description
*/
angular.module('loginCtrl', ['user.service'])
	.controller('loginController',function ($scope,$http,$location,dataUser){
		$scope.loginUser = {};

		$scope.authenticateUser = function(){
			
			
			$http.post('/login',$scope.loginUser)
			.success(function(response){
				console.log(response);
				if(response.alert){
					$scope.alertmsg = response.alert;
					$scope.alertshow = true;
				}
			
				if(response && response.local){
					dataUser.setData(response.local.username);
					console.log(dataUser.getData());

						if(response.local.role == "admin"){
							$location.url('/signup');
						}else if(response.local.role == "proveedor"){
							
							$location.url('/admin');
						}
				}
				 
				 
			})
			.error(function(data){
				console.log('Error' + data);
			});

		}


	});