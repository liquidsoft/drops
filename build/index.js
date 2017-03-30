"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*
                                                                                                                                                                                                                                                                               |--------------------------------------------------------------------------
                                                                                                                                                                                                                                                                               | Drops
                                                                                                                                                                                                                                                                               |--------------------------------------------------------------------------
                                                                                                                                                                                                                                                                               |
                                                                                                                                                                                                                                                                               |
                                                                                                                                                                                                                                                                               |
                                                                                                                                                                                                                                                                               */

var _Field = require("./Field");

var _Field2 = _interopRequireDefault(_Field);

var _Select = require("./Select");

var _Select2 = _interopRequireDefault(_Select);

var _manager = require("./manager");

var _symbols = require("./symbols");

var _symbols2 = _interopRequireDefault(_symbols);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function (root, factory) {
    var drops = factory();

    // Common JS (since this is browserify it's fair to export all the time)
    if (module && (typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        module.exports = drops;
    }

    // AMD
    if (typeof define === "function" && define.amd) {
        define(function () {
            return drops;
        });
    }

    // Window
    else if (root) {
            root.drops = drops;
        }
})(window, function () {

    // Push bundled fields
    (0, _manager.register)("select", _Select2.default);

    // Export
    return {
        Field: _Field2.default,
        Select: _Select2.default,
        create: _manager.create,
        register: _manager.register,
        instance: _manager.instance,
        symbols: _symbols2.default
    };
});