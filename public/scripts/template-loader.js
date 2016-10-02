const templateLoader = (() => {
    const templatesCache = {};

    function get(templateName) {
        return new Promise((resolve, reject) => {
            if (templatesCache[templateName]) {
                resolve(Handlebars.compile(templatesCache[templateName]));
            }

            $.get(`./scripts/templates/${templateName}.handlebars`, template => {
                templatesCache[templateName] = template;
                resolve(Handlebars.compile(template));
            })
        })
    }

    return {get };
})();

export { templateLoader };
