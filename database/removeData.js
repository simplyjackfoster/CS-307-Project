import React from 'react';
import { rtdb } from './RTDB';
import {ref, remove} from "firebase/database";
import { getID } from './ID';
import { getUserData } from'./readData';
import { auth } from './RTDB';

// variables used to add and remove dummy data to the database
let dummyIDS = ["JaclynRowe", "SanviWaller", "JordanMcghee", "JosephineRichter", "LluviaYang",
								"JeremiahSanford", "JanelyMitchell", "BlaizeFrey", "RilynnKruse",
								"BrantleyDonovan", "AveryGallo", "HalleDriver", "SylviaValdez", "IzabellePreston",
								"RayleeHelton", "HernanDriscoll", "MarkelPeoples", "MaiyaPryor", "SallyClifton",
								"BrooklynnKessler", "TaylaDriscoll", "RashawnSchwartz", "DysonVilla", "RhyleeFarr",
								"BowenNegron", "KlaraRamsey", "SkylahBrock", "KeenanSchwartz", "PhoebeCallahan",
								"AndreasConnor", "NathanNava", "DeklanMccabe", "KaelynHolder", "TristonHensley", 
								"TariqIbarra", "KarlyMacias", "HanselShultz", "SienaTodd", "JudithSands", "GavynLockett",
								"HassanHowell", "DeonteNixon", "CaelynMoses", "MilliePryor", "GreysonLujan",
								"LatrellAbel", "JailynAndersen", "AriyannaMeredith", "NilaCassidy", "BrockHarrington"];



/*
 * removeUser()
 *
 * Removes a specified user from the RTDB
 * @param email_or_id -> A string that can either be an email
 * 							or an ID specifying the user to be removed.
 */
export const removeUser = (email_or_id) => {
	const id = getID(email_or_id);	
	remove(ref(rtdb, "users/" + id));
} // removeUser()



/*
 * removeSwipedRight()
 *
 * Removes a users swiped right list from the RTDB
 * @param email_or_id -> A string that can either be an email
 * 							or an ID specifying the user to be removed.
 */
export const removeSwipedRight = (email_or_id) => {
	const id = getID(email_or_id);
	remove(ref(rtdb, "users/" + id + "/Feed/Swipe Right List/"));
}


/*
 * removeSwipedLeft()
 *
 * Removes a users swiped left list from the RTDB
 * @param email_or_id -> A string that can either be an email
 * 							or an ID specifying the user to be removed.
 */
export const removeSwipedLeft = (email_or_id) => {
	const id = getID(email_or_id);
	remove(ref(rtdb, "users/" + id + "/Feed/Swipe Left List/"));
}


/*
 * removeMatches()
 *
 * Removes a users right list from the RTDB
 * @param email_or_id -> A string that can either be an email
 * 							or an ID specifying the user to be removed.
 */
export const removeMatches = (email_or_id) => {
	const id = getID(email_or_id);
	console.log("CLEARING " + id + "'s Match List");
	remove(ref(rtdb, "users/" + id + "/Match List/"));
}


/*
 * removeAllLists()
 *
 * Removes all users in a users swiped right, swiped left, and matches list
 * from the RTDB
 * @param email_or_id -> A string that can either be an email
 * 							or an ID specifying the user to be removed.
 */
export const removeAllLists = (email_or_id) => {
	const id = getID(email_or_id);
	remove(ref(rtdb, "users/" + id + "/Feed/Swipe Right List/"));
	remove(ref(rtdb, "users/" + id + "/Feed/Swipe Left List/"));
	remove(ref(rtdb, "users/" + id + "/Match List/"));
}




/*
 * 
 */
export const deleteMatch = (email_or_id) => {
	// get the id
	const id = getID(email_or_id);	
	const myID = getID(auth.currentUser.email);

	// remove them from our match list/swiped right
	remove(ref(rtdb, "users/" + myID + "/Match List/" + id));
	remove(ref(rtdb, "users/" + myID + "/Feed/Swipe Right List/" + id));


	// remove us from their match list/swiped right
	remove(ref(rtdb, "users/" + id + "/Match List/" + myID));
	remove(ref(rtdb, "users/" + id + "/Feed/Swipe Right List/" + myID));
} // deleteMatch()




/*
 * Removes the 50 dummy users from the database.
 */
export const deleteDummyUsersAsync = async () => {
	console.log("Deleting dummy users...");

	// delete the users
	for (let i = 0; i < dummyIDS.length; i++) {
		remove(ref(rtdb, "users/" + dummyIDS[i]));
	}
} // deleteDummyUsersAsync(