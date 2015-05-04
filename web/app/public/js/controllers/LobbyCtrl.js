/*global define, console */

define(function() {
    'use strict';

    function ctrl($scope, $state, UserService, RoomService) {
        $scope.newRoomName;
        $scope.createRoom = createRoom;


        $scope.$on('room:update', function(evt, mapId) {
            $scope.rooms = RoomService.getRooms();
        });

        function createRoom() {
            console.log('here we be');
            $state.go('room', {
                roomId : new Date().getTime(),
                roomName : $scope.newRoomName
            });
        }
    }

    ctrl.$inject = ['$scope', '$state', 'UserService', 'RoomService'];
    return ctrl;

});
