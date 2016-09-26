/* globals $ */

import { templateLoader as templates } from 'template-loader';
import { data } from 'data';
import { updateUI } from 'updateUI';

let controllers = (() => {
    let contentContainer = $('#root #content');

    function home() {
        return Promise.resolve(templates.get('home'))
            .then((template) => {
                updateUI.navbar();
                contentContainer.html(template());
            })
            .catch(console.log);
    }

    function pokemons() {
        return Promise.resolve(templates.get('pokemons'))
            .then((template) => {
                updateUI.navbar('pokemons');
                contentContainer.html(template());
            })
            .catch(console.log);
    }

    function pokemon(name) {
        return Promise.all([data.getPokemon(name), templates.get('pokemon-info')])
            .then(([data, pokemonInfoTemplate]) => {
                updateUI.navbar('pokemons');
                console.log(data);
                contentContainer.append(pokemonInfoTemplate(data));
            });
    }

    function items() {
        return Promise.resolve(templates.get('items'))
            .then((template) => {
                updateUI.navbar('items');
                contentContainer.html(template());
            })
            .catch(console.log);
    }

    function item(name) {
        return Promise.all([data.getItem(name), templates.get('item-info')])
            .then(([data, itemInfoTemplate]) => {
                updateUI.navbar('items');
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