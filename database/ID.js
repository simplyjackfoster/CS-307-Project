import React from 'react';

/* 
 * getID()
 * 
 * Gets the user ID, which is used to refer to each
 * user in the database.
 * @param email -> A string that can either be an email
 * 								 or an ID. 
 * @return -> If the param is an email, then the part before
 * 						the "@purdue.edu", otherwise return the ID
 * 						as is.
 */
export const getID = (email_or_id) => {
	let atSign = email_or_id.indexOf("@");
	if (atSign == -1) {
		return email_or_id;
	}
	else {
		const id = email_or_id.substring(0, atSign);
		return id;
	}
} // getID() 