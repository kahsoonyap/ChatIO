import React, { useState } from 'react'
import { GiftedChat, IMessage, User, Bubble } from 'react-native-gifted-chat'
import { View, Dimensions } from 'react-native'
import './App.css'

const App: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([
    {
      _id: 1,
      text:
        'python3 helloWorld.py',
      user: {
        _id: 1,
        name: 'me',
        avatar: '/me.jpg',
      },
      createdAt: new Date(),
    },
    {
      _id: 2,
      text: 'Hello World!',
      user: {
        _id: 2,
        name: 'term',
        avatar: '/terminal-icon.png',
      },
      createdAt: new Date(),
    },
    {
      _id: 3,
      text:
        'python hello',
      user: {
        _id: 1,
        name: 'me',
        avatar: '/me.jpg',
      },
      createdAt: new Date(),
    },
    {
      _id: 4,
      text:
        'Error',
      user: {
        _id: 3,
        name: 'termErr',
        avatar: '/sign-error-icon.png',
      },
      createdAt: new Date(),
    }
  ])
  const onSend = (newMsg: IMessage[]) => setMessages([...messages, ...newMsg])
  const user: User = { _id: 1, name: 'me' }
  //const systemUser = { _id: 2, name: "term"}
  //const errUser = {_id: 3, name: "termErr"}
  const { width, height } = Dimensions.get('window')
  // @ts-ignore
  const renderBubble = (props) => {
    let un: string = props.currentMessage.user.name
    let color: string = '#2ecc71'
    if (un === "termErr") {
      color = "#ffe5e5"
    }
    return (
      <Bubble
        {...props}
        // @ts-ignore
        wrapperStyle={{
          left: {
            backgroundColor: color
          }
        }}
      />
    )
  }
  return (
    <View style={{ width, height }}>
      <GiftedChat 
        messages={messages}
        onSend={onSend}
        user={user}
        renderBubble={renderBubble}
        inverted={false}
      />
    </View>
  )
}

export default App
