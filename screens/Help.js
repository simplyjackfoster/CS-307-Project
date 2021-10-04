import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Colors from "../constants/Colors";


/*
 * This is the screen where help/hotlines are provided.
 */
export default ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text>This is the Help Screen</Text>
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

})