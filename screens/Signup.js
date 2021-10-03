import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from "../constants/Colors";


/*
 * This is the screen where the user creates an account. 
 */
export default () => {
	return (
		<View style={styles.container}>
			<Text>This is the Sign Up Screen</Text>
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