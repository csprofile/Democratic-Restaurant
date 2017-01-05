'use strict'

// MODULE
var app = angular.module('app', ['ngRoute']);

// ROUTES
app.config(function ($routeProvider) {

    $routeProvider

    .when('/', {
        templateUrl: '/partials/dayliResult.htm',
        controller: 'dailyResultController'
    })
    .when('/dailyResult', {
        templateUrl: '/partials/dayliResult.htm',
        controller: 'dailyResultController'
    })
    .when('/vote', {
        templateUrl: '/partials/vote.htm',
        controller: 'voteController'
    })
    
});