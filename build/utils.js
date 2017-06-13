"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.debounce = debounce;
exports.listenOnce = listenOnce;
exports.matchesSelector = matchesSelector;
exports.ancestorElement = ancestorElement;
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

/**
 * Checks if a given element matches a given selector
 *
 * @param element
 * @param selector
 * @returns {boolean}
 */
function matchesSelector(element, selector) {
    var wrap = document.createElement("div"),
        clone = element.cloneNode(false);

    wrap.appendChild(clone);
    return wrap.querySelector(selector) === clone;
}

/**
 * Searches for a parent element by selector
 *
 * @param element
 * @param selector
 * @param includeSelf
 * @returns {*}
 */
function ancestorElement(element, selector) {
    var includeSelf = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var current = includeSelf ? element : element.parentElement;

    while (current && !matchesSelector(current, selector)) {
        current = element.parentElement;
    }

    return current;
}