/*
 |--------------------------------------------------------------------------
 | Field manager (create and retrieve instances)
 |--------------------------------------------------------------------------
 |
 |
 |
 */

import WeakMap from "es6-weak-map";

//
// Locals
//

var instances = new WeakMap(),
    types = {};

//
// Register a new type of field
//

export function register(typeName, typeClass) {
    types[typeName] = typeClass;
}

//
// Creates a new field instance
//

export function create(type, element, options = {}) {
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

export function instance(element) {
    return instances.get(element);
}
