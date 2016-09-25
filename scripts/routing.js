import { templateLoader as templates } from 'template-loader';
import { data } from 'data';
import { updateUI } from 'updateUI';

let router = (() => {
    'use strict';

    let navigo;

    function init() {
        let contentContainer = $('#root #content');
        navigo = new Navigo(null, false);

        navigo
            .on('/pokemons/:name', (params) => {
                Promise.all([data.getPokemon(params.name), templates.get('pokemon-info')])
                    .then(([data, template]) => { console.log(data); contentContainer.html(template(data)); })
                    .catch((error) => {
                        if (error.status = 404) {
                            updateUI.showMsg('Pokemon not found!', 'alert-danger');
                            navigo.navigate('/pokemons');
                        } else {
                            console.log(error);
                        }
                    });
            })
            .on('/pokemons', () => {
                Promise.resolve(templates.get('pokemons'))
                    .then((template) => contentContainer.html(template()))
                    .catch(console.log);
            })
            .on('/items/:name', (params) => {
                Promise.all([data.getItem(params.name), templates.get('item-info')])
                    .then(([data, template]) => { console.log(data); contentContainer.html(template(data)); })
                    .catch((error) => {
                        if (error.status = 404) {
                            updateUI.showMsg('Item not found!', 'alert-danger');
                            navigo.navigate('/items');
                        } else {
                            console.log(error);
                        }
                    });
            })
            .on('/items', () => {
                Promise.resolve(templates.get('items'))
                    .then((template) => $('#content').html(template()))
                    .catch(console.log);
            })
            .on(() => {
                navigo.navigate('');
                $('#content').html('');
                $('#root nav').find('li').removeClass('active');
            })
            .resolve();

        return navigo;
    }

    return { init };
})();

export { router };