import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './MessageBubble.css';

class MessageBubble extends Component {
  state = {
    newMessage: '',
  }

  getConversations(messages){
    if(messages === undefined){
      return;
    }

    const listItems = messages.map((message, index) => {
      let bubbleClass = 'me';
      let bubbleDirection = '';

      if(message.type === 0){
        bubbleClass = 'you';
        bubbleDirection = "bubble-direction-reverse";
      }
      return (
              <div className={`bubble-container ${bubbleDirection}`} key={index}>
                <img className={`img-circle`} src={message.image} alt="avatar icon"/>
                <div className={`bubble ${bubbleClass}`}>{message.text}</div>
              </div>
          );
    });
    return listItems;
  }

  handleSubmit = e => {
    e.preventDefault()

    const {props: {onNewMessage}, state: {newMessage}} = this;

    if(onNewMessage && newMessage) {
      onNewMessage(newMessage);
    }

    this.setState({
      newMessage: '',
    })
  }

  handleInputChange = e => this.setState({
    newMessage: e.target.value,
  })

  render() {
    const {props: {messages}} = this;
    const chatList = this.getConversations(messages);

    return (
      <div className="chats">
        <div className="chat-list">
          {chatList}
        </div>
      </div>
    );
  }
}

MessageBubble.propTypes = {
  messages: PropTypes.array.isRequired,
  onNewMessage: PropTypes.func.isRequired,
};

export default MessageBubble;