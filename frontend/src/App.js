import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as api from './api/frontEndApi.js';

class App extends Component {
state = {
    data: null
  };

  componentDidMount() {
      // Call our fetch function below once the component mounts
    api.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {/* // Render the newly fetched data inside of this.state.data  */}
        <p className="App-intro">{this.state.data}</p>
      </div>
    );
  }
}

export default App;