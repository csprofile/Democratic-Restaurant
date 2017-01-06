'use strict'

app.controller('suggestController',['$scope', '$http',function($scope,$http){

    $scope.suggest = function(){
        $http.post('/api/restaurant',{name:$scope.restaurantName, address:$scope.restaurantAddress}).
        success(function(data) {
            console.log("posted successfully");
            console.log($scope);
        }).error(function(data) {
            console.error(data);
        })
        
        $scope.restaurantName = '';
        $scope.restaurantAddress = '';
    };

}]);