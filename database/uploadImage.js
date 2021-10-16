import React from 'react';
import { Image } from 'react-native';
import { app, rtdb, auth, storage } from './RTDB';
import { ref, uploadBytes, child } from 'firebase/storage';
import { getID } from './ID'

import uuid4 from 'uuid4';

/*
 *
 */
export const uploadProfilePicture = (email_or_id, uri) => {

	// get the id
	const id = getID(email_or_id);
	
	// get the file extension
	const fileExtension = uri.split('.').pop();
	console.log("File extension: " + fileExtension);

	// create unique filename
	var uuid = uuid4();
	const fileName = `${uuid}.${fileExtension}`;
	console.log("File Name: " + fileName);


	uploadImageAsync(uri);
/*	// put the file in the storage
	uploadBytes(ref(storage, "users/" + id + "/Profile Picture/"
									+ fileName), uri).then((snapshot) => {
		console.log("Uploaded file");
	}).catch((error) => {
		console.error(error);
	});*/


} // uploadProfilePicture()





/*
 *
 */
async function uploadImageAsync(uri) {

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
	uploadBytes(ref(storage, "users/" + "mfinder" + "/Profile Picture"
									), blob).then((snapshot) => {
		console.log("Successfully Uploaded File!");
	}).catch((error) => {
		console.error(error);
	});

  // We're done with the blob, close and release it
  blob.close();
} // uploadImageAsync()




