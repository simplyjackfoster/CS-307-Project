import React from 'react';
import { getDataFromPath, getDataFromPathAsync, getInstagramLink } from "../database/readData";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, doc, setDoc, addDoc, getDocs, query,
				 orderBy, QuerySnapshot, getDoc, where } from 'firebase/firestore';
import { rtdb, auth, app, firestore, firestoreDB} from  '../database/RTDB';
import { getID } from '../database/ID';






/*
 * Function that checks to see if a conversation exists with the specified user.
 * Returns the chatroom id if it does exists, otherwise returns null.
 */
export const convoExists = async (user) => {
	const ref = collection(firestoreDB, "users",
							getID(auth.currentUser.email), "conversations");

	const q = query(ref, where("name", "==", user));
	const querySnapshot = await getDocs(q);

	if (querySnapshot.empty) {
		return null;
	}
	else {
		var room;

		querySnapshot.forEach((doc) => {
			room = doc.data().chatroom;
		});

		return room;
	}

} // convoExists()





/*
 * Gets a list of the messages that the current user has
 */
export const getMessagesAsync = async (id) => {

	// get the conversation number
	const chatroom = await convoExists(id);
	console.log("getting messages from: " + chatroom);

	// get the messages ref
  const messagesRef = collection(firestoreDB, 'chatroom',
											chatroom, 'messages');
	
	// get the messages
	const q = query(messagesRef, orderBy('createdAt', 'desc'))
	const dataM = await getDocs(q);
	
	const allmsg = dataM.docs.map(docSanp=>{
		return {
			...docSanp.data(),
			createdAt:docSanp.data().createdAt.toDate()
		}
	})

	return allmsg;

} // getMessagesAsync()





/*
 * Function that finds the ids of the users that the current user has messages with.
 */
export const getMessagesIDSAsync = async () => {
	const ref = collection(firestoreDB, "users",
							getID(auth.currentUser.email), "conversations");

	const snapshot = await getDocs(ref);	

	var ids = [];
	snapshot.forEach((doc) => {
		ids.push(doc.data().name);
	});

	return ids;
} // getMessagesIDS()
