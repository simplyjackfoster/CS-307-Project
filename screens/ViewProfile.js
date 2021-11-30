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
import { Asset } from 'expo-asset';
import { renderIcon } from "../images/Icons";
import Colors from "../constants/Colors";
import MatchItem from '../components/MatchItem';
import { CardItem } from '../components/CardItem';
import Card from '../components/Card';
import CardList from '../components/CardList';
import { MatchInteractContext } from '../context';
import { getDataFromPath, getDataFromPathAsync, getAgeAsync } from '../database/readData';
import { getCompatibilityScoreAsync } from '../database/readData';
import { getUserData } from '../database/readData';


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


  //   /*
  //    * Gets all of the profile data from users,
  //    * and puts the Profile objects in "profiles" hook
  //    */
  //   const getProfile = async () => {
  //     // get the profile ids from the database (USE ALGORITHM)
  //     var id = user; // using fixed value
  //     // STEP 1: GET THE PROFILE INFORMATION

  //     // read all the data in parallel
  //     var
  //       [
  //         profile_picture, // 1
  //         name, // 2
  //         age, // 3
  //         bio, // 4
  //         interest1, // 5
  //         interest2, // 6
  //         interest3, // 7
  //         interest4, // 8
  //         interest5, // 9
  //         graduation_year, // 10
  //         major, // 11
  //         location, // 12
  //         preferred_num_roommates, // 13
  //         preferred_living_location, // 14
  //         vaccinated, // 15
  //         instagram, // 16
  //         compatibility_score, // 17
  //       ] = await Promise.all(
  //         [
  //           getDataFromPathAsync("users/" + id + "/Profile/Images/profile_picture"), // 1
  //           getDataFromPathAsync("users/" + id + "/Profile/profile_name"), // 2
  //           getAgeAsync(id), // 3
  //           getDataFromPathAsync("users/" + id + "/Profile/bio"), // 4
  //           getDataFromPathAsync("users/" + id + "/Profile/Interests/interest1"), // 5
  //           getDataFromPathAsync("users/" + id + "/Profile/Interests/interest2"), // 6
  //           getDataFromPathAsync("users/" + id + "/Profile/Interests/interest3"), // 7
  //           getDataFromPathAsync("users/" + id + "/Profile/Interests/interest4"), // 8
  //           getDataFromPathAsync("users/" + id + "/Profile/Interests/interest5"), // 9
  //           getDataFromPathAsync("users/" + id + "/Profile/graduation_year"), // 10
  //           getDataFromPathAsync("users/" + id + "/Profile/major"), // 11
  //           getDataFromPathAsync("users/" + id + "/Profile/location"), // 12
  //           getDataFromPathAsync("users/" + id + "/Profile/preferred_number_of_roommates"), // 13
  //           getDataFromPathAsync("users/" + id + "/Profile/preferred_living_location"), // 15
  //           getDataFromPathAsync("users/" + id + "/Profile/covid_vaccination_status"), // 15
  //           getDataFromPathAsync("users/" + id + "/Profile/instagram"), // 16
  //           getCompatibilityScoreAsync(id), // 17
  //         ]);


  //     // STEP 2: ASSEMBLE THE PROFILES
  //     var prof = {
  //       id: id,
  //       profile_picture: await Asset.loadAsync(profile_picture), // load the profile picture asset
  //       name: name,
  //       age: age,
  //       bio: bio,
  //       interest1: interest1,
  //       interest2: interest2,
  //       interest3: interest3,
  //       interest4: interest4,
  //       interest5: interest5,
  //       graduation_year: graduation_year,
  //       major: major,
  //       location: location,
  //       preferred_num_roommates: preferred_num_roommates,
  //       preferred_living_location: preferred_living_location,
  //       vaccinated: vaccinated,
  //       instagram: instagram,
  //       compatibility_score: compatibility_score,
  //     };

  //     // STEP 3: SET PROFILES AND READY STATE TO TRUE
  //     await setProfiles(prof);
  //     setReady(true);
  //   } // getProfiles()

  //   // if we have not loaded the users, then load them
  //   if (!loaded || matchToken != null) {
  //     if (matchToken != null) {
  //       getProfile();
  //       loaded = true;
  //     }
  //   }

  //   if (!ready) {
  //     return (
  //       <View style={{flex: 1}}>
  //         <Text>Loading...</Text>
  //       </View>
  //     );
  //   }

  //   return (
  //     <View style={ready ? (
  //       ({/* nothing */ })
  //     ) :
  //       ({/*display: 'none'*/ })
  //     }>
  //       <View>
  //         <CardItem profile={profiles}></CardItem>
  //       </View>
  //     </View>
  //   );

  // }

  /*
   * Gets all of the profile data from users when the feed is rendered,
   * and puts the Profile objects in "profiles" hook
   */
  const initializeFeedProfiles = async () => {
    // get the profile ids from the database (USE ALGORITHM)
    var ids = [matchToken]; // using fixed value

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
      <CardItem profile={profiles}></CardItem>
    </View>
  );

} // Feed



// styles
const styles = StyleSheet.create({

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
