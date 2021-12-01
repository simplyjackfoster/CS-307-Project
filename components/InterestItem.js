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




	/*
	 * Returns the current number of items that are selected.
	 */
	getNumItems() {
		var count = 0;
		if (this.props.interest1) {
			count++;
		}
		if (this.props.interest2) {
			count++;
		}
		if (this.props.interest3 ) {
			count++;
		}
		if (this.props.interest4) {
			count++;
		}
		if (this.props.interest5) {
			count++;
		}
		return count;
	} // getNumItems



	/*
	 * Removes the interest from the selected interests
	 */
	removeInterest() {
		// get the position of the interest we are removing
		var position;
		if (this.props.interest1 == this.props.value) {
			position = 1;
		}
		else if (this.props.interest2 == this.props.value) {
			position = 2;
		}
		else if (this.props.interest3 == this.props.value) {
			position = 3;
		}
		else if (this.props.interest4 == this.props.value) {
			position = 4;
		}
		else {
			position = 5;
		}

		// shift everything position to the left
		for (var i = position; i <= 5; i++) {
			if (i == 1) {
				this.props.setInterest1(this.props.interest2);
				this.props.setInterest2("");
			}
			else if (i == 2) {
				this.props.setInterest2(this.props.interest3);
				this.props.setInterest3("");
			}
			else if (i == 3) {
				this.props.setInterest3(this.props.interest4);
				this.props.setInterest4("");
			}
			else if (i == 4) {
				this.props.setInterest4(this.props.interest5);
				this.props.setInterest5("");
			}
			else {
				this.props.setInterest5("");
			}
		}


	} // removeInterest()



	/*
	 * Add the interest to the selected interests
	 */
	addInterest() {
		var count = this.getNumItems();	
		if (count == 0) {
			this.props.setInterest1(this.props.value);
		}
		else if (count == 1) {
			this.props.setInterest2(this.props.value);
		}
		else if (count == 2) {
			this.props.setInterest3(this.props.value);
		}
		else if (count == 3) {
			this.props.setInterest4(this.props.value);
		}
		else if (count == 4) {
			this.props.setInterest5(this.props.value);
		}
	} // addInterest()



	press() {
		console.log("numItems: " + this.getNumItems());

		// if the state is selected, then remove the item
		if (this.state.toggle) {
			console.log("removing: " + this.props.value);
			const newState = !this.state.toggle;
			this.setState({toggle:newState});
			this.removeInterest();
		}
		else if (this.getNumItems() < 5) { 
			console.log("atempting to add: " + this.props.value);
			const newState = !this.state.toggle;
			this.setState({toggle:newState});
			this.addInterest();
		}
		else {
			console.log("Can't add more than 5 interests");
		}

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