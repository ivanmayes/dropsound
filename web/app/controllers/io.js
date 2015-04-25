// routes/io.js
module.exports = (function(app, io, server) {

  var Room = require('./../models/Room');
  var Player = require('./../models/Player');

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
    socket.on('newPlayer', onNewPlayer);
    socket.on('getRooms', onGetRooms);
    socket.on('disconnect', onDisconnect);



    function onNewPlayer(data) {
      var player = playerById(this.id);

      if (!player) {
        console.log("Player not found: " + this.id);
        return;
      }

      if (!data.roomId) {
        console.log("Cannot join an empty game?", data.roomId);
        return;
      }

      if (!g.rooms[data.roomId]) {
        console.log("Game doesn't exist yet. Creating game: " + data.roomId);
        var room = new Room({id: data.roomId});
        g.rooms[data.roomId] = room;
        socket.emit('newMapCreated', room.serialize());
      };

      if (!player.inMap(data.roomId)) {
        player.joinMap(g.rooms[data.roomId]);

        this.join(data.roomId);

        // @todo we need to only send events to the room we're in
        /*this.broadcast.to(data.roomId)
          .emit('roomUpdated', {
            player: player.serialize(),
            room: g.rooms[data.roomId],
            allPlayers: g.rooms[data.roomId].players
          });*/

        this.emit('roomUpdated', {
          room: g.rooms[data.roomId],
          allPlayers: g.rooms[data.roomId].players
        });

        socket.emit('global:newPlayer', {
          player: player.serialize(),
          room: data.roomId
        });
      }
    };

    function onAddVideo(data) {
      g.rooms[data.room.id].playlist.push(data.video);

      //this.broadcast.to(data.room.id)
        socket.emit('roomUpdated', {
          player: player.serialize(),
          room: g.rooms[data.room.id],
          allPlayers: g.rooms[data.room.id].players
        });
    };

    function updateRemotePlayers() {
      var that = this;
      for (var key in g.rooms) {
        var game = g.rooms[key];

        var newData;
          newData = {
            roomId: game.id,
            game: game.serialize(),
            timestamp: new Date().getTime()
          }
          socket.sockets.to(game.id).emit('updatePlayers', newData);
      }
    };

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

      // this.broadcast.to(player.roomId)
      //   .emit('removePlayer', { 
      //     id: this.id,
      //     players: room.players
      //   });
      player.leaveMap(g.rooms[roomId]);
      room.removePlayer(player);

      this.broadcast.to(roomId)
        .emit('gameUpdated:remove', {
          id: this.id,
          room: roomId,
          allPlayers: room.players,
          removedPlayer: player
        });

    };

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

      socket.emit('global:playerLeftMap', {
        id: this.id,
        roomId: roomId
      });

      // this.broadcast.to(player.roomId)
      //   .emit('removePlayer', { 
      //     id: this.id,
      //     players: room.players
      //   });
    
      console.log('onPlayerLeftMap', room.players.length);
      if (room.players.length <= 0) {
        socket.emit('global:removeMap', {
          roomId: roomId
        });
        delete g.rooms[roomId];
      } else {
        this.broadcast.to(roomId)
          .emit('gameUpdated:remove', {
            id: this.id,
            room: roomId,
            allPlayers: room.players,
            removedPlayer: player
          });
      }
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