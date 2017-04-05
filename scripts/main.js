$('#logout').click(function (event) {
    utils.setLoggedIn(false);
    utils.redirectHome();
});
