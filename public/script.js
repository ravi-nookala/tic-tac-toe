// script.js

   
    var app = angular.module('gameApp', ['ngRoute','firebase']);
     // configure our routes
    app.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {

                templateUrl : 'Pages/home.html',
                controller  : 'homeCtrl'
            })

            // route for the game page
            .when('/game/:param', {
                templateUrl : 'Pages/game.html',
                controller  : 'gameCtrl'
                // controller  : 'aboutController'
            })
    });

    