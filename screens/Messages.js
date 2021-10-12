import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../constants/Colors';


/*
 * This is the screen where the user messages other users.
 */
export default () => {
	return (
		<View style={styles.container}>
			<Text>This is the Messages Screen</Text>
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