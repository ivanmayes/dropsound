/*global requirejs, document, window, navigator, console */

requirejs.config({
    paths: {
        angular: '../../bower_components/angular/angular',
        angularYoutube: '../../bower_components/angular-youtube-mb/dist/angular-youtube-embed.min',
        angularReadableTime: '../../bower_components/angular-readable-time/angular-readable-time',
        ngAnimate: '../../bower_components/angular-animate/angular-animate',
        uiRouter: '../../bower_components/angular-ui-router/release/angular-ui-router',
        socketIo: '../../bower_components/angular-socket-io/socket'
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        angularYoutube: {
            deps: ['angular']
        },
        angularReadableTime: {
            deps: ['angular']
        },
        ngAnimate: {
            deps: ['angular']
        },
        uiRouter: {
            deps: ['angular']
        },
        socketIo: {
            deps: ['angular']
        }
    },
    priority: [
        'angular'
    ],
    deps: [
        'bootstrap'
    ]
});
