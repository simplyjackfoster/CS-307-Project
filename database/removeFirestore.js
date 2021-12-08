import React from 'react';
import { getDataFromPath, getDataFromPathAsync, getInstagramLink } from "../database/readData";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, doc, setDoc, addDoc, getDocs, query, orderBy,
				 QuerySnapshot, deleteDoc, where } from 'firebase/firestore';
import { rtdb, auth, app, firestore, firestoreDB} from  '../database/RTDB';
import { getID } from '../database/ID';
import { convoExists } from './readFirestore';



/*
 * Deletes a conversation between two users from the firestore database
 */
export const deleteConversation = async (user) => {

	// get the converstation number
	const chatroom = await convoExists(user);

	if (!chatroom) {
		console.log("convo does not exist for this match");
		return;
	}

	// get the messages number
	const ref0 = collection(firestoreDB, "chatroom",
													chatroom, "messages");
	const querySnapshot0 = await getDocs(ref0);
	var messages;
	querySnapshot0.forEach((doc) => {
		messages = doc.id;
	});
	// remove this conversation from the database
	await deleteDoc(doc(firestoreDB, "chatroom", chatroom, "messages", messages));


	// remove the converstion from my conversations list
	const ref1 = collection(firestoreDB, "users",
							getID(auth.currentUser.email), "conversations");
	const q1 = query(ref1, where("name", "==", user));
	const querySnapshot1 = await getDocs(q1);
	var convo1;
	querySnapshot1.forEach((doc) => {
		convo1 = doc.id;
	});
	await deleteDoc(doc(firestoreDB, "users", getID(auth.currentUser.email),
									"conversations", convo1));


	// remove the converstion from the users conversations list
	const ref2 = collection(firestoreDB, "users",
							user, "conversations");
	const q2 = query(ref2, where("name", "==", getID(auth.currentUser.email)));
	const querySnapshot2 = await getDocs(q2);
	var convo2;
	querySnapshot2.forEach((doc) => {
		convo2 = doc.id;
	});
	await deleteDoc(doc(firestoreDB, "users", user,
									"conversations", convo2));

} // deleteConversation()