// routes/io.js
module.exports = (function(app, io, server) {

  var _ = require('lodash');
  var Room = require('./../models/Room');
  var Player = require('./../models/Player');
  var currentVideoTimer; // timeout timer for current video

  // Game data
  var g = {
    io: io,
    players: [],
    rooms: {}
  };

  // Create room for now
  var room = new Room({
    id: 1234,
    name: 'Shoptology DJ'
  });
  g.rooms[1234] = room;


  var s = io.listen(server);

  s.on('connection', function onConnection(socket) {
    console.log("Client has connected: " + socket.id);

    socket.emit('connected', { id: socket.id });

    socket.on('route', function(data) {
        console.log('Received route change');
        socket.broadcast.emit('route', data);
    });

    var player = new Player({ id: socket.id });
    g.players.push(player);

    socket.on('addVideo', onAddVideo);
    socket.on('voteForVideo', onVoteForVideo);
    socket.on('newPlayer', onNewPlayer);
    socket.on('getRooms', onGetRooms);
    socket.on('disconnect', onDisconnect);
    socket.on('playerLeftMap', onPlayerLeftMap);


    // @todo will have to add this 'on' event for all new rooms created
    g.rooms[1234].on('videoUpdate', function(room) {
        socket.to(1234)
        .emit('roomUpdated', {
          room: g.rooms[1234]
        })
    });
    //



    function onNewPlayer(data) {
      var player = playerById(this.id);
      console.log('New Player', data);

      if (!player) {
        console.log("Player not found: " + this.id);
        return;
      }

      // Add user details
      if(data.user) {
        player.firstName = data.user.firstName;
        player.lastName = data.user.lastName;
        player.email = data.user.email;
        player.photo = data.user.photo;
      }

      if (!data.roomId) {
        console.log("Cannot join an empty game?", data.roomId);
        return;
      }

      if (!g.rooms[data.roomId]) {
        console.log("Game doesn't exist yet. Creating game: " + data.roomId);

        var params = {
            id : data.roomId
        };

        if(data.roomName) {
            params.name = data.roomName;
            console.log(params.name);
            console.log('&&&&&&&&&&&&&&&&&&&');
        };

        var room = new Room(params);

        g.rooms[data.roomId] = room;
        socket.emit('newMapCreated', room.serialize());
      };

      if (!player.inMap(data.roomId)) {
        player.joinMap(g.rooms[data.roomId]);

        this.join(data.roomId);

        // Handle synchronization
        if(g.rooms[data.roomId].currentVideoStartTime && g.rooms[data.roomId].currentVideo) {
            var currentVideoSync = '&amp;start='
                + Math.ceil((new Date().getTime() - g.rooms[data.roomId].currentVideoStartTime) / 1000);

            g.rooms[data.roomId].currentVideoSync = currentVideoSync;
        }

        // @todo we need to only send events to the room we're in
        this.to(data.roomId)
          .emit('roomUpdated', {
            player: player.serialize(),
            room: g.rooms[data.roomId]
          });

        this.emit('roomUpdated', {
          room: g.rooms[data.roomId]
        });
      }
    };

    function onAddVideo(data) {
      var player = playerById(this.id);

      g.rooms[data.room.id].addVideoToPlaylist(data.video, player);

      // If there isn't a video playing, start one
      if(g.rooms[data.room.id].currentVideo == null) {
        console.log('No video playing, start one');
        g.rooms[data.room.id].playVideo({index:0});

      }else{
        //console.log('Already video playing', g.rooms[data.room.id].currentVideo.title.$t)
      }

      this.to(data.room.id)
        .emit('roomUpdated', {
          room: g.rooms[data.room.id]
        });

      this.emit('roomUpdated', {
          room: g.rooms[data.room.id]
        })
    };

    /**
     * Adds a vote to a video and reoganizes the playlist
     * @param  {object} Expecting {room:room, video: video}
     * @return true
     */
    function onVoteForVideo(data) {
      var room = g.rooms[data.room.id];
      var player = playerById(this.id);
      // Add vote to video with user id
      room.addVoteToVideo(data.video, player);

      // Update other players
      this.to(data.room.id)
        .emit('roomUpdated', {
          room: g.rooms[data.room.id]
        });

      this.emit('roomUpdated', {
        room: g.rooms[data.room.id]
      });
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
      console.log(_.filter(room.players, function(p) { return p.id != player.id }));

      this.to(roomId)
        .emit('gameUpdated:remove', {
          id: this.id,
          room: roomId,
          allPlayers: _.filter(room.players, function(p) { return p.id != player.id }),
          removedPlayer: player
        });

    };

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
        rooms.push(g.rooms[k].serialize());
      }
      console.log('getting Rooms');
      this.emit('getAllRooms', rooms);
    };

    function playerById(id) {
      for (var i = 0; i < g.players.length; i++) {
        if (g.players[i].id === id) {
          return g.players[i];
        }
      }
      return false;
    };


  });


});
