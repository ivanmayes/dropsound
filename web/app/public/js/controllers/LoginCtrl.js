/*global define, console */

define(function() {
    'use strict';

    function ctrl($scope, $state, UserService) {
        /*var loggedin = true;

        if(loggedin) {
            $state.go('tab.home');
        }*/

        $scope.signIn = function() {
            $state.go('login');
        };

        $scope.login = function(user) {
            console.log('logging in');


            if (user.name) {
                if ($scope.selectAvatar) {
                    var status = (Math.random() > .5) ? 'Nice' : 'Naughty',
                        avatars = $scope.avatars[status.toLowerCase()],
                        index = Math.floor(Math.random() * ((avatars.length - 1) - 0 + 1));

                    user.avatar = avatars[index].img;
                    user.status = status;
                } else {
                    user.avatar = $scope.selectedAvatar.img;
                    user.status = $scope.selectedAvatar.cat;
                }

                user.token = (user.name + user.status + new Date().getTime()).replace(/\s/g, '_');
                user.email = user.token + '@goshoptology.com';

                UserService.login(user)
                    .then(function(userInfo) {
                        console.log(userInfo);
                        $state.go('room', {
                            roomId: 1
                        });
                    }, function(reason) {
                            console.log('Failed:', reason);
                            $scope.errorMsg = reason;
                        });
            } else {
                $scope.errorMsg = 'Please enter your name.';
            }
        };

        $scope.selectAvatar = function(avatar, cat) {
            if (avatar.name == 'Gravatar') {
                console.log('gravatar');
            }

            $scope.selectedAvatar = avatar;
            $scope.selectedAvatar.cat = cat;
        };

        $scope.avatars = {
            nice: [
                {
                    name: 'Cow',
                    img: 'cow.jpg'
                },
                {
                    name: 'Moose',
                    img: 'moose.jpg'
                }
            ],
            naughty: [
                {
                    name: 'Hitler',
                    img: 'hitler.jpg'
                },
                {
                    name: 'Stalin',
                    img: 'stalin.jpg'
                }
            ]
        };
        $scope.selectedAvatar = false;
    }

    ctrl.$inject = ['$scope', '$state', 'UserService'];
    return ctrl;

});
