/* globals $ */
import { requester } from './requester.js';

let data = (() => {
    let names = {};
    const HTTP_HEADER_KEY = "x-auth-key",
        KEY_STORAGE_USERNAME = "username",
        KEY_STORAGE_AUTH_KEY = "authKey";

    function login(user) {
        return requester.putJSON("/api/auth", user)
            .then((respUser) => {
                localStorage.setItem("username", respUser.result.username);
                localStorage.setItem("authKey", respUser.result.authKey);
            })
            .catch(console.log);
    }

    function register(user) {
        var result = requester.postJSON('/api/users', user);
        console.log(result);
        return result;
    }

    function logout() {
        return Promise.resolve()
            .then(() => {
                localStorage.removeItem("username");
                localStorage.removeItem("authKey");
            })
            .catch(console.log);
    }

    function isLoggedIn() {
            return !!localStorage.getItem("username");
    }

    function getCurrentUser() {
        return localStorage.getItem("username");
    }

    function getPokemonNames() {
        if (names.pokemon) {
            return Promise.resolve(names.pokemon);
        }

        return new Promise((resolve, reject) => {
            $.getJSON(`../data/pokemon-names.json`)
                .done((pokemonNames) => {
                    names.pokemon = pokemonNames;
                    resolve(pokemonNames);
                })
                .fail(reject);
        });
    }

    function getItemNames() {
        if (names.item) {
            return Promise.resolve(names.item);
        }

        return new Promise((resolve, reject) => {
            $.getJSON(`../data/item-names.json`)
                .done((itemNames) => {
                    names.item = itemNames;
                    resolve(itemNames);
                })
                .fail(reject);
        });
    }

    function getPokemon(name) {
        return requester.getJSON(`http://pokeapi.co/api/v2/pokemon/${name}/`);
    }

    function getItem(name) {
        return requester.getJSON(`http://pokeapi.co/api/v2/item/${name}/`);
    }

    return {
        getPokemon,
        getItem,
        getPokemonNames,
        getItemNames,
        login,
        register,
        logout,
        isLoggedIn,
        getCurrentUser,
        names
    };
})();

export { data };
