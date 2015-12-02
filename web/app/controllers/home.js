'use strict';

/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
    res.render('home', {
        title: 'Home'
    });
};

exports.app = function(req, res) {
    var api = 'http://127.0.0.1:3000/v1/';
    if (process.env.APIURL) {
        api = process.env.APIURL
    }
    res.render('app', {
        title: 'List Maker',
        api: api,
        layout: 'layout-app'
    });
};
