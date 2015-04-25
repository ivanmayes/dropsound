/*global define, require */

define(function(require) {

    'use strict';

    var angular = require('angular'),
        services = require('services/services'),
        config = require('config'),
        controllers = angular.module('app.controllers', ['app.services', 'app.config']);

    controllers.controller('AppCtrl', require('controllers/AppCtrl'));
    controllers.controller('LoginCtrl', require('controllers/LoginCtrl'));
    controllers.controller('LobbyCtrl', require('controllers/LobbyCtrl'));
    controllers.controller('RoomCtrl', require('controllers/RoomCtrl'));
    controllers.controller('SearchCtrl', require('controllers/SearchCtrl'));


    /*controllers.run(['$rootScope', function($rootScope) {
            $rootScope.sampleParam = "value";
    }]);*/

    return controllers;

});
