/*global define, console */

define(function() {
    'use strict';

    function ctrl($scope, $state, $window, UserService, $timeout) {
        /*var loggedin = true;

        if(loggedin) {
            $state.go('tab.home');
        }*/

        $scope.cat = '';
        $scope.getSelectedAvatar = getSelectedAvatar;
        $scope.setSelectedAvatar = setSelectedAvatar;

        $scope.signIn = function() {
            $state.go('login');
        };

        $scope.login = function(user) {
            console.log('logging in');

            // If no name, give a random one
            if (!user.name) {
                user.name = "Anonymous";
            }

            // If no naughty/nice, get nice
            if ($scope.cat) {
                user.status = $scope.cat;
                user.avatar = getSelectedAvatar($scope.cat).img;
            } else {
                user.status = (Math.random() > .5) ? 'nice' : 'naughty';
                var avatars = $scope.avatars[user.status.toLowerCase()],
                    index = Math.floor(Math.random() * ((avatars.length - 1) - 0 + 1));

                user.avatar = avatars[index].img;
            }

            user.token = (user.name + user.status + new Date().getTime()).replace(/\s/g, '_');
            user.email = user.token + '@goshoptology.com';

            UserService.login(user)
                .then(function(userInfo) {
                    console.log(userInfo);
                    $state.go('room');
                }, function(reason) {
                        console.log('Failed:', reason);
                        $scope.errorMsg = reason;
                    });
        };

        $scope.selectAvatar = function(avatar, cat) {
            console.log('gravatar');
            if (avatar.name == 'Gravatar') {
                console.log('gravatar');
            }

            $scope.selectedAvatar = avatar;
            $scope.selectedAvatar.cat = cat;
        };

        $scope.avatars = {
            nice: [
                {
                    img: '/img/avatar-01.svg',
                    selected: true
                },
                {
                    img: '/img/avatar-02.svg',
                    selected: false
                },
                {
                    img: '/img/avatar-03.svg',
                    selected: false
                },
                {
                    img: '/img/avatar-04.svg',
                    selected: false
                },
                {
                    img: '/img/avatar-05.svg',
                    selected: false
                },
            ],
            naughty: [
                {
                    img: '/img/avatar-06.svg',
                    selected: true
                },
                {
                    img: '/img/avatar-07.svg',
                    selected: false
                },
                {
                    img: '/img/avatar-08.svg',
                    selected: false
                },
                {
                    img: '/img/avatar-09.svg',
                    selected: false
                },
                {
                    img: '/img/avatar-10.svg',
                    selected: false
                },
            ]
        };

        function getSelectedAvatar(cat) {
            var selected = [];
            angular.forEach($scope.avatars[cat], function(avatar, k) {
                if (avatar.selected == true) {
                    selected = avatar;
                }
            });

            return selected;
        }

        function setSelectedAvatar(avatar, cat) {
            angular.forEach($scope.avatars[cat], function(a, k) {
                if (avatar == a) {
                    $scope.avatars[cat][k].selected = true;
                } else {
                    $scope.avatars[cat][k].selected = false;
                }
            });
        }


        // Countdown

        function getTimeRemaining(endtime) {
            var t = Date.parse(endtime) - Date.now();
            var seconds = Math.floor((t / 1000) % 60);
            var minutes = Math.floor((t / 1000 / 60) % 60);
            var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            var days = Math.floor(t / (1000 * 60 * 60 * 24));
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }

        function initializeClock(id, endtime) {
            var clock = $window.document.getElementById(id);
            console.log(clock);
            if (!clock) {
                return false;
            }
            var daysSpan = clock.querySelector('.days');
            var hoursSpan = clock.querySelector('.hours');
            var minutesSpan = clock.querySelector('.minutes');
            var secondsSpan = clock.querySelector('.seconds');

            function updateClock() {
                var t = getTimeRemaining(endtime);

                daysSpan.innerHTML = t.days;
                hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
                minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
                secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

                if (t.total <= 0) {
                    clearInterval(timeinterval);
                }
            }

            updateClock();
            var timeinterval = setInterval(updateClock, 1000);
        }

        var deadline = new Date('Thu Dec 17 2015 09:00:00 GMT-0600 (CST)');
        setTimeout(function() {
            initializeClock('clockdiv', deadline);
        }, 500);

        $timeout(function() {
            console.log('focusing');
            var element = $window.document.getElementById('nameInput');
            if (element) {
                element.focus();
            }
        });

    }

    ctrl.$inject = ['$scope', '$state', '$window', 'UserService', '$timeout'];
    return ctrl;

});
