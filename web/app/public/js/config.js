/*global define */

define(['angular'], function(angular) {
    'use strict';

    return angular.module('app.config', [])
        .constant('VERSION', '0.1')
        .constant('API_VERSION', '1')
        .constant('API_URL', 'http://127.0.0.1:3000/v1/')
        .constant('YOUTUBE_API_KEY', 'AIzaSyB41MomupoaLtgaIkTN-HvtiUyHeF64Y7E');

});
