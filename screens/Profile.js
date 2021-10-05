import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

import Colors from '../constants/Colors';
import EditProfile from './EditProfile';


/*
 * This is the screen where the user can view their profile.
 */
export default ( {navigation} ) => {
	return (
		<View style={styles.container}>

			<View style={styles.container}>
				<Image source={ require("../images/default-profile-picture.jpeg") } style={styles.profilePic} 
				options={{ }}/>			
				<Button title="Edit Profile" onPress={() => navigation.push("EditProfile")}></Button>
			</View>

			<View style={styles.container}>
				<Text>This is the Profile Screen</Text>
			</View>

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

	profilePic: {
		width: 75,
		height: 75,
		borderRadius: 200, // makes image circular
	},


});