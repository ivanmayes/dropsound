define(['angular'], function(angular) {
    'use strict';

    var factory = function($http, $q, $window, $rootScope, RoomService, socket) {
        var services = {
            changeTopic: changeTopic,
            removePlaylist: removePlaylist,
            removeFromPlaylist: removeFromPlaylist
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

        function removeFromPlaylist($event, video, room) {
            $event.stopPropagation();
            var params = {
                video: video,
                room: room
            };
            socket.emit('admin:removeFromPlaylist', params);
        }

        return services;
    };

    factory.$inject = ['$http', '$q', '$window', '$rootScope', 'RoomService', 'socket'];
    return factory;
})
