export class Validator() {
    constructor() {

    }

    validateIfUndefined: function(val, name) {
            name = name || 'Value';
            if (val === undefined) {
                console.log(name + ' cannot be undefined');
            }
        },
        validateIfObject: function(val, name) {
            name = name || 'Value';
            if (typeof val !== 'object') {
                console.log(name + ' must be an object');
            }
        },
        validateIfNumber: function(val, name) {
            name = name || 'Value';
            if (typeof val !== 'number') {
                console.log(name + ' must be a number');
            }
        },
        validateString: function(val, name) {
            name = name || 'Value';
            this.validateIfUndefined(val, name);

            if (typeof val !== 'string') {
                console.log(name + ' must be a string');
            }

            if (val.length < 2 ||
                50 < val.length) {
                console.log(name + ' must be between ' + 2 +
                    ' and ' + 50 + ' symbols');
            }
        },
        validatePositiveNumber: function(val, name) {
            name = name || 'Value';
            this.validateIfUndefined(val, name);
            this.validateIfNumber(val, name);

            if (val <= 0) {
                console.log(name + ' must be positive number');
            }
        },

        validateId: function(id) {
            this.validateIfUndefined(id, 'Object id');
            if (typeof id !== 'number') {
                id = id.id;
            }
            if (id < 1) {
                console.log('id cannot be less than 1');
            }
            this.validateIfUndefined(id, 'Object must have id');
            return id;
        }
}
