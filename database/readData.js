import React, {useState} from 'react';
import { rtdb, auth } from './RTDB';
import {ref, set, exists, val, child, get, remove} from "firebase/database";
import { getID } from './ID';



/*
 * getDataFromPath()
 *
 * This function can be used to grab data from the Firebase RTDB.
 * @param path -> a path to the data that we want to retrieve.
 * 								ex. "users/" + id + "/Profile/profile_name"
 * @return -> the respective data from the database.
 */
export const getDataFromPath = (path) => {
	const dbRef = ref(rtdb);
	const [data, setData] = useState(null);

	// get the data
	get(child(dbRef, path)).then((snapshot) => {
		if (snapshot.exists()) {
			const data_val = snapshot.val();
			setData(data_val);
		}
		else {
			console.log("This data is unavailable");
		}
	}).catch((error) => {
		console.error(error);
	});

	return data;	
} // getDataFromPath()

