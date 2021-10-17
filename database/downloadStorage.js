import React from 'react';
import { Image } from 'react-native';
import { app, rtdb, auth, storage } from './RTDB';
import { ref, uploadBytes, getDownloadURL, child } from 'firebase/storage';
import { getID } from './ID';



/*
 * Gets the uri for the profile picture of the specified user.
 * @param email_or_id -> the email or id of the user we want to get
 * 											 the profile picture for.
 * @return -> the uri of the profile picture.
 */
export const downloadProfilePicture = (email_or_id) => {
	// get the id
	const id = getID(email_or_id);

	// get path
	const storage_path = "users/" + id + "/Profile Picture";

	return downloadImage(storage_path);
} // downloadProfilePicture()



/*
 * Gets the uri for the edit profile picture of the specified user.
 * @param email_or_id -> the email or id of the user we want to get
 * 											 the edit profile picture for.
 * @return -> the uri of the edit profile picture.
 */
export const downloadEditProfilePicture = (email_or_id) => {
	// get the id
	const id = getID(email_or_id);

	// get path
	const storage_path = "users/" + id + "/Edit Profile Picture";

	return downloadImage(storage_path);
} // downloadEditProfilePicture()





/*
 * Given a path to some point in the firebase storage, this
 * function gives us the uri to the image.
 * @param storage_path -> the path in the storage to the file we
 * 												want to retrieve.
 * @return -> The uri to the file.
 */
export const downloadImage = (storage_path) => {
	// hook for the uri
	const [uri, setUri] = React.useState(null);

	// get reference
	var imgRef = ref(storage, storage_path);

	// get the download URL
	getDownloadURL(imgRef).then((url) => {
		// use hook
		setUri(url);
	}).catch((error) => {
		console.log(error);
	});

	return uri;
} // downloadImage()



