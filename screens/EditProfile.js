import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Colors from "../constants/Colors";


/*
 * This is the screen where the user can edit their profile.
 */
export default ( {navigation} ) => {
	return (
		<View style={styles.container}>
			<Text>This is the Edit Profile Screen</Text>
      <Button title={"Save"} onPress={() => navigation.pop()}></Button>
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