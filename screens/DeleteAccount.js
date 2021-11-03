import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { AuthContext, VerificationContext } from "../context";
import Colors from "../constants/Colors";


/*
 * This is the screen where the user confirms the deletion of their account.
 */
export default ({ navigation }) => {

	const { userToken, setUserToken } = React.useContext(AuthContext);
	const { userVerified, setUserVerified } = React.useContext(VerificationContext);

	return (
		// If user clicks "No, Cancel", then return to Account screen
		// If user clicks "Yes, Delete Account", then set userToken to null.
		<View style={styles.container}>
			<Text>This is the Delete Account Screen</Text>
			<Text>WARNING: This cannot be undone.</Text>
			<Text>Are you sure you want to delete your account?</Text>
			<Button title="No, Cancel" onPress={() => navigation.pop()}></Button>
			<Button title="Yes, Delete Account" onPress={() => {
				setUserToken(null) 
				setUserVerified(null)
			}}></Button>
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

});