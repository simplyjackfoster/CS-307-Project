import React from 'react';
import { rtdb, auth } from './RTDB';
import {ref, set, exists, val, child, get, remove, update} from "firebase/database";
import { getID } from './ID';
import { getUserData } from'./readData';


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

export const deleteMatch = (email_or_id, index, userCount) => {
	// get the id
	const id = getID(email_or_id);	
	var newCount = userCount - 1;
	remove(ref(rtdb, "users/" + id + "/Match List/match" + index));
	update(ref(rtdb, "users/" + id + "/Match List"), {
		user_count: newCount,
	});
} // deleteMatch()
