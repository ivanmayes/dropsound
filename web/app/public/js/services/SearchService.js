define(['angular'], function(angular) {
    'use strict';

    var factory = function($http, $q, $window, API_URL, YOUTUBE_API_KEY) {

        var services = {
            searchVideos: searchVideos
        }

        function searchVideos(q) {
            var deferred = $q.defer();

            var params = {
                alt: 'json',
                format: '5',
                'max-results': 10,
                'paid-content': false,
                q: q,
                'start-index': 1,
                v:2
            }
            //params.key = YOUTUBE_API_KEY;

            $http({
                url: 'https://gdata.youtube.com/feeds/api/videos',
                //url: 'https://www.googleapis.com/youtube/v3/search',
                method: 'GET',
                params: params
            }).then(function(result) {
                if (result.data.feed && result.data.feed.entry) {
                    var items = result.data.feed.entry;
                    // if the first result contains support, remove it
                    if(items[0] && items[0].title.$t == 'https://youtube.com/devicesupport') {
                        items.splice(0,1);
                    }
                    deferred.resolve(items);
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
