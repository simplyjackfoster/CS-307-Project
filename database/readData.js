import React, {useState} from 'react';
import { app, rtdb, auth } from './RTDB';
import {ref, set, onValue, exists, val, child, get, remove} from "firebase/database";
import { getID } from './ID';


/*
 * Get name of user
 */
export const getName = (email) => {
	const dbRef = ref(rtdb);

	// get the id
	const id = getID(email);

	// (react hook)
	const [name, setName] = useState(null);

	// get the data
	get(child(dbRef, "users/" + id + "/Profile/profile_name")).then((snapshot) => {
		if (snapshot.exists()) {
			const profile_name = snapshot.val();
			setName(profile_name);
		}
		else {
			console.log("Name data unavailable");
		}
	}).catch((error) => {
		console.error(error);
	});

	return name;
} // getName()