/* globals $, Navigo */

import { templateLoader as templates } from 'template-loader';
import { data } from 'data';
import { updateUI } from 'updateUI';

let router = (() => {
    'use strict';

    let navigo;

    function init() {
        let contentContainer = $('#root #content');
        navigo = new Navigo(null, false);

        navigo
            .on('/pokemons/:name', (params) => {
                Promise.all([data.getPokemon(params.name), templates.get('pokemons'), templates.get('pokemon-info')])
                    .then(([data, pokemonsTemplate, pokemonInfoTemplate]) => {
                        console.log(data);
                        contentContainer.html(pokemonsTemplate() + pokemonInfoTemplate(data));
                    })
                    .catch((error) => {
                        if (error.status === 404) {
                            updateUI.showMsg('Pokemon not found!', 'alert-danger');
                            navigo.navigate('/pokemons');
                        } else {
                            console.log(error);
                        }
                    });

                updateUI.navbar('pokemons');
            })
            .on('/pokemons', () => {
                Promise.resolve(templates.get('pokemons'))
                    .then((template) => contentContainer.html(template()))
                    .catch(console.log);
                updateUI.navbar('pokemons');
            })
            .on('/items/:name', (params) => {
                Promise.all([data.getItem(params.name), templates.get('items'), templates.get('item-info')])
                    .then(([data, itemsTemplate, itemInfoTemplate]) => {
                        console.log(data);
                        contentContainer.html(itemsTemplate() + itemInfoTemplate(data));
                    })
                    .catch((error) => {
                        if (error.status === 404) {
                            updateUI.showMsg('Item not found!', 'alert-danger');
                            navigo.navigate('/items');
                        } else {
                            console.log(error);
                        }
                    });

                updateUI.navbar('items');
            })
            .on('/items', () => {
                Promise.resolve(templates.get('items'))
                    .then((template) => contentContainer.html(template()))
                    .catch(console.log);

                updateUI.navbar('items');
            })
            .on('/home', () => {
                Promise.resolve(templates.get('home'))
                    .then((template) => contentContainer.html(template()))
                    .catch(console.log);

                updateUI.navbar();
            })
            .on(() => {
                navigo.navigate('#/home');
            })
            .resolve();

        return navigo;
    }

    return { init };
})();

export { router };