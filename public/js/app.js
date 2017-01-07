'use strict'

// MODULE
var app = angular.module('app', ['ngRoute']);

// ROUTES
app.config(['$routeProvider',function ($routeProvider) {

    $routeProvider.

    when('/', {
        templateUrl: '/partials/dayliResult.htm',
        controller: 'dailyResultController',
        requireLogin:false
    }).
    when('/dailyResult', {
        templateUrl: '/partials/dayliResult.htm',
        controller: 'dailyResultController',
        requireLogin:false
    }).
    when('/vote', {
        templateUrl: '/partials/vote.htm',
        controller: 'voteController',
        requireLogin:true
    }).
    when('/suggest', {
        templateUrl: '/partials/suggest.htm',
        controller: 'suggestController',
        requireLogin:true
    }).
    when('/createUser', {
        templateUrl: '/partials/createUser.htm',
        controller: 'createUserController',
        requireLogin:false
    })

}]).run(['$rootScope','$route','$location','sessionService',function($rootScope,$route,$location,sessionService){
    //Check if user is logged
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        if(next){
            if(next.$$route.requireLogin && !sessionService.getUserAuthenticated()) {
                $location.path('/');
                event.preventDefault();
            }
        }else{
            $location.path('/');
        }
    });

}]);