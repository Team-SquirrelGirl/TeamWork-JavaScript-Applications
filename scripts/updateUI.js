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

    return {
        showMsg
    };
})();

export { updateUI };