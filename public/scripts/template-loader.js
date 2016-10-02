/* globals Handlebars */

import { requester } from 'requester';

const templateLoader = (() => {
    'use strict';

    let handlebars = handlebars || Handlebars;
    const cache = {};

    function get(templateName) {
        return new Promise((resolve, reject) => {
            requester.get(`/scripts/templates/${templateName}.handlebars`)
                .then((data) => {
                    let template = handlebars.compile(data);
                    cache[templateName] = template;
                    resolve(template);
                });
        });
    }

    return { get };
})();

export { templateLoader };