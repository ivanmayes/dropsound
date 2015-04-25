/*global define, require */

define(function(require) {

    'use strict';

    var angular = require('angular'),
        services = require('services/services'),
        config = require('config'),
        controllers = angular.module('app.controllers', ['app.services', 'app.config']);

    controllers.controller('AppCtrl', require('controllers/AppCtrl'));
    controllers.controller('StartCtrl', require('controllers/StartCtrl'));
    controllers.controller('SettingsCtrl', require('controllers/SettingsCtrl'));
    controllers.controller('TutorialsCtrl', require('controllers/TutorialsCtrl'));
    controllers.controller('GameCtrl', require('controllers/GameCtrl'));

    /*controllers.run(['$rootScope', function($rootScope) {
            $rootScope.sampleParam = "value";
    }]);*/

    return controllers;

});
