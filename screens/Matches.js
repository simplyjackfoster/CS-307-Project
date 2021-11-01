import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Button } from 'react-native';
import Colors from "../constants/Colors";
import MatchItem from '../components/MatchItem';


/*
 * This is the screen where the user can view their matches.
 */
export default ( {navigation} ) => {
	return (
		<View style={styles.container}>
			<MatchItem> id = {"mfinder"}</MatchItem>
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
