define(['angular'], function(angular) {
    'use strict';

    var factory = function($http, $q, $window, $rootScope, socket) {

        var currentRooms= [],
            currentRoom,
            currentRoomCount = 0,
            services = {
                addVideoToPlaylist: addVideoToPlaylist,
                currentRoom: currentRoom,
                getRoom: getRoom,
                getRooms: getRooms,
                queryForRooms: queryForRooms
            };

        function addVideoToPlaylist(video) {
            video.addedBy = $rootScope.user;
            console.log(currentRoom);
            var data = {
                room: currentRoom,
                video: video
            }
            socket.emit('addVideo', data);
        }

        function getPlayerIndexById(id, map) {
            for (var i = 0; i < map.players.length; i++) {
              var player = map.players[i];
              if (player.id === id) {
                return i;
              }
            }
        };

        function getRooms() {
            return currentRooms;
        };

        function getRoom(id) {
            return getRoomById(id);
        };

        function getRoomById(id) {
            for (var i = 0; i < currentRooms.length; i++) {
              if (currentRooms[i].id === id) {
                return currentRooms[i];
              }
            }
            return false;
        };

        function queryForRooms() {
            console.log('getting Rooms');
            socket.emit('getRooms');
        }


        //
        //  Socket Operations
        //

        socket.on('getAllRooms', function(rooms) {
          currentRooms = rooms;
          console.log('got Rooms', rooms);
          $rootScope.$broadcast('room:update');
        });

        socket.on('roomUpdated', function(data) {
            console.log('roomUpdated', data);
            currentRoom = data.room;
            $rootScope.$broadcast('room:update', data.room);
        });

        // Return all our public functions
        return services;

    };

    factory.$inject = ['$http', '$q', '$window', '$rootScope', 'socket'];
    return factory;
});
