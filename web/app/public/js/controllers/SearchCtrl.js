/*global define*/

define(function() {
    'use strict';

    function ctrl($scope, $stateParams, $rootScope, SearchService, RoomService) {
        $scope.addVideo = addVideo;
        $scope.hideSearch = hideSearch;
        $scope.clearSearch = clearSearch;
        $scope.search = {
            q: '',
            // Old api terms
            maxResults: 10,
            part: 'snippet,contentDetails', //'snippet',
            type: 'video',
            videoEmbeddable: true,
        }
        $scope.searchVideos = searchVideos;
        $scope.videos = [];
        $scope.predefinedVideos = {};

        function addVideo(video, inPlaylist) {
            if (!inPlaylist) {
                console.log('adding video', video, inPlaylist);
                RoomService.addVideoToPlaylist(video);
            }
        }

        function searchVideos() {
            SearchService.searchVideos($scope.search.q)
                .then(function(items) {
                    console.log(items);
                    $scope.videos = items;
                }, function(error) {
                        console.log('searchVideos error', error);
                    })
        }

        function clearSearch() {
            $scope.videos = [];
            $scope.search.q = '';
        }

        function hideSearch() {
            console.log('HIDE');
            $scope.clearSearch();
            $scope.search.showSearchPage = false;
        }
    }

    ctrl.$inject = ['$scope', '$stateParams', '$rootScope', 'SearchService', 'RoomService'];
    return ctrl;

});
