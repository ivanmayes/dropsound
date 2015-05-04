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
                queryForRooms: queryForRooms,
                voteForVideo: voteForVideo,
                leaveRoom: leaveRoom
            };

        function addVideoToPlaylist(video) {
            video.addedBy = $rootScope.user;
            console.log(currentRoom);
            var params = {
                room: currentRoom,
                video: video
            }
            socket.emit('addVideo', params);
        }

        function voteForVideo(video) {
            var params = {
                room: currentRoom,
                video: video
            }
            console.log('Voting for Video', video);
            socket.emit('voteForVideo', params);
        }

        function getPlayerIndexById(id, map) {
            for (var i = 0; i < map.players.length; i++) {
              var player = map.players[i];
              if (player.id === id) {
                return i;
              }
            }
        };

        function leaveRoom() {
            socket.emit('playerLeftMap');
            currentRoom = null;
        }

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
            //console.log('roomUpdated', data);
            currentRoom = data.room;

            $rootScope.$broadcast('room:update', data.room);
        });

        socket.on('roomInit', function(data) {
            if(data.currentVideoSync) {
                data.room.currentVideoSync = data.currentVideoSync;
            }

            currentRoom = data.room;

            $rootScope.$broadcast('room:update', data.room);
        })

        // TODO pretty this up
        socket.on('gameUpdated:remove', function(data) {
            //alert('GAME UPDATED!!!');
            currentRoom.players = data.allPlayers;
        });

        // Return all our public functions
        return services;

    };

    factory.$inject = ['$http', '$q', '$window', '$rootScope', 'socket'];
    return factory;
});
