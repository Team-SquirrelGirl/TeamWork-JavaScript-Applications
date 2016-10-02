/* globals $, Handlebars*/

import { templateLoader } from 'template-loader';
import { updateUI } from 'updateUI';
import { requester } from 'requester';

var handlebars = handlebars || Handlebars;

let controllers = (() => {
    let contentContainer = $('#root #content');

    function login(user) {
        return requester.putJSON('/api/auth', user)
            .then((userData) => {
                console.log(userData);
                localStorage.setItem('username', userData.result.username);
                localStorage.setItem('authKey', userData.result.authKey);
            })
    }

    function register(user) {
        return requester.postJSON('api/users', user)
    }

    function logout() {
        localStorage.clear();
    }

    function home() {
        updateUI.navbar();
        return Promise.resolve(templateLoader.get('home'))
            .then((template) => contentContainer.html(template()))
            .catch(console.log);
    }

    function pokemons() {
        updateUI.navbar('pokemons');
        return Promise.all([templateLoader.get('pokemons'), data.getPokemonNames()])
            .then(([template, pokemonNames]) => {
                contentContainer.html(template());
                $('#input-pokemon-search').autocomplete({ source: pokemonNames });
            })
            .catch(console.log);
    }

    function pokemon(name) {
        return Promise.all([data.getPokemon(name), templateLoader.get('pokemon-info')])
            .then(([data, pokemonInfoTemplate]) => {
                //console.log(data);
                sessionStorage.setItem(data.name, JSON.stringify(data));
                console.log(sessionStorage.length);

                let tempPokemons = [];
                //console.log(JSON.parse(sessionStorage.getItem(sessionStorage.key(0))));
                for (var i = 0; i < sessionStorage.length; i += 1) {
                    tempPokemons.push(JSON.parse(sessionStorage.getItem(sessionStorage.key(i))));
                }
                contentContainer.append(pokemonInfoTemplate(tempPokemons));
            });
    }

    function items() {
        updateUI.navbar('items');
        return Promise.all([templateLoader.get('items'), data.getItemNames()])
            .then(([template, itemNames]) => {
                contentContainer.html(template());
                $('#input-item-search').autocomplete({ source: itemNames });
            })
            .catch(console.log);
    }

    function item(name) {
        return Promise.all([data.getItem(name), templateLoader.get('item-info')])
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
        item,
        login,
        register,
        logout,
    };
})();

export { controllers };
