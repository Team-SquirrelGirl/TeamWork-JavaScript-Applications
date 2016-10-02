/* globals $ */

import { router } from 'routing';
import { data } from 'data';

$(() => {
    'use strict';

    router.init();

    let isUserLogged = data.isLoggedIn();
    if (isUserLogged) {
        let username = data.getCurrentUser();

        $('#username-value').html('Hello, ' + username);
        $('#user-login').parent('li').addClass('hidden');
        $('#btn-pokedex').parent('li').removeClass('hidden');
        $('#user-logout').parent('li').removeClass('hidden');
    }
});
