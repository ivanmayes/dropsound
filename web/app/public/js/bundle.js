!function r(e,a,n){function o(u,i){if(!a[u]){if(!e[u]){var l="function"==typeof require&&require;if(!i&&l)return l(u,!0);if(t)return t(u,!0);throw new Error("Cannot find module '"+u+"'")}var s=a[u]={exports:{}};e[u][0].call(s.exports,function(r){var a=e[u][1][r];return o(a?a:r)},s,s.exports,r,e,a,n)}return a[u].exports}for(var t="function"==typeof require&&require,u=0;u<n.length;u++)o(n[u]);return o}({1:[function(r,e,a){requirejs.config({paths:{angular:"../../bower_components/angular/angular",angularYoutube:"../../bower_components/angular-youtube-mb/dist/angular-youtube-embed.min",angularReadableTime:"../../bower_components/angular-readable-time/angular-readable-time",bootstrapJS:"../../bower_components/bootstrap/dist/js/bootstrap",ngAnimate:"../../bower_components/angular-animate/angular-animate",uiRouter:"../../bower_components/angular-ui-router/release/angular-ui-router",socketIo:"../../bower_components/angular-socket-io/socket"},shim:{angular:{exports:"angular"},angularYoutube:{deps:["angular"]},angularReadableTime:{deps:["angular"]},ngAnimate:{deps:["angular"]},uiRouter:{deps:["angular"]},socketIo:{deps:["angular"]}},priority:["angular"],deps:["bootstrap"]})},{}]},{},[1]);