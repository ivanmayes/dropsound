/*global define, require */

define(['app'], function(app) {
    'use strict';

    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('lobby', {
                    url: "/lobby",
                    templateUrl: "js/views/lobby.html",
                    controller: 'LobbyCtrl',
                    authenticate: true,
                    onEnter: function(RoomService) {
                        RoomService.queryForRooms();
                    }
                })
                .state('room', {
                    url: "/room/:roomId",
                    params: { roomName : 'Some Room', roomId : '' },
                    templateUrl: "js/views/room.html",
                    controller: 'RoomCtrl',
                    authenticate: true,
                    onEnter: function() {

                    },
                    onExit: function(RoomService) {
                        RoomService.leaveRoom();
                    }
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'js/views/login.html',
                    controller: 'LoginCtrl',
                    authenticate: false
                })
                .state('signup', {
                    url: '/signup',
                    templateUrl: 'js/views/signup.html',
                    controller: 'LoginCtrl',
                    authenticate: false
                })


            $urlRouterProvider.otherwise("/login");
    }]);


});
