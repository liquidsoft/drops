(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
            if (typeof _value !== "string") {
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

            // Only trigger if the set was actually performed
            if (this[symbols.setValue](value)) {
                if (!silent) {
                    this.trigger("change", this);
                }
            }

            // Update selection
            this[symbols.setSelection](this.get());

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
},{"./symbols":5,"./utils":6,"object-assign":52}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _objectAssign = require("object-assign");

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _Field2 = require("./Field");

var _Field3 = _interopRequireDefault(_Field2);

var _symbols = require("./symbols");

var symbols = _interopRequireWildcard(_symbols);

var _utils = require("./utils");

var _es6Symbol = require("es6-symbol");

var _es6Symbol2 = _interopRequireDefault(_es6Symbol);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |--------------------------------------------------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Select field
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |--------------------------------------------------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// Local symbols

var SelectField = function (_Field) {
    _inherits(SelectField, _Field);

    /*
     -------------------------------
     Initializers
     -------------------------------
     */

    function SelectField(input) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, SelectField);

        if (input.nodeName.toLowerCase() !== "select") {
            throw new Error("The select field can only instantiate select elements!");
            return _possibleConstructorReturn(_this);
        }

        return _possibleConstructorReturn(this, (SelectField.__proto__ || Object.getPrototypeOf(SelectField)).call(this, input, options));
    }

    _createClass(SelectField, [{
        key: symbols.initializeOptions,
        value: function value(options) {
            _get(SelectField.prototype.__proto__ || Object.getPrototypeOf(SelectField.prototype), symbols.initializeOptions, this).call(this, options);

            this.options = (0, _objectAssign2.default)(this.options, {
                placeholder: this.elements.input.dataset.placeholder || "",

                // Query
                queryOptions: true,
                queryPlaceholder: "Filter options...",
                queryDebounce: 250,
                query: function query(field, options, _query) {
                    // Filter by label
                    options.forEach(function (option) {
                        option.style.display = option.dataset.label.indexOf(_query) === 0 ? "block" : "none";
                    });
                },


                // Selection
                getSelection: function getSelection(field, value) {
                    var data = field.getOptionData(value);
                    return data ? data.label : "";
                },


                // Option
                getOption: function getOption(data) {
                    return data.label;
                }
            }, options);
        }
    }, {
        key: symbols.initializeView,
        value: function value() {
            _get(SelectField.prototype.__proto__ || Object.getPrototypeOf(SelectField.prototype), symbols.initializeView, this).call(this);

            //
            // Overrides
            //

            this.elements.wrapper.className += " drops-select";

            //
            // Options query
            //

            if (this.options.queryOptions) {
                this.elements.query = document.createElement("div");
                this.elements.query.className = "drops-query";
                this.elements.body.appendChild(this.elements.query);

                this.elements.queryInput = document.createElement("input");
                this.elements.queryInput.type = "text";
                this.elements.queryInput.placeholder = this.options.queryPlaceholder;
                this.elements.query.appendChild(this.elements.queryInput);
            }

            //
            // Options
            //

            this.elements.options = document.createElement("div");
            this.elements.options.className = "drops-options";
            this.elements.body.appendChild(this.elements.options);
        }
    }, {
        key: symbols.initializeState,
        value: function value() {
            var options = [];

            Array.prototype.slice.call(this.elements.input.options).forEach(function (option) {
                options.push({
                    value: option.value,
                    label: option.innerText,
                    selected: option.selected
                });
            });

            this.setOptions(options, true);
        }
    }, {
        key: symbols.initializeEvents,
        value: function value() {
            var _this2 = this;

            _get(SelectField.prototype.__proto__ || Object.getPrototypeOf(SelectField.prototype), symbols.initializeEvents, this).call(this);

            //
            // Options click event
            //

            this.elements.options.addEventListener("click", function (e) {
                if (e.target.className.indexOf("drops-option") > -1) {
                    _this2.set(e.target.dataset.value);
                    _this2.close();
                }
            });

            //
            // Query input
            //

            if (this.elements.queryInput) {

                // Filter on input
                this.elements.queryInput.addEventListener("input", (0, _utils.debounce)(this.options.queryDebounce, function () {
                    _this2.options.query(_this2, _this2.elements.options.querySelectorAll(".drops-option"), _this2.elements.queryInput.value);
                }));

                // Focus on open
                this.on("opened", function () {
                    _this2.elements.queryInput.focus();
                });
            }
        }

        /*
         -------------------------------
         Option management
         -------------------------------
         */

    }, {
        key: "getOptionData",
        value: function getOptionData(value) {
            var option = this.elements.options.querySelector(".drops-option[data-value='" + value + "']");
            return option ? option.dataset : null;
        }
    }, {
        key: "setOptions",
        value: function setOptions(options) {
            var _this3 = this;

            var silent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            // Clear selection
            this.set(null, true);

            // Clear current options
            this.elements.input.innerHTML = "";
            this.elements.options.innerHTML = "";

            // Push placeholder input option
            var placeholder = document.createElement("option");
            placeholder.value = "";
            placeholder.innerText = this.options.placeholder;
            this.elements.input.appendChild(placeholder);

            // Build options
            var selection;

            options.forEach(function (optionData) {
                if (typeof optionData.value !== "string") {
                    return;
                }

                if (!optionData.label) {
                    optionData.label = optionData.value;
                }

                // Create input option
                var inputOption = document.createElement("option");
                inputOption.value = optionData.value;
                inputOption.innerText = optionData.label;
                _this3.elements.input.appendChild(inputOption);

                // Create option
                var option = document.createElement("div");
                option.className = "drops-option";
                option.innerHTML = _this3.options.getOption(optionData);

                Object.keys(optionData).forEach(function (key) {
                    option.dataset[key] = optionData[key];
                });

                _this3.elements.options.appendChild(option);

                // Select if selected
                if (optionData.selected) {
                    selection = optionData.value;
                }
            });

            // Set selection
            this.set(selection, silent);
        }

        /*
         -------------------------------
         Value
         -------------------------------
         */

    }, {
        key: symbols.setValue,
        value: function value(_value) {
            if (this.get() === _value) {
                return false;
            }

            // Get option
            var option;

            if (typeof _value === "string") {
                option = this.elements.options.querySelector(".drops-option[data-value='" + _value + "']");

                if (!option) {
                    return false;
                }
            }

            // Clear current selection
            var current = this.elements.options.querySelector(".drops-option.drops-selected");

            if (current) {
                var currentClasses = current.className.split(" "),
                    selectedIndex = currentClasses.indexOf("drops-selected");

                currentClasses.splice(selectedIndex, 1);
                current.className = currentClasses.join(" ");
                current.dataset.selected = false;
            }

            // Clear input selection
            this.elements.input.value = "";

            // Set new selection
            if (option) {
                option.className += " drops-selected";
                option.dataset.selected = true;
                this.elements.input.value = _value;
            }

            return true;
        }
    }]);

    return SelectField;
}(_Field3.default);

exports.default = SelectField;
},{"./Field":1,"./symbols":5,"./utils":6,"es6-symbol":43,"object-assign":52}],3:[function(require,module,exports){
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
},{"./Field":1,"./Select":2,"./manager":4,"./symbols":5}],4:[function(require,module,exports){
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
},{"es6-weak-map":48}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValue = exports.setValue = exports.clearSelection = exports.setSelection = exports.initializeState = exports.initializeEvents = exports.initializeView = exports.initializeOptions = undefined;

var _es6Symbol = require("es6-symbol");

var _es6Symbol2 = _interopRequireDefault(_es6Symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initializeOptions = exports.initializeOptions = (0, _es6Symbol2.default)("initializeOptions"); /*
                                                                                                    |--------------------------------------------------------------------------
                                                                                                    | Symbols used in the field class
                                                                                                    |--------------------------------------------------------------------------
                                                                                                    |
                                                                                                    |
                                                                                                    |
                                                                                                    */

var initializeView = exports.initializeView = (0, _es6Symbol2.default)("initializeView");
var initializeEvents = exports.initializeEvents = (0, _es6Symbol2.default)("initializeEvents");
var initializeState = exports.initializeState = (0, _es6Symbol2.default)("initializeState");
var setSelection = exports.setSelection = (0, _es6Symbol2.default)("setSelection");
var clearSelection = exports.clearSelection = (0, _es6Symbol2.default)("clearSelection");
var setValue = exports.setValue = (0, _es6Symbol2.default)("setValue");
var getValue = exports.getValue = (0, _es6Symbol2.default)("getValue");
},{"es6-symbol":43}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
'use strict';

var copy             = require('es5-ext/object/copy')
  , normalizeOptions = require('es5-ext/object/normalize-options')
  , ensureCallable   = require('es5-ext/object/valid-callable')
  , map              = require('es5-ext/object/map')
  , callable         = require('es5-ext/object/valid-callable')
  , validValue       = require('es5-ext/object/valid-value')

  , bind = Function.prototype.bind, defineProperty = Object.defineProperty
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , define;

define = function (name, desc, options) {
	var value = validValue(desc) && callable(desc.value), dgs;
	dgs = copy(desc);
	delete dgs.writable;
	delete dgs.value;
	dgs.get = function () {
		if (!options.overwriteDefinition && hasOwnProperty.call(this, name)) return value;
		desc.value = bind.call(value, options.resolveContext ? options.resolveContext(this) : this);
		defineProperty(this, name, desc);
		return this[name];
	};
	return dgs;
};

module.exports = function (props/*, options*/) {
	var options = normalizeOptions(arguments[1]);
	if (options.resolveContext != null) ensureCallable(options.resolveContext);
	return map(props, function (desc, name) { return define(name, desc, options); });
};

},{"es5-ext/object/copy":15,"es5-ext/object/map":23,"es5-ext/object/normalize-options":24,"es5-ext/object/valid-callable":28,"es5-ext/object/valid-value":30}],8:[function(require,module,exports){
'use strict';

var assign        = require('es5-ext/object/assign')
  , normalizeOpts = require('es5-ext/object/normalize-options')
  , isCallable    = require('es5-ext/object/is-callable')
  , contains      = require('es5-ext/string/#/contains')

  , d;

d = module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if ((arguments.length < 2) || (typeof dscr !== 'string')) {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== 'string') {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (get == null) {
		get = undefined;
	} else if (!isCallable(get)) {
		options = get;
		get = set = undefined;
	} else if (set == null) {
		set = undefined;
	} else if (!isCallable(set)) {
		options = set;
		set = undefined;
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

},{"es5-ext/object/assign":12,"es5-ext/object/is-callable":18,"es5-ext/object/normalize-options":24,"es5-ext/string/#/contains":31}],9:[function(require,module,exports){
// Inspired by Google Closure:
// http://closure-library.googlecode.com/svn/docs/
// closure_goog_array_array.js.html#goog.array.clear

'use strict';

var value = require('../../object/valid-value');

module.exports = function () {
	value(this).length = 0;
	return this;
};

},{"../../object/valid-value":30}],10:[function(require,module,exports){
'use strict';

var toString = Object.prototype.toString

  , id = toString.call((function () { return arguments; }()));

module.exports = function (x) { return (toString.call(x) === id); };

},{}],11:[function(require,module,exports){
// Internal method, used by iteration functions.
// Calls a function for each key-value pair found in object
// Optionally takes compareFn to iterate object in specific order

'use strict';

var callable = require('./valid-callable')
  , value    = require('./valid-value')

  , bind = Function.prototype.bind, call = Function.prototype.call, keys = Object.keys
  , propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = function (method, defVal) {
	return function (obj, cb/*, thisArg, compareFn*/) {
		var list, thisArg = arguments[2], compareFn = arguments[3];
		obj = Object(value(obj));
		callable(cb);

		list = keys(obj);
		if (compareFn) {
			list.sort((typeof compareFn === 'function') ? bind.call(compareFn, obj) : undefined);
		}
		if (typeof method !== 'function') method = list[method];
		return call.call(method, list, function (key, index) {
			if (!propertyIsEnumerable.call(obj, key)) return defVal;
			return call.call(cb, thisArg, obj[key], key, obj, index);
		});
	};
};

},{"./valid-callable":28,"./valid-value":30}],12:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? Object.assign
	: require('./shim');

},{"./is-implemented":13,"./shim":14}],13:[function(require,module,exports){
'use strict';

module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== 'function') return false;
	obj = { foo: 'raz' };
	assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
	return (obj.foo + obj.bar + obj.trzy) === 'razdwatrzy';
};

},{}],14:[function(require,module,exports){
'use strict';

var keys  = require('../keys')
  , value = require('../valid-value')

  , max = Math.max;

module.exports = function (dest, src/*, …srcn*/) {
	var error, i, l = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try { dest[key] = src[key]; } catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < l; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};

},{"../keys":20,"../valid-value":30}],15:[function(require,module,exports){
'use strict';

var assign = require('./assign')
  , value  = require('./valid-value');

module.exports = function (obj) {
	var copy = Object(value(obj));
	if (copy !== obj) return copy;
	return assign({}, obj);
};

},{"./assign":12,"./valid-value":30}],16:[function(require,module,exports){
// Workaround for http://code.google.com/p/v8/issues/detail?id=2804

'use strict';

var create = Object.create, shim;

if (!require('./set-prototype-of/is-implemented')()) {
	shim = require('./set-prototype-of/shim');
}

module.exports = (function () {
	var nullObject, props, desc;
	if (!shim) return create;
	if (shim.level !== 1) return create;

	nullObject = {};
	props = {};
	desc = { configurable: false, enumerable: false, writable: true,
		value: undefined };
	Object.getOwnPropertyNames(Object.prototype).forEach(function (name) {
		if (name === '__proto__') {
			props[name] = { configurable: true, enumerable: false, writable: true,
				value: undefined };
			return;
		}
		props[name] = desc;
	});
	Object.defineProperties(nullObject, props);

	Object.defineProperty(shim, 'nullPolyfill', { configurable: false,
		enumerable: false, writable: false, value: nullObject });

	return function (prototype, props) {
		return create((prototype === null) ? nullObject : prototype, props);
	};
}());

},{"./set-prototype-of/is-implemented":26,"./set-prototype-of/shim":27}],17:[function(require,module,exports){
'use strict';

module.exports = require('./_iterate')('forEach');

},{"./_iterate":11}],18:[function(require,module,exports){
// Deprecated

'use strict';

module.exports = function (obj) { return typeof obj === 'function'; };

},{}],19:[function(require,module,exports){
'use strict';

var map = { 'function': true, object: true };

module.exports = function (x) {
	return ((x != null) && map[typeof x]) || false;
};

},{}],20:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? Object.keys
	: require('./shim');

},{"./is-implemented":21,"./shim":22}],21:[function(require,module,exports){
'use strict';

module.exports = function () {
	try {
		Object.keys('primitive');
		return true;
	} catch (e) { return false; }
};

},{}],22:[function(require,module,exports){
'use strict';

var keys = Object.keys;

module.exports = function (object) {
	return keys(object == null ? object : Object(object));
};

},{}],23:[function(require,module,exports){
'use strict';

var callable = require('./valid-callable')
  , forEach  = require('./for-each')

  , call = Function.prototype.call;

module.exports = function (obj, cb/*, thisArg*/) {
	var o = {}, thisArg = arguments[2];
	callable(cb);
	forEach(obj, function (value, key, obj, index) {
		o[key] = call.call(cb, thisArg, value, key, obj, index);
	});
	return o;
};

},{"./for-each":17,"./valid-callable":28}],24:[function(require,module,exports){
'use strict';

var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

module.exports = function (options/*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (options == null) return;
		process(Object(options), result);
	});
	return result;
};

},{}],25:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? Object.setPrototypeOf
	: require('./shim');

},{"./is-implemented":26,"./shim":27}],26:[function(require,module,exports){
'use strict';

var create = Object.create, getPrototypeOf = Object.getPrototypeOf
  , x = {};

module.exports = function (/*customCreate*/) {
	var setPrototypeOf = Object.setPrototypeOf
	  , customCreate = arguments[0] || create;
	if (typeof setPrototypeOf !== 'function') return false;
	return getPrototypeOf(setPrototypeOf(customCreate(null), x)) === x;
};

},{}],27:[function(require,module,exports){
// Big thanks to @WebReflection for sorting this out
// https://gist.github.com/WebReflection/5593554

'use strict';

var isObject      = require('../is-object')
  , value         = require('../valid-value')

  , isPrototypeOf = Object.prototype.isPrototypeOf
  , defineProperty = Object.defineProperty
  , nullDesc = { configurable: true, enumerable: false, writable: true,
		value: undefined }
  , validate;

validate = function (obj, prototype) {
	value(obj);
	if ((prototype === null) || isObject(prototype)) return obj;
	throw new TypeError('Prototype must be null or an object');
};

module.exports = (function (status) {
	var fn, set;
	if (!status) return null;
	if (status.level === 2) {
		if (status.set) {
			set = status.set;
			fn = function (obj, prototype) {
				set.call(validate(obj, prototype), prototype);
				return obj;
			};
		} else {
			fn = function (obj, prototype) {
				validate(obj, prototype).__proto__ = prototype;
				return obj;
			};
		}
	} else {
		fn = function self(obj, prototype) {
			var isNullBase;
			validate(obj, prototype);
			isNullBase = isPrototypeOf.call(self.nullPolyfill, obj);
			if (isNullBase) delete self.nullPolyfill.__proto__;
			if (prototype === null) prototype = self.nullPolyfill;
			obj.__proto__ = prototype;
			if (isNullBase) defineProperty(self.nullPolyfill, '__proto__', nullDesc);
			return obj;
		};
	}
	return Object.defineProperty(fn, 'level', { configurable: false,
		enumerable: false, writable: false, value: status.level });
}((function () {
	var x = Object.create(null), y = {}, set
	  , desc = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');

	if (desc) {
		try {
			set = desc.set; // Opera crashes at this point
			set.call(x, y);
		} catch (ignore) { }
		if (Object.getPrototypeOf(x) === y) return { set: set, level: 2 };
	}

	x.__proto__ = y;
	if (Object.getPrototypeOf(x) === y) return { level: 2 };

	x = {};
	x.__proto__ = y;
	if (Object.getPrototypeOf(x) === y) return { level: 1 };

	return false;
}())));

require('../create');

},{"../create":16,"../is-object":19,"../valid-value":30}],28:[function(require,module,exports){
'use strict';

module.exports = function (fn) {
	if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
	return fn;
};

},{}],29:[function(require,module,exports){
'use strict';

var isObject = require('./is-object');

module.exports = function (value) {
	if (!isObject(value)) throw new TypeError(value + " is not an Object");
	return value;
};

},{"./is-object":19}],30:[function(require,module,exports){
'use strict';

module.exports = function (value) {
	if (value == null) throw new TypeError("Cannot use null or undefined");
	return value;
};

},{}],31:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? String.prototype.contains
	: require('./shim');

},{"./is-implemented":32,"./shim":33}],32:[function(require,module,exports){
'use strict';

var str = 'razdwatrzy';

module.exports = function () {
	if (typeof str.contains !== 'function') return false;
	return ((str.contains('dwa') === true) && (str.contains('foo') === false));
};

},{}],33:[function(require,module,exports){
'use strict';

var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};

},{}],34:[function(require,module,exports){
'use strict';

var toString = Object.prototype.toString

  , id = toString.call('');

module.exports = function (x) {
	return (typeof x === 'string') || (x && (typeof x === 'object') &&
		((x instanceof String) || (toString.call(x) === id))) || false;
};

},{}],35:[function(require,module,exports){
'use strict';

var generated = Object.create(null)

  , random = Math.random;

module.exports = function () {
	var str;
	do { str = random().toString(36).slice(2); } while (generated[str]);
	return str;
};

},{}],36:[function(require,module,exports){
'use strict';

var setPrototypeOf = require('es5-ext/object/set-prototype-of')
  , contains       = require('es5-ext/string/#/contains')
  , d              = require('d')
  , Iterator       = require('./')

  , defineProperty = Object.defineProperty
  , ArrayIterator;

ArrayIterator = module.exports = function (arr, kind) {
	if (!(this instanceof ArrayIterator)) return new ArrayIterator(arr, kind);
	Iterator.call(this, arr);
	if (!kind) kind = 'value';
	else if (contains.call(kind, 'key+value')) kind = 'key+value';
	else if (contains.call(kind, 'key')) kind = 'key';
	else kind = 'value';
	defineProperty(this, '__kind__', d('', kind));
};
if (setPrototypeOf) setPrototypeOf(ArrayIterator, Iterator);

ArrayIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(ArrayIterator),
	_resolve: d(function (i) {
		if (this.__kind__ === 'value') return this.__list__[i];
		if (this.__kind__ === 'key+value') return [i, this.__list__[i]];
		return i;
	}),
	toString: d(function () { return '[object Array Iterator]'; })
});

},{"./":39,"d":8,"es5-ext/object/set-prototype-of":25,"es5-ext/string/#/contains":31}],37:[function(require,module,exports){
'use strict';

var isArguments = require('es5-ext/function/is-arguments')
  , callable    = require('es5-ext/object/valid-callable')
  , isString    = require('es5-ext/string/is-string')
  , get         = require('./get')

  , isArray = Array.isArray, call = Function.prototype.call
  , some = Array.prototype.some;

module.exports = function (iterable, cb/*, thisArg*/) {
	var mode, thisArg = arguments[2], result, doBreak, broken, i, l, char, code;
	if (isArray(iterable) || isArguments(iterable)) mode = 'array';
	else if (isString(iterable)) mode = 'string';
	else iterable = get(iterable);

	callable(cb);
	doBreak = function () { broken = true; };
	if (mode === 'array') {
		some.call(iterable, function (value) {
			call.call(cb, thisArg, value, doBreak);
			if (broken) return true;
		});
		return;
	}
	if (mode === 'string') {
		l = iterable.length;
		for (i = 0; i < l; ++i) {
			char = iterable[i];
			if ((i + 1) < l) {
				code = char.charCodeAt(0);
				if ((code >= 0xD800) && (code <= 0xDBFF)) char += iterable[++i];
			}
			call.call(cb, thisArg, char, doBreak);
			if (broken) break;
		}
		return;
	}
	result = iterable.next();

	while (!result.done) {
		call.call(cb, thisArg, result.value, doBreak);
		if (broken) return;
		result = iterable.next();
	}
};

},{"./get":38,"es5-ext/function/is-arguments":10,"es5-ext/object/valid-callable":28,"es5-ext/string/is-string":34}],38:[function(require,module,exports){
'use strict';

var isArguments    = require('es5-ext/function/is-arguments')
  , isString       = require('es5-ext/string/is-string')
  , ArrayIterator  = require('./array')
  , StringIterator = require('./string')
  , iterable       = require('./valid-iterable')
  , iteratorSymbol = require('es6-symbol').iterator;

module.exports = function (obj) {
	if (typeof iterable(obj)[iteratorSymbol] === 'function') return obj[iteratorSymbol]();
	if (isArguments(obj)) return new ArrayIterator(obj);
	if (isString(obj)) return new StringIterator(obj);
	return new ArrayIterator(obj);
};

},{"./array":36,"./string":41,"./valid-iterable":42,"es5-ext/function/is-arguments":10,"es5-ext/string/is-string":34,"es6-symbol":43}],39:[function(require,module,exports){
'use strict';

var clear    = require('es5-ext/array/#/clear')
  , assign   = require('es5-ext/object/assign')
  , callable = require('es5-ext/object/valid-callable')
  , value    = require('es5-ext/object/valid-value')
  , d        = require('d')
  , autoBind = require('d/auto-bind')
  , Symbol   = require('es6-symbol')

  , defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , Iterator;

module.exports = Iterator = function (list, context) {
	if (!(this instanceof Iterator)) return new Iterator(list, context);
	defineProperties(this, {
		__list__: d('w', value(list)),
		__context__: d('w', context),
		__nextIndex__: d('w', 0)
	});
	if (!context) return;
	callable(context.on);
	context.on('_add', this._onAdd);
	context.on('_delete', this._onDelete);
	context.on('_clear', this._onClear);
};

defineProperties(Iterator.prototype, assign({
	constructor: d(Iterator),
	_next: d(function () {
		var i;
		if (!this.__list__) return;
		if (this.__redo__) {
			i = this.__redo__.shift();
			if (i !== undefined) return i;
		}
		if (this.__nextIndex__ < this.__list__.length) return this.__nextIndex__++;
		this._unBind();
	}),
	next: d(function () { return this._createResult(this._next()); }),
	_createResult: d(function (i) {
		if (i === undefined) return { done: true, value: undefined };
		return { done: false, value: this._resolve(i) };
	}),
	_resolve: d(function (i) { return this.__list__[i]; }),
	_unBind: d(function () {
		this.__list__ = null;
		delete this.__redo__;
		if (!this.__context__) return;
		this.__context__.off('_add', this._onAdd);
		this.__context__.off('_delete', this._onDelete);
		this.__context__.off('_clear', this._onClear);
		this.__context__ = null;
	}),
	toString: d(function () { return '[object Iterator]'; })
}, autoBind({
	_onAdd: d(function (index) {
		if (index >= this.__nextIndex__) return;
		++this.__nextIndex__;
		if (!this.__redo__) {
			defineProperty(this, '__redo__', d('c', [index]));
			return;
		}
		this.__redo__.forEach(function (redo, i) {
			if (redo >= index) this.__redo__[i] = ++redo;
		}, this);
		this.__redo__.push(index);
	}),
	_onDelete: d(function (index) {
		var i;
		if (index >= this.__nextIndex__) return;
		--this.__nextIndex__;
		if (!this.__redo__) return;
		i = this.__redo__.indexOf(index);
		if (i !== -1) this.__redo__.splice(i, 1);
		this.__redo__.forEach(function (redo, i) {
			if (redo > index) this.__redo__[i] = --redo;
		}, this);
	}),
	_onClear: d(function () {
		if (this.__redo__) clear.call(this.__redo__);
		this.__nextIndex__ = 0;
	})
})));

defineProperty(Iterator.prototype, Symbol.iterator, d(function () {
	return this;
}));
defineProperty(Iterator.prototype, Symbol.toStringTag, d('', 'Iterator'));

},{"d":8,"d/auto-bind":7,"es5-ext/array/#/clear":9,"es5-ext/object/assign":12,"es5-ext/object/valid-callable":28,"es5-ext/object/valid-value":30,"es6-symbol":43}],40:[function(require,module,exports){
'use strict';

var isArguments    = require('es5-ext/function/is-arguments')
  , isString       = require('es5-ext/string/is-string')
  , iteratorSymbol = require('es6-symbol').iterator

  , isArray = Array.isArray;

module.exports = function (value) {
	if (value == null) return false;
	if (isArray(value)) return true;
	if (isString(value)) return true;
	if (isArguments(value)) return true;
	return (typeof value[iteratorSymbol] === 'function');
};

},{"es5-ext/function/is-arguments":10,"es5-ext/string/is-string":34,"es6-symbol":43}],41:[function(require,module,exports){
// Thanks @mathiasbynens
// http://mathiasbynens.be/notes/javascript-unicode#iterating-over-symbols

'use strict';

var setPrototypeOf = require('es5-ext/object/set-prototype-of')
  , d              = require('d')
  , Iterator       = require('./')

  , defineProperty = Object.defineProperty
  , StringIterator;

StringIterator = module.exports = function (str) {
	if (!(this instanceof StringIterator)) return new StringIterator(str);
	str = String(str);
	Iterator.call(this, str);
	defineProperty(this, '__length__', d('', str.length));

};
if (setPrototypeOf) setPrototypeOf(StringIterator, Iterator);

StringIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(StringIterator),
	_next: d(function () {
		if (!this.__list__) return;
		if (this.__nextIndex__ < this.__length__) return this.__nextIndex__++;
		this._unBind();
	}),
	_resolve: d(function (i) {
		var char = this.__list__[i], code;
		if (this.__nextIndex__ === this.__length__) return char;
		code = char.charCodeAt(0);
		if ((code >= 0xD800) && (code <= 0xDBFF)) return char + this.__list__[this.__nextIndex__++];
		return char;
	}),
	toString: d(function () { return '[object String Iterator]'; })
});

},{"./":39,"d":8,"es5-ext/object/set-prototype-of":25}],42:[function(require,module,exports){
'use strict';

var isIterable = require('./is-iterable');

module.exports = function (value) {
	if (!isIterable(value)) throw new TypeError(value + " is not iterable");
	return value;
};

},{"./is-iterable":40}],43:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')() ? Symbol : require('./polyfill');

},{"./is-implemented":44,"./polyfill":46}],44:[function(require,module,exports){
'use strict';

var validTypes = { object: true, symbol: true };

module.exports = function () {
	var symbol;
	if (typeof Symbol !== 'function') return false;
	symbol = Symbol('test symbol');
	try { String(symbol); } catch (e) { return false; }

	// Return 'true' also for polyfills
	if (!validTypes[typeof Symbol.iterator]) return false;
	if (!validTypes[typeof Symbol.toPrimitive]) return false;
	if (!validTypes[typeof Symbol.toStringTag]) return false;

	return true;
};

},{}],45:[function(require,module,exports){
'use strict';

module.exports = function (x) {
	if (!x) return false;
	if (typeof x === 'symbol') return true;
	if (!x.constructor) return false;
	if (x.constructor.name !== 'Symbol') return false;
	return (x[x.constructor.toStringTag] === 'Symbol');
};

},{}],46:[function(require,module,exports){
// ES2015 Symbol polyfill for environments that do not (or partially) support it

'use strict';

var d              = require('d')
  , validateSymbol = require('./validate-symbol')

  , create = Object.create, defineProperties = Object.defineProperties
  , defineProperty = Object.defineProperty, objPrototype = Object.prototype
  , NativeSymbol, SymbolPolyfill, HiddenSymbol, globalSymbols = create(null)
  , isNativeSafe;

if (typeof Symbol === 'function') {
	NativeSymbol = Symbol;
	try {
		String(NativeSymbol());
		isNativeSafe = true;
	} catch (ignore) {}
}

var generateName = (function () {
	var created = create(null);
	return function (desc) {
		var postfix = 0, name, ie11BugWorkaround;
		while (created[desc + (postfix || '')]) ++postfix;
		desc += (postfix || '');
		created[desc] = true;
		name = '@@' + desc;
		defineProperty(objPrototype, name, d.gs(null, function (value) {
			// For IE11 issue see:
			// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
			//    ie11-broken-getters-on-dom-objects
			// https://github.com/medikoo/es6-symbol/issues/12
			if (ie11BugWorkaround) return;
			ie11BugWorkaround = true;
			defineProperty(this, name, d(value));
			ie11BugWorkaround = false;
		}));
		return name;
	};
}());

// Internal constructor (not one exposed) for creating Symbol instances.
// This one is used to ensure that `someSymbol instanceof Symbol` always return false
HiddenSymbol = function Symbol(description) {
	if (this instanceof HiddenSymbol) throw new TypeError('Symbol is not a constructor');
	return SymbolPolyfill(description);
};

// Exposed `Symbol` constructor
// (returns instances of HiddenSymbol)
module.exports = SymbolPolyfill = function Symbol(description) {
	var symbol;
	if (this instanceof Symbol) throw new TypeError('Symbol is not a constructor');
	if (isNativeSafe) return NativeSymbol(description);
	symbol = create(HiddenSymbol.prototype);
	description = (description === undefined ? '' : String(description));
	return defineProperties(symbol, {
		__description__: d('', description),
		__name__: d('', generateName(description))
	});
};
defineProperties(SymbolPolyfill, {
	for: d(function (key) {
		if (globalSymbols[key]) return globalSymbols[key];
		return (globalSymbols[key] = SymbolPolyfill(String(key)));
	}),
	keyFor: d(function (s) {
		var key;
		validateSymbol(s);
		for (key in globalSymbols) if (globalSymbols[key] === s) return key;
	}),

	// To ensure proper interoperability with other native functions (e.g. Array.from)
	// fallback to eventual native implementation of given symbol
	hasInstance: d('', (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill('hasInstance')),
	isConcatSpreadable: d('', (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
		SymbolPolyfill('isConcatSpreadable')),
	iterator: d('', (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill('iterator')),
	match: d('', (NativeSymbol && NativeSymbol.match) || SymbolPolyfill('match')),
	replace: d('', (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill('replace')),
	search: d('', (NativeSymbol && NativeSymbol.search) || SymbolPolyfill('search')),
	species: d('', (NativeSymbol && NativeSymbol.species) || SymbolPolyfill('species')),
	split: d('', (NativeSymbol && NativeSymbol.split) || SymbolPolyfill('split')),
	toPrimitive: d('', (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill('toPrimitive')),
	toStringTag: d('', (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill('toStringTag')),
	unscopables: d('', (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill('unscopables'))
});

// Internal tweaks for real symbol producer
defineProperties(HiddenSymbol.prototype, {
	constructor: d(SymbolPolyfill),
	toString: d('', function () { return this.__name__; })
});

// Proper implementation of methods exposed on Symbol.prototype
// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
defineProperties(SymbolPolyfill.prototype, {
	toString: d(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
	valueOf: d(function () { return validateSymbol(this); })
});
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('', function () {
	var symbol = validateSymbol(this);
	if (typeof symbol === 'symbol') return symbol;
	return symbol.toString();
}));
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));

// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));

// Note: It's important to define `toPrimitive` as last one, as some implementations
// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
// And that may invoke error in definition flow:
// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));

},{"./validate-symbol":47,"d":8}],47:[function(require,module,exports){
'use strict';

var isSymbol = require('./is-symbol');

module.exports = function (value) {
	if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
	return value;
};

},{"./is-symbol":45}],48:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')() ? WeakMap : require('./polyfill');

},{"./is-implemented":49,"./polyfill":51}],49:[function(require,module,exports){
'use strict';

module.exports = function () {
	var weakMap, x;
	if (typeof WeakMap !== 'function') return false;
	try {
		// WebKit doesn't support arguments and crashes
		weakMap = new WeakMap([[x = {}, 'one'], [{}, 'two'], [{}, 'three']]);
	} catch (e) {
		return false;
	}
	if (String(weakMap) !== '[object WeakMap]') return false;
	if (typeof weakMap.set !== 'function') return false;
	if (weakMap.set({}, 1) !== weakMap) return false;
	if (typeof weakMap.delete !== 'function') return false;
	if (typeof weakMap.has !== 'function') return false;
	if (weakMap.get(x) !== 'one') return false;

	return true;
};

},{}],50:[function(require,module,exports){
// Exports true if environment provides native `WeakMap` implementation, whatever that is.

'use strict';

module.exports = (function () {
	if (typeof WeakMap !== 'function') return false;
	return (Object.prototype.toString.call(new WeakMap()) === '[object WeakMap]');
}());

},{}],51:[function(require,module,exports){
'use strict';

var setPrototypeOf    = require('es5-ext/object/set-prototype-of')
  , object            = require('es5-ext/object/valid-object')
  , value             = require('es5-ext/object/valid-value')
  , randomUniq        = require('es5-ext/string/random-uniq')
  , d                 = require('d')
  , getIterator       = require('es6-iterator/get')
  , forOf             = require('es6-iterator/for-of')
  , toStringTagSymbol = require('es6-symbol').toStringTag
  , isNative          = require('./is-native-implemented')

  , isArray = Array.isArray, defineProperty = Object.defineProperty
  , hasOwnProperty = Object.prototype.hasOwnProperty, getPrototypeOf = Object.getPrototypeOf
  , WeakMapPoly;

module.exports = WeakMapPoly = function (/*iterable*/) {
	var iterable = arguments[0], self;
	if (!(this instanceof WeakMapPoly)) throw new TypeError('Constructor requires \'new\'');
	if (isNative && setPrototypeOf && (WeakMap !== WeakMapPoly)) {
		self = setPrototypeOf(new WeakMap(), getPrototypeOf(this));
	} else {
		self = this;
	}
	if (iterable != null) {
		if (!isArray(iterable)) iterable = getIterator(iterable);
	}
	defineProperty(self, '__weakMapData__', d('c', '$weakMap$' + randomUniq()));
	if (!iterable) return self;
	forOf(iterable, function (val) {
		value(val);
		self.set(val[0], val[1]);
	});
	return self;
};

if (isNative) {
	if (setPrototypeOf) setPrototypeOf(WeakMapPoly, WeakMap);
	WeakMapPoly.prototype = Object.create(WeakMap.prototype, {
		constructor: d(WeakMapPoly)
	});
}

Object.defineProperties(WeakMapPoly.prototype, {
	delete: d(function (key) {
		if (hasOwnProperty.call(object(key), this.__weakMapData__)) {
			delete key[this.__weakMapData__];
			return true;
		}
		return false;
	}),
	get: d(function (key) {
		if (hasOwnProperty.call(object(key), this.__weakMapData__)) {
			return key[this.__weakMapData__];
		}
	}),
	has: d(function (key) {
		return hasOwnProperty.call(object(key), this.__weakMapData__);
	}),
	set: d(function (key, value) {
		defineProperty(object(key), this.__weakMapData__, d('c', value));
		return this;
	}),
	toString: d(function () { return '[object WeakMap]'; })
});
defineProperty(WeakMapPoly.prototype, toStringTagSymbol, d('c', 'WeakMap'));

},{"./is-native-implemented":50,"d":8,"es5-ext/object/set-prototype-of":25,"es5-ext/object/valid-object":29,"es5-ext/object/valid-value":30,"es5-ext/string/random-uniq":35,"es6-iterator/for-of":37,"es6-iterator/get":38,"es6-symbol":43}],52:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}]},{},[3])

//# sourceMappingURL=drops.js.map
