import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

import Colors from "../constants/Colors";


/*
 * This is the screen where the user creates an account. 
 */
export default ( {navigation} ) => {
	return (
		<View style={styles.container}>
			<Text>This is the Sign Up Screen</Text>
      <Button title="Create Account"></Button>
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