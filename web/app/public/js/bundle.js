!function r(e,o,u){function n(a,i){if(!o[a]){if(!e[a]){var s="function"==typeof require&&require;if(!i&&s)return s(a,!0);if(t)return t(a,!0);throw new Error("Cannot find module '"+a+"'")}var l=o[a]={exports:{}};e[a][0].call(l.exports,function(r){var o=e[a][1][r];return n(o?o:r)},l,l.exports,r,e,o,u)}return o[a].exports}for(var t="function"==typeof require&&require,a=0;a<u.length;a++)n(u[a]);return n}({1:[function(){requirejs.config({paths:{angular:"../../bower_components/angular/angular",angularYoutube:"../../bower_components/angular-youtube-mb/dist/angular-youtube-embed.min",uiRouter:"../../bower_components/angular-ui-router/release/angular-ui-router",socketIo:"../../bower_components/angular-socket-io/socket"},shim:{angular:{exports:"angular"},angularYoutube:{deps:["angular"]},uiRouter:{deps:["angular"]},socketIo:{deps:["angular"]}},priority:["angular"],deps:["bootstrap"]})},{}]},{},[1]);