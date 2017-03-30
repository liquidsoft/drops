/*
 |--------------------------------------------------------------------------
 | Drops
 |--------------------------------------------------------------------------
 |
 |
 |
 */

import Field from "./Field";
import Select from "./Select";
import {create, register, instance} from "./manager";
import symbols from "./symbols";

(function (root, factory) {
    var drops = factory();

    // Common JS (since this is browserify it's fair to export all the time)
    if (module && (typeof module === "object") && (module.exports)) {
        module.exports = drops;
    }

    // AMD
    if (typeof define === "function" && define.amd) {
        define(() => {
            return drops;
        });
    }

    // Window
    else if (root) {
        root.drops = drops;
    }

})(window, function () {

    // Push bundled fields
    register("select", Select);

    // Export
    return {
        Field: Field,
        Select: Select,
        create: create,
        register: register,
        instance: instance,
        symbols: symbols
    };
});