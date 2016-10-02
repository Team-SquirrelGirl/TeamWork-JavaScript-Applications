/* globals $ */
let updateUI = (() => {
    'use strict';

    let $root = $('#root'),
        $navContainer = $('#root nav'),
        $alertTemplate = $($('#alert-template').text());

    function showMsg(msg, cssClass, delay) {
        let $container = $alertTemplate.clone(true)
            .addClass(cssClass).text(msg)
            .appendTo($root);

        setTimeout(() => {
            $container.remove();
        }, delay || 3000);
    }

    function navbar(activeButton) {

        $navContainer.find('li').removeClass('active');
        if (activeButton) {
            $(`#btn-${activeButton}`).parents('li').addClass('active');
        }
    }

    function navBarLogin() {
        $('#login').removeClass('form-group');
        $('#login').addClass('form-group hidden');

        $('#logout').removeClass('form-group hidden');
        $('#logout').addClass('form-group');

        $('#register').removeClass('from-group');
        $('#register').addClass('from-group hidden');

    }

    function navBarLogout() {

        $('#logout').removeClass('form-group');
        $('#logout').addClass('form-group hidden');

        $('#login').removeClass('form-group hidden');
        $('#login').addClass('form-group');

        $('#register').removeClass('from-group hidden');
        $('#register').addClass('from-group');
    }

    return {
        showMsg,
        navbar,
        navBarLogin,
        navBarLogout
    };
})();

export { updateUI };
