import React from 'react';
import { app, rtdb, auth } from './RTDB';
import {ref, set, onValue, exists, val, child, get, remove} from "firebase/database"
import { getID } from './ID';


/* 
 * Writes a new user to the database based on the information
 * collected from Signup.js
 */
export const writeNewUser = (email, name, phone,
														 birthday, securityQuestion, securityAnswer) => {
	const id = getID(email);

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
		profile_picture: "../images/default-profile-picture.jpeg",
		year_in_school: "year", // change
		gender: "gender", // change
		bio: "bio", // change
		hometown: "hometown", // change
		major: "major", // change
		covid_vaccination_status: "vaccine" // change
	});
	set(ref(rtdb, "users/" + id + "/Profile/Social Media"), {
		instagram: "insta", // change
		facebook: "fb" // change
	});
	set(ref(rtdb, "users/" + id + "/Profile/Activities"), {
		activity_count: 0
	});

	// write the "Roomate Compatibility" data
	set(ref(rtdb, "users/" + id + "/Roomate Compatibility"), {
		has_people_over: "value",
		is_clean: "value",
		week_bedtime: "value",
		weekend_bedtime: "value",
		drinks_alcohol: "value",
		smokes: "value",
		handle_chores: "value",
		has_car: "value",
		wants_pets: "value",
		introverted_or_extroverted: "value",
		check_before_having_people_over: "value",
		joint_grocery_shop: "value",
		has_significant_other: "value"
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


