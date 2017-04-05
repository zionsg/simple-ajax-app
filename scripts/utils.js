/**
 * Utility functions
 *
 * @link https://github.com/zionsg/simple-ajax-app for canonical source repository
 */

var utils = (function () {
    // Constants
    var IS_LOGGED_IN = 'is_logged_in';

    // Base url for AJAX calls
    var baseUrl = 'http://127.0.0.1:8080/api/v1';

    // Self reference - all public vars/methods will be stored in here and returned as public interface
    var self = {};

    /**
     * AJAX post with common params set
     *
     * @param  string endpoint
     * @param  object requestParams
     * @param  callable responseCallback Takes in (isSuccess, statusCode, responseData) and returns void
     * @return void
     */
    self.post = function (endpoint, requestParams, responseCallback) {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: baseUrl + '/' + endpoint,
            data: requestParams
        }).done(function (data, textStatus, jqXHR) {
            var isSuccess = true,
                statusCode = jqXHR.status,
                responseData = data;

            console.log(statusCode, responseData);
            responseCallback(isSuccess, statusCode, responseData);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            var isSuccess = false,
                statusCode = jqXHR.status,
                responseData = jqXHR.responseJSON;

            console.log(statusCode, responseData);
            responseCallback(isSuccess, statusCode, responseData);
        });
    };

    /**
     * Redirect to url
     *
     * @param  string url
     * @return void
     */
    self.redirect = function (url) {
        window.location.href = url;
    }

    /**
     * Redirect back to home page
     *
     * @return void
     */
    self.redirectHome = function () {
        window.location.href = 'index.html';
    }

    /**
     * Set login status
     *
     * @param  bool flag
     * @return void
     */
    self.setLoggedIn = function (flag) {
        window.localStorage.setItem(
            IS_LOGGED_IN,
            (true === flag ? 1 : 0)
        );
    }

    /**
     * Check login status
     *
     * @return bool
     */
    self.isLoggedIn = function () {
        return (1 == window.localStorage.getItem(IS_LOGGED_IN)); // cannot use === as localStorage stores as "1"
    };

    // Return public interface
    return self;
})();
