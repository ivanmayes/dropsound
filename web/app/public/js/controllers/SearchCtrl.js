/*global define*/

define(function() {
    'use strict';

    function ctrl($scope, $stateParams, $rootScope, SearchService, RoomService) {
    	$scope.addVideo = addVideo;
    	$scope.search = {
    		q: '',
    		maxResults: 10,
    		part: 'snippet',
    		type: 'video',
    		videoEmbeddable: true,
    	}
    	$scope.searchVideos = searchVideos;
    	$scope.videos = [];
        
    	function addVideo(video) {
    		console.log('adding video');
            RoomService.addVideoToPlaylist(video);
    	}

        function searchVideos() {
        	SearchService.searchVideos($scope.search)
        	.then(function(items) {
        		console.log(items);
        		$scope.videos = items;
        	}, function(error) {
        		console.log('searchVideos error', error);
        	})
        }

    }

    ctrl.$inject = ['$scope', '$stateParams', '$rootScope', 'SearchService', 'RoomService'];
    return ctrl;

});