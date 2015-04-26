/*global define, console */

define(function() {
    'use strict';

    function ctrl($scope, $state, $stateParams, UserService, RoomService, PlayersService) {
        console.log('Room Id', $stateParams.roomId);
        
        $scope.currentVideo;
        $scope.playerVars = {
		    controls: 1,
		    autoplay: 1
		};
		$scope.room;

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

    }

    ctrl.$inject = ['$scope', '$state', '$stateParams', 'UserService', 'RoomService', 'PlayersService'];
    return ctrl;

});
