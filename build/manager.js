"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.register = register;
exports.create = create;
exports.instance = instance;

var _es6WeakMap = require("es6-weak-map");

var _es6WeakMap2 = _interopRequireDefault(_es6WeakMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
// Locals
//

var instances = new _es6WeakMap2.default(),
    types = {};

//
// Register a new type of field
//

/*
 |--------------------------------------------------------------------------
 | Field manager (create and retrieve instances)
 |--------------------------------------------------------------------------
 |
 |
 |
 */

function register(typeName, typeClass) {
    types[typeName] = typeClass;
}

//
// Creates a new field instance
//

function create(type, element) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    // Check if already an instance
    if (instances.get(element)) {
        throw new Error("A field instance already exists on the element!");
        return;
    }

    // Check class
    if (!types[type]) {
        throw new Error("The type could not be found!");
        return;
    }

    var instance = new types[type](element, options);
    instances.set(element, instance);

    return instance;
}

//
// Retrieves an instance for a specific element
//

function instance(element) {
    return instances.get(element);
}