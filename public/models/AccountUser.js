import { Validator } from './Validator.js';
import { User } from './User.js';

export class AccountUser {
    signup(userName, password, firstName, lastName, email) {
        var user = new User(userName, password, firstName, lastName, email);

    }

    login(username, password) {

    }

    logout() {

    }
}
