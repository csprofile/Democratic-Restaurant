'use strict'

app.controller('dailyResultController',['$scope','$http',function($scope,$http){
    $http({
        method: 'GET',
        url: '/api/vote/dailyResult'
    }).then(function successCallback(response) {
       $scope.result = response.data;
    }, function errorCallback(response) {
        $scope.result = '';
    });
}]);