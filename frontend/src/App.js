import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import axios from 'axios'
import MessageBubble from "./components/MessageBubble/MessageBubble";
import terminalIcon from "./images/terminal_icon.png";
import userIcon from "./images/user_icon.png";

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      response: false,
      value: "",
      endpoint: "http://127.0.0.1:4001"
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // When components mount create the socket between the server and webApp
  componentDidMount() {
    const url =  window.location.href.slice(7,21)
    const serverIP = url.concat("4001/")
    console.log(serverIP)
    this.setState({endpoint: serverIP})
    const endpoint = serverIP
    this.socket = socketIOClient(endpoint);
    this.socket.on("FromAPI", data => this.handleNewMessage(data, 1));
    this.socket.open();
  }

  componentWillUnmount() {
    this.socket.close();
  }

  //handlesubmit is the function called when user submits response to output
  handleSubmit(event) {
    var htmlRequestUrl =this.state.endpoint.concat("send_message") 
    htmlRequestUrl = "http://".concat(htmlRequestUrl)
    event.preventDefault();
    this.handleNewMessage(this.state.value, 0);
    console.log(this.state.endpoint.concat("send_message"))
    axios.post(htmlRequestUrl, { send: this.state.value })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
      document.getElementById("command").value = ""; 
      this.setState({value: ""});
  }

  //handleChange is the function used to change the value of the input box
  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleNewMessage(text, sender) {
    this.setState({
      messages: this.state.messages.concat([{
        text:text,
        type: sender,
        image: (sender === 0 ? userIcon : terminalIcon)
      }])
    });
  }

  render() {
    return (
      <div id="chatContainer">
          <MessageBubble 
            messages = {this.state.messages}
            onNewMessage ={this.handleNewMessage}>
          </MessageBubble>

          <form onSubmit={this.handleSubmit} id="form">
            <input type="text" id="command" name="command" value={this.state.value} onChange={this.handleChange}/>
            <button type="submit" id="submit">Submit</button>
          </form>
      </div>
    );
  }
}
export default App;
