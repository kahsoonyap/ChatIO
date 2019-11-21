import React, { useState } from 'react'
import { GiftedChat, IMessage, User } from 'react-native-gifted-chat'
import { View, Dimensions } from 'react-native'
import './App.css'

const App: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([
    {
      _id: 1,
      text:
        'Welcome!',
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
  ])
  const onSend = (newMsg: IMessage[]) => setMessages([...messages, ...newMsg])
  const user: User = { _id: 1, name: 'me' }
  const inverted = false
  const { width, height } = Dimensions.get('window')
  return (
    <View style={{ width, height }}>
      <GiftedChat {...{ messages, onSend, user, inverted }} />
    </View>
  )
}

export default App
