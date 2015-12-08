define(['angular'], function(angular) {
    'use strict';

    var factory = function($http, $q, $window, $rootScope, API_URL) {

        var userInfo;




        /**
         * Logs a user into the application
         * @param  {Object} user
         * @return {String} access_token  A user access token to access other page data
         */
        function login(user) {
            var deferred = $q.defer();

            setToken(user.token);

            delete user.token;

            setUserSettings(user);

            deferred.resolve(user.token);

            return deferred.promise;
        }

        /**
         * Logs user out of application
         */
        function logout() {

            $window.localStorage['userInfo'] = null;

            return true;
        }

        /**
         * Signs up a new user with our API
         * @param  {String} email User Email Address
         * @param  {String} password User Password (Confirmed with Controller)
         * @return {String} access_token  A user access token to access other page data
         */
        function signup(user) {
            var deferred = $q.defer();

            $http.post(API_URL + 'signup', user).then(function(result) {

                if (result.data && result.data.response && result.data.response) {
                    userInfo = {
                        accessToken: result.data.response.token,
                        user: result.data.response.user
                    };
                    setToken(result.data.response.token);
                    setUserSettings(result.data.response.user);

                    deferred.resolve(userInfo);
                } else {
                    deferred.reject(result.data.meta.errorDetail[0]);
                }

            }, function(error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }


        /**
         * Checks if user is logged in
         * @return {Boolean} User login state
         */
        function isLoggedIn() {
            if ($window.localStorage['token']) {
                return true;
            } else {
                return false;
            }
        }

        /**
         * Gets the User Access token if it exists
         * @return string Access Token
         */
        function getAccessToken() {

            if ($window.localStorage['token']) {
                var info = JSON.parse($window.localStorage['token']);

                if (info && info.token) {
                    return info.token;
                } else {
                    return false;
                }

            } else {
                return false;
            }
        }

        function setToken(token) {
            if (token) {
                $window.localStorage['token'] = JSON.stringify(token);
                $rootScope.token = token.token;
                return true;
            } else {
                return false;
            }
        }

        function getUserSettings() {
            if ($window.localStorage['user']) {
                return JSON.parse($window.localStorage['user']);
            } else {
                return false;
            }
        }

        function setUserSettings(user) {
            if (user) {
                if (user.password) {
                    delete user.password;
                }
                $window.localStorage['user'] = JSON.stringify(user);
                $rootScope.user = user;
                return true;
            } else {
                return false;
            }
        }




        // Return all our public functions
        return {
            getAccessToken: getAccessToken,
            login: login,
            isLoggedIn: isLoggedIn,
            logout: logout,
            signup: signup,
            getUserSettings: getUserSettings
        };

    };

    factory.$inject = ['$http', '$q', '$window', '$rootScope', 'API_URL'];
    return factory;
});
