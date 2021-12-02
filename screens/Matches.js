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
  Button 
} from 'react-native';
import Colors from "../constants/Colors";
import MatchItem from '../components/MatchItem';
import Messages from './Messages';
import { MatchInteractContext } from '../context';
import { getUserData } from '../database/readData';
import { getID } from '../database/ID';
import { getMatches } from '../database/readData';

// firebase imports
import { auth } from '../database/RTDB';



/*
 * This is the screen where the user can view their matches.
 */
//const [showProfile] = React.useState(true)
var matched = true;
export default ( {navigation} ) => {
  const { matchToken, setMatchToken } = React.useContext(MatchInteractContext);
  const [profiles, setProfiles] = React.useState(null);
  const [matches, setMatches] = React.useState(null);
  const [ready, setReady] = React.useState(false);
  const [matchReady, setMatchReady] = React.useState(false);
  const [numMatch, setNumMatch] = React.useState(null);

  React.useEffect(() => {
    const list = navigation.addListener('focus', () => {
      setMatchToken(null);
    });
    return list;
  });

  /*
   *  Open view profile page
   */
  const viewProfile = () => {
    navigation.push("ViewProfile");
  } //viewProfile

  /*
   * Gets all of the profile data from users when the feed is rendered,
   * and puts the Profile objects in "profiles" hook
   */
  const initializeFeedProfiles = async () => {
    // get the profile ids from the database (USE ALGORITHM)
    var ids = [getID(auth.currentUser.email)];

    // get the data for the profiles
    const profile_list = await getUserData(ids);
    
    // set the data and set the ready hook to true
    await setProfiles(profile_list);
    setNumMatch(profile_list[0].numMatches);
    if (profile_list[0].numMatches == 0) {
      matched = false;
    }
    setReady(true);
  } // initializeFeedProfiles()

  const initializeMatches = async () => {
    // get the profile ids from the database (USE ALGORITHM)
    var ids = [getID(auth.currentUser.email)];

    // get the data for the profiles
    const match_list = await getMatches(ids, profiles[0].numMatches);
    
    // set the data and set the ready hook to true
    await setMatches(match_list);
    console.log(matches);
    setMatchReady(true);
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
  if (ready && !matchReady && matched) {
    initializeMatches();
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.splashText}>Populating Matches...</Text>
      </View>
    );
  }

  if (ready && !matched) {
    return (
      <View style={styles.noMatchContainer}>
        <Text>You have no matches</Text>
      </View>
    );
  }
  

  return (
    <ScrollView style={styles.container}>
      <View>
        <MatchItem id={matches[0]} func={viewProfile} idx={0} count={numMatch}/>
        <MatchItem id={matches[1]} func={viewProfile} idx={1} count={numMatch}/>
        <MatchItem id={matches[2]} func={viewProfile} idx={2} count={numMatch}/>
        <MatchItem id={matches[3]} func={viewProfile} idx={3} count={numMatch}/>
        <MatchItem id={matches[4]} func={viewProfile} idx={4} count={numMatch}/>
        <MatchItem id={matches[5]} func={viewProfile} idx={5} count={numMatch}/>
        <MatchItem id={matches[6]} func={viewProfile} idx={6} count={numMatch}/>
        <MatchItem id={matches[7]} func={viewProfile} idx={7} count={numMatch}/>
      </View>
    </ScrollView>
  );
  
}



// styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 100,
  },

  noMatchContainer: {
    flex: 1,
    fontSize: 50,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

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
