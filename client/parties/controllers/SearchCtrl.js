/*global define*/

angular.module('socially').controller('SearchCtrl', function($scope, $stateParams, $meteor, $rootScope, SearchService) {

    $scope.addVideo = addVideo;
    $scope.clearSearch = clearSearch;
    $scope.party = $meteor.object(Parties, $stateParams.partyId).subscribe('parties');
    $scope.search = {
        q: '',
        // Old api terms
        maxResults: 10,
        part: 'snippet,contentDetails', //'snippet',
        type: 'video',
        videoEmbeddable: true,
    };
    $scope.searchVideos = searchVideos;
    $scope.videos = [];

    function addVideo(video) {
        video.addedBy = $rootScope.currentUser;
        video.room = $stateParams.partyId;
        video.votes = 0;

        //$scope.playlist.save(video);
        if (!$scope.party.playlist) {
            $scope.party.playlist = [];
        }
        $scope.party.playlist.push(video);

        /*if (!$scope.party.currentVideo) {
            $scope.party.currentVideo = $scope.party.playlist[0];
        }*/
    }

    function searchVideos() {
        SearchService.searchVideos($scope.search.q)
            .then(function(items) {
                //console.log(items);
                $scope.videos = items;
            }, function(error) {
                    console.log('searchVideos error', error);
                });
    }

    function clearSearch() {
        $scope.videos = [];
        $scope.search.q = '';
    }

});
