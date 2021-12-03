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

      {/* Card */}
      <CardItem profile={profile}></CardItem>

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
    marginHorizontal: '3%',
    marginTop: '2%',
    marginBottom: '1%',
  },

  footer: {
    flex: .10,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

});