define(['angular'], function(angular) {
    'use strict';

    var factory = function($http, $q, $window, $rootScope, RoomService, socket) {
        var services = {
            changeTopic: changeTopic,
            removePlaylist: removePlaylist,
            removeFromPlaylist: removeFromPlaylist,
            toggleLive: toggleLive
        };

        function changeTopic(room) {
            var params = {
                room: room
            }
            socket.emit('admin:changeTopic', params);
        }

        function removePlaylist(room) {
            var params = {
                room: room,
                test: 'test'
            };
            socket.emit('admin:removePlaylist', params);
        }

        function removeFromPlaylist(event, video, room) {
            event.preventDefault();
            var params = {
                video: video,
                room: room
            };
            socket.emit('admin:removeFromPlaylist', params);
        }

        function toggleLive(room) {
            var params = {
                room: room,
                isLive: ($rootScope.isLive) ? false : true
            };

            socket.emit('admin:toggleLive', params);
        }

        return services;
    };

    factory.$inject = ['$http', '$q', '$window', '$rootScope', 'RoomService', 'socket'];
    return factory;
})
