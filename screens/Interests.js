import React, {useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	ScrollView
} from 'react-native';
import Colors from '../constants/Colors';
import InterestItem from '../components/InterestItem';
import InterestList from '../components/InterestList';

import { auth, rtdb } from '../database/RTDB';
import { getID } from '../database/ID';

import { writeInterests } from '../database/writeData';
import { getInterests, getDataFromPath } from '../database/readData';
import { ref, child, get, set } from 'firebase/database';


// used so that the hooks don't get set in interests 
var updatedTheSelected = false;


export default ( {navigation} ) => {

	// store the interests here
	const [interest1, setInterest1] = React.useState("");
	const [interest2, setInterest2] = React.useState("");
	const [interest3, setInterest3] = React.useState("");
	const [interest4, setInterest4] = React.useState("");
	const [interest5, setInterest5] = React.useState("");



	return (
		<View style={styles.container}>
			<ScrollView style={styles.scroll}>
				<Text style={styles.instructionsText}>Select Up to 5 Interests!</Text>

				<View style={styles.interestsConainer}>
					
				{/*	<TouchableOpacity 
						onPress={() => {
							console.log("interest1: " + interest1);
							console.log("interest2: " + interest2);
							console.log("interest3: " + interest3);
							console.log("interest4: " + interest4);
							console.log("interest5: " + interest5);
						}}
					>
						<Text>Yes</Text>
					</TouchableOpacity> */}


					{/* Music */}
					<InterestItem
						value={"Music"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>


					{/* Working Out */}
					<InterestItem
						value={"Working Out"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>


					{/* Yoga */}
					<InterestItem
						value={"Yoga"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>




					{/* Swimming */}
					<InterestItem
						value={"Swimming"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Football */}
					<InterestItem
						value={"Football"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Netflix */}
					<InterestItem
						value={"Netflix"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Theatre */}
					<InterestItem
						value={"Theatre"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Comedy */}
					<InterestItem
						value={"Comedy"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Outdoors */}
					<InterestItem
						value={"Outdoors"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Shopping */}
					<InterestItem
						value={"Shopping"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Politics */}
					<InterestItem
						value={"Politics"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Cycling */}
					<InterestItem
						value={"Cycling"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Art */}
					<InterestItem
						value={"Art"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Dancing */}
					<InterestItem
						value={"Dancing"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Soccer */}
					<InterestItem
						value={"Soccer"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Cooking */}
					<InterestItem
						value={"Cooking"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Spirituality */}
					<InterestItem
						value={"Spirituality"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Astrology */}
					<InterestItem
						value={"Astrology"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Bars */}
					<InterestItem
						value={"Bars"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Coffee */}
					<InterestItem
						value={"Coffee"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Watching Sports */}
					<InterestItem
						value={"Watching Sports"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Reading */}
					<InterestItem
						value={"Reading"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Surfing */}
					<InterestItem
						value={"Surfing"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Gaming */}
					<InterestItem
						value={"Gaming"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Photography */}
					<InterestItem
						value={"Photography"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Skateboarding */}
					<InterestItem
						value={"Skateboarding"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Tennis */}
					<InterestItem
						value={"Tennis"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Gambling */}
					<InterestItem
						value={"Gambling"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Chess */}
					<InterestItem
						value={"Chess"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Movies */}
					<InterestItem
						value={"Movies"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Golf */}
					<InterestItem
						value={"Golf"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Writing */}
					<InterestItem
						value={"Writing"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Climbing */}
					<InterestItem
						value={"Climbing"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Skiing */}
					<InterestItem
						value={"Skiing"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Snowboarding */}
					<InterestItem
						value={"Snowboarding"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Social Media */}
					<InterestItem
						value={"Social Media"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Running */}
					<InterestItem
						value={"Running"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Rowing */}
					<InterestItem
						value={"Rowing"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Walking */}
					<InterestItem
						value={"Walking"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Concerts */}
					<InterestItem
						value={"Concerts"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Basketball */}
					<InterestItem
						value={"Basketball"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Fishing */}
					<InterestItem
						value={"Fishing"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Water Sports */}
					<InterestItem
						value={"Water Sports"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Racing */}
					<InterestItem
						value={"Racing"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Programming */}
					<InterestItem
						value={"Programming"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Baseball */}
					<InterestItem
						value={"Baseball"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Hockey */}
					<InterestItem
						value={"Hockey"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Frisbee */}
					<InterestItem
						value={"Frisbee"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Investing */}
					<InterestItem
						value={"Investing"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>

					{/* Greek Life */}
					<InterestItem
						value={"Greek Life"}
						interest1={interest1}
						interest2={interest2}
						interest3={interest3}
						interest4={interest4}
						interest5={interest5}
						setInterest1={setInterest1}
						setInterest2={setInterest2}
						setInterest3={setInterest3}
						setInterest4={setInterest4}
						setInterest5={setInterest5}
					></InterestItem>


				</View>
			</ScrollView>

			<View style={styles.footer}>
				<TouchableOpacity style={styles.saveButton}
					onPress={() => {
						writeInterests(auth.currentUser.email, interest1, interest2,
							interest3, interest4, interest5)
					
						navigation.pop()
					}}
				>
					<Text style={styles.saveText}>Save Changes</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
} // export default () 





const styles = StyleSheet.create({

	/* Container styles */
	container: {
		flex: 1,	
	},

	interestsConainer: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},

	scroll: {
		flex: 1,
		paddingHorizontal: 30,
	},

	footer: {
		flex: 0.15,
    alignSelf: 'center',
    paddingTop: 5,
    paddingHorizontal: 300,
    paddingBottom: 25,
    backgroundColor: Colors.lightGray,
	},


	/* Instructions Text */
	instructionsText: {
		alignSelf: 'center',
		fontSize: 20,
		marginVertical: 35,
	},


	/* Interest Buttons */
	interestText: {
		fontSize: 15,
		textAlign: 'center',
	},

	unselectedInterestButton: {
		borderWidth: 1,
		borderRadius: 20,
		marginHorizontal: 2,
		marginBottom: 10,
		padding: 7,
		backgroundColor: Colors.offWhite,
	},

	selectedInterestButton: {
		borderWidth: 1,
		borderRadius: 20,
		marginHorizontal: 3,
		marginBottom: 10,
		padding: 7,
		backgroundColor: Colors.green,
	},

	/* Save Changes Button */
	saveText: {
		fontSize: 16,
		alignSelf: 'center',
	},

	saveButton: {
		backgroundColor: Colors.offWhite,
		borderWidth: 1,
		borderRadius: 25,
		margin: 10,
		padding: 10,
		top: 15,
		width: 175,
		alignSelf: 'center',
		textAlign: 'center',
	},

});

