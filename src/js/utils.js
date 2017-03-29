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