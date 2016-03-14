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
            user.avatar = getSelectedAvatar().img

            user.token = (user.name + user.status + new Date().getTime()).replace(/\s/g, '_');
            user.email = user.token + '@goshoptology.com';

            console.log('user', user);

            UserService.login(user)
                .then(function(userInfo) {
                    console.log(userInfo);
                    $state.go('room');
                }, function(reason) {
                        console.log('Failed:', reason);
                        $scope.errorMsg = reason;
                    });
        };

        $scope.selectAvatar = function(avatar) {
            console.log('gravatar');
            if (avatar.name == 'Gravatar') {
                console.log('gravatar');
            }

            $scope.selectedAvatar = avatar;
        };

        $scope.avatars = [
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
            {
                img: '/img/avatar-06.svg',
                selected: false
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
            {
                img: '/img/avatar-11.svg',
                selected: false
            },
            {
                img: '/img/avatar-12.svg',
                selected: false
            },
            {
                img: '/img/avatar-13.svg',
                selected: false
            },
            {
                img: '/img/avatar-14.svg',
                selected: false
            },
            {
                img: '/img/avatar-15.svg',
                selected: false
            },
            {
                img: '/img/avatar-16.svg',
                selected: false
            },
            {
                img: '/img/avatar-17.svg',
                selected: false
            },
            {
                img: '/img/avatar-18.svg',
                selected: false
            },
            {
                img: '/img/avatar-19.svg',
                selected: false
            },
            {
                img: '/img/avatar-20.svg',
                selected: false
            },
            {
                img: '/img/avatar-21.svg',
                selected: false
            },
            {
                img: '/img/avatar-22.svg',
                selected: false
            },
            {
                img: '/img/avatar-23.svg',
                selected: false
            },
            {
                img: '/img/avatar-24.svg',
                selected: false
            },
            {
                img: '/img/avatar-25.svg',
                selected: false
            }
        ];

        function getSelectedAvatar() {
            var selected = [];
            angular.forEach($scope.avatars, function(avatar, k) {
                if (avatar.selected == true) {
                    selected = avatar;
                }
            });

            return selected;
        }

        function setSelectedAvatar(avatar) {
            angular.forEach($scope.avatars, function(a, k) {
                if (avatar == a) {
                    $scope.avatars[k].selected = true;
                } else {
                    $scope.avatars[k].selected = false;
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
