/* globals $ */

import { router } from 'routing';
import { data } from 'data';
import { controllers } from 'controllers';
import { User } from "../models/User.js";

$(() => {
    'use strict';

    const contentContainer = $('#root #content'),
        navigo = router.init();

    let isUserLogged = data.isLoggedIn();
    if (isUserLogged) {
        let username = data.getCurrentUser();

        $('#username-value').html('Hello, ' + username);
        $('#user-login').parent('li').addClass('hidden');
        $('#user-logout').parent('li').removeClass('hidden');
    }

    contentContainer.on('click', '#btn-pokemon-search', (ev) => {
        let name = $(ev.target).parents('form').find('input#input-pokemon-search').val() || null;
        controllers.respondToSearch(name, 'pokemon', navigo);
    });

    contentContainer.on('click', '#btn-item-search', (ev) => {
        let name = $(ev.target).parents('form').find('input#input-item-search').val() || null;
        controllers.respondToSearch(name, 'item', navigo);
    });
});
