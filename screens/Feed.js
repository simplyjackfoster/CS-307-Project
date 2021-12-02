import React, { useEffect } from 'react';
import { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Colors from "../constants/Colors";
import { renderIcon } from "../images/Icons";
import CardList from '../components/CardList';

import { Asset } from 'expo-asset';
import { getNextUsersAsync, getUserData } from '../database/readData';




export default () => {
  const [ready, setReady] = React.useState(false);
  const [profiles, setProfiles] = React.useState(null);


  /*
   * Gets all of the profile data from users when the feed is rendered,
   * and puts the Profile objects in "profiles" hook
   */
  const initializeFeedProfiles = async () => {
    // get the profile ids from the database (USE ALGORITHM)
    var ids = await getNextUsersAsync([]);
    console.log("INITIALIZING WITH = " + ids);
    //var ids = ["mfinder", "test", "francik"]; // using fixed value

    // get the data for the profiles
    const profile_list = await getUserData(ids);
    
    // set the data and set the ready hook to true
    await setProfiles(profile_list);
    setReady(true);
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


  return (
    <View style={styles.container}>
      
      {/* Stack of Cards */}
      <View style={styles.contentContainer}>
        <CardList {...{profiles}} ></CardList>
      </View>

    </View>
  );

} // Feed




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
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.lightGray,
  },

  contentContainer: {
    flex: 1,
    marginHorizontal: '3%',
    marginTop: '2%',
    marginBottom: '1%',
  },

});