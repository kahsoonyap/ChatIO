import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { View, Dimensions } from 'react-native'
import './App.css'

const axios = require('axios');
axios.defaults.baseURL = "http://localhost:4000/"

interface appState{
  messages: any
}

class App extends React.Component<{},appState> {
  state = {
    messages: [],
  }

  async componentWillMount() {
    let currentMessage = await axios.get("/startup")
    this.setState({
      messages: [
        {
          _id: 2,
          text: currentMessage.data,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'term',
            avatar: '/terminal-icon.png',
          },
        },
        {
          _id: 1,
          text: 'Starting',
          user: {
            _id: 1,
            name: 'term',
            avatar: '/logo192.png',
          },
          createdAt: new Date(),
        },
      ],
    })
  }



  async onSend(messages = []) {
    let currentMessage = await axios.post("/send_message",{send:messages[0]})
    let response =[ {
      _id: messages.length+1,
      text: currentMessage.data,
      user: {
        _id: 2,
        name: 'term',
        avatar: '/terminal-icon.png',
      },
      createdAt: new Date(),
    }]
    
    this.setState(previousState => ({
      messages: GiftedChat.append(GiftedChat.append(previousState.messages, messages),response)
    }))

  }

  render() {
    const { width, height } = Dimensions.get('window')
    return (
      <View style={{ width, height }}>
       <GiftedChat messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
        inverted = {true} />
     </View>
    );
  }
}

export default App
