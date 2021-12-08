import React, { useState, useCallback, useEffect, Dimensions } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { getDataFromPath, getInstagramLink } from "../database/readData";
import styles from '../assets/index';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, doc, setDoc, addDoc, getDocs, query, orderBy, QuerySnapshot } from 'firebase/firestore';
import { rtdb, auth, app, firestore, firestoreDB} from  '../database/RTDB';
import { getID } from '../database/ID';
import { getMessagesAsync } from '../database/readFirestore';


/*
 * This is the screen where the user messages other users.
 */

export default ({ navigation, route, props }) =>{

  const {id, profile} = route.params;
  const [messages, setMessages] = useState([]);
  const profile_picture = getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/Images/profile_picture");



  /*
   * Function that runs when a message is sent.
   */
  const onSend = (messageArray) => {
    const msg = messageArray[0]
    const mymsg = {
      ...msg,
      sentBy: getID(auth.currentUser.email),
      sentTo: id,
      createdAt: new Date(),
      sent: true,
    }
    console.log(messageArray)
    setMessages(previousMessages => GiftedChat.append(previousMessages,mymsg))

    const createDocuments = async () =>{
      await addDoc(messagesRef, {...mymsg});
    };

    createDocuments();
  } // onSend()



  /*
   * Sorts the messages in the database and sets the hook to the messages.
   */
  const getAllMessages = async () =>{
    const allmsg = await getMessagesAsync(id);
    setMessages(allmsg)
  } // getAllMessages()



  // Get the messages
  useEffect(() => {
    getAllMessages()
  }, []) // getAllMessages())

    
  return (
    <GiftedChat
      messages={messages}
      onSend={text => onSend(text)}
      user={{
        _id: getID(auth.currentUser.email),
        avatar: profile_picture,
      }}

      alignTop={true}
    />
  );

}