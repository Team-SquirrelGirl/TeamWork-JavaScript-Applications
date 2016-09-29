/* globals $ */

let data = (() => {
    let names = {};

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
        return new Promise((resolve, reject) => {
            $.getJSON(`http://pokeapi.co/api/v2/pokemon/${name}/`)
                .done(resolve)
                .fail(reject);
        });
    }

    function getItem(name) {
        return new Promise((resolve, reject) => {
            $.getJSON(`http://pokeapi.co/api/v2/item/${name}/`)
                .done(resolve)
                .fail(reject);
        });
    }

    return {
        getPokemon,
        getItem,
        getPokemonNames,
        getItemNames,
        names
    };
})();

export { data };