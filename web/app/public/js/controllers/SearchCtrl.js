/*global define*/

define(function() {
    'use strict';

    function ctrl($scope, $stateParams, $rootScope, $modal, SearchService) {
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
        
    	function addVideo() {
    		
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

    ctrl.$inject = ['$scope', '$stateParams', '$rootScope', '$modal', 'SearchService'];
    return ctrl;

});
