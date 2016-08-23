# react-components
A collection of useful components built using React

1. Currency Input
---

   Input text field for entering currency which is automatically formatted with commas. The component validates the input to only allow numeric input. Currently, only the "Thousand" and "Lakh" format are supported and only 2 decimal places are allowed so that things remain simple.
   
## Props:
   * **value**: Integer value to the component which will be displayed in the text field
   * **format**: String value(either 'thousand' or 'lakh'), which is the required formatting of the text input
   * **onUpdate**: Callback which receives the raw(without any formatting) numeric value  
   * Any input tag attributes

In the example code in the repo([src/App.js](https://github.com/nikhilsaldanha/react-components/blob/master/src/App.js)), I have tied together a button along with the input field to toggle between the two formats.

## Basic Usage
```javascript
import CurrencyInput from 'CurrencyInput';

var initValue = 2143.56;
var initFormat = 'thousand'; //or 'lakh'
function updateFn(rawValue) {
...
}
React.render(<CurrencyInput value={initValue} format={initFormat} onUpdate={updateFn}/>, mountNode);
```

2. Drag and Drop components
---
