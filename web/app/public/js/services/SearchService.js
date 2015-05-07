define(['angular'], function(angular) {
    'use strict';

    var factory = function($http, $q, $window, API_URL, YOUTUBE_API_KEY) {

        var services = {
            searchVideos: searchVideos
        }

        function searchVideos(q) {
            var deferred = $q.defer();

            /*   Old Params

             var params = {
                alt: 'json',
                format: '5',
                'max-results': 10,
                'paid-content': false,
                q: q,
                'start-index': 1,
                v:2
            }*/
            //params.key = YOUTUBE_API_KEY;
            //params['_'+new Date().getTime()] = '';

            var params = {
                maxResults: 20,
                part: 'snippet',
                q: q,
                safeSearch: 'none',
                type: 'video',
                videoDuration: 'any',
                videoEmbeddable: true,
                //videoSyndicated: true,
                order: 'viewCount',
                //fields: 'items(id/videoId,snippet/title,snippet/thumbnails,snippet/channelTitle)',
                key: YOUTUBE_API_KEY
            }


            $http({
                //url: 'https://gdata.youtube.com/feeds/api/videos',
                url: 'https://www.googleapis.com/youtube/v3/search',
                method: 'GET',
                params: params
            }).then(function(result) {
                if (result.data.items && result.data.items) {
                    var items = result.data.items;
                    // if the first result contains support, remove it
                    if(items[0] && items[0].snippet.title == 'https://youtube.com/devicesupport') {
                        items.splice(0,1);
                    }

                    var ids = [];
                    for (var i = items.length - 1; i >= 0; i--) {
                        ids.push(items[i].id.videoId);
                    };

                    // Get Durations
                    $http({
                        url: 'https://www.googleapis.com/youtube/v3/videos',
                        method: 'GET',
                        params: {
                            id: ids.join(','),
                            part: 'contentDetails',
                            fields: 'items(id,contentDetails/duration)',
                            key: YOUTUBE_API_KEY
                        }
                    }).then(function(result) {

                        // Combine durations back into origical items
                        var durationItems = result.data.items;
                        for (var i = durationItems.length - 1; i >= 0; i--) {


                            // Find the right original video
                            for (var x = items.length - 1; x >= 0; x--) {
                                if(items[x].id.videoId === durationItems[i].id) {
                                    console.log(items[x].id.videoId, durationItems[i].id)
                                    items[x].durationString = getTimeString(durationItems[i].contentDetails.duration);
                                    items[x].durationSeconds = getSeconds(durationItems[i].contentDetails.duration);
                                }
                            };

                            console.log(items[x]);
                        };

                        deferred.resolve(items);

                    });



                } else {
                    deferred.reject(result);
                }

            }, function(error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getTimeString(duration) {
            var string = duration.replace("PT","").replace("H",":").replace("M",":").replace("S","");
            // Look for single digit seconds
            var string_array = string.split(':');
            if(string_array[string_array.length-1].length == 1) {
                string_array[string_array.length-1] = '0'+string_array[string_array.length-1];
            }

            return string_array.join(':');
        }

        // Expects ISO 8601 duration string
        function getSeconds(duration) {
            var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
              var hours = 0, minutes = 0, seconds = 0, totalseconds;

              if (reptms.test(duration)) {
                var matches = reptms.exec(duration);
                if (matches[1]) hours = Number(matches[1]);
                if (matches[2]) minutes = Number(matches[2]);
                if (matches[3]) seconds = Number(matches[3]);
                totalseconds = hours * 3600  + minutes * 60 + seconds;
                console.log(duration);
                console.log(hours, minutes, seconds, totalseconds);
              }

            return totalseconds;
        }

        // Return all our public functions
        return services;

    };

    factory.$inject = ['$http', '$q', '$window', 'API_URL', 'YOUTUBE_API_KEY'];
    return factory;
});
