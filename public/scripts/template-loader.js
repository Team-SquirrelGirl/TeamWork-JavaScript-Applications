/* globals $, Handlebars */

const templateLoader = (() => {
    const templatesCache = {},
        handlebars = handlebars || Handlebars;

    function get(templateName) {
        return new Promise((resolve, reject) => {
            if (templatesCache[templateName]) {
                resolve(handlebars.compile(templatesCache[templateName]));
            }

            $.get(`./scripts/templates/${templateName}.handlebars`, template => {
                templatesCache[templateName] = template;
                resolve(handlebars.compile(template));
            });
        });
    }

    return { get };
})();

export { templateLoader };
