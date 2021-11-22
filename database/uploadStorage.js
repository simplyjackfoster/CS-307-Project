import React, {useState} from 'react';
import { rtdb, auth, storage } from './RTDB';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getID } from './ID'
import { writeDataToPath, writeEditProfilePicture, writeProfilePicture } from './writeData';

import uuid4 from 'uuid4';


/*
 * uploadProfilePicture()
 *
 * Uploads the profile picture.
 * @param email_or_id -> the email or id of the user whose 
 * 											 profile picture we want to update.
 * @param uri -> the uri of the profile picture.
 */
export const uploadProfilePicture = (email_or_id, uri) => {
	// get the id
	const id = getID(email_or_id);

	// create storage path
	const path = "users/" + id + "/profile_picture";

	// create rtdb path and field
	const rtdb_path = "users/" + id + "/Profile/Images/profile_picture";

	// upload the image to the storage path
	uploadImageAsync(path, uri, rtdb_path);
} // uploadProfilePicture()




/*
 * uploadImageAsync()
 *
 * Uploades an image to the firebase storage asynchronously, and
 * writes the uri of the image to the database to the specified path.
 * @param storage_path -> the path in the storage that we want
 * 												to store the image to.
 * @param uri -> the uri to the image.
 * @param rtdb_path -> the path in the RTDB that we will write the uri of
 * 										 the image to. 
 */
async function uploadImageAsync(storage_path, uri, rtdb_path) {
	// get blob from uri so we can upload it to storage
	const blob = await getBlobAsync(uri);


	// upload bytes from the blob to storage
	uploadBytes(ref(storage, storage_path), blob).then((snapshot) => {
		console.log("Successfully Uploaded File!");

		// get the url from the database and add it to the realtime database
		var imgRef = ref(storage, storage_path);
		getDownloadURL(imgRef).then((url) => {

			// get which picture we are uploading
			const whichImage = getWhichImage(rtdb_path);

			if (whichImage == "profile_picture") {
				// write the url to the database path
				writeProfilePicture(auth.currentUser.email, url);
			}

		}).catch((error) => {
			console.log(error);
		});

	}).catch((error) => {
		console.error(error);
	});

  // We're done with the blob, close and release it
  blob.close();
} // uploadImageAsync()




/*
 * Given a uri to an image, this function returns the blob of the image.
 * @param uri -> the uri to an image.
 * @return -> the blob of the specified image.
 */
export const getBlobAsync = async (uri) => {
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
	return blob;
} // getBlob()






/*
 * getWhichImage()
 *
 * This function finds which image we are uploading, and returns the name
 * of the image.
 * @param rtdb_path -> a path in the RTDB.
 * @return -> the name of the image.
 * 						ex. "/users/id/Profile/Images/profile_picture" will return "profile_picture"
 */
export const getWhichImage = (rtdb_path) => {
	const whichImage = rtdb_path.split('/').pop();	
	return whichImage;
} // getWhichImage()




/*
 * createUniqueImageName()
 *
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
