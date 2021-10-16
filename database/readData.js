import React, {useState} from 'react';
import { app, rtdb, auth } from './RTDB';
import {ref, set, onValue, exists, val, child, get, remove} from "firebase/database";
import { getID } from './ID';


/*
 * getProfileName()
 *
 * Get the profile_name of the specified user.
 * @param email -> A string that can either be an email
 * 								 or an ID. 
 * @return -> The profile_name of the user specified by the email or ID
 */
export const getProfileName = (email_or_id) => {
	const dbRef = ref(rtdb);

	// get the id
	const id = getID(email_or_id);

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