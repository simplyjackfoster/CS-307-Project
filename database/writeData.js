import React from 'react';
import { app, rtdb, auth } from './RTDB';
import {ref, set, onValue, exists, val, child, get, remove} from "firebase/database"


// gets the user ID
export const getID = (email) => {
	let atSign = email.indexOf("@");
	const id = email.substring(0, atSign);
	return id;
} // getID() 



//FOR TESTING ONLY
export const writeUser = (email) => {
	const id = getID(email);

	set(ref(rtdb, "users/" + id), {
		email: email
	});
} // writeUser()



/* 
 * Writes a new user to the database based on the information
 * collected from Signup.js
 */
export const writeNewUser = (name, email, phone_number,
														 birthday, securityQuestion, securityAnswer) => {
	set(ref(rtdb, "users/" + email), {
		name: name,
		email: email,
		phone_number: phone_number,
		birthday: birthday,
		securityQuestion: securityQuestion,
		securityAnswer: securityAnswer,
		ghost_mode: false
	});
} // writeNewUser()


