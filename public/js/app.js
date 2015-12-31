"use strict";

angular.module("header", []);

angular.module('App', ["header", "ui.router"]);

angular.module('App').config(['$stateProvider', '$urlRouterProvider', 'CONSTS', function ($stateProvider, $urlRouterProvider, CONSTS) {

    $urlRouterProvider.otherwise('/index');

    $stateProvider.state('index', {
        abstract: true,
        url: '',
        views: {
            '': {
                templateUrl: CONSTS.pathToModules + 'main/views/main.html'
            },
            header: {
                templateUrl: CONSTS.pathToModules + 'header/views/header.html'
            }
        }
    }).state('index.main', {
        url: '/index',
        views: {
            leftPanel: {
                templateUrl: CONSTS.pathToModules + 'leftPanel/views/left_panel.html'
            }
        }
    });
}]);

angular.module('App').constant('CONSTS', (function () {
    return {
        pathToModules: './modules/'
    };
})());