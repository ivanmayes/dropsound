/*global define, console */

define(function() {
    'use strict';

    function ctrl($scope, $state, UserService, socket) {

        console.log('sending socket');
        socket.emit('route', {
            path: 'join'
        });

    }

    ctrl.$inject = ['$scope', '$state', 'UserService', 'socket'];
    return ctrl;

});
