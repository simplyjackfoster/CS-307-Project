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
	const endPath = path.split('/').pop();

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
 *
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
 * 
 */
export const getQuestionnaire = (email_or_id) => {
	const id = getID(email_or_id);

	// this is the display order, not the databse order
	const response1 = getDataFromPath("users/" + id + "/Roommate Compatibility/has_people_over");
	const response2 = getDataFromPath("users/" + id + "/Roommate Compatibility/is_clean");
	const response3 = getDataFromPath("users/" + id + "/Roommate Compatibility/week_bedtime");
	const response4 = getDataFromPath("users/" + id + "/Roommate Compatibility/weekend_bedtime");
	const response5 = getDataFromPath("users/" + id + "/Roommate Compatibility/drinks_alcohol");
	const response6 = getDataFromPath("users/" + id + "/Roommate Compatibility/smokes");
	const response7 = getDataFromPath("users/" + id + "/Roommate Compatibility/handle_chores");
	const response8 = getDataFromPath("users/" + id + "/Roommate Compatibility/has_car");
	const response9 = getDataFromPath("users/" + id + "/Roommate Compatibility/wants_pets");
	const response10 = getDataFromPath("users/" + id + "/Roommate Compatibility/introverted_or_extraverted");
	const response11 = getDataFromPath("users/" + id + "/Roommate Compatibility/check_before_having_people_over");
	const response12 = getDataFromPath("users/" + id + "/Roommate Compatibility/joint_grocery_shopping");
	const response13 = getDataFromPath("users/" + id + "/Roommate Compatibility/has_significant_other");


	const responses = [response1, response2, response3, response4, response5, response6, response7, 
		response8, response9, response10, response11, response12, response13];

	return responses;
}
