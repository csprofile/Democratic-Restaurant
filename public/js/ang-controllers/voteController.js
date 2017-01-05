'use strict'

app.controller('voteController',['$scope','$http' , function($scope, $http){
    $scope.selectedRestaurant = {name:''};
    
    $http({
        method: 'GET',
        url: "/api/getCollection/restaurant"
    }).then(function successCallback(response) {
        $scope.restaurants = response.data;
    }, function errorCallback(response) {
        $scope.restaurants = '';
    });

    $scope.confirmVote = function(){
        $http.post('/api/vote',{userId:10, restaurantName:$scope.selectedRestaurant.name}).
        success(function(data) {
            console.log("posted successfully");
            console.log($scope);
        }).error(function(data) {
            console.error(data);
        })
    }
}]);