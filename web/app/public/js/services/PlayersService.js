define(['angular'], function(angular) {
    'use strict';

    var factory = function($http, $q, $window, $rootScope, socket) {

        var services = {
            addPlayerToRoom: addPlayerToRoom
        };

        function addPlayerToRoom(room) {
            console.log('Adding player', room);
            room.user = $rootScope.user;
            socket.emit('newPlayer', room);
        }


        //
        //  Socket Operations
        //


        // Return all our public functions
        return services;

    };

    factory.$inject = ['$http', '$q', '$window', '$rootScope', 'socket'];
    return factory;
});
