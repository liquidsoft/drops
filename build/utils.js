"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.debounce = debounce;
exports.listenOnce = listenOnce;
/**
 * Debounces a function
 *
 * @param {int} timeout
 * @param {Function} callback
 * @returns {Function}
 */

function debounce(timeout, callback) {
    var timer;

    return function () {
        var _this = this;

        var args = arguments;

        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        timer = setTimeout(function () {
            timer = null;
            callback.apply(_this, args);
        }, timeout);
    };
}

/**
 * Adds a listener that triggers once on a specific element
 *
 * @param element
 * @param eventName
 * @param callback
 */

function listenOnce(element, eventName, callback) {
    function callbackWrapper() {
        element.removeEventListener(eventName, callbackWrapper);
        callback.apply(this, arguments);
    }

    element.addEventListener(eventName, callbackWrapper);
}