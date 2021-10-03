import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Colors from "../constants/Colors";


/*
 * This is the screen where the user can enter their login credentials
 * to log in, or they can click the sign up button to be brought
 * to the sign up screen. 
 */
export default ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text>This is the Log In Screen</Text>
			<Button title="Log In" ></Button>
			<Button title="Sign Up" onPress={() => navigation.navigate("Signup")}></Button>
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