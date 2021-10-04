import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { AuthContext } from "../context";
import Colors from "../constants/Colors";


/*
 * This is the screen where the user view their account information.
 */
export default ( {navigation} ) => {

	const { userToken, setUserToken } = React.useContext(AuthContext);

	return (
		// If user clicks "Sign Out", set userToken to null.
		<View style={styles.container}>
			<Text>This is the Account Screen</Text>
			<Button title="Sign Out" onPress={() => setUserToken(null)}></Button>
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