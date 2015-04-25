/*global define, console */

define(function() {
    'use strict';

    function ctrl($scope, $state, UserService) {
        /*var loggedin = true;

        if(loggedin) {
            $state.go('tab.home');
        }*/

        console.log('sending socket');
        socket.emit('route', {
            path: 'stage/night'
        });

    }

    ctrl.$inject = ['$scope', '$state', 'UserService'];
    return ctrl;

});
