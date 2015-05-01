(function() {

  var Player = function(config) {

    this.id       = config.id || '';

    this.firstName      = config.firstName || '';
    this.lastName       = config.firstName || '';
    this.email          = config.email || '';
    this.lastUpdate = 0;
    this.roomId    = -1;
  };

  module.exports = Player;

  Player.prototype.joinMap = function(map) {
    this.timestamp = new Date().getTime();
    this.roomId = map.id;
    map.addPlayer(this);
  };

  Player.prototype.inMap = function(id) {
    return this.roomId === id;
  };

  Player.prototype.leaveMap = function() {
    this.roomId = '';
    if (this.map) {
      this.map.removePlayer(this);
    }
  };

  Player.prototype.reset = function() {
    this.roomId = '';
  };

  Player.prototype.serialize = function() {
    return {
      id: this.id,
      timestamp: this.timestamp
    }
  }

})();
