angular.module('socially').controller('PartyDetailsCtrl', function($scope, $stateParams, $meteor) {

    $scope.party = $meteor.object(Parties, $stateParams.partyId).subscribe('parties');
    //$scope.playlist = $meteor.collection(Videos).subscribe('videos', $stateParams.partyId); //$meteor.collection(Videos).subscribe('videos');
    $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');


});