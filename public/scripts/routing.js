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
                $('#username-value').html('');
                $('#user-logout').html('');
                document.location = "#/home";
            })
            .on('/login', () => {
                return Promise.all([templateLoader.get('login')])
                    .then(([template]) => {
                        $contentContainer.html(template);
                    })
                    .then(function() {
                        $('#btn-login').on('click', function() {
                            let user = {
                                username: $('#tb-username').val(),
                                passHash: $('#tb-password').val()
                            }
                            console.log(user);
                            controllers.login(user);
                            $('#username-value').html(user.username).css({ "color": "red", "text-decoration": "underline" })
                            $('#user-logout').html('Logout');
                            document.location = "#/home";
                        });
                        $('#btn-register').on('click', function() {
                            let user = {
                                username: $('#tb-username').val(),
                                passHash: $('#tb-password').val()
                            }
                            console.log(user);
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
            .on('/login', () => {
                controllers.login();
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
