import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001"
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ response: data }));
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch('http://localhost:4001/send_message', {
      headers: {
        'Access-Control-Allow-Origin':'*'
      },
      credentials: "omit",
      mode: "cors",
      method: 'POST',
      body: data.command
    });
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
              <input type="text" id="command" name="command"/>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
    );
  }
}
export default App;
