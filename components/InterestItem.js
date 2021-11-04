import React, { Component, useContext, useEffect } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity
} from 'react-native';
import Colors from '../constants/Colors';
import { InterestsContext } from '../context';

import { auth, rtdb } from '../database/RTDB';
import { getID } from '../database/ID';
import { ref, child, get, set } from 'firebase/database';




export default class InterestItem extends Component {

	state={
		toggle: false, 
	}

	componentDidMount() {
		this.getData()
	}



	/*
	 * Returns true if the value of this component is in the database, and
	 * returns false if it is not in the database.
	 */
	interestSelected() {
		console.log("interest1: " + this.props.interest1);
		console.log("interest2: " + this.props.interest2);
		console.log("interest3: " + this.props.interest3);
		console.log("interest4: " + this.props.interest4);
		console.log("interest5: " + this.props.interest5);
		if (this.props.interest1 == this.props.value ||
				this.props.interest2 == this.props.value ||
				this.props.interest3 == this.props.value ||
				this.props.interest4 == this.props.value ||
				this.props.interest5 == this.props.value ) {
			return true;
		}

		return false;
	} // interestSelected()






	/*
	 * Gets the data from the database and changes the toggle state depending on
	 * whether or not the value of this component is in the database.
	 */
	getData() {
		const dbRef = ref(rtdb);

		// get the data for interest 1
		get(child(dbRef, "users/" + getID(auth.currentUser.email) +
				"/Profile/Interests/interest1")).then((snapshot) => {
			if (snapshot.exists()) {
				const data_val = snapshot.val();

				if (data_val) {
					this.props.setInterest1(data_val);
				}

				// get the data for interest 2
				get(child(dbRef, "users/" + getID(auth.currentUser.email) +
						"/Profile/Interests/interest2")).then((snapshot) => {
					if (snapshot.exists()) {
						const data_val = snapshot.val();

						if (data_val) {
							this.props.setInterest2(data_val);
						}

						// get the data for interest 3
						get(child(dbRef, "users/" + getID(auth.currentUser.email) +
								"/Profile/Interests/interest3")).then((snapshot) => {
							if (snapshot.exists()) {
								const data_val = snapshot.val();

								if (data_val) {
									this.props.setInterest3(data_val);
								}

								// get the data for interest 4
								get(child(dbRef, "users/" + getID(auth.currentUser.email) +
										"/Profile/Interests/interest4")).then((snapshot) => {
									if (snapshot.exists()) {
										const data_val = snapshot.val();

										if (data_val) {
											this.props.setInterest4(data_val);
										}

										// get the data for interest 5
										get(child(dbRef, "users/" + getID(auth.currentUser.email) +
												"/Profile/Interests/interest5")).then((snapshot) => {
											if (snapshot.exists()) {
												const data_val = snapshot.val();

												if (data_val) {
													this.props.setInterest5(data_val);
												}

												console.log("DONE GETTING DATA");
												this.setState({toggle: this.interestSelected()})

											} // if snapshot 5 exists
										}).catch((error) => {
											console.error(error);
										});	


									} // if snapshot 4 exists
								}).catch((error) => {
									console.error(error);
								});	


							} // if snapshot 3 exits
						}).catch((error) => {
						console.error(error);
						});	


					} // if snapshot 2 exists
				}).catch((error) => {
				console.error(error);
				});	


			} // if snapshot 1 exists
		}).catch((error) => {
		console.error(error);
		});	

	} // getData()









	press() {
		const newState = !this.state.toggle;
		this.setState({toggle:newState});

		console.log("loading: " + this.props.loading);
		console.log("interest1: " + this.props.interest1);
		console.log("interest2: " + this.props.interest2);
		console.log("interest3: " + this.props.interest3);
		console.log("interest4: " + this.props.interest4);
		console.log("interest5: " + this.props.interest5);
	} // press()



	render() {
		const {toggle} = this.state;
		const selectedStyle = toggle ? styles.selectedInterestButton : styles.unselectedInterestButton;

		return (
			<View style={styles.container}>
				<TouchableOpacity
					style={selectedStyle}
					onPress={() => this.press()}>

					<Text>{this.props.value}</Text>
				</TouchableOpacity>
			</View>
		);
	}

} // InterestItem





const styles = StyleSheet.create({

	/* Container styles */
	container: {
	},


	/* Buttons */
	unselectedInterestButton: {
		borderWidth: 1,
		borderRadius: 20,
		marginHorizontal: 3,
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
	
});