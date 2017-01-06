'use strict'

app.controller('dailyResultController',['$scope','$http','sessionService',function($scope,$http,sessionService){

    $scope.userIsLogged = sessionService.getUserAuthenticated();
    $scope.message = "You need to be logged to access other areas, but you can check the results here!";

    $scope.login = function(){

        $http.post('/api/user/userLogin', {login:$scope.userLogin, password:$scope.userPassword}).
        success(function(data) {
            if(data.userId !== undefined){
                sessionService.setUserAuthenticated(true);
                sessionService.setUserData(data);
                $scope.userIsLogged = sessionService.getUserAuthenticated();
            }else{
                $scope.message = "Wrong login or password";
            }
        }).error(function(data) {
            console.error(data);
        })
    }

    $http({
        method: 'GET',
        url: '/api/vote/dailyResult'
    }).then(function successCallback(response) {
        $scope.result = response.data;
    }, function errorCallback(response) {
        $scope.result = '';
    });

}]);