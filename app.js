/* globals require console */

const express = require("express"),
    bodyParser = require("body-parser"),
    lowdb = require("lowdb"),
    cors = require("cors");

let db = lowdb("./data/data.json");
db._.mixin(require("underscore-db"));

let app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static("./public"));

require("./utils/authorize-user")(app, db);

//User routes
let usersController = require("./controllers/users-controller")(db);
app.get("/api/users", usersController.get);
app.post("/api/users", usersController.post);
app.put("/api/auth", usersController.put);

// My pokemons
let myPokemonsController = require("./controllers/my-pokemons-controller")(db);
app.get("/api/my-pokemons", myPokemonsController.get);

let port = 3333;
app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));