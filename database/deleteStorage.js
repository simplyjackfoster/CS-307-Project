import React from 'react';
import { rtdb, auth, storage } from './RTDB';
import { ref, uploadBytes, child, deleteObject } from 'firebase/storage';
import { getID } from './ID';


/*
 * deleteUserImages()
 *
 * Removes the specified user's images from Firebase Storage.
 * @param email_or_id -> the email or id of the user whose images
 * 											 we want to delete.
 */
export const deleteUserImages = (email_or_id) => {
	// get the id
	const id = getID(email_or_id);	

	// create reference to the user we want to delete
	var storageRef;
	
	storageRef = ref(storage, "users/" + id + "/profile_picture");
	// delete the profile_picture from user storage
	deleteObject(storageRef).then(() => {
		console.log("Profile Picture Deleted Successfully!");
	}).catch((error) => {});
} // deleteUserImages()

