import React from 'react';
import { rtdb, auth } from './RTDB';
import { ref, set, update, exists, val, child, get, remove, push } from "firebase/database"
import { getID } from './ID';
import { getDataFromPath } from './readData';


/* 
 * writeNewUser()
 *
 * Writes a new user to the database based on the information
 * collected from Signup.js
 * @param email -> the email the user entered in signup.
 * @param name -> the name the user entered in signup.
 * @param phone -> the phone number the user entered in signup.
 * @param birthday -> the birthday the user entered in signup.
 * @param securityQuestion -> the security question the user chose in signup.
 * @param securityAnswer -> the answer the user entered in signup.
 */
export const writeNewUser = (email, name, phone,
														 birthday, gender, vaccinated, securityQuestion, securityAnswer, selectedOne, selectedTwo,
														 selectedThree, selectedFour, selectedFive, selectedSix, selectedSeven,
														 selectedEight, selectedNine, selectedTen, selectedEleven, selectedTwelve,
														 selectedThirteen) => {
	const id = getID(email);

	const default_profile_picture = "https://firebasestorage.googleapis.com/v0/b/uniroom-fdcd7.appspot.com/o/default-profile-picture.jpeg?alt=media&token=5c5c586a-e822-4096-b6cd-52c34f41dc9b"



	// write the "Critical Information" data
	set(ref(rtdb, "users/" + id + "/Critical Information"), {
		email: email,
		name: name,
		phone: phone,
		birthday: birthday,
		securityQuestion: securityQuestion,
		securityAnswer: securityAnswer,
		ghost_mode: false
	});

	// write the "Profile" data
	set(ref(rtdb, "users/" + id + "/Profile"), {
		profile_name: name,
		bio: "",
		graduation_year: "", 
		major: "", 
		location: "", 
		preferred_number_of_roommates: "",
		preferred_living_location: "",
		instagram: "",
		facebook: "",
		linkedIn: "",
		age_min: "18",
		age_max: "100",
	});
	writeGender(auth.currentUser.email, gender);
	writeVaccinated(auth.currentUser.email, vaccinated);
	set(ref(rtdb, "users/" + id + "/Profile/Images"), {
		profile_picture: default_profile_picture, 
	});
	set(ref(rtdb, "users/" + id + "/Profile/Interests"), {
		interest1: "",
		interest2: "",
		interest3: "",
		interest4: "",
		interest5: "",
	});

	// write the "Roomate Compatibility" data
	set(ref(rtdb, "users/" + id + "/Roommate Compatibility"), {
		has_people_over: selectedOne,
		is_clean: selectedTwo,
		week_bedtime: selectedThree,
		weekend_bedtime: selectedFour,
		drinks_alcohol: selectedFive,
		smokes: selectedSix,
		handle_chores: selectedSeven,
		has_car: selectedEight,
		wants_pets: selectedNine,
		introverted_or_extraverted: selectedTen,
		check_before_having_people_over: selectedEleven,
		joint_grocery_shopping: selectedTwelve,
		has_significant_other: selectedThirteen 
	});

	// write the "Match List" 
	set(ref(rtdb, "users/" + id + "/Match List"), {
		user_count: 0
	});

	// write the "Feed", "Swipe Left List", and "Swipe Right List"
	set(ref(rtdb, "users/" + id + "/Feed/Swipe Left List"), {
		user_count: 0
	});

	set(ref(rtdb, "users/" + id + "/Feed/Swipe Right List"), {
		user_count: 0
	});

} // writeNewUser()






/*
 * writeProfilePicture()
 *
 * This function updates the uri for the profile picture in the RTDB.
 * @param email_or_id -> the email or id of the user who we are updating.
 * @param uri -> the uri of the image that we are going to update
 * 							 the profile picture to.
 */
export const writeProfilePicture = (email_or_id, uri) => {
	// get the id
	const id = getID(email_or_id);

	// write the url to the database
	update(ref(rtdb, "users/" + id + "/Profile/Images"), {
		profile_picture: uri
	});
} // writeProfilePicture()




/*
 * writeName()
 *
 * Writes a profile_name to the specified user in the RTDB
 * @param email_or_id -> the email or id specifying the user.
 * @param name -> the name that we will write to the database.
 */
export const writeProfileName = (email_or_id, name) => {
	const id = getID(email_or_id);

	update(ref(rtdb, "users/" + id + "/Profile"), {
		profile_name: name
	});
} // writeName()


/*
 * writeAgeMin()
 *
 * Writes an age min to the specified user in the RTDB
 * @param email_or_id -> the email or id specifying the user.
 * @param ageMin -> the ageMin that we will write to the database.
 */
export const writeAgeMin = (email_or_id, ageMin) => {
	const id = getID(email_or_id);
	const ageMinStr = ageMin.toString();


	update(ref(rtdb, "users/" + id + "/Profile"), {
		age_min: ageMinStr
	});
} // writeAgeMin()


/*
 * writeAgeMax()
 *
 * Writes an age max to the specified user in the RTDB
 * @param email_or_id -> the email or id specifying the user.
 * @param ageMax -> the ageMax that we will write to the database.
 */
export const writeAgeMax = (email_or_id, ageMax) => {
	const id = getID(email_or_id);
	const ageMaxStr = ageMax.toString();

	update(ref(rtdb, "users/" + id + "/Profile"), {
		age_max: ageMaxStr
	});
} // writeAgeMax()




/*
 * writeBio()
 *
 * Writes a bio to the specified user in the RTDB.
 * @param email_or_id -> the email or id specifying the user.
 * @param name -> the bio that we will write to the database.
 */
export const writeBio = (email_or_id, bio) => {
	const id = getID(email_or_id);

	update(ref(rtdb, "users/" + id + "/Profile"), {
		bio: bio
	});
} // writeBio()




/*
 * writeGraduationYear()
 *
 * Writes the graduation year to the specified user in the RTDB.
 * @param email_or_id -> the email or id specifying the user.
 * @param year -> the graduation year that we will write to the database.
 */
export const writeGraduationYear = (email_or_id, year) => {
	const id = getID(email_or_id);

	update(ref(rtdb, "users/" + id + "/Profile"), {
		graduation_year: year
	});
} // writeGraduationYear()



/*
 * writeMajor()
 *
 * Writes the major to the specified user in the RTDB.
 * @param email_or_id -> the email or id specifying the user.
 * @param major -> the major that we will write to the database.
 */
export const writeMajor = (email_or_id, major) => {
	const id = getID(email_or_id);

	update(ref(rtdb, "users/" + id + "/Profile"), {
		major: major
	});
} // writeMajor




/*
 * writeLocation()
 *
 * Writes the location to the specified user in the RTDB.
 * @param email_or_id -> the email or id specifying the user.
 * @param location -> the location of the user that we are writing to the database.
 */
export const writeLocation = (email_or_id, location) => {
	const id = getID(email_or_id);

	update(ref(rtdb, "users/" + id + "/Profile"), {
		location: location
	});
} // writeLocation()





/*
 * writePreferredNumRoommates()
 *
 * Writes the preferred number of roommates to the specified user in the RTDB.
 * @param email_or_id -> the email or id specifying the user.
 * @param numRoommates -> the preferred number of roommates of the user
 * 												that we are writing to the database.
 */
export const writePreferredNumRoommates = (email_or_id, numRoommates) => {
	const id = getID(email_or_id);

	update(ref(rtdb, "users/" + id + "/Profile"), {
		preferred_number_of_roommates: numRoommates
	});
} // writePreferredNumRoommates()



/*
 * writePreferredLivingLocation()
 *
 * Writes the preferred living location to the specified user in the RTDB.
 * @param email_or_id -> the email or id specifying the user.
 * @param livingLocation -> the preferred living location of the user
 * 												that we are writing to the database.
 */
export const writePreferredLivingLocation = (email_or_id, livingLocation) => {
	const id = getID(email_or_id);

	// convert the value of the selection to a string
	var livingLocationStr = "";

	if (livingLocation == 0) livingLocationStr = "";
	else if (livingLocation == 1) livingLocationStr = "Earhart";
	else if (livingLocation == 2) livingLocationStr = "Freida Parker Hall";
	else if (livingLocation == 3) livingLocationStr = "Winifred Parker Hall";
	else if (livingLocation == 4) livingLocationStr = "Harrison Hall";
	else if (livingLocation == 5) livingLocationStr = "Hawkins Hall";
	else if (livingLocation == 6) livingLocationStr = "Hillenbrand Hall";
	else if (livingLocation == 7) livingLocationStr = "Honors College and Residences";
	else if (livingLocation == 8) livingLocationStr = "Owen Hall";
	else if (livingLocation == 9) livingLocationStr = "Shreve Hall";
	else if (livingLocation == 10) livingLocationStr = "Meredith (female only)";
	else if (livingLocation == 11) livingLocationStr = "Meredith South (female only)";
	else if (livingLocation == 12) livingLocationStr = "Windsor (female only)";
	else if (livingLocation == 13) livingLocationStr = "Cary Quad (male only)";
	else if (livingLocation == 14) livingLocationStr = "McCutcheon (male only)";
	else if (livingLocation == 15) livingLocationStr = "Tarkington (male only)";
	else if (livingLocation == 16) livingLocationStr = "Wiley (male only)";

	update(ref(rtdb, "users/" + id + "/Profile"), {
		preferred_living_location: livingLocationStr
	});
} // writePreferredLivingLocation()



/*
 * writeInstagram()
 *
 * Writes the instagram of the specified user in the RTDB.
 * @param email_or_id -> the email or id of the user.
 * @param instagram -> the instagram username of the user.
 */
export const writeInstagram = (email_or_id, instagram) => {
	const id = getID(email_or_id);

	update(ref(rtdb, "users/" + id + "/Profile"), {
		instagram: instagram
	});
} // writeInstagram()


/*
 * writeFacebook()
 *
 * Writes the facebook of the specified user in the RTDB.
 * @param email_or_id -> the email or id of the user.
 * @param facebook -> the facebook username of the user.
 */
export const writeFacebook = (email_or_id, facebook) => {
	const id = getID(email_or_id);

	update(ref(rtdb, "users/" + id + "/Profile"), {
		facebook: facebook
	});
} // writeFacebook()

/*
 * writeLinkedIn()
 *
 * Writes the linkedIn of the specified user in the RTDB.
 * @param email_or_id -> the email or id of the user.
 * @param linkedIn -> the linkedIn username of the user.
 */
export const writeLinkedIn = (email_or_id, linkedIn) => {
	const id = getID(email_or_id);

	update(ref(rtdb, "users/" + id + "/Profile"), {
		linkedIn: linkedIn
	});
} // writeLinkedIn()


/*
 * Writes the interests to the database
 * @param email_or_id -> the email or id of the user we are writing to. 
 * @param interest<i> -> the ith interest
 */
export const writeInterests = (email_or_id, interest1, interest2, interest3, interest4, interest5) => {
	const id = getID(email_or_id);

	update(ref(rtdb, "users/" + id + "/Profile/Interests"), {
		interest1: interest1,
		interest2: interest2,
		interest3: interest3,
		interest4: interest4,
		interest5: interest5,
	});
} // writeInterest()







/*
 * writeGender()
 *
 * Writes the gender to the specified user in the RTDB.
 * @param email_or_id -> the email or id specifying the user.
 * @param gender -> the selected number from the gender selection menu
 * 									1: Male
 * 									2: Female
 * 								  3: Other
 * 									4: Prefere not to say
 */
export const writeGender = (email_or_id, gender) => {
	const id = getID(email_or_id);

	// get the gender as a string
	var genderStr;
	if (gender == 1) {
		genderStr = "Male";
	}
	else if (gender == 2) {
		genderStr = "Female";
	}
	else if (gender == 3) {
		genderStr = "Other";
	}
	else {
		genderStr = "Prefer not to say";
	}

	update(ref(rtdb, "users/" + id + "/Profile"), {
		gender: genderStr
	});
} // writeGender()




/*
 * writeVaccinated()
 *
 * Writes the vaccination status to the specified user in the RTDB.
 * @param email_or_id -> the email or id specifying the user.
 * @param vaccinated -> the selected number from the vaccination status selection menu
 * 									1: No, I'm not vaccinated
 * 									2: Yes, I'm vaccinated 
 */
export const writeVaccinated = (email_or_id, vaccinated) => {
	const id = getID(email_or_id);

	// get the vaccination status as a string
	var vaccinatedStr;
	if (vaccinated == 1) {
		vaccinatedStr = "Not Vaccinated";
	}
	else {
		vaccinatedStr = "Vaccinated";
	}

	update(ref(rtdb, "users/" + id + "/Profile"), {
		covid_vaccination_status: vaccinatedStr
	});
} // writeGender()



/*
 * This function updates the questionnaire data in the RTDB.
 * @param email_or_id -> the email or id of the user
 * @param a<i> -> the answer for the i-th question.
 */
export const writeQuestionnaire = (email_or_id, a1, a2, a3, a4, a5, a6, a7, a8,
																   a9, a10, a11, a12, a13) => {
	// get the id
	const id = getID(email_or_id);

	// write each answer to the database
	update(ref(rtdb, "users/" + id + "/Roommate Compatibility/"), {
		has_people_over: a1,
		is_clean: a2,
		week_bedtime: a3,
		weekend_bedtime: a4,
		drinks_alcohol: a5,
		smokes: a6,
		handle_chores: a7,
		has_car: a8,
		wants_pets: a9,
		introverted_or_extraverted: a10,
		check_before_having_people_over: a11,
		joint_grocery_shopping: a12,
		has_significant_other: a13
	});
} // writeQuestionnaire


/*
 * reportUser()
 *
 * called when a user would like to report a user on their feed
 * writes the reported userid to the /reported branch of database
 * starts/increments counter of numReports in the same branch
 * 
 * @param email_or_id -> the email or id of the user
 * @param numReports -> previous number of reports that the user has received
 */
export const reportUser = (email_or_id, currentReports) => {
	const id = getID(email_or_id);
	console.log("ID = " + id);

	console.log("Current reports: " + currentReports);
	currentReports = currentReports + 1;
	console.log("Updated reports: " + currentReports);
	update(ref(rtdb, "reported/" + id), {
		num_reports: currentReports
	});
}

