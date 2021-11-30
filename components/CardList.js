import React, { useState } from 'react';
import { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Card from './Card';
import Colors from "../constants/Colors";
import { renderIcon } from "../images/Icons";
import { getUserData } from '../database/readData';



var noProfiles = false;
var testProfiles = false; // used to toggle between sets of users loaded in the feed

export default class Profiles extends React.Component<ProfilesProps, ProfilesState> {

  constructor(props: ProfilesProps) {
    super(props);
		const { profiles } = props;
    this.state = { profiles };
  }




  /*
   * Function used to add new users to the feed. It is called when the queue
   * gets below a certain number of users.
   */
  addFeedProfiles = async () => {
     
    // get ids to add from database (USE ALGORITHM), make sure to not add
    // profiles that are currently in the stack    
    var ids;
    if (testProfiles) {
      ids = ["mfinder", "thylan", "francik"]; // use fixed values for now
      testProfiles = false;
    } 
    else {
      ids = ["buckle14", "munshi", "werner51"]; // use fixed values for now
      testProfiles = true;
    }

    // get array of profile objects for the ids
    const newProfiles = await getUserData(ids);

    // add them to the list of profiles
    var updatedProfiles = this.state.profiles;
    for (let i = 0; i < ids.length; i++) {
      updatedProfiles.push(newProfiles[i]);
    }
    this.setState({ profiles: updatedProfiles});
  } // addFeedProfiles()





	
  // Function that is called when the user likes or dislikes
  onSwiped = (isLiked) => {
    if (isLiked) {
      console.log("Profile Liked!");
    }
    else {
      console.log("Profile Disliked!");
    }

    // remove profile from the state
    const { profiles: [lastProfile, ...profiles] } = this.state;
    if (profiles.length == 0) {
      console.log("NO PROFILES");
      noProfiles = true;
    }
    else if (profiles.length < 3) {
      console.log("ADDING USERS\n");
      // add users
      this.addFeedProfiles();
    }
    this.setState({ profiles });
  } // onSwiped()




	render () {
    const { profiles: [...profiles] } = this.state;


    if (noProfiles) {
      return (
        <View style={styles.noProfilesContainer}>
            <Text style={styles.noProfilesText}>No More Profiles</Text>
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
            // add swipe left function
            this.onSwiped(false);
          }}>
            {renderIcon("times", 55, Colors.red)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            // add swipe right function
            this.onSwiped(true);
          }}>
            {renderIcon("check", 55, Colors.green)}
          </TouchableOpacity>
        </View>

			</View>
		);
	} // render()

} // class Profiles






// styles
const styles = StyleSheet.create({

  /* No More Profiles */
  noProfilesContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  noProfilesText: {
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
    ...StyleSheet.absoluteFillObject,
    marginHorizontal: '3%',
    marginTop: '2%',
    marginBottom: '1%',
  },


  /* Cards */
  cards: {
    flex: 1,
    zIndex: 100,
  },

  footer: {
    flex: .15,
    justifyContent: 'space-evenly',
		flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },


});
