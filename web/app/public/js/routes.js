/*global define, require */

define(['app'], function(app) {
    'use strict';

    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('prestart', {
                    url: "/prestart",
                    templateUrl: "js/views/prestart.html",
                    controller: 'StartCtrl',
                    authenticate: false
                })
                .state('join', {
                    url: "/join",
                    templateUrl: "js/views/join.html",
                    controller: 'StartCtrl',
                    authenticate: false
                })
                .state('join/new', {
                    url: "/join/new",
                    templateUrl: "js/views/join-new.html",
                    controller: 'StartCtrl',
                    authenticate: false
                })
                .state('settings', {
                    url: "/settings",
                    templateUrl: "js/views/settings.html",
                    controller: 'SettingsCtrl',
                    authenticate: false
                })
                // Game Start
                .state('tutorial/start', {
                    url: "/tutorial/start",
                    templateUrl: "js/views/start-tutorial.html",
                    controller: 'TutorialsCtrl',
                    authenticate: false
                })
                .state('stage/morning', {
                    url: "/stage/morning",
                    templateUrl: "js/views/stage-morning.html",
                    controller: 'GameCtrl',
                    authenticate: false
                })
                .state('stage/night', {
                    url: "/stage/night",
                    templateUrl: "js/views/stage-night.html",
                    controller: 'GameCtrl',
                    authenticate: false
                })


            /*.state('tab.pet-detail', {
                url: '/pet/:petId',
                views: {
                    'fav-tab': {
                        templateUrl: 'templates/pet-detail.html',
                        controller: 'PetDetailCtrl'
                    }
                }
            })*/

            $urlRouterProvider.otherwise("/prestart");

    }]);


});
