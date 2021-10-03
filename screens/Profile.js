import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../constants/Colors';


/*
 * This is the screen where the user can view their profile.
 */
export default () => {
	return (
		<View style={styles.container}>
			<Text>This is the Profile Screen</Text>
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