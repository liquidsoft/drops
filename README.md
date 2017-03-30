drops
=====
Extensible drop-down field.

## Select field

### Available options
```js
var dropsField = drops.create("select", element, {
    // Placeholder as text (default: data-placeholder attribute)
    placeholder: "Choose an option...",
    
    // Formatted placeholder (can return HTML string)
    getPlaceholder(field, placeholderText) {
        return placeholderText;
    },
    
    // Formatted selection (can return HTML string)
    getSelection(field, value) {
        var data = field.getOptionData(value);
        return data ? data.label : "";
    },
    
    // Enable/Disable option filtering
    queryOptions: true,
    
    // Placeholder of the query input
    queryPlaceholder: "Filter options...",
    
    // Debounce timer for the query input
    queryDebounce: 250,
    
    // Query handler function
    query(field, options, queryString) {
        options.forEach(...);
    }
});
```

### Available methods
```js
/**
* setOptions(array options)
* 
* The "value" field is mandatory and must be a string.
* Custom fields must be dataset compliant (camel-case).
*/

dropsField.setOptions([
    {
        value: "some-value",
        label: "Some label",
        customData: "..."
    }
]);

/**
* getOptionData(value)
* 
* Returns the dataset of the option which contains all
* the data passed to setOptions or at least the
* "value" and "label" of the option.
*/

var data = dropsField.getOptionData("option_1");

/**
* get()
* 
* Returns the current selection value.
*/

/**
* set(value)
*
* Sets the current selection. Pass null to deselect all.
*/

```
