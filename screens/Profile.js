import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Colors from '../constants/Colors';


/*
 * This is the screen where the user can view their profile.
 */
export default ( {navigation} ) => {
	return (
		<View style={styles.container}>
			<Text>This is the Profile Screen</Text>
			<Button title="Edit Profile" onPress={() => navigation.push("EditProfile")}></Button>
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