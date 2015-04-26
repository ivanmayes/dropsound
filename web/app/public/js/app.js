/*global define, require */

define(['angular',
    'uiRouter',
    'socketIo',
    'angularYoutube',
    'config',
    'filters/filters',
    'services/services',
    'directives/directives',
    'controllers/controllers'
], function(angular, uiRouter) {
        'use strict';

        var app = angular.module('app', [
            'app.controllers',
            'app.filters',
            'app.services',
            'app.directives',
            'app.config',
            'ui.router',
            'btford.socket-io',
            'youtube-embed'
        ]);

        app.run(function($rootScope, $state, UserService, socket) {

            $rootScope.token = UserService.getAccessToken();
            $rootScope.user = UserService.getUserSettings();

            // Check if Page requires authentication
            $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
                if (toState.authenticate && !UserService.isLoggedIn()) {
                    // User isn’t authenticated
                    console.log('Not logged in');
                    $state.transitionTo('login');
                    event.preventDefault();

                }
                console.log('Route changed');

            });

            // Route change socket emit
            socket.on('route', function(data) {
                console.log('received route change');
                $state.transitionTo(data.path);
            });

            // Route change socket emit
            socket.on('connected', function(data) {
                console.log('someone else connected');
            });

        });

        app.factory('socket', function(socketFactory) {
            var socket = socketFactory();
            socket.forward('broadcast');
            return socket;
        });

        return app;

    });
