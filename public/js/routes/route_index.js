'use strict';

angular.module('App').config([
    '$stateProvider',
    '$urlRouterProvider',
    'CONSTS',
    ($stateProvider, $urlRouterProvider, CONSTS) => {

        $urlRouterProvider.otherwise('/index');

        $stateProvider
            .state('index', {
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
            })
            .state('index.main', {
                url: '/index',
                views: {
                    leftPanel: {
                        templateUrl: CONSTS.pathToModules + 'leftPanel/views/left_panel.html'
                    }
                }
            });
    }
]);