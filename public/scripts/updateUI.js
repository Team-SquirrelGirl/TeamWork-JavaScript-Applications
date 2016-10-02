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
            $(`#${activeButton}`).parents('li').addClass('active');
        }
    }

    return {
        showMsg,
        navbar
    };
})();

export { updateUI };
