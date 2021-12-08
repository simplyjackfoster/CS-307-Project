import React from 'react';
import { getDataFromPath, getDataFromPathAsync, getInstagramLink } from "../database/readData";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, doc, setDoc, addDoc, getDocs, query, orderBy, QuerySnapshot } from 'firebase/firestore';
import { rtdb, auth, app, firestore, firestoreDB} from  '../database/RTDB';
import { getID } from '../database/ID';



/*
 * Creates an id
 */
export const makeid = (length) => {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * 
							charactersLength));
 	}

 	return result;
} // makeid()





/*
 * Writes message from my_id to user_id.
 */
export const writeQuickMessage = async (message, chatroom, my_id, user_id) => {
	// get profile picture
	const profile_picture = await getDataFromPathAsync("users/" + getID(auth.currentUser.email) +
										"/Profile/Images/profile_picture");

	// get database reference
	const messagesRef = collection(firestoreDB,'chatroom',
											chatroom, 'messages');

	const mymsg = {
		_id: makeid(36),
		text: message,
		sentBy: my_id,
		sentTo: user_id,
		createdAt: new Date(),
		sent: true,
		user: {_id: getID(auth.currentUser.email), avatar: profile_picture},
	}

	const createDocuments = async () =>{
		await addDoc(messagesRef, {...mymsg});
	};

	createDocuments();
} // writeQuickMessage()





/*
 * Creates a new 
 */
export const createNewConversation = async (user1, user2) => {

	// create new chatroom with the message
	const newChatroom = makeid(36);
	console.log("new Chatroom: " + newChatroom);


	// add conversation to user1's converstations
	const docRef1 = await addDoc(collection(firestoreDB, "users",
												user1, "conversations"), {
													name: user2,
													chatroom: newChatroom,
												});

	// add conversation to user2's converstations
	const docRef2 = await addDoc(collection(firestoreDB, "users",
												user2, "conversations"), {
													name: user1,
													chatroom: newChatroom,
												});

	return newChatroom;
} // createNewConversation()







