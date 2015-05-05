/*global define, console */

define(function() {
    'use strict';

    function ctrl($scope, $rootScope, $state, $stateParams, $sce, UserService, RoomService, PlayersService, AdminService, youtubeEmbedUtils) {
        console.log('Room Id', $stateParams.roomId);

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
        $scope.voteForVideo = RoomService.voteForVideo;

        $scope.user = $rootScope.user;

        $scope.admin = AdminService;

        // Announce theres a new player
        PlayersService.addPlayerToRoom({
        	roomId: $stateParams.roomId,
            roomName : $stateParams.roomName
        });

        $scope.$on('room:update', function(evt, room) {
        	console.log('Room Updated!', room);
            $scope.room = room;
            if(room.currentVideo !== $scope.currentVideo) {
                if(!room.currentVideo) {
                    $scope.currentVideo = false;
                    return false;
                }

                if($scope.currentVideo) {
                    if(youtubeEmbedUtils.getIdFromURL(room.currentVideo.link[0].href) == youtubeEmbedUtils.getIdFromURL($scope.currentVideo.link[0].href)) {
                        return false;
                    }
                }

            	$scope.currentVideo = room.currentVideo;

                var url = 'https://www.youtube.com/embed/'+youtubeEmbedUtils.getIdFromURL(room.currentVideo.link[0].href)+'?controls=1&amp;autoplay=1&amp;&amp;enablejsapi=1';

                // Sync video if there's a sync param
                if(room.currentVideoSync) {
                    url += room.currentVideoSync;
                }

                $scope.currentVideo.iframeLink = $sce.trustAsResourceUrl(url);

                console.log($scope.currentVideo.iframeLink);

                //$scope.currentVideoPlayer.playVideo();
            }
        });

        $scope.$on('admin:say', function(evt, msg) {
            alert(msg);
        });

        function toggleVideo() {
            if($scope.hideVideo) {
                $scope.hideVideo = false;
            }else{
                $scope.hideVideo = true;
            }
        }

        function isVideoInPlaylist(video) {
            if($scope.currentVideo && video.id.$t == $scope.currentVideo.id.$t) {
                return true;
            }

            for (var i = $scope.room.playlist.length - 1; i >= 0; i--) {
                //console.log($scope.room.playlist[i].id.$t, video.id.$t)
                if($scope.room.playlist[i].id.$t == video.id.$t) {
                    return true;
                }
            };

            return false;
        }

        function hasVotedForVideo(video) {
            for (var i = video.votes.length - 1; i >= 0; i--) {
                //console.log(video.votes[i].email, $rootScope.user.email);
                if(video.votes[i].email == $rootScope.user.email) {
                    return true;
                }
            };

            return false;
        }

    }

    ctrl.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$sce', 'UserService', 'RoomService', 'PlayersService', 'AdminService', 'youtubeEmbedUtils'];
    return ctrl;

});
