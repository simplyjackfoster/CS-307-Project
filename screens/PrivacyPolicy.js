import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Colors from "../constants/Colors";


/*
 * This is the screen where the user can view the privacy policy.
 */
export default ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text>This is the Privacy Policy Screen</Text>
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