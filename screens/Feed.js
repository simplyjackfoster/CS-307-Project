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
import Profile from '../components/Profile';
import { getDataFromPath, getDataFromPathAsync, getAgeAsync } from '../database/readData';



/*
var profiles: Profile[] = [
  {
    id: "mfinder",
    name: "Max",
    age: 20,
    profilePic: "https://firebasestorage.googleapis.com/v0/b/uniroom-fdcd7.appspot.com/o/users%2Fmfinder%2Fprofile_picture?alt=media&token=61706b78-2aab-4270-8bc0-c2212b492dd8",
  },
];
*/
var loaded = false;



export default () => {
  const [ready, setReady] = React.useState(false);


  /*
   *
   */
  const getProfiles = async () => {
    // get the profile ids from the database (USE ALGORITHM)
    var ids = ["mfinder", "thylan", "buckle14"]; // using fixed value


    // STEP 1: GET THE PROFILE INFORMATION

    // get the profile picture paths for each of the users
    var profile_picture_list = [];
    var name_list = [];
    var age_list = [];
    var bio_list = [];
    var interests_list = [[]];
    var graduation_year_list = [];
    var major_list = [];
    var location_list = [];
    var preferred_num_roommates_list = [];
    var preferred_living_location_list = [];
    var vaccinated_list = [];
    var instagram_list = [];

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
      ]);

      // add fields to their list
      profile_picture_list.push(profile_picture);
      name_list.push(name);
      age_list.push(age);
      bio_list.push(bio);
      const interests = [interest1, interest2, interest3, interest4, interest5];
      interests_list.push(interests);
      graduation_year_list.push(graduation_year);
      major_list.push(major);
      location_list.push(location);
      preferred_num_roommates_list.push(preferred_num_roommates);
      preferred_living_location_list.push(preferred_living_location);
      vaccinated_list.push(vaccinated);
      instagram_list.push(instagram);


    } // for-loop


    // print values
    console.log("\n\nPICTURES: " + profile_picture_list);
    console.log("NAMES: " + name_list);
    console.log("AGES: " + age_list);
    console.log("BIOS: " + bio_list);
    console.log("INTERESTS: " + interests_list);
    console.log("GRADUATION YEARS: " + graduation_year_list);
    console.log("MAJORS: " + major_list);
    console.log("LOCATIONS: " + location_list);
    console.log("PREFERRED # ROOMMATES: " + preferred_num_roommates_list);
    console.log("PREFERRED LIVING: " + preferred_living_location_list);
    console.log("VACCINATED: " + vaccinated_list);
    console.log("INSTAGRAM: " + instagram_list);


    // STEP 2: ASSEMBLE THE PROFILES
    var profiles: Profile[] = [];


    // STEP 3: LOAD THE PROFILE PICTURES

    // load all of the profile pictures
    //await Promise.all(picturePaths.map(picturePath => Asset.loadAsync(profile.profilePic)));

    // STEP 4: SET READY STATE TO TRUE
    setReady(true);
  } // getProfiles()



  /*
   *
   */ 
  const getProfile = async () => {

    // get the profile picture paths for each of the users
    var picturePaths = [];
    var profiles: Profile[] = [];
    for (const id of ids) {
      const dbRef = ref(rtdb);
      const picturePath = await get(child(dbRef, "users/" + id +"/Profile/Images/profile_picture")).then((snapshot) => {
        if (snapshot.exists()) {
          const data_val = snapshot.val();
          return data_val;
        }	
      }).catch((error) => {
        console.error(error);
      });
      // add it to the array of paths
      picturePaths.push(picturePath);


      // build profile info
      /*const profile: Profile = {
        id: id,
      }; */



    } // for-loop

  } // getProfile()






  var profiles = ["mfinder", "thylan", "buckle14"];
  if (!loaded) {
    var pros = getProfiles();
    loaded = true;
  }



  /*async componentDidMount() {
    await Promise.all(profiles.map(profile => Asset.loadAsync(profile.profilePic)));
    this.setState({ ready: true });
  }*/


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


        {/* Like, Refresh, and Dislike Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => {
            console.log("Dislike pressed");
          }}>
            {renderIcon("times", 50, Colors.red)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            console.log("Like pressed");
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