'use strict'

app.controller('suggestController',['$scope', '$http',function($scope,$http){
    $scope.showMessage = false;

    $scope.suggest = function(){
        $http.post('/api/restaurant',{name:$scope.restaurantName, address:$scope.restaurantAddress}).
        success(function(data) {
            $scope.message = "Your suggestion was included";
            $scope.messageClass = "success";
            $scope.showMessage = true;
        }).error(function(data) {
            $scope.message = "An error has occurred while creating your suggestion, try again latter.";
            $scope.messageClass = "danger";
            $scope.showMessage = false;
        })

        $scope.restaurantName = '';
        $scope.restaurantAddress = '';
    };

}]);