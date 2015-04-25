(function() {

  var _ = require('lodash');
  
  var Room = function(config) {
    this.id = config.id;
    this.createdAt = new Date().getTime();

    this.players = config.players || [];
  };

  module.exports = Room;

  Room.prototype.update = function() {
  };

  Room.prototype.reset = function() {
    _.map(this.players, function(player) {
      player.reset();
    });
    this.players = [];
  };

  Room.prototype.addPlayer = function(player) {
    this.players.push(player);
  };

  Room.prototype.removePlayer = function(player) {
    this.players.splice(this.players.indexOf(player), 1);
  };

  Room.prototype.serialize = function() {
    var players = _.map(this.players, function(player) {
      return player.serialize();
    });
    return {
      id: this.id,
      createdAt: this.createdAt,
      players: players
    }
  };

})();