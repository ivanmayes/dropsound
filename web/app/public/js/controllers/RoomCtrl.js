/*global define, console */

define(function() {
    'use strict';

    function ctrl($scope, $state, $stateParams, UserService, RoomService, PlayersService) {
        console.log('Room Id', $stateParams.roomId);
        
        $scope.currentVideo;
        $scope.hideVideo = false;
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
            }
        });

        function toggleVideo() {
            if($scope.hideVideo) {
                $scope.hideVideo = false;
            }else{
                $scope.hideVideo = true;
            }
        }

    }

    ctrl.$inject = ['$scope', '$state', '$stateParams', 'UserService', 'RoomService', 'PlayersService'];
    return ctrl;

});
