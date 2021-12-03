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
import { MatchInteractContext } from '../context';
import { getUserData } from '../database/readData';
import { getID } from '../database/ID';

// firebase imports
import { auth } from '../database/RTDB';


/*
 * This is the screen where the user can view their matches.
 */
var user;
var loaded = false;
export default ({ navigation }) => {
  const { matchToken, setMatchToken } = React.useContext(MatchInteractContext);
  const [ready, setReady] = React.useState(false);
  const [profiles, setProfiles] = React.useState(null);

  //Prevents null errors from displaying upon back navigation
  if (matchToken != null) {
    //makes a copy of the user string
    user = JSON.parse(JSON.stringify(matchToken));
  }
  console.log("Viewing user: " + matchToken);

  /*
   * Gets all of the profile data from users when the feed is rendered,
   * and puts the Profile objects in "profiles" hook
   */
  const initializeFeedProfiles = async () => {
    // get the profile ids from the database (USE ALGORITHM)
    var ids = [null];
    // If there is not a match being viewed then we are previewing the user's profile
    if (matchToken == null) {
      ids = [getID(auth.currentUser.email)];
    } else {
      ids = [matchToken];
    }

    // get the data for the profiles
    const profile_list = await getUserData(ids);
    
    // set the data and set the ready hook to true
    await setProfiles(profile_list);
    setReady(true);
    //console.log(profile_list);
  } // initializeFeedProfiles()

  if (!ready) {
    // load the users
    initializeFeedProfiles();

    return (
      <View style={styles.splashContainer}>
        <Text style={styles.splashText}>Loading...</Text>
      </View>
    );
  }

  if (profiles[0] == null) {
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.splashText}>Loading...</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      {/* Stack of Cards */}
      <CardItem profile={profiles[0]}></CardItem>
    </View>
  );

}



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
