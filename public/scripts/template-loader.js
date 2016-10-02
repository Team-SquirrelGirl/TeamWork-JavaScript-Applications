/* globals Handlebars */

import { requester } from 'requester';

const templateLoader = (() => {
    'use strict';

<<<<<<< Updated upstream
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
=======
    let cache = {};

    function get(templateName) {
        return new Promise((resolve, reject) => {
            if (cache[templateName]) {
                resolve(cache[templateName]);
            } else {
                $.get(`/scripts/templates/${templateName}.handlebars`)
                    .done((data) => {
                        let template = Handlebars.compile(data);
                        cache[templateName] = template;

                        console.log(cache);
                        resolve(template);
                    })
                    .fail(reject);
            }
>>>>>>> Stashed changes
        });
    }

    return {get };
})();

export { templateLoader };
