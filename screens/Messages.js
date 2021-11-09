import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { GiftedChat } from 'react-native-gifted-chat';
import Colors from '../constants/Colors';
import { getDataFromPath, getInstagramLink } from "../database/readData";


/*
 * This is the screen where the user messages other users.
 */
export default ({ navigation }) =>{
  const [messages, setMessages] = useState([]);
  const profile_picture = getDataFromPath("users/" + "foste205" + "/Profile/Images/profile_picture");


  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hey do you want to be roommates?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: profile_picture,
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  )
}




// styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

});