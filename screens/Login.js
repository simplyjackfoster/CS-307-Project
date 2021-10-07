import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { AuthContext } from "../context";
import Colors from "../constants/Colors";


/*
 * This is the screen where the user can enter their login credentials
 * to log in, or they can click the sign up button to be brought
 * to the sign up screen. 
 */
export default ({ navigation }) => {

	const { userToken, setUserToken } = React.useContext(AuthContext);

	return (
		// If the user clicks "Log In", then set userToken to a non-null value.
		<View style={styles.container}>

			{/* UniRoom logo */}

			{/* Log In (text) */}
			<Text>This is the Log In Screen</Text>
			
			{/* Email (text), email (field) */}
			
			{/* Password (text), password (field, with black dots) */}
			
			{/* Log In (button) */}
			<Button title="Log In" onPress={() => setUserToken('asdf')}></Button>

			{/* New to UniRoom? (text), Sign Up (button) */}
			<Text>New to UniRoom?</Text>
			<Button title="Sign Up" onPress={() => navigation.push("Signup")}></Button>


		</View>
	);
}



// styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});