import React from 'react';
import { StyleSheet,
	Text, 
	View, 
	Button,
	TouchableOpacity,
	ScrollView, 
	Alert,
	SliderComponent
} from 'react-native';

import { AuthContext } from "../context";
import Colors from "../constants/Colors";
import { auth, rtdb } from '../database/RTDB';
import { deleteUser } from 'firebase/auth';
import { remove } from 'firebase/database';

// database read/write/remove imports
import { removeUser } from '../database/removeData';
import { deleteUserImages } from '../database/deleteStorage';


/*
 * This is the screen where the user view their account information.
 */
export default ( {navigation} ) => {

	const { userToken, setUserToken } = React.useContext(AuthContext);

	// attempts to delete a user from the database and take them to the login screen
	const attemptDelete = () => {
		var user = auth.currentUser;
		var user_email = auth.currentUser.email;
		deleteUser(user).then(() => {
			console.log("Successful Delete!");

			// delete from RTDB
			removeUser(user_email);

			// delete images from storage if there is one
			deleteUserImages(user_email);

			// navigate to log in screen
			setUserToken(null);

		}).catch((error) => {
			console.log(error.message);
			Alert.alert("Error", "There was an error deleting your account");
		})
	}


	return (
		// If user clicks "Sign Out", set userToken to null.
		<View style={styles.container}>

			{/* Reset Password (button) */}
			<TouchableOpacity
				style={styles.resetPassButton}
				onPress={() => navigation.push("ResetPassword")} 
			>
				<Text style={styles.resetPassText}>Reset Password</Text>
			</TouchableOpacity>


			{/* Sign out (button) */}
			<TouchableOpacity
				style={styles.signOutButton}
				onPress={() => 
					Alert.alert("Confirm", 
					"Are you sure you want to sign out?",
					[{ 
						text: "No"
					},
					{
						text: "Yes",
						onPress: () => {
							setUserToken(null)
							auth.signOut()
						}
					}]
				)}
			>
				<Text style={styles.signOutText}>Sign Out</Text>
			</TouchableOpacity>


			{/* Delete Account (button) */}
			<TouchableOpacity
				style={styles.deleteButton}
				onPress={() =>
					Alert.alert("Warning!", 
						"Clicking yes will delete all information associated with your account. Do you wish to proceed?",
						[{ // TODO: Delete associate user account from database.
							text: "No"
						},
						{
							text: "Yes",
							onPress: () => attemptDelete()
						}]
					)}	
			>
				<Text style={styles.deleteText}>Delete Account</Text>
			</TouchableOpacity>

		</View>
	);
}




// styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

	/* Sign Out Button */
	signOutText: {
		fontSize: 18,
		alignSelf: 'center',
	},

  signOutButton: {
		backgroundColor: Colors.offWhite,
		borderWidth: 1,
		borderRadius: 25,
		margin: 10,
		padding: 8,
		width: 170,
		alignSelf: 'center',
		textAlign: 'center',
  },

	/* Reset Password Button */
	resetPassText: {
		fontSize: 18,
		alignSelf: 'center',
	},

  resetPassButton: {
		backgroundColor: Colors.offWhite,
		borderWidth: 1,
		borderRadius: 25,
		margin: 10,
		padding: 8,
		width: 170,
		alignSelf: 'center',
		textAlign: 'center',
  },
  

	/* Delete Account Button */	
	deleteText: {
			fontSize: 18,
			alignSelf: 'center',
	},

  deleteButton: {
		backgroundColor: Colors.lightRed,
		borderWidth: 1,
		borderRadius: 25,
		margin: 10,
		padding: 8,
		width: 170,
		alignSelf: 'center',
		textAlign: 'center',
  },


});