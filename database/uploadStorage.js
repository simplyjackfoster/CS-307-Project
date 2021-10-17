import React, {useState} from 'react';
import { app, rtdb, auth, storage } from './RTDB';
import { ref, uploadBytes } from 'firebase/storage';
import { getID } from './ID'

import uuid4 from 'uuid4';


/*
 * Uploades an image to the firebase storage asynchronously.
 * @param storage_path -> the path in the storage that we want
 * 												to store the image to.
 * @param uri -> the uri to the image.
 */
async function uploadImageAsync(storage_path, uri) {
	// get blob from uri so we can upload it to storage
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

	// upload bytes from the blob to storage
	uploadBytes(ref(storage, storage_path), blob).then((snapshot) => {
		console.log("Successfully Uploaded File!");
	}).catch((error) => {
		console.error(error);
	});

  // We're done with the blob, close and release it
  blob.close();
} // uploadImageAsync()



/*
 * Uploads the profile picture.
 * @param email_or_id -> the email or id of the user whose 
 * 											 profile picture we want to update.
 * @param uri -> the uri of the profile picture.
 */
export const uploadProfilePicture = (email_or_id, uri) => {
	// get the id
	const id = getID(email_or_id);

	// create storage path
	const path = "users/" + id + "/Profile Picture";

	// upload the image to the storage path
	uploadImageAsync(path, uri);
} // uploadProfilePicture()




/*
 * Uploads the profile picture on the Edit Profile screen.
 * @param email_or_id -> the email or id of the user whose 
 * 											 profile picture we want to update.
 * @param uri -> the uri of the profile picture.
 */
export const uploadEditProfilePicture = (email_or_id, uri) => {
	// get the id
	const id = getID(email_or_id);

	// create storage path
	const path = "users/" + id + "/Edit Profile Picture";

	// upload the image to the storage path
	uploadImageAsync(path, uri);
} // uploadProfilePicture()





/*
 * Takes the uri to an image and creates a unique name with
 * the proper extension.
 * @param uri -> the uri to the image.
 * @return -> a unique name for the file with the proper extension.
 */
export const createUniqueImageName = (uri) => {
	// get the file extension
	const fileExtension = uri.split('.').pop();
	console.log("File extension: " + fileExtension);

	// create unique filename
	var uuid = uuid4();
	const fileName = `${uuid}.${fileExtension}`;
	console.log("File Name: " + fileName);

	return fileName;
} // createUniqueImageName()
