define(['angular'], function(angular) {
    'use strict';

    var factory = function($http, $q, $window, API_URL, YOUTUBE_API_KEY) {

        var services = {
            searchVideos: searchVideos
        }

        function searchVideos(params) {
            var deferred = $q.defer();
            params.key = YOUTUBE_API_KEY;

            $http({
                url: 'https://www.googleapis.com/youtube/v3/search',
                method: 'GET',
                params: params
            }).then(function(result) {
                if (result.data.items) {
                    deferred.resolve(result.data.items);
                } else {
                    deferred.reject(result);
                }

            }, function(error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        // Return all our public functions
        return services;

    };

    factory.$inject = ['$http', '$q', '$window', 'API_URL', 'YOUTUBE_API_KEY'];
    return factory;
});
