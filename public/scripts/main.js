/* globals $ */

import {router} from 'routing';
import {fbAuthentication} from 'fb-authentication';
import {controllers} from 'controllers';
import {User} from "../models/User.js";

$(() => {
    'use strict';
    const contentContainer = $('#root #content'),
        navigo = router.init();
    fbAuthentication.init();
    $('#btn-fb').on('click', () => fbAuthentication.runFbSdk());

    contentContainer.on('click', '#btn-pokemon-search', (ev) => {
        let name = $(ev.target).parents('form').find('input#input-pokemon-search').val() || null;
        controllers.respondToSearch(name, 'pokemon', navigo);
    });

    contentContainer.on('click', '#btn-item-search', (ev) => {
        let name = $(ev.target).parents('form').find('input#input-item-search').val() || null;
        controllers.respondToSearch(name, 'item', navigo);
    });
    $('#btn-login').on('click', ()=> {
        var user = {
            username: $('#username').val()
        };
        controllers.login();
    });
    $('#btn-logout').on('click', function () {
       // controllers.logout();
    })

});
