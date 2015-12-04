define(['angular'], function(angular) {
    'use strict';

    var factory = function($http, $q, $window, $rootScope, socket) {
        var currentRooms = [],
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
            video.votes++;
        }

        function getVideoIndexById(id, map) {
            for (var i = 0; i < map.playlist.length; i++) {
                var video = map.playlist[i];
                console.log(id, video);
                if (video.id.videoId === id) {
                    return i;
                }
            }
        }

        function getPlayerIndexById(id, map) {
            for (var i = 0; i < map.players.length; i++) {
                var player = map.players[i];
                if (player.id === id) {
                    return i;
                }
            }
        }

        function leaveRoom() {
            socket.emit('playerLeftMap');
            currentRoom = null;
        }

        function getRooms() {
            return currentRooms;
        }

        function getRoom(id) {
            return getRoomById(id);
        }

        function getRoomById(id) {
            for (var i = 0; i < currentRooms.length; i++) {
                if (currentRooms[i].id === id) {
                    return currentRooms[i];
                }
            }
            return false;
        }

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

        // Individual room updates
        socket.on('room:update:topic', function(data) {
            currentRoom.topic = data.topic;
        });

        socket.on('room:update:player:add', function(data) {
            currentRoom.players.push(data.player);
            $rootScope.$broadcast('room:update', currentRoom);
        });

        socket.on('room:update:player:remove', function(data) {
            var index = getPlayerIndexById(data.player.id, currentRoom);

            currentRoom.players.splice(index, 1);
        });

        socket.on('room:update:videos:add', function(data) {
            if (!currentRoom.playlist) {
                currentRoom.playlist = [];
            }
            currentRoom.playlist.push(data.video);
            $rootScope.$broadcast('room:update', currentRoom);
        });

        socket.on('room:update:videos', function(data) {
            if (currentRoom.currentVideo) {
                currentRoom.currentVideo.votes = [];
                currentRoom.playlist.push(currentRoom.currentVideo);
                // todo check to see if this is the current video
                currentRoom.playlist = currentRoom.playlist.slice(1);
            }

            currentRoom.currentVideo = data.currentVideo;
            currentRoom.currentVideoStartTime = data.currentVideoStartTime;
            /*if (data.playlist) {
                currentRoom.playlist = data.playlist;
            }*/
            $rootScope.$broadcast('room:update', currentRoom);
        });

        socket.on('room:update:video:votes', function(data) {
            var index = getVideoIndexById(data.id, currentRoom);

            console.log(index, data.votes);


            currentRoom.playlist[index].votes = data.votes;
            currentRoom.playlist[index].modified = data.modified;
            $rootScope.$broadcast('room:update', currentRoom);
        });

        // TODO pretty this up
        socket.on('gameUpdated:remove', function(data) {
            //alert('GAME UPDATED!!!');
            currentRoom.players = data.allPlayers;
        });

        //Admin
        socket.on('admin:say', function(data) {
            $rootScope.$broadcast('admin:say', data.msg);
        });

        socket.on('player:heartbeat:response', function(data) {
            $rootScope.$broadcast('player:heartbeat:response', data.msg);
        });

        // Return all our public functions
        return services;

    };

    factory.$inject = ['$http', '$q', '$window', '$rootScope', 'socket'];
    return factory;
});
