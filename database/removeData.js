import React from 'react';
import { app, rtdb, auth } from './RTDB';
import {ref, set, onValue, exists, val, child, get, remove} from "firebase/database";
import { getID } from './ID';


/*
 * removeUser()
 *
 * Removes a specified user from the RTDB
 * @param email_or_id -> A string that can either be an email
 * 								 			 or an ID specifying the user to be removed.
 */
export const removeUser = (email_or_id) => {
	const id = getID(email_or_id);	
	remove(ref(rtdb, "users/" + id));
} // removeUser()