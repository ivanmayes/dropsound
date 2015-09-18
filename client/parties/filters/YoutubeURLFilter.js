/*global define*/
angular.module('socially').filter('youtube', function($sce) {
    return function(id) {
        var url = 'https://www.youtube.com/embed/' + id + '?controls=1&amp;autoplay=1&amp;&amp;enablejsapi=1';
        return $sce.trustAsResourceUrl(url);
    };
});