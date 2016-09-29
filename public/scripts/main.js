/* globals $ */

import { router } from 'routing';
import { fbAuthentication } from 'fb-authentication';
import { controllers } from 'controllers';

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
});
