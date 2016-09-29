/* globals require module */

// Need to be changed and adjust to the need of project.

let _ = require("lodash");

module.exports = function(db) {
    function getRandomPokemon() {
        let pokemons = db("pokemons").value();
        let index = Math.floor(Math.random() * pokemons.length);
        return pokemons[index];
    }

    function get(req, res) {
        let user = req.user;
        if (!user) {
            return res.status(401)
                .send("User not authorized");
        }

        let myPokemon;

        if (user.myPokemon) {
            myPokemon = _.last(user.myPokemon);
            let now = new Date().getHours();
            let myCookieTime = myPokemon.hours;
            if (myCookieTime !== now) {
                myPokemon = getRandomPokemon();
            }
        } else {
            myPokemon = getRandomPokemon();
        }

        user.myPokemon = user.myPokemon || [];

        myPokemon.hours = new Date().getHours();
        user.myPokemon.push(myPokemon);

        db.save();

        return res.send({
            result: _.last(user.myPokemon)
        });
    }

    return { get };
};