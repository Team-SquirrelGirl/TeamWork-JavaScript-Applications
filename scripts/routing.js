/* globals Navigo */

import { controllers } from 'controllers';
import { updateUI } from 'updateUI';

let router = (() => {
    'use strict';

    let navigo;

    function init() {
        navigo = new Navigo(null, true);

        navigo
            .on('/pokemons/:name', (params) => {
                controllers.pokemons();
                controllers
                    .pokemon(params.name)
                    .catch((error) => {
                        if (error.status === 404) {
                            updateUI.showMsg('Pokemon not found!', 'alert-danger');
                            navigo.navigate('/pokemons');
                        } else {
                            console.log(error);
                        }
                    });
            })
            .on('/pokemons', () => {
                controllers.pokemons();
            })
            .on('/items/:name', (params) => {
                controllers.items();
                controllers
                    .item(params.name)
                    .catch((error) => {
                        if (error.status === 404) {
                            updateUI.showMsg('Item not found!', 'alert-danger');
                            navigo.navigate('/items');
                        } else {
                            console.log(error);
                        }
                    });
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
