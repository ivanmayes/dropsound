(function() {

  var _ = require('lodash');
  var events = require('events');

  var Room = function(config) {
    this.id = config.id;
    this.name = config.name;
    this.topic = config.topic || '';
    this.playlist = config.playlist || [];
    this.currentVideo = config.currentVideo;
    this.createdAt = new Date().getTime();

    this.players = config.players || [];

    this.currentVideoStartTime = false;
  };

  Room.super_ = events.EventEmitter;
  Room.prototype = Object.create(events.EventEmitter.prototype, {
      constructor: {
          value: Room,
          enumerable: false
      }
  });

  module.exports = Room;

  Room.prototype.playVideo = function(params) {
    // Check if there is a current video and return it to the playlist with 0 votes
    if(this.currentVideo) {
      this.currentVideo.votes = [];
      this.playlist.push(this.currentVideo);
    }

    var index = params.index;
    var id = params.id;
    // Pull video off the top of the list
    if(_.isNumber(index)) {
      this.currentVideo = this.playlist[index];
      this.playlist.splice(index, 1);
    }else if(id) {
      this.currentVideo = _.findWhere(this.playlist, {'id.videoId': id});
      this.playlist = _.remove(array, function(n) {
        return n == this.currentVideo;
      });
    }else{
      console.log('Play video not passed id or index', params);
      return false;
    }
    console.log('Playing '+this.currentVideo.title.$t);

    // Send event to play video
    // Start timer for length of video to switch to next video
    var milliseconds = this.currentVideo.media$group.yt$duration.seconds*1000;
    this.currentVideoStartTime = new Date().getTime();
    this.waitForFinishedVideo(milliseconds);
    console.log('Waiting for '+milliseconds+' until next video');
  }

  Room.prototype.waitForFinishedVideo = function(duration) {
    // @todo need to build in a way to get how far in we are for new users
    var self = this;

    setTimeout(function() {
      self.playVideo({index:0});
      self.emit('videoUpdate', this);
    }, duration);
  };

  Room.prototype.getVideoIndex = function(id) {
    return _.findIndex(this.playlist, function(video, k) {
      return video.id.$t == id
    });
  };

  Room.prototype.addVideoToPlaylist = function(video, player) {
      video.votes = [player];
      this.playlist.push(video);
      this.playlist[this.playlist.length-1].modified = new Date().getTime();

      this.sortPlaylist();

      return this.playlist;
  };

  Room.prototype.addVoteToVideo = function(video, player) {
    var index = this.getVideoIndex(video.id.$t);
    var votes = this.playlist[index].votes
    votes.push(player);
    votes = _.uniq(votes, function(player) {
        return player.email;
    });
    this.playlist[index].votes = votes;

    this.playlist[index].modified = new Date().getTime();
    this.sortPlaylist();

    return this.playlist;
  };

  Room.prototype.sortPlaylist = function() {

    // Use the modified timestamp to add a decimal to make sure videos
    // that were modified last are behind older ones with the same vote
    // Added * -1 for descending order
    var playlist = _.sortBy(this.playlist, function(video) {
      return parseInt(video.votes.length+'.'+video.modified, 10)*-1;
    });

    playlist = _.uniq(playlist, function(video) {
      return video.id.$t;
    });

    this.playlist = playlist;

    return playlist;
  };

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
      name: this.name,
      createdAt: this.createdAt,
      players: players
    }
  };

})();
