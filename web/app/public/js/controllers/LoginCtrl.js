/*global define, console */

define(function() {
    'use strict';

    function ctrl($scope, $state, $window, UserService) {
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
                        $state.go('room');
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
          if(!clock) {
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

    }

    ctrl.$inject = ['$scope', '$state', '$window', 'UserService'];
    return ctrl;

});
