import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../constants/Colors';


/*
 * This is the home screen
 */
export default () => {
	return (
		<View style={styles.container}>
			<Text>This is the Home Screen</Text>
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