import * as $ from "../bower_components/jquery/dist/jquery.js";
import * as hb from "../bower_components/handlebars/handlebars.js";
import {requester} from "./requester.js";


var handlebars = hb || Handlebars;

const templateLoader = (() => {
    'use strict';

    const cache = {};

    function get(templateName) {
        return new Promise((resolve, reject) => {

            $.get(`/scripts/templates/${templateName}.handlebars`)
                .done((data) => {
                    let template = hb.compile(data);
                    cache[templateName] = template;
                    resolve(template);
                })
                .fail(reject);

        });
    }
    function getLogin() {
        return new Promise((resolve, reject) => {

            $.get(`/scripts/templates/login.handlebars`)
                .done((data) => {
                    resolve(data);
                })
                .fail(reject);

        });
    }

    return {get,
            getLogin};
})();

export {templateLoader};