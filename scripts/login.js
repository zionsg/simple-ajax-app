$('#form').submit(function (event) {
    event.preventDefault();

    var params = {
        "username": $('#username').val(),
        "password": $('#password').val()
    };

    utils.post('login', params, function (isSuccess, statusCode, responseData) {
        utils.setLoggedIn(isSuccess);

        if (! isSuccess) {
            $('#message').addClass('alert-danger').html(responseData.message || 'error');
        } else {
            utils.redirectHome();
        }
    });
});
