/* globals $ */

let updateUI = (() => {
    let root = $('#root'),
        alertTemplate = $($('#alert-template').text());

    function showMsg(msg, cssClass, delay) {
        let container = alertTemplate.clone(true)
            .addClass(cssClass).text(msg)
            .appendTo(root);

        setTimeout(() => {
        container.remove();
        }, delay || 3000);
    }

    function navbar(activeButton) {
        $('#root nav').find('li').removeClass('active');
        if (activeButton) {
            activeButton = `#btn-${activeButton}`;
            $(activeButton).parents('li').addClass('active');
        }
    }

    return {
        showMsg,
        navbar
    };
})();

export { updateUI };