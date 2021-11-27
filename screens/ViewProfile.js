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
import { HeaderBackButton } from 'react-navigation';
import { getDataFromPath, getDataFromPathAsync, getAgeAsync } from '../database/readData';
import { getCompatibilityScoreAsync } from '../database/readData';

/*
 * This is the screen where the user can view their matches.
 */
var user;
var loaded = false;
export default ( {navigation} ) => {
   const { matchToken, setMatchToken } = React.useContext(MatchInteractContext);
//   const [profiles, setProfiles] = React.useState(null);
//   const [ready, setReady] = React.useState(false);

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
const [ready, setReady] = React.useState(false);
const [profiles, setProfiles] = React.useState(null);



/*
 * Gets all of the profile data from users,
 * and puts the Profile objects in "profiles" hook
 */
const getProfiles = async () => {
  // get the profile ids from the database (USE ALGORITHM)
  var ids = [matchToken];
  //var ids = ["mfinder", "thylan", "francik"]; // using fixed value

  // STEP 1: GET THE PROFILE INFORMATION

  // get the profile picture paths for each of the users
  var profile_picture_list = [];
  var name_list = [];
  var age_list = [];
  var bio_list = [];
  var interest1_list = [];
  var interest2_list = [];
  var interest3_list = [];
  var interest4_list = [];
  var interest5_list = [];
  var graduation_year_list = [];
  var major_list = [];
  var location_list = [];
  var preferred_num_roommates_list = [];
  var preferred_living_location_list = [];
  var vaccinated_list = [];
  var instagram_list = [];
  var compatibility_score_list = [];

  for (const id of ids) {
    // read all the data in parallel
    let
    [
      profile_picture, // 1
      name, // 2
      age, // 3
      bio, // 4
      interest1, // 5
      interest2, // 6
      interest3, // 7
      interest4, // 8
      interest5, // 9
      graduation_year, // 10
      major, // 11
      location, // 12
      preferred_num_roommates, // 13
      preferred_living_location, // 14
      vaccinated, // 15
      instagram, // 16
      compatibility_score, // 17
    ] = await Promise.all(
    [
      getDataFromPathAsync("users/" + id + "/Profile/Images/profile_picture"), // 1
      getDataFromPathAsync("users/" + id + "/Profile/profile_name"), // 2
      getAgeAsync(id), // 3
      getDataFromPathAsync("users/" + id + "/Profile/bio"), // 4
      getDataFromPathAsync("users/" + id + "/Profile/Interests/interest1"), // 5
      getDataFromPathAsync("users/" + id + "/Profile/Interests/interest2"), // 6
      getDataFromPathAsync("users/" + id + "/Profile/Interests/interest3"), // 7
      getDataFromPathAsync("users/" + id + "/Profile/Interests/interest4"), // 8
      getDataFromPathAsync("users/" + id + "/Profile/Interests/interest5"), // 9
      getDataFromPathAsync("users/" + id + "/Profile/graduation_year"), // 10
      getDataFromPathAsync("users/" + id + "/Profile/major"), // 11
      getDataFromPathAsync("users/" + id + "/Profile/location"), // 12
      getDataFromPathAsync("users/" + id + "/Profile/preferred_number_of_roommates"), // 13
      getDataFromPathAsync("users/" + id + "/Profile/preferred_living_location"), // 15
      getDataFromPathAsync("users/" + id + "/Profile/covid_vaccination_status"), // 15
      getDataFromPathAsync("users/" + id + "/Profile/instagram"), // 16
      getCompatibilityScoreAsync(id), // 17
    ]);
  

    // add fields to their list
    profile_picture_list.push(profile_picture);
    name_list.push(name);
    age_list.push(age);
    bio_list.push(bio);
    interest1_list.push(interest1);
    interest2_list.push(interest2);
    interest3_list.push(interest3);
    interest4_list.push(interest4);
    interest5_list.push(interest5);
    graduation_year_list.push(graduation_year);
    major_list.push(major);
    location_list.push(location);
    preferred_num_roommates_list.push(preferred_num_roommates);
    preferred_living_location_list.push(preferred_living_location);
    vaccinated_list.push(vaccinated);
    instagram_list.push(instagram);
    compatibility_score_list.push(compatibility_score);
  } // for-loop



  // STEP 2: ASSEMBLE THE PROFILES
  var profile_list = [];
  for (let i = 0; i < ids.length; i++) {
    var profile = {
      id: ids[i],
      profile_picture: await Asset.loadAsync(profile_picture_list[i]), // load the profile picture asset
      name: name_list[i],
      age: age_list[i],
      bio: bio_list[i],
      interest1: interest1_list[i],
      interest2: interest2_list[i],
      interest3: interest3_list[i],
      interest4: interest4_list[i],
      interest5: interest5_list[i],
      graduation_year: graduation_year_list[i],
      major: major_list[i],
      location: location_list[i],
      preferred_num_roommates: preferred_num_roommates_list[i],
      preferred_living_location: preferred_living_location_list[i],
      vaccinated: vaccinated_list[i],
      instagram: instagram_list[i],
      compatibility_score: compatibility_score_list[i],
    };

    // add profile to array
    profile_list.push(profile);
  } // for-loop

  
  // STEP 3: SET PROFILES AND READY STATE TO TRUE
  await setProfiles(profile_list);
  setReady(true);

} // getProfiles()




// if we have not loaded the users, then load them
if (!loaded) {
  getProfiles();
  loaded = true;
}


if (!ready) {
  return (
    <View style={{flex: 1}}>
      <Text>Loading...</Text>
    </View>
  );
}

return (
  <View style={styles.container}>

    {/* Stack of Cards */}
    <View style={styles.contentContainer}>
      <CardList {...{profiles}} ></CardList>
    </View>


    {/* Like and Dislike Buttons */}
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => {
        console.log("Dislike pressed");
        // add swipe left function
      }}>
        {renderIcon("times", 50, Colors.red)}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
        console.log("Like pressed");
        // add swipe right function
      }}>
        {renderIcon("check", 50, Colors.green)}
      </TouchableOpacity>
    </View>

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
