/*global define */

define(['angular', 'filters/InterpolateFilter', 'filters/GravatarFilter', 'services/services'],
    function (angular, InterpolateFilter, GravatarFilter) {
        'use strict';

        var filters = angular.module('app.filters', ['app.services']);
        filters.filter('gravatar', GravatarFilter);
        return filters;

    });
