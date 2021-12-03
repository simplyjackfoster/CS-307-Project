import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  useState,
  useEffect,
  ScrollView,
  Button,
  BackHandler,
  TouchableOpacity
} from 'react-native';
import Colors from "../constants/Colors";
import { CardItem } from '../components/CardItem';
import { getUserData } from '../database/readData';
import { getID } from '../database/ID';

// firebase imports
import { auth } from '../database/RTDB';


/*
 * This is the screen where the user can view their matches.
 */
export default ({ navigation }) => {

	// get data from props
	const[profile, setProfile] = React.useState(null);
  const[ready, setReady] = React.useState(false);


	/*
	 *
	 */
  const getViewUserProfile = async () => {
		const ids = [getID(auth.currentUser.email)];

    // get the data for the profiles
    const profile_list = await getUserData(ids);
    
    // set the data and set the ready hook to true
    await setProfile(profile_list[0]);
    setReady(true);
  } // getViewUserProfile()




  if (!ready) {
    // load the users
    getViewUserProfile();

    return (
      <View style={styles.splashContainer}>
        <Text style={styles.splashText}>Loading...</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>

      {/* Preview Text */}
      <View style={styles.previewContainer}>
        <Text style={styles.previewText}>PREVIEW</Text>
      </View>

      {/* Card */}
      <View style={styles.contentContainer}>
        <CardItem profile={profile}></CardItem>
      </View>

    </View>
  );

} // export default()





// styles
const styles = StyleSheet.create({

  /* Splash Screen */
  splashContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  splashText: {
    alignSelf: 'center',
    fontSize: 25,
  },

  /* Container styles */
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },

  contentContainer: {
    flex: 1,
    marginHorizontal: '6%',
    marginTop: '4%',
    marginBottom: '10%',
  },

  previewContainer: {
		flex: 0.10,
	},

	previewText: {
		fontSize: 40,
		color: Colors.lightBlue,
		fontWeight: '700',
		textShadowColor: Colors.black,
		textShadowOffset: {width: 0.25, height: 0.25},
		textShadowRadius: 1,
		alignSelf: 'center',
		marginTop: "4%",
	},

});