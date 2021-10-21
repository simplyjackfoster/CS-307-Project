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




/*
 * Gets the answers from a user's questionnaire and
 * returns them in the form of an array.
 * @param email_or_id -> the email or id of the user
 * @return -> an array containing the answers to the questionnaire
 * 						questions.
 */
export const getQuestionnaireData = (email_or_id) => {
	// create the variable that we will store the answers in
	const answers = [];	

	// Answer 1
	var a1 = getDataFromPath("users/" + getID(email_or_id) +
															 "/Roommate Compatibility/is_clean");
	if (!a1) {
		a1 = 3;
	}

	// Answer 2
	var a2 = getDataFromPath("users/" + getID(email_or_id) +
															 "/Roommate Compatibility/week_bedtime");
	if (!a2) {
		a2 = 3;
	}

	answers[0] = a1;
	answers[1] = a2;

	return answers;
} // getQuestionnaireData



export const getAnswerOne = (email_or_id) => {
	const id = getID(auth.currentUser.email);
	var answer = getDataFromPath("users/" + id + "/Roommate Compatibility/has_people_over");
	if (!answer) {
		return 3;
	}
	return answer;
}