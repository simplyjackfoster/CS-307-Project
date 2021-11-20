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
 * 
 */
export const getQuestionnaireAsync = async (email_or_id) => {
	const id = getID(email_or_id);

	// this is the display order, not the databse order
	const [
		response1,
		response2,
		response3,
		response4,
		response5,
		response6,
		response7,
		response8,
		response9,
		response10,
		response11,
		response12,
		response13,
	] = await Promise.all(
	[
		getDataFromPathAsync("users/" + id + "/Roommate Compatibility/has_people_over"),
		getDataFromPathAsync("users/" + id + "/Roommate Compatibility/is_clean"),
		getDataFromPathAsync("users/" + id + "/Roommate Compatibility/week_bedtime"),
		getDataFromPathAsync("users/" + id + "/Roommate Compatibility/weekend_bedtime"),
		getDataFromPathAsync("users/" + id + "/Roommate Compatibility/drinks_alcohol"),
		getDataFromPathAsync("users/" + id + "/Roommate Compatibility/smokes"),
		getDataFromPathAsync("users/" + id + "/Roommate Compatibility/handle_chores"),
		getDataFromPathAsync("users/" + id + "/Roommate Compatibility/has_car"),
		getDataFromPathAsync("users/" + id + "/Roommate Compatibility/wants_pets"),
		getDataFromPathAsync("users/" + id + "/Roommate Compatibility/introverted_or_extraverted"),
		getDataFromPathAsync("users/" + id + "/Roommate Compatibility/check_before_having_people_over"),
		getDataFromPathAsync("users/" + id + "/Roommate Compatibility/joint_grocery_shopping"),
		getDataFromPathAsync("users/" + id + "/Roommate Compatibility/has_significant_other"),
	]);


	// const response1 = await getDataFromPathAsync("users/" + id + "/Roommate Compatibility/has_people_over");
	// const response2 = await getDataFromPathAsync("users/" + id + "/Roommate Compatibility/is_clean");
	// const response3 = await getDataFromPathAsync("users/" + id + "/Roommate Compatibility/week_bedtime");
	// const response4 = await getDataFromPathAsync("users/" + id + "/Roommate Compatibility/weekend_bedtime");
	// const response5 = await getDataFromPathAsync("users/" + id + "/Roommate Compatibility/drinks_alcohol");
	// const response6 = await getDataFromPathAsync("users/" + id + "/Roommate Compatibility/smokes");
	// const response7 = await getDataFromPathAsync("users/" + id + "/Roommate Compatibility/handle_chores");
	// const response8 = await getDataFromPathAsync("users/" + id + "/Roommate Compatibility/has_car");
	// const response9 = await getDataFromPathAsync("users/" + id + "/Roommate Compatibility/wants_pets");
	// const response10 = await getDataFromPathAsync("users/" + id + "/Roommate Compatibility/introverted_or_extraverted");
	// const response11 = await getDataFromPathAsync("users/" + id + "/Roommate Compatibility/check_before_having_people_over");
	// const response12 = await getDataFromPathAsync("users/" + id + "/Roommate Compatibility/joint_grocery_shopping");
	// const response13 = await getDataFromPathAsync("users/" + id + "/Roommate Compatibility/has_significant_other");

	// start indexing at 1 for simplicity
	const responses = [-1, response1, response2, response3, response4, response5, response6, response7, 
		response8, response9, response10, response11, response12, response13];

	return responses;
}



/*
 * Calculates the compatibility score between teh current user and the user specified in the argument
 */
export const getCompatibilityScoreAsync = async (uid) => {

	// get my own questionnaire as well as the other user's
    const myUid = getID(auth.currentUser.email);
    const myQuestionnaire = await getQuestionnaireAsync(myUid);
    const questionnaire = await getQuestionnaireAsync(uid);

    // array of values based on how important each quesiton is to roommate compatibility
    const values = [
        -1,
        /* 1 */3,
        /* 2 */3,
        /* 3 */4,
        /* 4 */4,
        /* 5 */2,
        /* 6 */2,
        /* 7 */3,
        /* 8 */1,
        /* 9 */3,
        /* 10 */2,
        /* 11 */2,
        /* 12 */1,
        /* 13 */1,
    ];

    // keep track of difference adjusted for value and the sum of those differences
    let diff = 0;
    let sumOfDiff = 0;

    // sum up the differences
    for (let i = 1; i <= 13; i++) {
        diff = values[i] * (questionnaire[i] - myQuestionnaire[i]);
        if (diff < 0) diff = -diff;
        console.log("Diff " + i + " = " + diff);
        sumOfDiff += diff;
    }

    // turn the sum of differences (1-110) into a scale from 0 to 100
    const compatibilityScore = Math.round(100 - ((sumOfDiff / 108) * 100));
    console.log("Compatibility score between " + myUid + " and " + uid + ": " + compatibilityScore);

    return compatibilityScore;

} //getCompatibilityScoreAsync




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
} // getAgeAsync()

