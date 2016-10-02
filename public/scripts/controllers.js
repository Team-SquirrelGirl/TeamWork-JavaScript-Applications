/* globals $, Handlebars*/

import { templateLoader as templates } from 'template-loader';
import { data } from 'data';
import { updateUI } from 'updateUI';

var handlebars = handlebars || Handlebars;

let controllers = (() => {
    let contentContainer = $('#root #content');

    function login() {
        data.isLoggedIn()
            .then(isLoggedIn => {
                if (isLoggedIn) {
                    //redirect to
                    window.location = "#/home";
                    updateUI.navBarLogin();
                    return;
                }

                Promise.resolve(templates.get('login'))
                    .then((template) => {
                        contentContainer.html(template());

                        $("#btn-login").on("click", (ev) => {
                            let user = {
                                username: $("#tb-username").val(),
                                passHash: $("#tb-password").val()
                            };

                            data.login(user)
                                .then((respUser) => {
                                    //123456q
                                    updateUI.navBarLogin();
                                    document.location = "#/home";
                                });

                            ev.preventDefault();
                            return false;
                        });

                        $("#btn-register").on("click", (ev) => {
                            let user = {
                                username: $("#tb-username").val(),
                                passHash: $("#tb-password").val()
                            };

                            data.register(user)
                                .then((respUser) => {
                                    console.log(respUser.result.username + 'logged in');
                                    return data.login(respUser);
                                })
                                .then((respUser) => {
                                    //123456q
                                    //$(document.body).addClass("logged-in");
                                    document.location = "#/home";
                                });
                            ev.preventDefault();
                            return false;
                        });
                    });
            })
    }

    ///
    //unction login(user) {
    //   return new Promise((resolve,reject)=>{
    //       data.login(user);
    //   })
    //       .then(
    //           updateUI.navBarLogin()
    //       )
    //       .then(
    //           data.isLoggedIn()
    //               .then(function (result) {
    //                   $('#span-username').text(result)
    //               })
    //       )

    function logout() {
        console.log(data.getCurrentUser());
        return new Promise((resolve, reject) => {
            resolve(data.logout());
        })
            .then(updateUI.navBarLogout());
    }

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

    function respondToSearch(name, type, navigo) {
        if (name !== null && name !== undefined && typeof name === 'string') {
            name = name.replace(/\s+/g, '').toLowerCase();
            if (name.length >= 3) {
                findNameFromData(name, type)
                    .then((isFound) => {
                        if (isFound) {
                            navigo.navigate(`/${type}s/${name}`);
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

    function home() {
        updateUI.navbar();
        return Promise.resolve(templates.get('home'))
            .then((template) => contentContainer.html(template()))
            .catch(console.log);
    }

    function pokemons() {
        updateUI.navbar('pokemons');
        return Promise.all([templates.get('pokemons'), data.getPokemonNames()])
            .then(([template, pokemonNames]) => {
                contentContainer.html(template());
                $('#input-pokemon-search').autocomplete({source: pokemonNames});
            })
            .catch(console.log);
    }

    function pokemon(name) {
        return Promise.all([data.getPokemon(name), templates.get('pokemon-info')])
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
        return Promise.all([templates.get('items'), data.getItemNames()])
            .then(([template, itemNames]) => {
                contentContainer.html(template());
                $('#input-item-search').autocomplete({source: itemNames});
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
        item,
        respondToSearch,
        login,
        logout
    };
})();

export {controllers};
