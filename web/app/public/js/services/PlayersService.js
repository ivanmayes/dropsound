define(['angular'], function(angular) {
    'use strict';

    var factory = function($http, $q, $window, $rootScope, socket) {

        var services = {
            addPlayerToRoom: addPlayerToRoom
        };

        function addPlayerToRoom(room) {
            console.log('Adding player', $rootScope.user);
            room.user = $rootScope.user;
            getGroup();
            socket.emit('newPlayer', room);
        }

        function getGroup() {
            var group = urlParams(document.location.search)['g'];

            $rootScope.group = 'pub';

            if (group == 'shp') {
                $rootScope.group = 'shp';
            }

            if (group == 'cam') {
                $rootScope.group = 'cam';
            }
        }

        function urlParams(qs) {
            qs = qs.split("+").join(" ");
            var params = {}, tokens,
                re = /[?&]?([^=]+)=([^&]*)/g;
            while (tokens = re.exec(qs)) {
                params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
            }
            return params;
        }


        //
        //  Socket Operations
        //


        // Return all our public functions
        return services;

    };

    factory.$inject = ['$http', '$q', '$window', '$rootScope', 'socket'];
    return factory;
});
