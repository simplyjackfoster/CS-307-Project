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
export const getMessagesAsync = async () => {

} // 


