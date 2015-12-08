// routes/io.js
module.exports = (function(app, io, server) {

    var _ = require('lodash');
    var Room = require('./../models/Room');
    var Player = require('./../models/Player');
    var jf = require('jsonfile');
    var currentVideoTimer; // timeout timer for current video

    var r = require('./../config/state.json');

    // Game data
    var g = {
        "players": [],
        "rooms": {}
    };

    var rData = {
        id: 1,
        name: 'Shoptology DJ',
        topic: 'Off Topic',
    };

    /*if(r) {
      rData = r;
      rData.players = [];
    }*/

    // Create room for now
    var room = new Room(rData);

    g.rooms[1] = room;

    var s = io.listen(server);

    // This function sends updated room data to the specified room id
    function videoSync(id, syncPlaylist) {
        var data = {
            currentVideo: g.rooms[id].currentVideo,
            currentVideoStartTime: g.rooms[id].currentVideoStartTime
        };

        if (syncPlaylist) {
            //data.playlist = g.rooms[id].playlist;
        }

        s
            .to(id)
            .emit('room:update:videos', data);
    }

    s.on('connection', function onConnection(socket) {
        console.log('Client has connected: ' + socket.id);

        socket.emit('connected', {
            id: socket.id
        });

        socket.on('route', function(data) {
            console.log('Received route change');
            socket.broadcast.emit('route', data);
        });

        var player = new Player({
            id: socket.id
        });
        g.players.push(player);

        socket.on('addVideo', onAddVideo);
        socket.on('voteForVideo', onVoteForVideo);
        socket.on('newPlayer', onNewPlayer);
        socket.on('getRooms', onGetRooms);
        socket.on('disconnect', onDisconnect);
        socket.on('playerLeftMap', onPlayerLeftMap);
        socket.on('player:heartbeat', onPlayerHeartbeat);

        //Admin
        var admin = {
            changeTopic: function(data) {
                var player = playerById(this.id);

                if (player.isAdmin) {
                    g.rooms[data.room.id].topic = data.room.topic;

                    s
                        .to(data.room.id)
                        .emit('room:update:topic', {
                            topic: data.room.topic
                        });
                }
            },
            removePlaylist: function(data) {
                var player = playerById(this.id);

                if (player.isAdmin) {
                    g.rooms[data.room.id].playlist = [];
                    g.rooms[data.room.id].currentVideo = null;
                    g.rooms[data.room.id].currentVideoStartTime = false;

                    console.log(g.rooms[data.room.id]);

                    this.to(data.room.id)
                        .emit('roomUpdated', {
                            room: g.rooms[data.room.id]
                        });
                    this.emit('roomUpdated', {
                        room: g.rooms[data.room.id]
                    });
                }
            },
            removeFromPlaylist: function(data) {
                var player = playerById(this.id);

                if (player.isAdmin) {
                    var r = g.rooms[data.room.id];

                    if (r.currentVideo.id.videoId == data.video.id.videoId) {
                        r.currentVideo = null;
                        r.playVideo({
                            index: 0
                        });
                    }

                    for (var i in r.playlist) {
                        var v = r.playlist[i];

                        if (v.id.videoId == data.video.id.videoId) {
                            r.playlist.splice(i, 1);
                            break;
                        }
                    }
                    this.to(data.room.id)
                        .emit('roomUpdated', {
                            room: r
                        });
                    this.emit('roomUpdated', {
                        room: r
                    });
                }
            }
        };

        socket.on('admin:changeTopic', admin.changeTopic);
        socket.on('admin:removePlaylist', admin.removePlaylist);
        socket.on('admin:removeFromPlaylist', admin.removeFromPlaylist);

        function onPlayerHeartbeat(data) {
            var player = playerById(socket.id);
            console.log('heartbeat received from ' + player.name + ', responding');
            socket.emit('player:heartbeat:response', {
                msg: 'kthx'
            });
        }

        function onNewPlayer(data) {
            var player = playerById(socket.id);
            console.log('New Player', data);

            if (!player) {
                console.log('Player not found: ' + socket.id);
                return;
            }

            // Add user details
            if (data.user) {
                player.name = data.user.name;
                player.avatar = data.user.avatar;
                player.email = data.user.email;
                player.isAdmin = data.user.isAdmin;
            }

            if (!data.roomId) {
                console.log('Cannot join an empty game?', data.roomId);
                return;
            }

            if (!g.rooms[data.roomId]) {
                console.log('Game doesn\'t exist yet. Creating game: ' + data.roomId);

                var params = {
                    id: data.roomId
                };

                if (data.roomName) {
                    params.name = data.roomName;
                }

                var room = new Room(params);

                g.rooms[data.roomId] = room;

                socket.emit('newMapCreated', room.serialize());
            }

            // Sets up the video sync listener for this room if it doesn't exist
            if (!g.rooms[data.roomId].videoUpdate) {
                g.rooms[data.roomId].videoUpdate = true;
                g.rooms[data.roomId].on('videoUpdate', videoSync);
            }

            if (!player.inMap(data.roomId)) {
                console.log('$$$$$$$$$$$$$$$$$$');
                console.log(player.firstName + ' (' + player.id + ') joining ' + data.roomId);
                console.log('$$$$$$$$$$$$$$$$$$');
                player.joinMap(g.rooms[data.roomId]);

                socket.join(data.roomId);

                // Handle synchronization
                if (g.rooms[data.roomId].currentVideoStartTime && g.rooms[data.roomId].currentVideo) {
                    var currentVideoSync = '&amp;start='
                    + Math.ceil((new Date().getTime() - g.rooms[data.roomId].currentVideoStartTime) / 1000);

                    g.rooms[data.roomId].currentVideoSync = currentVideoSync;
                }

                this.to(data.roomId)
                    .emit('room:update:player:add', {
                        player: player
                    });

                this.emit('roomUpdated', {
                    room: g.rooms[data.roomId]
                });

                console.log(g.rooms[data.roomId].players);
            }
        }

        function onAddVideo(data) {
            var player = playerById(this.id),
                video = data.video;

            //g.rooms[data.room.id].addVideoToPlaylist(data.video, player);

            video.votes = [player];
            video.modified = new Date().getTime();

            g.rooms[data.room.id].playlist.push(video);
            g.rooms[data.room.id].sortPlaylist();
            //g.rooms[data.room.id].addVideoToPlaylist(video);

            // If no videos are playing, play one
            if (g.rooms[data.room.id].currentVideo == null) {
                g.rooms[data.room.id].playVideo({
                    index: 0
                });

                videoSync(data.room.id);
            } else {
                s
                    .to(data.room.id)
                    .emit('room:update:videos:add', {
                        video: video
                    });
            }
        }

        /**
         * Adds a vote to a video and reoganizes the playlist
         * @param  {object} Expecting {room:room, video: video}
         * @return true
         */
        function onVoteForVideo(data) {
            var room = g.rooms[data.room.id],
                player = playerById(this.id),
                video = room.addVoteToVideo(data.video, player);

            s
                .to(data.room.id)
                .emit('room:update:video:votes', video);
            /*
            // Update other players
            this.to(data.room.id)
                .emit('roomUpdated', {
                    room: g.rooms[data.room.id]
                });

            this.emit('roomUpdated', {
                room: g.rooms[data.room.id]
            });*/
        }

        function onDisconnect() {
            var player = playerById(this.id);
            if (!player) {
                console.log("Player not found: " + this.id);
                return;
            }

            console.log("Client has disconnected: " + this.id);

            console.log('index', g.players.indexOf(player));
            g.players.splice(g.players.indexOf(player), 1);
            // this.leave(player.roomId);

            if (!g.rooms[player.roomId]) {
                console.log("Map not found: " + player.roomId);
                return;
            }

            var roomId = player.roomId,
                room = g.rooms[roomId];

            // this.to(player.roomId)
            //   .emit('removePlayer', {
            //     id: this.id,
            //     players: room.players
            //   });
            player.leaveMap(g.rooms[roomId]);
            room.removePlayer(player);

            console.log('disconnecting!', roomId);
            console.log(_.filter(room.players, function(p) {
                return p.id != player.id
            }));

            s
                .to(roomId)
                .emit('room:update:player:remove', {
                    player: player
                });
            /*
            this.to(roomId)
                .emit('gameUpdated:remove', {
                    id: this.id,
                    room: roomId,
                    allPlayers: _.filter(room.players, function(p) {
                        return p.id != player.id
                    }),
                    removedPlayer: player
                });*/

        }

        // Not incorporated yet
        // TODO: If all payers have left, stop waiting on videos
        function onPlayerLeftMap() {
            var player = playerById(this.id);
            if (!player) {
                console.log("Player not found: " + this.id);
                return;
            }

            if (!g.rooms[player.roomId]) {
                console.log("Map not found: " + player.roomId);
                return;
            }

            var roomId = player.roomId;
            var room = g.rooms[roomId];
            room.removePlayer(player);
            player.leaveMap(g.rooms[roomId]);

            /*
            socket.emit('global:playerLeftMap', {
              id: this.id,
              roomId: roomId
            });*/

            // this.broadcast.to(player.roomId)
            //   .emit('removePlayer', {
            //     id: this.id,
            //     players: room.players
            //   });

            console.log('onPlayerLeftMap', room.players.length);
            /* Uncomment to remove rooms
            if (room.players.length <= 0) {
              socket.emit('global:removeMap', {
                roomId: roomId
              });
              delete g.rooms[roomId];
            } else {*/
            this.to(roomId)
                .emit('gameUpdated:remove', {
                    id: this.id,
                    room: roomId,
                    allPlayers: room.players,
                    removedPlayer: player
                });
            //}
        }

        function onGetRooms() {
            var rooms = [];
            for (var k in g.rooms) {
                rooms.push(g.rooms[k]);
            }
            console.log('getting Rooms');
            this.emit('getAllRooms', rooms);
        }
        ;

        function playerById(id) {
            for (var i = 0; i < g.players.length; i++) {
                if (g.players[i].id === id) {
                    return g.players[i];
                }
            }
            return false;
        }
        ;

        function saveState() {
            if (g !== null && typeof g === 'object') {
                jf.writeFile('app/config/state.json', g);
                console.log('State Saved');
            } else {
                console.log('g was not an object', g);
            }
        }


    });


});
