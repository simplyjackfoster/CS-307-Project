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
import { collection, doc, setDoc, addDoc, getDocs, query, orderBy, QuerySnapshot, onSnapshot } from 'firebase/firestore';
import { rtdb, auth, app, firestore, firestoreDB } from  '../database/RTDB';
import { getID } from '../database/ID';
import { getMessagesAsync, convoExists } from '../database/readFirestore';

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
  const onSend = async (messageArray) => {

    // get message ref
    const chatroom = await convoExists(id);
    const messagesRef = collection(firestoreDB, "chatroom", chatroom, "messages");

    const msg = messageArray[0]
    const mymsg = {
      ...msg,
      sentBy: getID(auth.currentUser.email),
      sentTo: id,
      createdAt: new Date(),
      sent: true,
    }
    setMessages(previousMessages => GiftedChat.append(previousMessages,mymsg))

    const createDocuments = async () =>{
      await addDoc(messagesRef, {...mymsg});
    };

    createDocuments();
  } // onSend()




  // Get the messages
  useEffect(() => {
    const func = async () => {
      const chatroom = await convoExists(profile.id);
      const messagesRef = collection(firestoreDB, "chatroom", chatroom, "messages");
      //getAllMessages()
      const q = query(messagesRef, orderBy('createdAt','desc'));
      const unsubscribe = onSnapshot(q,(querySnap)=>{
        const allmsg = querySnap.docs.map(docSanp=>{
          const data = docSanp.data()
        if(data.createdAt){
          return {
            ...docSanp.data(),
            createdAt:docSanp.data().createdAt.toDate()
          }
        }else{
          return{
            ...docSanp.data(),
            createdAt:new Date()
          }
        }

        })
        setMessages(allmsg)
      })

      return()=>{
        unsubscribe()
      }
    }
    func();
  }, []) // useEffect())



    
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