/* globals Navigo */
import { templateLoader } from 'template-loader';

import { controllers } from 'controllers';

let router = (() => {
    'use strict';

    let navigo;
    let $contentContainer = $('#root #content');

    function init() {
        navigo = new Navigo(null, true);

        navigo
            .on('/logout', () => {
                controllers.logout();
            })
            .on('#/login', (user) => {
                return Promise.all([templateLoader.get('login')])
                    .then(([template]) => {
                        $contentContainer.html(template);
                    })
                    .then(function() {
                        $('#btn-login').on('click', function() {
                            user = {
                                username: $('#tb-username').val(),
                                passHash: $('#tb-password').val()
                            }
                            controllers.login(user);
                            $('#username-value').html(user.username);
                            document.location = "#/home";
                        });
                        $('#btn-register').on('click', function() {
                            user = {
                                username: $('#tb-username').val(),
                                passHash: $('#tb-password').val()
                            }

                            controllers.register(user);
                        })
                    })
            })
            .on('/pokemons/:name', (params) => {
                controllers.pokemons();
                controllers
                    .pokemon(params.name)
                    .catch(console.log);
            })
            .on('/pokemons', () => {
                controllers.pokemons();
            })
            .on('/items/:name', (params) => {
                controllers.items();
                controllers
                    .item(params.name)
                    .catch(console.log);
            })
            .on('/items', () => {
                controllers.items();
            })
            .on('/home', () => {
                controllers.home();
            })
            .on(() => {
                navigo.navigate('/home');
            })
            .resolve();

        return navigo;
    }

    return { init };
})();

export { router };
