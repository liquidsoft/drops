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

                // Selector for the option select trigger
                optionTrigger: ".drops-option",

                // TODO: Extend this functionality
                withoutBlank: false,

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
                getOption: function getOption(field, data) {
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

            if (this.options.withoutBlank) {
                this.elements.wrapper.className += " drops-without-blank";
            }

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
                options.push((0, _objectAssign2.default)({}, option.dataset, {
                    value: option.value,
                    label: option.innerText,
                    selected: option.selected
                }));
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
                if ((0, _utils.matchesSelector)(e.target, _this2.options.optionTrigger)) {
                    var optionElement = (0, _utils.ancestorElement)(e.target, ".drops-option", true);

                    if (optionElement) {
                        _this2.set(optionElement.dataset.value);
                        _this2.close();
                    }
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
            return option ? (0, _objectAssign2.default)({}, option.dataset) : null;
        }
    }, {
        key: "setOptions",
        value: function setOptions(options) {
            var _this3 = this;

            var silent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var selection = null;

            if (this.get().length === 0) {
                selection = "";
            } else {
                // Clear selection
                this.set(null, true);
            }

            // Clear current input options
            Array.prototype.slice.call(this.elements.input.options).forEach(function (option) {
                if (option.value.length > 0) {
                    _this3.elements.input.removeChild(option);
                }
            });

            // Clear current options
            Array.prototype.slice.call(this.elements.options.children).forEach(function (option) {
                if (option.dataset.value.length > 0) {
                    _this3.elements.options.removeChild(option);
                } else {
                    option.innerHTML = _this3.options.getOption(_this3, _this3.getOptionData(""));
                }
            });

            // Push placeholder input option
            var placeholder = document.createElement("option");
            placeholder.value = "";
            placeholder.innerText = this.options.placeholder;
            this.elements.input.appendChild(placeholder);

            // Build options
            options.forEach(function (optionData) {
                // Delay selection for later
                var selected = optionData.selected;
                optionData.selected = false;

                _this3.addOption(optionData, true);

                // Select if selected
                if (selected) {
                    selection = optionData.value;
                }
            });

            // Set selection
            this.set(selection, silent);
        }
    }, {
        key: "addOption",
        value: function addOption(data) {
            var silent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (typeof data.value !== "string") {
                return;
            }

            // Only add one empty option
            if (data.value.length === 0 && this.elements.options.querySelector(".drops-option[data-value='']")) {
                return;
            }

            if (!data.label) {
                data.label = data.value;
            }

            // Create input option
            var inputOption = document.createElement("option");
            inputOption.value = data.value;
            inputOption.innerText = data.label;
            this.elements.input.appendChild(inputOption);

            // Create option
            var option = document.createElement("div");
            option.className = "drops-option";
            option.innerHTML = this.options.getOption(this, data);

            if (data.value.length === 0) {
                option.className += " drops-option-blank";
            }

            Object.keys(data).forEach(function (key) {
                option.dataset[key] = data[key];
            });

            // Prepend option if empty option
            if (data.value.length === 0 && this.elements.options.children.length > 0) {
                this.elements.options.insertBefore(option, this.elements.options.firstChild);
            } else {
                this.elements.options.appendChild(option);
            }

            // Select ?
            if (data.selected) {
                this.set(option.value, silent);
            }
        }

        /*
         -------------------------------
         Value
         -------------------------------
         */

    }, {
        key: symbols.setValue,
        value: function value(_value) {
            var currentValue = this.get();

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

            return currentValue !== this.get();
        }
    }]);

    return SelectField;
}(_Field3.default);

exports.default = SelectField;