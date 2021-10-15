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
      <Text 
        style={styles.link}
        onPress={() => Linking.openURL('https://www.housing.purdue.edu/')}
      >
        Purdue Housing Home Page
      </Text>
      <Text 
        style={styles.link}
        onPress={() => Linking.openURL('https://www.housing.purdue.edu/my-housing/index.html')}
      >
        Purdue Housing Options
      </Text>
      <Text 
        style={styles.link}
        onPress={() => Linking.openURL('https://www.housing.purdue.edu/urmovein/dates_and_parking.html')}
      >
        Purdue Move-in Help
      </Text>
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

  link: {
    color: Colors.blue,
    margin: 10,
    fontSize: 20,
    textDecorationLine: 'underline',
  }

})
