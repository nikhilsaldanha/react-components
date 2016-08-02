import React, { Component } from 'react';
import CurrencyInput from './CurrencyInput.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: '123.22', inputFormat: 'thousand'}
    this.onInputUpdate = this.onInputUpdate.bind(this)
    this.onButtonUpdate = this.onButtonUpdate.bind(this)
  }

onInputUpdate(inputValue) {

  this.setState({ inputValue })
}

onButtonUpdate(e) {
  e.target.value == 'lakh' ? this.setState({inputFormat: 'thousand'}) : this.setState({inputFormat: 'lakh'});
}

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Currency Input</h2>
        </div>
        <p className="App-intro">
          Try entering a number into the text box
        </p>
        <CurrencyInput id="currency" className="curr" style={{width: '33px'}} value={this.state.inputValue} format={this.state.inputFormat} onUpdate={this.onInputUpdate}/>
        <input type="button" value={this.state.inputFormat} onClick={this.onButtonUpdate} />
      </div>
    );
  }
}

export default App;
