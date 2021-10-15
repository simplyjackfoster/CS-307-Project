import React from 'react';
import { StyleSheet,
	Text, 
	View, 
	Button,
	TouchableOpacity,
	ScrollView, 
	Alert
} from 'react-native';

import { AuthContext } from "../context";
import Colors from "../constants/Colors";


/*
 * This is the screen where the user view their account information.
 */
export default ( {navigation} ) => {

	const { userToken, setUserToken } = React.useContext(AuthContext);
	
	return (
		// If user clicks "Sign Out", set userToken to null.
		<View style={styles.container}>

			{/* Reset Password (button) */}
			<TouchableOpacity
				style={styles.resetPassButton}
				onPress={() => navigation.push("ResetPassword")} 
			>
				<Text>Reset Password</Text>
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
						onPress: () => {setUserToken(null)}
					}]
				)}
			>
				<Text>Sign Out</Text>
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
							onPress: () => {setUserToken(null)}
						}]
					)}	
			>
				<Text>Delete Account</Text>
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

  resetPassButton: {
	backgroundColor: Colors.lightBlue,
	borderWidth: 2,
	borderRadius: 5,
	margin: 10,
	padding: 5,
	width: 118,
	alignSelf: 'center',
	textAlign: 'center',
  },
  
  signOutButton: {
	backgroundColor: Colors.lightBlue,
	borderWidth: 2,
	borderRadius: 5,
	margin: 10,
	padding: 5,
	width: 70,
	alignSelf: 'center',
	textAlign: 'center',
  },
  
  deleteButton: {
	backgroundColor: Colors.red,
	borderWidth: 2,
	borderRadius: 5,
	margin: 10,
	padding: 5,
	width: 115,
	alignSelf: 'center',
	textAlign: 'center',
  },

});