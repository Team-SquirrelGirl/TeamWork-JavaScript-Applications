/* globals Navigo */
import { controllers } from 'controllers';

let router = (() => {
    'use strict';

    let navigo;

    function init() {
        navigo = new Navigo(null, true);

        navigo
            .on('/logout', () => {
                controllers.logout();
                navigo.navigate('/home');
            })
            .on('/login', () => {
                controllers.login();
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
            .on('/pokedex', () => {
                controllers.pokedex();
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
