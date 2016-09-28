import { Validator } from './Validator.js';

export class Pokedex() {
    constructor() {
        pokemons = []
    }

    addPokemon(pokemonToAdd) {
        this.pokemons.push(pokemonToAdd);

        return this;
    }
    removePokemon(pokemon) {
        this.pokemons = this.pokemons.filter(x => x.id !== pokemon.id && x.name !== pokemon.name);

        return this;
    }
}
