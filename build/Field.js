"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |--------------------------------------------------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Drops base field
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |--------------------------------------------------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _objectAssign = require("object-assign");

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _symbols = require("./symbols");

var symbols = _interopRequireWildcard(_symbols);

var _utils = require("./utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Field = function () {

    /*
     -------------------------------
     Initializers
     -------------------------------
     */

    function Field(input) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Field);

        this.elements = {};
        this.elements.input = input;

        // Initialize
        this[symbols.initializeOptions](options);
        this[symbols.initializeView]();
        this[symbols.initializeState]();
        this[symbols.initializeEvents]();
    }

    _createClass(Field, [{
        key: symbols.initializeOptions,
        value: function value(options) {
            this.options = (0, _objectAssign2.default)({
                placeholder: this.elements.input.placeholder || "",

                getSelection: function getSelection(field, value) {
                    return value;
                },
                getPlaceholder: function getPlaceholder(field, placeholder) {
                    return placeholder;
                },
                getArrow: function getArrow(field) {
                    return "";
                }
            }, options);
        }
    }, {
        key: symbols.initializeView,
        value: function value() {
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

            this.elements.arrow = document.createElement("div");
            this.elements.arrow.className = "drops-arrow";
            this.elements.arrow.innerHTML = this.options.getArrow(this);
            this.elements.head.appendChild(this.elements.arrow);

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
            } else {
                this.elements.input.parentNode.appendChild(this.elements.wrapper);
            }
        }
    }, {
        key: symbols.initializeState,
        value: function value() {
            this[symbols.setSelection](this.get());
        }
    }, {
        key: symbols.initializeEvents,
        value: function value() {
            var _this = this;

            //
            // Click on placeholder
            //

            this.elements.head.addEventListener("click", function () {
                _this.toggle();
            });

            //
            // Click outside (on window)
            //

            window.addEventListener("click", function (e) {
                if (_this.elements.wrapper != e.target && !_this.elements.wrapper.contains(e.target)) {
                    _this.close();
                }
            });
        }

        /*
         -------------------------------
         Open/Closed state
         -------------------------------
         */

    }, {
        key: "open",
        value: function open() {
            var _this2 = this;

            var silent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (this.opened || this.disabled) {
                return this;
            }

            this.elements.wrapper.className += " drops-open";

            // Trigger
            if (silent == false) {
                this.trigger("open", this);

                // Trigger opened on transition end
                (0, _utils.listenOnce)(this.elements.body, "transitionend", function () {
                    _this2.trigger("opened", _this2);
                });
            }

            return this;
        }
    }, {
        key: "close",
        value: function close() {
            var _this3 = this;

            var silent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

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
                (0, _utils.listenOnce)(this.elements.body, "transitionend", function () {
                    _this3.trigger("closed");
                });
            }

            return this;
        }
    }, {
        key: "toggle",
        value: function toggle() {
            return this.opened ? this.close() : this.open();
        }

        /*
         -------------------------------
         Selection state
         -------------------------------
         */

    }, {
        key: symbols.setSelection,
        value: function value(_value) {
            // Clear
            if (_value == null || _value.length === 0) {
                return this[symbols.clearSelection]();
            }

            // Set
            this.elements.selection.innerHTML = this.options.getSelection(this, _value);
            this.elements.wrapper.className += " drops-has-selection";

            return this;
        }
    }, {
        key: symbols.clearSelection,
        value: function value() {
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

    }, {
        key: "enable",
        value: function enable() {
            var silent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

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
    }, {
        key: "disable",
        value: function disable() {
            var silent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

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

    }, {
        key: symbols.getValue,
        value: function value() {
            return this.elements.input.value;
        }
    }, {
        key: symbols.setValue,
        value: function value(_value2) {
            if (this.get() === _value2) {
                return false;
            }

            this.elements.input.value = _value2 || "";
            return true;
        }
    }, {
        key: "get",
        value: function get() {
            return this[symbols.getValue]();
        }
    }, {
        key: "set",
        value: function set(value) {
            var silent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

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

    }, {
        key: "on",
        value: function on(eventName, callback) {
            this.elements.input.addEventListener(eventName, callback);
            return this;
        }
    }, {
        key: "off",
        value: function off(eventName, callback) {
            this.elements.input.removeEventListener(eventName, callback);
            return this;
        }
    }, {
        key: "trigger",
        value: function trigger(eventName) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var event = new Event(eventName, data);
            this.elements.input.dispatchEvent(event);
            return this;
        }
    }, {
        key: "opened",
        get: function get() {
            return this.elements.wrapper.className.indexOf("drops-open") > -1;
        }
    }, {
        key: "closed",
        get: function get() {
            return !this.opened;
        }
    }, {
        key: "disabled",
        get: function get() {
            return this.elements.wrapper.className.indexOf("drops-disabled") > -1;
        }
    }, {
        key: "enabled",
        get: function get() {
            return !this.disabled;
        }
    }]);

    return Field;
}();

exports.default = Field;