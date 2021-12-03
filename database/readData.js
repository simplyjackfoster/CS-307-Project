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
 * getDataFromPathAsync()
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
			//console.log("This data is unavailable: " + path);
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

    // keep track of difference adjusted for value and the sum of those differences
    let diff = 0;
    let sumOfDiff = 0;

    // sum up the differences
    for (let i = 1; i <= 13; i++) {
        diff = Math.abs(values[i] * (questionnaire[i] - myQuestionnaire[i]));
        sumOfDiff += diff;
    }

    // turn the sum of differences (1-110) into a scale from 0 to 100
    const compatibilityScore = Math.round(100 - ((sumOfDiff / 108) * 100));

    return compatibilityScore;
} // getCompatibilityScoreAsync()


// values for each question in the questionnaire
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

/*
 * Function that takes in the id of a user as well as an array of the current user's questionnaire responses
 * and returns the question number that have the most similar responses
 */
export const getMostSimilarResponseAsync = async (id, myQuestionnaire) => {
	const questionnaire = await getQuestionnaireAsync(id);

	// loop through responses and minimize the difference in response, if there are multiple 0 differences, prioritize higher values
	var diff;
	var minDiff = 100; // arbitrary number larger than the largest difference for one question
	var minQuestion = -1;

	for (let i = 1; i <= 13; i++) {
		if (i == 8 || i == 13) continue;	// not relevant to point out

		diff = Math.abs(myQuestionnaire[i] - questionnaire[i]);

		if (diff < minDiff || (diff == minDiff && values[i] > values[minQuestion])) {
			minDiff = diff;
			minQuestion = i;
		}
	}

	return minQuestion;

} // getMostSimilarResponseAsync()



/*
 * Function that takes in the id of a user as well as an array of the current user's questionnaire responses
 * and returns the question number that have the most different responses
 */
export const getMostDifferentResponseAsync = async (id, myQuestionnaire) => {
	const questionnaire = await getQuestionnaireAsync(id);

	// loop through responses and maximize the difference in response, if there are any ties prioritize higher values
	var diff;
	var maxDiff = -1; // arbitrary number smaller than the smallest difference for one question
	var maxQuestion = -1;

	for (let i = 1; i <= 13; i++) {
		if (i == 8 || i == 13) continue;	// not relevant to point out

		diff = Math.abs(myQuestionnaire[i] - questionnaire[i]);

		if (diff > maxDiff || (diff == maxDiff && values[i] > values[maxQuestion])) {
			maxDiff = diff;
			maxQuestion = i;
		}
	}

	return maxQuestion;

} // getMostDifferentResponseAsync()




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
 *
 */
export const getMatchesAsync = async (email_or_id) => {
	const id = getID(email_or_id);

	// get user ids from swiped right list and store them in array "users"
	const dbRef = ref(rtdb);
	const users = await get(child(dbRef, "users/" + id + "/Match List")).then((snapshot) => {
		var ids = [];
		snapshot.forEach(function(data) {
			let id = data.key;
			ids.push(id);
		})
		return ids;
	}).catch((error) => {
		console.error(error);
	});

	return users;
} // getMatchesAsync()





/*
 *
 */
export const getNextUsersAsync = async (queue) => {

	// STEP 1: GET THE USER IDS FROM THE DATABASE (in no particular order)
	const dbRef = ref(rtdb);
	const users = await get(child(dbRef, "users/")).then((snapshot) => {
		var ids = [];
		snapshot.forEach(function(data) {
			let id = data.key;
			ids.push(id);
		})
		return ids;
	}).catch((error) => {
		console.error(error);
	});


	// STEP 2: For each user id, calculate compatibility score
	const scores = await Promise.all(users.map(id => getCompatibilityScoreAsync(id)));
	const ages = await Promise.all(users.map(id => getAgeAsync(id)));
	const living_locations = await Promise.all(users.map(id => getDataFromPathAsync("users/"
																						 + id + "/Profile/preferred_living_location")));
	const genders = await Promise.all(users.map(id => getDataFromPathAsync("users/" +
																		id + "/Profile/gender")));

	const ghost_modes = await Promise.all(users.map(id => getDataFromPathAsync("users/" +
																				id + "/Critical Information/ghost_mode")));

	// assemble object of user data
	var map = [];
	for (let i = 0; i < users.length; i++) {
		let pair = {
			user: users[i],
			score: scores[i],
			age: ages[i],
			gender: genders[i],
			living_location: living_locations[i],
			ghost_mode: ghost_modes[i],
		}
		map.push(pair);
	}


	// STEP 3: Sort the users based on compatibility
	const sorted = map.sort(function(a, b) {
		const scoreA = a.score;
		const scoreB = b.score;
		return scoreB - scoreA;
	});



	// STEP 4: Get the data for filtering
	// sorted ids, ages, and living locations
	var sorted_ids = [];
	var sorted_ages = [];
	var sorted_genders = [];
	var sorted_living_locations = [];
	var sorted_ghost_modes = [];
	for (let i = 0; i < map.length; i++) {
		sorted_ids.push(map[i].user);
		sorted_ages.push(map[i].age);
		sorted_genders.push(map[i].gender);
		sorted_living_locations.push(map[i].living_location);
		sorted_ghost_modes.push(map[i].ghost_mode);
	}

	// queue ids
	var queue_ids = [];
	for (let i = 0; i < queue.length; i++) {
		queue_ids.push(queue[i].id);
	}

	// get MY swiped-left/right lists, age-min/age-max, gender, and preferred living location.
	const id = getID(auth.currentUser.email);
	let [
		swiped_left, // 1
		swiped_right, // 2
		age_min, // 3
		age_max, // 4
		my_gender, // 5
		my_preferred_living_location, // 6
	] = await Promise.all(
	[
		getSwipeLeftListAsync(id), // 1
		getSwipeRightListAsync(id), // 2
		getDataFromPathAsync("users/" + id + "/Profile/age_min"), // 3
		getDataFromPathAsync("users/" + id + "/Profile/age_max"), // 4
		getDataFromPathAsync("users/" + id + "/Profile/gender"), // 5
		getDataFromPathAsync("users/" + id + "/Profile/preferred_living_location"), // 6
	]);



	// STEP 5: Search for next 5 users starting at beginning of sorted list
	// (don't add if filters don't align with profile)
	// (don't add if they are in your swiped right/left list, or in the queue currently)
	var ids_to_add = [];
	var count = 0;

	for (let i = 0; i < sorted_ids.length; i++) {
		if (await passesFilterAsync(sorted_ids[i], sorted_ages[i], sorted_genders[i], my_gender,
																queue_ids, swiped_left, swiped_right, age_min,
																age_max, sorted_living_locations[i],
																my_preferred_living_location, sorted_ghost_modes[i])) {
			ids_to_add.push(sorted_ids[i]);
			count++;
			if (count + queue.length == 10) {
				break;
			}
		}
	}


	// STEP 6: return the list of user ids to add to queue
	return ids_to_add;	
} // getNextUsersAsync()







/*
 *
 */
export const passesFilterAsync = async (user, age, user_gender, my_gender, queue, swiped_left, swiped_right,
																	 age_min, age_max, user_living_location,
																	 my_living_location, user_ghost_mode) => {

		// check if user is self
		if (user == getID(auth.currentUser.email)) {
			console.log("FILTERED (" + user + ") - is self");
			return false;
		}

		// check if user is in ghost mode
		if (user_ghost_mode) {
			console.log("FILTERED (" + user + ") - user is in ghost mode");
			return false;
		}

		// check if user is compatible gender
		if (user_gender == "Male" && my_gender == "Female") {
			console.log("FILTERED (" + user + ") - gender is Male");
			return false;
		}
		else if (user_gender == "Female" && my_gender == "Male") {
			console.log("FILTERED (" + user + ") - gender is Female");
			return false;
		}


	  // check if the user is in the queue already
		if (queue.includes(user)) {
			console.log("FILTERED (" + user + ") - is already in queue");
			return false;
		}

		// check if user has been swiped on
		if (swiped_left.includes(user) || swiped_right.includes(user)) {
			console.log("FILTERED (" + user + ") - already swiped on");
			return false;
		}

		// check if the user is in the age range
		if (age_min && age_max && (age < age_min || age > age_max)) {
			console.log("FILTERED (" + user + ") - not in age range");
			return false;
		}
		else if (age_min && age < age_min) {
			console.log("FILTERED (" + user + ") - not in age range");
			return false;
		}
		else if (age_max && age > age_max) {
			console.log("FILTERED (" + user + ") - not in age range");
			return false;
		}

		// check if living location is compatible
		/*if (my_living_location && my_living_location != user_living_location) {
			console.log("FILTERED (" + user + ") - living location not compatible");
			return false;
		}*/
		

		return true;
} // passesFilter()





/*
 * Gets the swipe right list and returns it as an array of ids.
 */
export const getSwipeRightListAsync = async (email_or_id) => {
	const id = getID(email_or_id);


	// get user ids from swiped right list and store them in array "users"
	const dbRef = ref(rtdb);
	const users = await get(child(dbRef, "users/" + id + "/Feed/Swipe Right List")).then((snapshot) => {
		var ids = [];
		snapshot.forEach(function(data) {
			let id = data.key;
			ids.push(id);
		})
		return ids;
	}).catch((error) => {
		console.error(error);
	});

	return users;
} // getSwipeRightListAsync()



/*
 * Gets the swipe left list and returns it as an array of ids.
 */
export const getSwipeLeftListAsync = async (email_or_id) => {
	const id = getID(email_or_id);

	// get user ids from swiped left list and store them in array "users"
	const dbRef = ref(rtdb);
	const users = await get(child(dbRef, "users/" + id + "/Feed/Swipe Left List")).then((snapshot) => {
		var ids = [];
		snapshot.forEach(function(data) {
			let id = data.key;
			ids.push(id);
		})
		return ids;
	}).catch((error) => {
		console.error(error);
	});

	return users;
} // getSwipeLeftListAsync()






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
	const myQuestionnaire = await getQuestionnaireAsync(getID(auth.currentUser.email));
	
	//const myMatchCount = await getMatchesCount(getID(auth.currentUser.email));


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
	var gender_list = [];
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
	var most_similar_response_list = [];
	var most_different_response_list = [];
	var numMatches_list = [];
	var num_reports_list = [];


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
			gender, // 19
			compatibility_score, // 20 
			questionnaire1, // 21
			questionnaire2, // 22
			questionnaire3, // 23
			questionnaire4, // 24
			questionnaire5, // 25
			questionnaire6, // 26
			questionnaire7, // 27
			questionnaire8, // 28
			questionnaire9, // 29
			questionnaire10, // 30
			questionnaire11, // 31
			questionnaire12, // 32
			questionnaire13, // 33
			most_similar_response, // 34
			most_different_response, // 35
			numMatches, // 36
			num_reports, // 37
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
			getDataFromPathAsync("users/" + id + "/Profile/gender"), // 19
			getCompatibilityScoreAsync(id), // 20
			getDataFromPathAsync("users/" + id + "/Roommate Compatibility/has_people_over"), // 21
			getDataFromPathAsync("users/" + id + "/Roommate Compatibility/is_clean"), // 22
			getDataFromPathAsync("users/" + id + "/Roommate Compatibility/week_bedtime"), // 23
			getDataFromPathAsync("users/" + id + "/Roommate Compatibility/weekend_bedtime"), // 24
			getDataFromPathAsync("users/" + id + "/Roommate Compatibility/drinks_alcohol"), // 25
			getDataFromPathAsync("users/" + id + "/Roommate Compatibility/smokes"), // 26
			getDataFromPathAsync("users/" + id + "/Roommate Compatibility/handle_chores"), // 27
			getDataFromPathAsync("users/" + id + "/Roommate Compatibility/has_car"), // 28
			getDataFromPathAsync("users/" + id + "/Roommate Compatibility/wants_pets"), // 29
			getDataFromPathAsync("users/" + id + "/Roommate Compatibility/introverted_or_extraverted"), // 30
			getDataFromPathAsync("users/" + id + "/Roommate Compatibility/check_before_having_people_over"), // 31
			getDataFromPathAsync("users/" + id + "/Roommate Compatibility/joint_grocery_shopping"), // 32
			getDataFromPathAsync("users/" + id + "/Roommate Compatibility/has_significant_other"), // 33
			getMostSimilarResponseAsync(id, myQuestionnaire), // 34
			getMostDifferentResponseAsync(id, myQuestionnaire), // 35
			getDataFromPathAsync("users/" + id + "/Match List/user_count"), //36
			getDataFromPathAsync("reported/" + id + "/num_reports"), // 37
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
		gender_list.push(gender);
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
		most_similar_response_list.push(most_similar_response);
		most_different_response_list.push(most_different_response);
		numMatches_list.push(numMatches);

		if (num_reports) {
			num_reports_list.push(num_reports);
		}
		else {
			num_reports_list.push(0);
		}
	} // for-loop



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
			gender: gender_list[i],
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
			most_similar_response: most_similar_response_list[i],
			most_different_response: most_different_response_list[i],
			numMatches: numMatches_list[i],
			num_reports: num_reports_list[i],
		};

		// add profile to array
		profile_list.push(profile);
	} // for-loop

	return profile_list;
} // getUserData()


