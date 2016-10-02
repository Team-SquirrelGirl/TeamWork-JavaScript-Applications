/* globals $, CryptoJS */

import { templateLoader } from 'template-loader';
import { updateUI } from 'updateUI';
import { requester } from 'requester';
import { data } from 'data';

let controllers = (() => {
    let contentContainer = $('#root #content');

    function findNameFromData(name, type) {
        return new Promise((resolve, reject) => {
            let isFound = false,
                namesToSearchFrom = data.names[type];

            for (let i = 0, len = namesToSearchFrom.length; i < len; i += 1) {
                if (name === namesToSearchFrom[i].toLowerCase()) {
                    isFound = true;
                }
            }

            resolve(isFound);
        });
    }

    function respondToSearch(name, type) {
        if (name !== null && name !== undefined && typeof name === 'string') {
            name = name.replace(/\s+/g, '').toLowerCase();
            if (name.length >= 3) {
                findNameFromData(name, type)
                    .then((isFound) => {
                        if (isFound) {
                            document.location = `#/${type}s/${name}`;
                        } else {
                            updateUI.showMsg(`Invalid ${type} name!`, 'alert-danger');
                        }
                    });
            } else {
                updateUI.showMsg(`Invalid ${type} name!`, 'alert-danger');
            }
        } else {
            updateUI.showMsg(`Invalid ${type} name!`, 'alert-danger');
        }
    }

    function login() {
        return Promise.resolve(templateLoader.get('login'))
            .then((template) => {
                contentContainer.html(template);
            })
            .then(function () {
                updateUI.navbar('user-login');

                $('#btn-login').on('click', function () {
                    let username = $('#tb-username').val(),
                        password = $('#tb-password').val();

                    if (username.length < 4 || 20 < username.length) {
                        updateUI.showMsg('Username should be between 4 and 20 symbols!', 'alert-danger');
                        return;
                    }

                    if (password.length < 4 || 20 < password.length) {
                        updateUI.showMsg('Password should be between 4 and 20 symbols!', 'alert-danger');
                        return;
                    }

                    let user = {
                        username,
                        passHash: CryptoJS.SHA1(password).toString()
                    };

                    requester.putJSON('/api/auth', user)
                        .catch((error) => {
                            if (error.status === 404) {
                                updateUI.showMsg('Incorrect username or password!', 'alert-danger');
                            }
                        })
                        .then((userData) => {
                            if (userData) {
                                localStorage.setItem('username', userData.result.username);
                                localStorage.setItem('authKey', userData.result.authKey);

                                $('#username-value').html('Hello, ' + user.username);
                                $('#user-login').parent('li').addClass('hidden');
                                $('#user-logout').parent('li').removeClass('hidden');
                                $('#btn-pokedex').parent('li').removeClass('hidden');
                                document.location = '#/home';
                            }
                        });
                });

                $('#btn-register').on('click', function () {
                    let username = $('#tb-username').val(),
                        password = $('#tb-password').val();

                    if (username.length < 4 || 20 < username.length) {
                        updateUI.showMsg('Username should be between 4 and 20 symbols!', 'alert-danger');
                        return;
                    }

                    if (password.length < 4 || 20 < password.length) {
                        updateUI.showMsg('Password should be between 4 and 20 symbols!', 'alert-danger');
                        return;
                    }

                    let user = {
                        username,
                        passHash: CryptoJS.SHA1(password).toString()
                    };
                    register(user);
                });
            });
    }

    function register(user) {
        updateUI.showMsg('You have been registered successfully!', 'alert-success');
        return requester.postJSON('api/users', user);
    }

    function logout() {
        $('#username-value').html('');
        $('#user-logout').parent('li').addClass('hidden');
        $('#btn-pokedex').parent('li').addClass('hidden');
        $('#user-login').parent('li').removeClass('hidden');
        localStorage.clear();
    }

    function home() {
        updateUI.navbar();
        return Promise.resolve(templateLoader.get('home'))
            .then((template) => contentContainer.html(template()))
            .catch(console.log);
    }

    function pokemons() {
        updateUI.navbar('btn-pokemons');

        return Promise.all([templateLoader.get('pokemons'), data.getPokemonNames()])
            .then(([template, pokemonNames]) => {
                contentContainer.html(template());
                $('#input-pokemon-search').autocomplete({ source: pokemonNames });
            })
            .then(() => {
                contentContainer.on('click', '#btn-pokemon-search', (ev) => {
                    let name = $(ev.target).parents('form').find('input#input-pokemon-search').val() || null;
                    respondToSearch(name, 'pokemon');
                });
            })
            .catch(console.log);
    }

    function pokemon(name) {
        return Promise.all([data.getPokemon(name), templateLoader.get('pokemon-info')])
            .then(([pokemonData, pokemonInfoTemplate]) => {
                contentContainer.append(pokemonInfoTemplate(pokemonData));
                if (data.isLoggedIn()) {
                    $('#btn-add-to-pokedex').removeClass('hidden');
                }
            });
    }

    function items() {
        updateUI.navbar('btn-items');

        return Promise.all([templateLoader.get('items'), data.getItemNames()])
            .then(([template, itemNames]) => {
                contentContainer.html(template());
                $('#input-item-search').autocomplete({ source: itemNames });
                contentContainer.on('click', '#btn-item-search', (ev) => {
                    let name = $(ev.target).parents('form').find('input#input-item-search').val() || null;
                    respondToSearch(name, 'item');
                });
            })
            .catch(console.log);
    }

    function item(name) {
        return Promise.all([data.getItem(name), templateLoader.get('item-info')])
            .then(([itemData, itemInfoTemplate]) => {
                contentContainer.append(itemInfoTemplate(itemData));
            });
    }

    function pokedex() {
        updateUI.navbar('btn-pokedex');
        contentContainer.html('');

        // return Promise.all([data.getPokedex(), templateLoader.get('pokemon-info')])
        //     .then(([pokedex, pokemonInfoTemplate]) => {
        //         for (let pokemon of pokedex) {
        //             contentContainer.append(pokemonInfoTemplate(pokemon));
        //         }
        // });
    }

    return {
        home,
        pokemons,
        pokemon,
        items,
        item,
        pokedex,
        respondToSearch,
        login,
        register,
        logout,
    };
})();

export { controllers };
