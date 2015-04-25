/*global define*/

define(function() {
    'use strict';

    function ctrl($scope, $stateParams, socket) {
        $scope.page_name = "Settings";

        console.log('sending socket');
        console.log(socket.emit('route', {
            path: 'settings'
        }, $scope.message));
    }

    ctrl.$inject = ['$scope', '$stateParams', 'socket'];
    return ctrl;

});
