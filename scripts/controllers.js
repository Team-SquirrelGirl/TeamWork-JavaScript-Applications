/* globals $ */

import { templateLoader as templates } from 'template-loader';
import { data } from 'data';
import { updateUI } from 'updateUI';

let controllers = (() => {
    let contentContainer = $('#root #content');

    function home() {
        updateUI.navbar();
        return Promise.resolve(templates.get('home'))
            .then((template) => {
                contentContainer.html(template());
            })
            .catch(console.log);
    }

    function pokemons() {
        updateUI.navbar('pokemons');
        return Promise.resolve(templates.get('pokemons'))
            .then((template) => {
                contentContainer.html(template());
            })
            .catch(console.log);
    }

    function pokemon(name) {
        return Promise.all([data.getPokemon(name), templates.get('pokemon-info')])
            .then(([data, pokemonInfoTemplate]) => {
                console.log(data);
                contentContainer.append(pokemonInfoTemplate(data));
            });
    }

    function items() {
        updateUI.navbar('items');
        return Promise.resolve(templates.get('items'))
            .then((template) => {
                contentContainer.html(template());
            })
            .catch(console.log);
    }

    function item(name) {
        return Promise.all([data.getItem(name), templates.get('item-info')])
            .then(([data, itemInfoTemplate]) => {
                console.log(data);
                contentContainer.append(itemInfoTemplate(data));
            });
    }

    return {
        home,
        pokemons,
        pokemon,
        items,
        item
    };
})();

export { controllers };