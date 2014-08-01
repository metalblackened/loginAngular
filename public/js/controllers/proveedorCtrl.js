/**
* proveedorCtrl Module
*
* Description
*/
angular.module('proveedorCtrl', ['user.service','upload.services'])
	.controller('proveedorController',function ($scope,dataUser,fileUpload){
		$scope.proveedor = dataUser.getData();

		$scope.uploadFile = function(){
        	var file = $scope.myFile;
        	console.log('file is ' + JSON.stringify(file));
        	var uploadUrl = "/fileUpload";
       		fileUpload.uploadFile(file);
   		 };
	});