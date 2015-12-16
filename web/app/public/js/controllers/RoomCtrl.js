/*global define, console */

define(function() {
    'use strict';

    function ctrl($scope, $rootScope, $state, $stateParams, $sce, UserService, RoomService, PlayersService, AdminService, youtubeEmbedUtils, socket, $timeout, $window) {
        console.log('Room Id', $stateParams.roomId);

        if (!$rootScope.user.isAdmin && !$rootScope.isLive) {
            $rootScope.inner = false;
            $state.go('login');
        }

        $rootScope.inner = true;

        var heartbeat;

        $scope.currentVideo;
        $scope.hasVotedForVideo = hasVotedForVideo;
        $scope.hideVideo = false;
        $scope.isVideoInPlaylist = isVideoInPlaylist;
        $scope.playerVars = {
            controls: 1,
            autoplay: 1
        };
        $scope.room;
        $scope.toggleVideo = toggleVideo;
        $scope.toggleLive = toggleLive;
        $scope.voteForVideo = RoomService.voteForVideo;
        $scope.isNew = true;
        $scope.search = {
            q: ''
        }
        $scope.showSearch = showSearch;

        $scope.streams = {
            shp: $sce.trustAsResourceUrl('https://beam.pro/embed/player/shoptology'),
            pub: $sce.trustAsResourceUrl('http://www.ustream.tv/embed/21661769?html5ui')
        };

        $scope.editingTopic = false;
        $scope.editTopic = editTopic;
        $scope.changeTopic = changeTopic;

        $scope.user = $rootScope.user;

        $scope.admin = AdminService;

        // Announce theres a new player
        PlayersService.addPlayerToRoom({
            roomId: $stateParams.roomId,
            roomName: $stateParams.roomName
        });

        $scope.$on('room:update:topic', function(evt, data) {
            console.log(data);
            console.log('Topic Changed!', topic)
        });

        $scope.$on('room:update', function(evt, room) {


            /*// Kick if not live
            if (!$scope.user.isAdmin && !$rootScope.isLive) {
                alert('not broadcasting');
                $state.go('login');
            }*/

            console.log('Room Updated!', room);
            $scope.room = room;
            if (room.currentVideo !== $scope.currentVideo) {
                if (!room.currentVideo) {
                    $scope.currentVideo = false;
                    return false;
                }

                if ($scope.currentVideo) {
                    if (room.currentVideo.id.videoId == $scope.currentVideo.id.videoId) {
                        return false;
                    }
                }

                $scope.currentVideo = room.currentVideo;

                var url = 'https://www.youtube.com/embed/' + room.currentVideo.id.videoId + '?controls=1&amp;autoplay=1&amp;&amp;enablejsapi=1';

                // Sync video if there's a sync param
                if (room.currentVideoSync && $scope.isNew == true) {
                    url += room.currentVideoSync;
                }

                $scope.currentVideo.iframeLink = $sce.trustAsResourceUrl(url);

                //console.log($scope.currentVideo.iframeLink);

                $scope.isNew = false;

                //$scope.currentVideoPlayer.playVideo();
            }
        });

        $scope.$on('player:heartbeat:response', function(evt, data) {
            console.log('scheduling heartbeat');
            heartbeat = setTimeout(sendHeartbeat, 10000);
        });

        function sendHeartbeat() {
            console.log('sending heartbeat');
            socket.emit('player:heartbeat', {
                msg: 'I\'m still alive'
            });
        }

        function editTopic() {
            $scope.editingTopic = true;
        }

        function changeTopic() {
            $scope.admin.changeTopic($scope.room);
            $scope.editingTopic = false;
        }

        function toggleLive() {
            $scope.admin.toggleLive($scope.room);
        }

        function toggleVideo() {
            if ($scope.hideVideo) {
                $scope.hideVideo = false;
            } else {
                $scope.hideVideo = true;
            }
        }

        function isVideoInPlaylist(video) {
            if ($scope.currentVideo && video.id.videoId == $scope.currentVideo.id.videoId) {
                return true;
            }

            for (var i = $scope.room.playlist.length - 1; i >= 0; i--) {
                //console.log($scope.room.playlist[i].id.videoId, video.id.videoId)
                if ($scope.room.playlist[i].id.videoId == video.id.videoId) {
                    return true;
                }
            }
            ;

            return false;
        }

        function hasVotedForVideo(video) {
            for (var i = video.votes.length - 1; i >= 0; i--) {
                //console.log(video.votes[i].email, $rootScope.user.email);
                if (video.votes[i].email == $rootScope.user.email) {
                    return true;
                }
            }
            ;

            return false;
        }

        function showSearch() {
            $timeout(function() {
                console.log('focussing');
                var element = $window.document.getElementById('searchInput');
                if (element) {
                    element.focus();
                }
            });
        }

        sendHeartbeat();
    }

    ctrl.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$sce', 'UserService', 'RoomService', 'PlayersService', 'AdminService', 'youtubeEmbedUtils', 'socket', '$timeout', '$window'];
    return ctrl;

});
