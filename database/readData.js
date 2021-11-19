import React, {useState} from 'react';
import { rtdb, auth } from './RTDB';
import {ref, set, exists, val, child, get, remove, onValue } from "firebase/database";
import { getID } from './ID';
import { Value } from 'react-native-reanimated';


/*
 * getDataFromPath()
 *
 * This function can be used to grab data from the Firebase RTDB.
 * @param path -> a path to the data that we want to retrieve.
 * 								ex. getDataFromPath("users/" + id + "/Profile/profile_name");
 * @return -> the respective data from the database.
 */
export const getDataFromPath = (path) => {
	const dbRef = ref(rtdb);
	const [data, setData] = useState(null);

	// end of path
	//const endPath = path.split('/').pop();

	// get the data
	get(child(dbRef, path)).then((snapshot) => {
		if (snapshot.exists()) {
			const data_val = snapshot.val();
			setData(data_val);
		}
		else {
			console.log("This data is unavailable: " + path);
		}
	}).catch((error) => {
		console.error(error);
	});
	return data;	
} // getDataFromPath()



/*
 * getDataFromPath()
 *
 * This function can be used to grab data from the Firebase RTDB aysnchronously.
 * @param path -> a path to the data that we want to retrieve.
 * 								ex. getDataFromPath("users/" + id + "/Profile/profile_name");
 * @return -> the respective data from the database.
 */
export const getDataFromPathAsync = async (path) => {
	const dbRef = ref(rtdb);

	// end of path
	//const endPath = path.split('/').pop();

	// get the data
	const data = await get(child(dbRef, path)).then((snapshot) => {
		if (snapshot.exists()) {
			const data_val = snapshot.val();
			return data_val;
		}
		else {
			console.log("This data is unavailable: " + path);
		}
	}).catch((error) => {
		console.error(error);
	});

	return data;
} // getDataFromPathAsync()




/*
 * getInstagramLink()
 *
 * This function can be used to get the url link to a users instagram.
 * @param email_or_id -> the email or id to the specified user.
 * @return -> the url link to the specified user's instagram.
 */
export const getInstagramLink = (email_or_id) => {
	const id = getID(email_or_id);
	var instagram_username = getDataFromPath("users/" + id + "/Profile/instagram");
	var url = "https://www.instagram.com/" + instagram_username + "/";
	return url;
} // getInstagramLink()





/*
 * getInterests()
 *
 * This functions gets the interets from a user returns them in the form
 * of an array.
 * @param email_or_id -> the email or id to the specified user.
 * @return -> an array containing the interests of the user.
 */
export const getInterests = (email_or_id) => {
	const id = getID(email_or_id);
	const interest1 = getDataFromPath("users/" + id + "/Profile/Interests/interest1");
	const interest2 = getDataFromPath("users/" + id + "/Profile/Interests/interest2");
	const interest3 = getDataFromPath("users/" + id + "/Profile/Interests/interest3");
	const interest4 = getDataFromPath("users/" + id + "/Profile/Interests/interest4");
	const interest5 = getDataFromPath("users/" + id + "/Profile/Interests/interest5");

	const interests = [interest1, interest2, interest3, interest4, interest5];
	return interests;
} // getInterests()




/*
 * Reads the birthday of the user and calculates and returns their age.
 * @param email_or_id -> the email or id to the specified user.
 * @return -> the age of the user.
 */
export const getAgeAsync = async (email_or_id) => {
	const id = getID(email_or_id);

	// get the birthday
	const bday = await getDataFromPathAsync("users/" + id + "/Critical Information/birthday");

	// do age calculation
	var age;
	const bday_day = bday.substring(0, 2)
	const bday_month = bday.substring(3, 5)
	const bday_year = bday.substring(6)

	const date = new Date();
	const curr_day = date.getDate();
	const curr_month = date.getMonth() + 1;
	const curr_year = date.getFullYear();
	age = curr_year - bday_year;

	/* Giga brain math to calculate true age */
	if(bday_month >= curr_month) {
			if(bday_day > curr_day) {
					age -= 1
			}
	}

	return age;
} // getAge()

