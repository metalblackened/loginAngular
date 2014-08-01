var fileApp = angular.module('upload.services', []);

fileApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

fileApp.service('fileUpload', ['$http', function ($http) {
    this.uploadFile = function(file, uploadUrl){
        var formdata = new FormData();
        formdata.append('file', file);
        $http.post('/uploadxml', formdata, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(doneXml){
            console.log('yei' + doneXml);
        })
        .error(function(){
            console.log(':(');
        });
    }
}]);