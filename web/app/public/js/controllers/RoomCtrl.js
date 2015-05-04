/*global define, console */

define(function() {
    'use strict';

    function ctrl($scope, $state, $stateParams, $sce, UserService, RoomService, PlayersService, youtubeEmbedUtils) {
        console.log('Room Id', $stateParams.roomId);

        $scope.currentVideo;
        $scope.hideVideo = false;
        $scope.isVideoInPlaylist = isVideoInPlaylist;
        $scope.playerVars = {
		    controls: 1,
		    autoplay: 1
		};
		$scope.room;
        $scope.toggleVideo = toggleVideo;
        $scope.voteForVideo = RoomService.voteForVideo;

        // Announce theres a new player
        PlayersService.addPlayerToRoom({
        	roomId: $stateParams.roomId
        });

        $scope.$on('room:update', function(evt, room) {
        	console.log('Room Updated!', room);
            $scope.room = room;
            if(room.currentVideo !== $scope.currentVideo) {
            	$scope.currentVideo = room.currentVideo;

                var url = 'https://www.youtube.com/embed/'+youtubeEmbedUtils.getIdFromURL(room.currentVideo.link[0].href)+'?controls=1&amp;autoplay=1&amp;&amp;enablejsapi=1';

                // Sync video if there's a sync param
                if(room.currentVideoSync) {
                    url += room.currentVideoSync;
                }

                $scope.currentVideo.iframeLink = $sce.trustAsResourceUrl(url);

                //$scope.currentVideoPlayer.playVideo();
            }
        });

        function toggleVideo() {
            if($scope.hideVideo) {
                $scope.hideVideo = false;
            }else{
                $scope.hideVideo = true;
            }
        }

        function isVideoInPlaylist(video) {
            for (var i = $scope.room.playlist.length - 1; i >= 0; i--) {
                console.log($scope.room.playlist[i].id.$t, video.id.$t)
                if($scope.room.playlist[i].id.$t == video.id.$t) {
                    return true;
                }
            };

            return false;
        }

    }

    ctrl.$inject = ['$scope', '$state', '$stateParams', '$sce', 'UserService', 'RoomService', 'PlayersService', 'youtubeEmbedUtils'];
    return ctrl;

});
