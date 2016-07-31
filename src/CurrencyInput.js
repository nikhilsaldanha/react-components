import React, { Component } from 'react';

class CurrencyInput extends Component {
  constructor(props) {
    super(props);
    this.updateValue = this.updateValue.bind(this);
    this.getRaw = this.getRaw.bind(this);
    this.format = this.format.bind(this);

    this.state = {
      format: props.format,
      value: props.value,
      cursorPos: 0,
      raw: ''
    };
  }


  // make raw number are return
  getRaw(value) {
    return value.replace(',', ''); //remove all commas
  }

  //format text field
  format(value, cursorPos, currencyFormat) {
    if(value == '') {
      return {value: '', cursorPos: 0, raw: ''}
    }

    let formatted = value.replace(/[A-Za-z]/g, '') //alphabets
                     .replace('.', 'D')
                     .replace(/[^\dD]/g, '')
                     .replace('D', '.')
                     .replace(/^(-)?0+(?=\d)/, '$1') //strip leading 0
                     .replace(/(\d+\.\d\d)(\d+)/, '$1');//1234.00

    let raw = this.getRaw(formatted);

    let [integerPart, decimalPart] = formatted.split('.');
    if(decimalPart == undefined) {
      decimalPart = '';
    }

     if(raw.indexOf('.') != -1 && decimalPart == '') {
       decimalPart = 'e';
     }

     switch (currencyFormat) {
       case 'lakh':
         if((integerPart.length)%2 == 0 && integerPart.length!=2 && cursorPos != 1) {
           cursorPos += 1;
         }
         integerPart = integerPart.replace(/(\d)(?=(\d\d)+\d$)/g, '$1' + ',');
         break;
       default:
         if((integerPart.length-1)%3 == 0 && cursorPos != 1) {
           cursorPos += 1;
         }
         integerPart = integerPart.replace(/(\d)(?=(\d{3})+$)/g, '$1' + ',');
     }

     if(decimalPart == '') {
       return {value: integerPart, cursorPos, raw};
     }
     else if(decimalPart == 'e') {
       return {value: integerPart+'.', cursorPos, raw};
     }
     return {value: integerPart+'.'+decimalPart, cursorPos, raw};
  }

  //update text field
  updateValue(e) {
    let value = e.target.value;
    let cursorPos = e.target.selectionStart;
    let currencyFormat = this.props.format;

    let formattedState = this.format(value, cursorPos, currencyFormat);
    this.setState(formattedState);
    this.props.onUpdate(formattedState.raw);
  }

  //update only if props.format is changed or input value is changed
  shouldComponentUpdate(props, state) {
    return (this.props.format != props.format) || (this.state.raw != props.value);
  }

  //for first render
  componentDidMount() {
    let input = this.refs.currencyInput;
    let formatted = this.format(input.value, input.selectionStart, this.props.format);
    this.setState(formatted);
  }

  //when props change
  componentWillReceiveProps(props) {
    let format = props.format;
    let input = this.refs.currencyInput;
    let formatted = this.format(input.value, input.selectionStart, format);
    this.setState({...formatted, format});
  }

  //changing cursor position if changed
  componentDidUpdate(props, state) {
    if(this.refs.currencyInput.selectionStart != this.state.cursorPos) {
      this.refs.currencyInput.selectionStart = this.state.cursorPos;
      this.refs.currencyInput.selectionEnd = this.state.cursorPos;
    }
  }

  render() {
    return (
      <div>
        <input ref="currencyInput"
             type="text"
             value={this.state.value}
             onChange={this.updateValue}/>
        <br/>
        <br/>
        <span>Raw Value: <b>{this.state.raw}</b></span>
      </div>
    )
  }
}

CurrencyInput.propTypes = {
  format: React.PropTypes.oneOf(['lakh', 'thousand']),
  value: React.PropTypes.string,
  onUpdate: React.PropTypes.func
};

CurrencyInput.defaultPropTypes = {
  format: 'lakh'
}

export default CurrencyInput;
