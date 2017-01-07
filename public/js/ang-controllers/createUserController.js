'use strict'

app.controller('createUserController',['$scope','$http',function($scope,$http){
    $scope.created = false;

    $scope.createUser = function(){
        $http.post('/api/user/create', {login:$scope.login, password:$scope.pass}).
        success(function(data) {
            $scope.login = "";
            $scope.pass = "";
            $scope.message = "New user created!"
            $scope.messageClass = "success";
            $scope.created = true;
        }).error(function(data) {
            $scope.message = "An error has occurred while creating new user, try again latter."
            $scope.messageClass = "danger";
            $scope.created = false;
        })
    }

}]);