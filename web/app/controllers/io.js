// routes/io.js
module.exports = (function(app, io, server) {

  var Room = require('./../models/Room');

  // Game data
  var g = {
    io: io,
    players: [],
    maps: {}
  };

  var s = io.listen(server);

  s.on('connection', function onConnection(socket) {
    util.log("Client has connected: " + socket.id);

    socket.emit('connected', { id: socket.id });

    socket.on('route', function(data) {
        console.log('Received route change');
        socket.broadcast.emit('route', data);
    });

    g.players.push({id: socket.id});

    socket.on('newPlayer', onNewPlayer);
  });

  function onNewPlayer(data) {
    var player = playerById(this.id);
    if (!player) {
      util.log("Player not found: " + this.id);
      return;
    }

    if (!data.mapId) {
      util.log("Cannot join an empty game?", data.mapId);
      return;
    }

    if (!g.maps[data.mapId]) {
      util.log("Game doesn't exist yet. Creating game: " + data.mapId);
      var map = new Room({id: data.mapId});
      g.maps[data.mapId] = map;
      g.io.emit('newMapCreated', map.serialize());
    };

    if (!player.inMap(data.mapId)) {
      player.joinMap(g.maps[data.mapId]);

      this.broadcast.to(data.mapId)
        .emit('gameUpdated:add', {
          player: player.serialize(),
          map: data.mapId,
          allPlayers: g.maps[data.mapId].players
        });

      this.join(data.mapId);

      this.emit('gameUpdated:add', {
        map: data.mapId,
        allPlayers: g.maps[data.mapId].players
      });

      g.io.emit('global:newPlayer', {
        player: player.serialize(),
        map: data.mapId
      });
    }
  };

  function updateRemotePlayers() {
    var that = this;
    for (var key in g.maps) {
      var game = g.maps[key];

      var newData;
        newData = {
          mapId: game.id,
          game: game.serialize(),
          timestamp: new Date().getTime()
        }
        g.io.sockets.to(game.id).emit('updatePlayers', newData);
    }
  };

  function onDisconnect() {
    var player = playerById(this.id);
    if (!player) {
      util.log("Player not found: " + this.id);
      return;
    }

    util.log("Client has disconnected: " + this.id);

    console.log('index', g.players.indexOf(player));
    g.players.splice(g.players.indexOf(player), 1);
    // this.leave(player.mapId);

    if (!g.maps[player.mapId]) {
      util.log("Map not found: " + player.mapId);
      return;
    }

    var mapId = player.mapId,
        map = g.maps[mapId];

    // this.broadcast.to(player.mapId)
    //   .emit('removePlayer', { 
    //     id: this.id,
    //     players: map.players
    //   });
    player.leaveMap(g.maps[mapId]);
    map.removePlayer(player);

    this.broadcast.to(mapId)
      .emit('gameUpdated:remove', {
        id: this.id,
        map: mapId,
        allPlayers: map.players,
        removedPlayer: player
      });

  };

  function onPlayerLeftMap() {
    var player = playerById(this.id);
    if (!player) {
      util.log("Player not found: " + this.id);
      return;
    }

    if (!g.maps[player.mapId]) {
      util.log("Map not found: " + player.mapId);
      return;
    }

    var mapId = player.mapId;
    var map = g.maps[mapId];
    map.removePlayer(player);
    player.leaveMap(g.maps[mapId]);

    g.io.emit('global:playerLeftMap', {
      id: this.id,
      mapId: mapId
    });

    // this.broadcast.to(player.mapId)
    //   .emit('removePlayer', { 
    //     id: this.id,
    //     players: map.players
    //   });
  
    console.log('onPlayerLeftMap', map.players.length);
    if (map.players.length <= 0) {
      g.io.emit('global:removeMap', {
        mapId: mapId
      });
      delete g.maps[mapId];
    } else {
      this.broadcast.to(mapId)
        .emit('gameUpdated:remove', {
          id: this.id,
          map: mapId,
          allPlayers: map.players,
          removedPlayer: player
        });
    }
  }

  function onGetMaps() {
    var maps = [];
    for (var k in g.maps) {
      maps.push(g.maps[k].serialize());
    }
    this.emit('getAllMaps', maps);
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