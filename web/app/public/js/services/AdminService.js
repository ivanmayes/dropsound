define(['angular'], function(angular) {
    'use strict';

    var factory = function($http, $q, $window, $rootScope, RoomService, socket) {
        var services = {
            sayHi : sayHi,
            removePlaylist : removePlaylist,
            removeFromPlaylist : removeFromPlaylist
        };

        function sayHi() {
            var params = {
                msg : 'Hello!'
            }
            console.log('saying hi');
            socket.emit('admin:say', params);
        }

        function changeTopic(topic, room) {
            if(topic) {
                var params = {
                    room : room,
                    topic : topic
                }
                socket.emit('admin:changeTopic', params);
            }

        }

        function removePlaylist(room) {
            var params = {
                room : room,
                test : 'test'
            };
            socket.emit('admin:removePlaylist', params);
        }

        function removeFromPlaylist(video, room) {
            var params = {
                video : video,
                room : room
            };
            socket.emit('admin:removeFromPlaylist', params);
        }

        return services;
    };

    factory.$inject = ['$http', '$q', '$window', '$rootScope', 'RoomService', 'socket'];
    return factory;
})
