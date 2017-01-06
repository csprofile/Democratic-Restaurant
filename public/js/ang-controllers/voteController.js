'use strict'

app.controller('voteController',['$scope','$http','sessionService', function($scope, $http, sessionService){
    var userData = sessionService.getUserData();

    $scope.selectedRestaurant = {id:''};
    $scope.voted = !$.isEmptyObject(userData.userTodaysVote);
    $scope.message = 'Your vote has been successfully registered.';
    $scope.messageClass = 'success';

    if(!$scope.voted){
        $http({
            method: 'GET',
            url: "/api/getCollection/restaurant"
        }).then(function successCallback(response) {
            $scope.restaurants = response.data;
        }, function errorCallback(response) {
            $scope.restaurants = '';
        });
    }

    $scope.confirmVote = function(){
        $http.post('/api/vote',{userId:userData.userId, restaurantId:$scope.selectedRestaurant.id}).
        success(function(data) {
            $scope.voted = true;
            sessionService.setUserData({
                userId:userData.userId,
                userTodaysVote:{
                    userId:userData.userId,
                    restaurantId:$scope.selectedRestaurant.id
                }
            });
        }).error(function(data) {
            $scope.voted = true;
            $scope.messageClass = 'danger';
            $scope.message = 'Your vote was not recorded due to server failure. Try again letter.';
        });

        $scope.selectedRestaurant.id = '';
    }
}]);