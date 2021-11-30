import React, {useState} from 'react';
import { rtdb, auth } from './RTDB';
import {ref, set, exists, val, child, get, remove, onValue } from "firebase/database";
import { getID } from './ID';
import { Value } from 'react-native-reanimated';
import { Asset } from 'expo-asset';


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

	// get the data
	get(child(dbRef, path)).then((snapshot) => {
		if (snapshot.exists()) {
			const data_val = snapshot.val();
			setData(data_val);
		}
		else {
			console.log("This data is unavailable: " + path);
			return null;
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
 * getFacebookLink()
 *
 * This function can be used to get the url link to a users facebook.
 * @param email_or_id -> the email or id to the specified user.
 * @return -> the url link to the specified user's facebook.
 */
export const getFacebookLink = (email_or_id) => {
	const id = getID(email_or_id);
	var facebook_username = getDataFromPath("users/" + id + "/Profile/facebook");
	var url = "https://www.facebook.com/" + facebook_username + "/";
	return url;
} // getFacebookLink()


/*
 * getLinkedInLink()
 *
 * This function can be used to get the url link to a users linkedIn.
 * @param email_or_id -> the email or id to the specified user.
 * @return -> the url link to the specified user's linkedIn.
 */
export const getLinkedInLink = (email_or_id) => {
	const id = getID(email_or_id);
	var linkedIn_username = getDataFromPath("users/" + id + "/Profile/linkedIn");
	var url = "https://www.linkedin.com/in/" + linkedIn_username + "/";
	return url;
} // getLinkedInLink()


/*
 * getInterestListProfile()
 *
 * Function that returns the interests in the form that will be displayed
 * on the profile screen.
 * @param email_or_id -> the email or id to the specified user.
 * @return -> the intersts in the form "interest1, interest2, interest3, interest4, interest5".
 */
export const getInterestListProfile = (email_or_id) => {
	const id = getID(email_or_id);
	var int1 = getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/Interests/interest1")
	var int2 = getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/Interests/interest2")
	var int3 = getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/Interests/interest3")
	var int4 = getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/Interests/interest4")
	var int5 = getDataFromPath("users/" + getID(auth.currentUser.email) + "/Profile/Interests/interest5")
	var out = int1

	if(int2 != '') {
		out += ', ' + int2
	}
	if(int3 != '') {
		out += ', ' + int3
	}
	if(int4 != '') {
		out += ', ' + int4
	}
	if(int5 != '') {
		out += ', ' + int5
	}
	return out;
} // getInterestListProfile()




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
 * get the Questionnaire data in an array of response values asynchronously
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


	// start indexing at 1 for simplicity
	const responses = [-1, response1, response2, response3, response4, response5, response6, response7, 
		response8, response9, response10, response11, response12, response13];

	return responses;
} // getQuestionnaireAsync()



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
        //console.log("Diff " + i + " = " + diff);
        sumOfDiff += diff;
    }

    // turn the sum of differences (1-110) into a scale from 0 to 100
    const compatibilityScore = Math.round(100 - ((sumOfDiff / 108) * 100));
    //console.log("Compatibility score between " + myUid + " and " + uid + ": " + compatibilityScore);

    return compatibilityScore;
} // getCompatibilityScoreAsync()




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






/*
 * Gets the user data for the users contained in the "ids" array.
 * The data is assembled into profile objects and returned as an array of
 * these obejects.
 * @param ids -> an array of user ids.
 * @return -> an array containing profile objects that contain the data for
 * 						the users specified in the "ids" array.
 */
export const getUserData = async (ids) => {
	// get the profile ids from the database (USE ALGORITHM)
	//var ids = ["mfinder", "thylan", "francik"]; // using fixed value

	// GET MY QUESTIONNAIRE ANSWERS
	let myAnswers = await getQuestionnaireAsync(getID(auth.currentUser.email));	


	// STEP 1: GET THE PROFILE INFORMATION FOR OTHER SPECIFIED PROFILES

	// get the profile picture paths for each of the users
	var profile_picture_list = [];
	var name_list = [];
	var age_list = [];
	var bio_list = [];
	var interest1_list = [];
	var interest2_list = [];
	var interest3_list = [];
	var interest4_list = [];
	var interest5_list = [];
	var graduation_year_list = [];
	var major_list = [];
	var location_list = [];
	var preferred_num_roommates_list = [];
	var preferred_living_location_list = [];
	var vaccinated_list = [];
	var instagram_list = [];
	var facebook_list = [];
	var linkedIn_list = [];
	var compatibility_score_list = [];
	var questionnaire1_answer_list = [];
	var questionnaire2_answer_list = [];
	var questionnaire3_answer_list = [];
	var questionnaire4_answer_list = [];
	var questionnaire5_answer_list = [];
	var questionnaire6_answer_list = [];
	var questionnaire7_answer_list = [];
	var questionnaire8_answer_list = [];
	var questionnaire9_answer_list = [];
	var questionnaire10_answer_list = [];
	var questionnaire11_answer_list = [];
	var questionnaire12_answer_list = [];
	var questionnaire13_answer_list = [];


	for (const id of ids) {
		// read all the data in parallel
		let
		[
			profile_picture, // 1
			name, // 2
			age, // 3
			bio, // 4
			interest1, // 5
			interest2, // 6
			interest3, // 7
			interest4, // 8
			interest5, // 9
			graduation_year, // 10
			major, // 11
			location, // 12
			preferred_num_roommates, // 13
			preferred_living_location, // 14
			vaccinated, // 15
			instagram, // 16
			facebook, // 17
			linkedIn, // 18
			compatibility_score, // 19
			questionnaire1, // 20
			questionnaire2, // 21
			questionnaire3, // 22
			questionnaire4, // 23
			questionnaire5, // 24
			questionnaire6, // 25
			questionnaire7, // 26
			questionnaire8, // 27
			questionnaire9, // 28
			questionnaire10, // 29
			questionnaire11, // 30
			questionnaire12, // 31
			questionnaire13, // 32
		] = await Promise.all(
		[
			getDataFromPathAsync("users/" + id + "/Profile/Images/profile_picture"), // 1
			getDataFromPathAsync("users/" + id + "/Profile/profile_name"), // 2
			getAgeAsync(id), // 3
			getDataFromPathAsync("users/" + id + "/Profile/bio"), // 4
			getDataFromPathAsync("users/" + id + "/Profile/Interests/interest1"), // 5
			getDataFromPathAsync("users/" + id + "/Profile/Interests/interest2"), // 6
			getDataFromPathAsync("users/" + id + "/Profile/Interests/interest3"), // 7
			getDataFromPathAsync("users/" + id + "/Profile/Interests/interest4"), // 8
			getDataFromPathAsync("users/" + id + "/Profile/Interests/interest5"), // 9
			getDataFromPathAsync("users/" + id + "/Profile/graduation_year"), // 10
			getDataFromPathAsync("users/" + id + "/Profile/major"), // 11
			getDataFromPathAsync("users/" + id + "/Profile/location"), // 12
			getDataFromPathAsync("users/" + id + "/Profile/preferred_number_of_roommates"), // 13
			getDataFromPathAsync("users/" + id + "/Profile/preferred_living_location"), // 15
			getDataFromPathAsync("users/" + id + "/Profile/covid_vaccination_status"), // 15
			getDataFromPathAsync("users/" + id + "/Profile/instagram"), // 16
			getDataFromPathAsync("users/" + id + "/Profile/facebook"), // 17
			getDataFromPathAsync("users/" + id + "/Profile/linkedIn"), // 18
			getCompatibilityScoreAsync(id), // 19
			getDataFromPathAsync("users/" + id + "/Roommate Compatibility/has_people_over"), // 20
			getDataFromPathAsync("users/" + id + "/Roommate Compatibility/is_clean"), // 21
			getDataFromPathAsync("users/" + id + "/Roommate Compatibility/week_bedtime"), // 22
			getDataFromPathAsync("users/" + id + "/Roommate Compatibility/weekend_bedtime"), // 23
			getDataFromPathAsync("users/" + id + "/Roommate Compatibility/drinks_alcohol"), // 24
			getDataFromPathAsync("users/" + id + "/Roommate Compatibility/smokes"), // 25
			getDataFromPathAsync("users/" + id + "/Roommate Compatibility/handle_chores"), // 26
			getDataFromPathAsync("users/" + id + "/Roommate Compatibility/has_car"), // 27
			getDataFromPathAsync("users/" + id + "/Roommate Compatibility/wants_pets"), // 28
			getDataFromPathAsync("users/" + id + "/Roommate Compatibility/introverted_or_extraverted"), // 29
			getDataFromPathAsync("users/" + id + "/Roommate Compatibility/check_before_having_people_over"), // 30
			getDataFromPathAsync("users/" + id + "/Roommate Compatibility/joint_grocery_shopping"), // 31
			getDataFromPathAsync("users/" + id + "/Roommate Compatibility/has_significant_other"), // 32
		]);
	

		// add fields to their list
		profile_picture_list.push(profile_picture);
		name_list.push(name);
		age_list.push(age);
		bio_list.push(bio);
		interest1_list.push(interest1);
		interest2_list.push(interest2);
		interest3_list.push(interest3);
		interest4_list.push(interest4);
		interest5_list.push(interest5);
		graduation_year_list.push(graduation_year);
		major_list.push(major);
		location_list.push(location);
		preferred_num_roommates_list.push(preferred_num_roommates);
		preferred_living_location_list.push(preferred_living_location);
		vaccinated_list.push(vaccinated);
		instagram_list.push(instagram);
		facebook_list.push(facebook);
		linkedIn_list.push(linkedIn);
		compatibility_score_list.push(compatibility_score);
		questionnaire1_answer_list.push(questionnaire1);
		questionnaire2_answer_list.push(questionnaire2);
		questionnaire3_answer_list.push(questionnaire3);
		questionnaire4_answer_list.push(questionnaire4);
		questionnaire5_answer_list.push(questionnaire5);
		questionnaire6_answer_list.push(questionnaire6);
		questionnaire7_answer_list.push(questionnaire7);
		questionnaire8_answer_list.push(questionnaire8);
		questionnaire9_answer_list.push(questionnaire9);
		questionnaire10_answer_list.push(questionnaire10);
		questionnaire11_answer_list.push(questionnaire11);
		questionnaire12_answer_list.push(questionnaire12);
		questionnaire13_answer_list.push(questionnaire13);
		
	} // for-loop


	// CALCULATE MOST SIMILAR/DIFFERENT RESPONSES

	for (let i = 1; i < ids.length; i++) { // for each user in ids
		var mostSimilar = 0;
		var leastSimilar = 0;
		var maxDiff = Math.abs(myAnswers[0] - questionnaire1_answer_list[i][0]);
		var minDiff = Math.abs(myAnswers[0] - questionnaire1_answer_list[i][0]);

		/*for (let j = 1; j < 13; j++) { // go through each question to find mostSimilar/leastSimilar

		}*/
	}


	// STEP 2: ASSEMBLE THE PROFILES
	var profile_list = [];
	for (let i = 0; i < ids.length; i++) {
		var profile = {
			id: ids[i],
			profile_picture: await Asset.loadAsync(profile_picture_list[i]), // load the profile picture asset
			name: name_list[i],
			age: age_list[i],
			bio: bio_list[i],
			interest1: interest1_list[i],
			interest2: interest2_list[i],
			interest3: interest3_list[i],
			interest4: interest4_list[i],
			interest5: interest5_list[i],
			graduation_year: graduation_year_list[i],
			major: major_list[i],
			location: location_list[i],
			preferred_num_roommates: preferred_num_roommates_list[i],
			preferred_living_location: preferred_living_location_list[i],
			vaccinated: vaccinated_list[i],
			instagram: instagram_list[i],
			facebook: facebook_list[i],
			linkedIn: linkedIn_list[i],
			compatibility_score: compatibility_score_list[i],
			questionnaire1: questionnaire1_answer_list[i],
			questionnaire2: questionnaire2_answer_list[i],
			questionnaire3: questionnaire3_answer_list[i],
			questionnaire4: questionnaire4_answer_list[i],
			questionnaire5: questionnaire5_answer_list[i],
			questionnaire6: questionnaire6_answer_list[i],
			questionnaire7: questionnaire7_answer_list[i],
			questionnaire8: questionnaire8_answer_list[i],
			questionnaire9: questionnaire9_answer_list[i],
			questionnaire10: questionnaire10_answer_list[i],
			questionnaire11: questionnaire11_answer_list[i],
			questionnaire12: questionnaire12_answer_list[i],
			questionnaire13: questionnaire13_answer_list[i],
			most_similar_response: "has_people_over",
			least_similar_response: "smokes",
		};

		// add profile to array
		profile_list.push(profile);
	} // for-loop

	return profile_list;
} // getUserData()


