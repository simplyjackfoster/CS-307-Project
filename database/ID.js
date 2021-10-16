import React from 'react';

/* 
 * Gets the user ID, which is used to refer to each
 * user in the database.
 */
export const getID = (email) => {
	let atSign = email.indexOf("@");
	const id = email.substring(0, atSign);
	return id;
} // getID() 