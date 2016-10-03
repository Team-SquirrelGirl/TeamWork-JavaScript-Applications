/* globals $ */

import { router } from 'routing';
import { data } from 'data';

$(() => {
    'use strict';

    router.init();

    let isUserLogged = data.isLoggedIn();
    if (isUserLogged) {
        let username = data.getCurrentUser();

        $('#username-value').parent('li').removeClass('hidden');
        $('#username-value').html('Hello, ' + username);
        $('#nav-btn-login').addClass('hidden');
        $('#nav-btn-pokedex').removeClass('hidden');
        $('#user-logout').parent('li').removeClass('hidden');
    }
});
