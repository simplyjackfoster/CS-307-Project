import { NavigationContainer } from '@react-navigation/native';
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
			<Text>This is the Log In Screen</Text>
			<Button title="Log In" onPress={() => setUserToken('asdf')}></Button>
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