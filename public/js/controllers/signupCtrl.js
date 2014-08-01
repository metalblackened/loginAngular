/**
* signupCtrl Modul

*
* Description
*/
angular.module('signupCtrl', [])
	.controller('signupController',function ($scope,$http){
		$scope.signUser = {};

		$scope.authenticateUser = function(){
			
			$scope.alertshow = false;
			$http.post('/signup',$scope.signUser)
			.success(function(response){
				console.log(response);
				if(response.alert){
					$scope.alertmsg = response.alert;
					$scope.alertshow = true;
				}else{
					console.log(response);
				}
			});
		}


	});