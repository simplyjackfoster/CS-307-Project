import React from 'react';
import { app, rtdb, auth, storage } from './RTDB';
import { ref, uploadBytes, child, deleteObject } from 'firebase/storage';
import { getID } from './ID';


/*
 *
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
	}).catch((error) => {
		console.log(error);
	});

	// delete the edit_profile_picture from user storage
	storageRef = ref(storage, "users/" + id + "/edit_profile_picture");
	deleteObject(storageRef).then(() => {
		console.log("Edit Profile Picture Deleted Successfully!");
	}).catch((error) => {
		console.log(error);
	});


} // deleteUserImages()