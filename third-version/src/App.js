import React, {Component} from 'react';
import './App.css';
import PaymentApp from './components/PaymentApp';

class App extends Component{
  render(){
    return(
      <div className="App">
        <PaymentApp />
      </div>
    );
  }
}

export default App;
