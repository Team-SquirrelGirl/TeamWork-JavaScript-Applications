<<<<<<< Updated upstream
/* globals $ */

import {requester} from  'requester';

=======
import { requester } from './requester.js';
>>>>>>> Stashed changes
let data = (() => {

    let names = {};

<<<<<<< Updated upstream
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
        return Promise.resolve()
            .then(() => {
                return !!localStorage.getItem("username");
            });
    }

    function getCurrentUser() {
        return localStorage.getItem("username");
=======
    function putJSON(url, body, options = {}) {
        let promise = new Promise((resolve, reject) => {
            var headers = options.headers || {};
            $.ajax({
                url,
                headers,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(body),
                success(response) {
                    resolve(response);
                }
            });
        });
        return promise;
>>>>>>> Stashed changes
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

    function login(user) {
        return putJSON("/api/auth", user)
            .then(respUser => {
                console.log(respUser);
                localStorage.setItem("username", respUser.result.username);
                localStorage.setItem("authKey", respUser.result.authKey);
            });
    }

    function register(user) {
        return requester.postJSON("/api/users", user);
    }

    function logout() {
        return Promise.resolve()
            .then(() => {
                localStorage.removeItem("username");
                localStorage.removeItem("authKey");
            });
    }

    function isLoggedIn() {
        return Promise.resolve()
            .then(() => {
                return !!localStorage.getItem("username");
            });
    }
    return {
        getPokemon,
        getItem,
        getPokemonNames,
        getItemNames,
<<<<<<< Updated upstream
        login,
        register,
        logout,
        isLoggedIn,
        getCurrentUser,
        names
    };
})();

export {data};
=======
        names,
        isLoggedIn,
        logout,
        register,
        login
    };
})();

export { data };
>>>>>>> Stashed changes
