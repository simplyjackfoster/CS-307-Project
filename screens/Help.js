import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Linking } from 'react-native';

import Colors from "../constants/Colors";


/*
 * This is the screen where help/hotlines are provided.
 */
export default ({ navigation }) => {
	return (
		<View style={styles.container}>
			<><Text style={{ color: 'blue' }}
  onPress={() => Linking.openURL('https://www.housing.purdue.edu/')}>
  Purdue Housing Home Page
</Text><Text style={{ color: 'blue' }}
  onPress={() => Linking.openURL('https://www.housing.purdue.edu/my-housing/index.html')}>
    Purdue Housing Options
  </Text><Text style={{ color: 'blue' }}
    onPress={() => Linking.openURL('https://www.housing.purdue.edu/urmovein/dates_and_parking.html')}>
    Purdue Move-in Help
  </Text></>
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
