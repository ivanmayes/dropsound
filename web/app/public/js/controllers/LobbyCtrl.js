/*global define, console */

define(function() {
    'use strict';

    function ctrl($scope, $state, UserService, RoomService) {
       
        $scope.$on('room:update', function(evt, mapId) {
            $scope.rooms = RoomService.getRooms();
        });
        
    }

    ctrl.$inject = ['$scope', '$state', 'UserService', 'RoomService'];
    return ctrl;

});
