/*
 |--------------------------------------------------------------------------
 | Drops base field
 |--------------------------------------------------------------------------
 |
 |
 |
 */

import assign from "object-assign";
import * as symbols from "./symbols";
import {listenOnce} from "./utils";

export default class Field {

    /*
     -------------------------------
     Initializers
     -------------------------------
     */


    constructor(input, options = {}) {
        this.elements = {};
        this.elements.input = input;

        // Initialize
        this[symbols.initializeOptions](options);
        this[symbols.initializeView]();
        this[symbols.initializeState]();
        this[symbols.initializeEvents]();
    }

    [symbols.initializeOptions](options) {
        this.options = assign({
            placeholder: this.elements.input.placeholder || "",

            getSelection(field, value) {
                return value;
            },

            getPlaceholder(field, placeholder) {
                return placeholder;
            }

        }, options);
    }

    [symbols.initializeView]() {
        // Hide input element
        this.elements.input.style.display = "none";

        //
        // Wrapper
        //

        this.elements.wrapper = document.createElement("div");
        this.elements.wrapper.className = "drops " + this.elements.input.className;

        //
        // Head
        //

        this.elements.head = document.createElement("div");
        this.elements.head.className = "drops-head";
        this.elements.wrapper.appendChild(this.elements.head);

        this.elements.placeholder = document.createElement("div");
        this.elements.placeholder.className = "drops-placeholder";
        this.elements.placeholder.innerHTML = this.options.getPlaceholder(this, this.options.placeholder);
        this.elements.head.appendChild(this.elements.placeholder);

        this.elements.selection = document.createElement("div");
        this.elements.selection.className = "drops-selection";
        this.elements.head.appendChild(this.elements.selection);

        //
        // Body
        //

        this.elements.body = document.createElement("div");
        this.elements.body.className = "drops-body";
        this.elements.wrapper.appendChild(this.elements.body);

        //
        // Push input values to the view 
        //

        if (this.elements.input.disabled) {
            this.disable();
        }

        // Append view
        if (this.elements.input.nextSibling) {
            this.elements.input.parentNode.insertBefore(this.elements.wrapper, this.elements.input.nextSibling);
        }
        else {
            this.elements.input.parentNode.appendChild(this.elements.wrapper);
        }
    }

    [symbols.initializeState]() {
        this[symbols.setSelection](this.get());
    }

    [symbols.initializeEvents]() {

        //
        // Click on placeholder
        //

        this.elements.head.addEventListener("click", () => {
            this.toggle();
        });

        //
        // Click outside (on window)
        //

        window.addEventListener("click", (e) => {
            if ((this.elements.wrapper != e.target) && !this.elements.wrapper.contains(e.target)) {
                this.close();
            }
        });

    }

    /*
     -------------------------------
     Open/Closed state
     -------------------------------
     */

    get opened() {
        return this.elements.wrapper.className.indexOf("drops-open") > -1;
    }

    get closed() {
        return !this.opened;
    }

    open(silent = false) {
        if (this.opened || this.disabled) {
            return this;
        }

        this.elements.wrapper.className += " drops-open";

        // Trigger
        if (silent == false) {
            this.trigger("open", this);

            // Trigger opened on transition end
            listenOnce(this.elements.body, "transitionend", () => {
                this.trigger("opened", this);
            });
        }

        return this;
    }

    close(silent = false) {
        if (this.closed || this.disabled) {
            return this;
        }

        var classList = this.elements.wrapper.className.split(" "),
            classIndex = classList.indexOf("drops-open");

        classList.splice(classIndex, 1);
        this.elements.wrapper.className = classList.join(" ");

        // Trigger
        if (silent == false) {
            this.trigger("close", this);

            // Trigger closed on transition end
            listenOnce(this.elements.body, "transitionend", () => {
                this.trigger("closed");
            });
        }

        return this;
    }

    toggle() {
        return this.opened ? this.close() : this.open();
    }

    /*
     -------------------------------
     Selection state
     -------------------------------
     */

    [symbols.setSelection](value) {
        // Clear
        if ((value == null) || (value.length === 0)) {
            return this[symbols.clearSelection]();
        }

        // Set
        this.elements.selection.innerHTML = this.options.getSelection(this, value);
        this.elements.wrapper.className += " drops-has-selection";

        return this;
    }

    [symbols.clearSelection]() {
        var classList = this.elements.wrapper.className.split(" "),
            classIndex = classList.indexOf("drops-has-selection");

        if (classIndex > -1) {
            classList.splice(classIndex, 1);
            this.elements.wrapper.className = classList.join(" ");
        }

        return this;
    }

    /*
     -------------------------------
     Enable/Disabled state
     -------------------------------
     */

    get disabled() {
        return this.elements.wrapper.className.indexOf("drops-disabled") > -1;
    }

    get enabled() {
        return !this.disabled;
    }

    enable(silent = false) {
        if (this.enabled) {
            return this;
        }

        var classList = this.elements.wrapper.className.split(" "),
            disabledIndex = classList.indexOf("drops-disabled");

        classList.splice(disabledIndex, 1);

        this.elements.wrapper.className = classList.join(" ");

        // Trigger
        if (silent == false) {
            this.trigger("enable", this);
        }

        return this;
    }

    disable(silent = false) {
        if (this.disabled) {
            return this;
        }

        this.elements.wrapper.className += " drops-disabled";

        if (silent == false) {
            this.trigger("disable", this);
        }

        return this;
    }

    /*
     -------------------------------
     Value mutators
     -------------------------------
     */

    [symbols.getValue]() {
        return this.elements.input.value;
    }

    [symbols.setValue](value) {
        if (this.get() === value) {
            return false;
        }

        this.elements.input.value = value || "";
        return true;
    }

    get() {
        return this[symbols.getValue]();
    }

    set(value, silent = false) {
        if (this[symbols.setValue](value)) {
            this[symbols.setSelection](this.get());

            if (!silent) {
                this.trigger("change", this);
            }
        }

        return this;
    }

    /*
     -------------------------------
     Events
     -------------------------------
     */

    on(eventName, callback) {
        this.elements.input.addEventListener(eventName, callback);
        return this;
    }

    off(eventName, callback) {
        this.elements.input.removeEventListener(eventName, callback);
        return this;
    }

    trigger(eventName, data = {}) {
        var event = new Event(eventName, data);
        this.elements.input.dispatchEvent(event);
        return this;
    }

}