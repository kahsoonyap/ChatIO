import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import axios from 'axios'

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      value: "",
      endpoint: "http://127.0.0.1:4001"
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const { endpoint } = this.state;
    this.socket = socketIOClient(endpoint);
    this.socket.on("FromAPI", data => this.setState({ response: data }));
    this.socket.open()
  }

  componentWillUnmount() {
    this.socket.close();
  }

  handleSubmit(event) {
    event.preventDefault();
    // const data = new FormData(event.target);
    // fetch('http://localhost:4001/send_message', {
    //   headers: {
    //     'Access-Control-Allow-Origin':'*'
    //   },
    //   credentials: "omit",
    //   mode: "cors",
    //   method: 'POST',
    //   body: data.command
    // });
    axios.post(`http://localhost:4001/send_message`, { send: this.state.value })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  handleChange(event) {

    this.setState({value: event.target.value})
  }

  render() {
    const { response } = this.state;
    console.log(response)
    return (
      <div>
          <div style={{ textAlign: "center" }}>
            {response
                ? <p>
                  {response}
                </p>
                : <p>Loading...</p>}
          </div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <input type="text" id="command" name="command" value={this.state.value} onChange={this.handleChange}/>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
    );
  }
}
export default App;
