/* globals $ */

let data = (() => {
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
        getItem
    };
})();

export { data };