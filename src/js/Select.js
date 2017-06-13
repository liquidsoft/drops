/*
 |--------------------------------------------------------------------------
 | Select field
 |--------------------------------------------------------------------------
 |
 |
 |
 */

import assign from "object-assign";
import Field from "./Field";
import * as symbols from "./symbols";
import {debounce} from "./utils";
import Symbol from "es6-symbol";

// Local symbols

export default class SelectField extends Field {

    /*
     -------------------------------
     Initializers
     -------------------------------
     */

    constructor(input, options = {}) {
        if (input.nodeName.toLowerCase() !== "select") {
            throw new Error("The select field can only instantiate select elements!");
            return;
        }

        super(input, options);
    }

    [symbols.initializeOptions](options) {
        super[symbols.initializeOptions](options);

        this.options = assign(this.options, {
            placeholder: this.elements.input.dataset.placeholder || "",

            // TODO: Extend this functionality
            withoutBlank: false,

            // Query
            queryOptions: true,
            queryPlaceholder: "Filter options...",
            queryDebounce: 250,
            query(field, options, query) {
                // Filter by label
                options.forEach((option) => {
                    option.style.display = option.dataset.label.indexOf(query) === 0 ?
                        "block" : "none";
                });
            },

            // Selection
            getSelection(field, value) {
                var data = field.getOptionData(value);
                return data ? data.label : "";
            },

            // Option
            getOption(data) {
                return data.label;
            }

        }, options);
    }

    [symbols.initializeView]() {
        super[symbols.initializeView]();

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

    [symbols.initializeState]() {
        var options = [];

        Array.prototype.slice.call(this.elements.input.options).forEach((option) => {
            options.push(assign({}, option.dataset, {
                value: option.value,
                label: option.innerText,
                selected: option.selected
            }));
        });

        this.setOptions(options, true);
    }

    [symbols.initializeEvents]() {
        super[symbols.initializeEvents]();

        //
        // Options click event
        //

        this.elements.options.addEventListener("click", (e) => {
            if (e.target.className.indexOf("drops-option") > -1) {
                this.set(e.target.dataset.value);
                this.close();
            }
        });

        //
        // Query input
        //

        if (this.elements.queryInput) {

            // Filter on input
            this.elements.queryInput.addEventListener("input", debounce(this.options.queryDebounce, () => {
                this.options.query(
                    this,
                    this.elements.options.querySelectorAll(".drops-option"),
                    this.elements.queryInput.value
                );
            }));

            // Focus on open
            this.on("opened", () => {
                this.elements.queryInput.focus();
            });
        }
    }

    /*
     -------------------------------
     Option management
     -------------------------------
     */

    getOptionData(value) {
        var option = this.elements.options.querySelector(`.drops-option[data-value='${value}']`);
        return option ? option.dataset : null;
    }

    setOptions(options, silent = false) {
        var selection = null;

        if (this.get().length === 0) {
            selection = "";
        }
        else {
            // Clear selection
            this.set(null, true);
        }

        // Clear current input options
        Array.prototype.slice.call(this.elements.input.options).forEach((option) => {
            if (option.value.length > 0) {
                this.elements.input.removeChild(option);
            }
        });

        // Clear current options
        Array.prototype.slice.call(this.elements.options.children).forEach((option) => {
            if (option.dataset.value.length > 0) {
                this.elements.options.removeChild(option);
            }
        });

        // Push placeholder input option
        var placeholder = document.createElement("option");
        placeholder.value = "";
        placeholder.innerText = this.options.placeholder;
        this.elements.input.appendChild(placeholder);

        // Build options
        options.forEach((optionData) => {
            // Delay selection for later
            var selected = optionData.selected;
            optionData.selected = false;

            this.addOption(optionData, true);

            // Select if selected
            if (selected) {
                selection = optionData.value;
            }
        });

        // Set selection
        this.set(selection, silent);
    }

    addOption(data, silent = false) {
        if (typeof data.value !== "string") {
            return;
        }

        // Only add one empty option
        if ((data.value.length === 0) && this.elements.options.querySelector(".drops-option[data-value='']")) {
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
        option.innerHTML = this.options.getOption(data);

        if (data.value.length === 0) {
            option.className += " drops-option-blank";
        }

        Object.keys(data).forEach((key) => {
            option.dataset[key] = data[key];
        });

        // Prepend option if empty option
        if ((data.value.length === 0) && (this.elements.options.children.length > 0)) {
            this.elements.options.insertBefore(option, this.elements.options.firstChild);
        }
        else {
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

    [symbols.setValue](value) {
        var currentValue = this.get();

        // Get option
        var option;

        if (typeof value === "string") {
            option = this.elements.options.querySelector(`.drops-option[data-value='${value}']`);

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
            this.elements.input.value = value;
        }

        return currentValue !== this.get();
    }

}