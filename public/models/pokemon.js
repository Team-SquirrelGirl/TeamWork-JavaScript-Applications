import {validator} from './Validator.js';


export class Pokemon
{
    constructor(id, name, types)
    {
        validator.validateIfUndefined(id, 'Pokemon id');
        validator.validateIfNumber(id, 'Pokemon id');
        validator.validateString(name, 'Pokemon name');

        this._id = id;
        this._name = name;
        this._weight = weight;
        this._height = height;
        this.types = types
    }
}
