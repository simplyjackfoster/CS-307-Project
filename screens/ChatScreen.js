import React, { useState, useCallback, useEffect, Dimensions } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { getDataFromPath, getInstagramLink } from "../database/readData";
import styles from '../assets/index';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, doc, setDoc, addDoc, getDocs}  from'firebase/firestore';
import { rtdb, auth, app, firestore, firestoreDB} from  '../database/RTDB';
import { getID } from '../database/ID';
import { MessageUserContext } from '../context';


/*
 * This is the screen where the user messages other users.
 */

export default ({ navigation, route}) =>{

  const {id} = route.params;
  const messagesRef = collection(firestoreDB,'chatroom','KU6bnqXVnKtuNsuVhFOX','messages');
  //const query = messagesRef.orderBy('createdAt');
  //const [messages] = useCollectionData(query,{idField: 'id'});
  const [messages, setMessages] = useState([]);
  const profile_picture = getDataFromPath("users/" + "foste205" + "/Profile/Images/profile_picture");

  const onSend = (messageArray) => {
    const msg = messageArray[0]
    const mymsg = {
      ...msg,
      sentBy: getID(auth.currentUser.email),
      sentTo: id,
      createdAt: new Date()
    }
    console.log(messageArray)
    setMessages(previousMessages => GiftedChat.append(previousMessages,mymsg))
    const createDocuments = async () =>{
      await addDoc(messagesRef, {...mymsg});
    };
    createDocuments();

  }
  const getAllMessages = async () =>{
    const dataM = await getDocs(messagesRef);
    const allmsg = dataM.docs.map(docSanp=>{
      return {
        ...docSanp.data(),
        createdAt:docSanp.data().createdAt.toDate()
      }
    })
    setMessages(allmsg)
  }

  useEffect(() => {
    getAllMessages()
    /*
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
    */
  }, [])

    
  return (
    <GiftedChat
      messages={messages}
      onSend={text => onSend(text)}
      user={{
        _id: getID(auth.currentUser.email),
      }}
    />

  )
}