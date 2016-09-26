/* globals $ */

import { router } from 'routing';
import { updateUI } from 'updateUI';

$(() => {
    'use strict';

    const contentContainer = $('#root #content'),
        navigo = router.init();

    contentContainer.on('click', '#btn-pokemon-search', (ev) => {
        let name = $(ev.target).parents('form').find('input#input-pokemon-search').val() || null;
        if (name !== null && name !== undefined) {
            name = name.replace(/\s+/g, '').toLowerCase();
            if (name !== "") {
                navigo.navigate(`/pokemons/${name}`);
            } else {
                updateUI.showMsg('Invalid pokemon name!', 'alert-danger');
            }
        } else {
            updateUI.showMsg('Invalid pokemon name!', 'alert-danger');
        }
    });

    contentContainer.on('click', '#btn-item-search', (ev) => {
        let name = $(ev.target).parents('form').find('input#input-item-search').val() || null;
        if (name !== null && name !== undefined) {
            name = name.replace(/\s+/g, '').toLowerCase();
            if (name !== "") {
                navigo.navigate(`/items/${name}`);
            } else {
                updateUI.showMsg('Invalid item name!', 'alert-danger');
            }
        } else {
            updateUI.showMsg('Invalid item name!', 'alert-danger');
        }
    });
});