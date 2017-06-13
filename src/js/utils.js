/**
 * Debounces a function
 *
 * @param {int} timeout
 * @param {Function} callback
 * @returns {Function}
 */

export function debounce(timeout, callback) {
    var timer;

    return function () {
        var args = arguments;

        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        timer = setTimeout(() => {
            timer = null;
            callback.apply(this, args);

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

export function listenOnce(element, eventName, callback) {
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
export function matchesSelector(element, selector) {
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
export function ancestorElement(element, selector, includeSelf = false) {
    var current = includeSelf ? element : element.parentElement;

    while (current && !matchesSelector(current, selector)) {
        current = element.parentElement;
    }

    return current;
}