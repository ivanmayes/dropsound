/*global define, console */

define(function() {
    'use strict';

    function ctrl($scope, $state, $stateParams, UserService, RoomService, PlayersService) {
        console.log('Room Id', $stateParams.roomId);
        $scope.room;

        // Announce theres a new player
        PlayersService.addPlayerToRoom({
        	roomId: $stateParams.roomId
        });

        $scope.$on('room:update', function(evt, room) {
        	console.log('Room Updated!', room);
            $scope.room = room;
        });

    }

    ctrl.$inject = ['$scope', '$state', '$stateParams', 'UserService', 'RoomService', 'PlayersService'];
    return ctrl;

});
