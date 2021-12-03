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
import {DateTime} from 'luxon';

/*
 * This is the screen where the user messages other users.
 */
var startTime = DateTime.now();
var endTime = DateTime.now();
export default ({ navigation, route}) =>{

  const {id} = route.params;
  const messagesRef = collection(firestoreDB,'chatroom','KU6bnqXVnKtuNsuVhFOX','messages');
  //const query = messagesRef.orderBy('createdAt');
  //const [messages] = useCollectionData(query,{idField: 'id'});
  const [messages, setMessages] = useState([]);
  const profile_picture = getDataFromPath("users/" + "foste205" + "/Profile/Images/profile_picture");

  const onSend = (messageArray) => {
    startTime = DateTime.now();
    const msg = messageArray[0]
    const mymsg = {
      ...msg,
      sentBy: getID(auth.currentUser.email),
      sentTo: id,
      sent: true,
      received: false, //update to true once read (use as read reciept bool)
      createdAt: new Date()
    }
    console.log(messageArray)
    setMessages(previousMessages => GiftedChat.append(previousMessages,mymsg))
    endTime = DateTime.now();
    var startMin = startTime.toString();
    startMin = startMin.substring(14, 16);
    var startSec = startTime.toString();
    startSec = startSec.substring(17, 19);
    var endMin = endTime.toString();
    endMin = endMin.substring(14, 16);
    var endSec = endTime.toString();
    endSec = endSec.substring(17, 19);
    var diff = (eval(endMin - startMin) * 60) + (eval(endSec - startSec));
    // if (diff < 10) {
    //   console.log("Passed Checkpoint 1 (time to request), total time: " + diff);
    // } else {
    //   console.log("Failed Checkpoint 1 (time to request), total time: " + diff);
    // }
    const createDocuments = async () =>{
      await addDoc(messagesRef, {...mymsg});
    };
    createDocuments();
    console.log("Message Request Recived");
    console.log("Read reciept status: " + mymsg.received +"Recived");
    endTime = DateTime.now();
    endMin = endTime.toString();
    endMin = endMin.substring(14, 16);
    endSec = endTime.toString();
    endSec = endSec.substring(17, 19);
    diff = (eval(endMin - startMin) * 60) + (eval(endSec - startSec));
    // if (diff < 10) {
    //   console.log("Passed Checkpoint 2 (time to send), total time: " + diff);
    // } else {
    //   console.log("Failed Checkpoint 2 (time to send), total time: " + diff);
    // }
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