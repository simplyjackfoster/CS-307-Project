import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


import Colors from '../constants/Colors';


/*
 * This is the settings screen
 */
export default () => {
	return (
		<View style={styles.container}>
			<Text>This is the Settings Screen</Text>
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