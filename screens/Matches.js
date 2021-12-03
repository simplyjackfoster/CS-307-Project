import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Alert,
  useState,
  useEffect,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Button 
} from 'react-native';
import Colors from "../constants/Colors";
import MatchItem from '../components/MatchItem';
import Messages from './Messages';
import { getID } from '../database/ID';
import { getUserData, getMatchesAsync } from '../database/readData';
import MatchList from '../components/MatchList';


// firebase imports
import { auth } from '../database/RTDB';


/*
 * This is the screen where the user can view their matches.
 */
export default ( {navigation} ) => {

  const [ready, setReady] = React.useState(false);
  const [profiles, setProfiles] = React.useState(null);



  /*
   * Initialized profiles on the matches screen
   */
  const initializeMatchesAsync = async () => {
    // get the matches profile objects
    const ids = await getMatchesAsync(auth.currentUser.email);

    // get the data for those matches
    const matches_list = await getUserData(ids);

    // set the profiles to the matches_list and ready state to true
    await setProfiles(matches_list);
    setReady(true);
  } // initializeMatchesAsync()




  if (!ready) {
    // load the users
    initializeMatchesAsync(); // create that function loads the matches

    return (
      <View style={styles.splashContainer}>
        <Text style={styles.splashText}>Loading...</Text>
      </View>
    );
  } 


  return (
    <View style={{flex: 1}}>
      <MatchList {...{profiles}} navigation={navigation} ></MatchList>
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


});
