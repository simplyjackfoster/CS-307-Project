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
import { getDataFromPath, getDataFromPathAsync } from '../database/readData';


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
    var profile_pictures = [];
    var names = [];

    for (const id of ids) {
      // profile picture
      const profile_picture = await getDataFromPathAsync("users/" + id + "/Profile/Images/profile_picture");
      profile_pictures.push(profile_picture);

      // name
      const name = await getDataFromPathAsync("users/" + id + "/Profile/profile_name");
      names.push(name);
    } // for-loop

    console.log("\nPICTURES: " + profile_pictures);
    console.log("NAMES: " + names);


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