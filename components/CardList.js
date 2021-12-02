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
import { getUserData, getNextUsersAsync, getSwipeLeftListAsync, getSwipeRightListAsync} from '../database/readData';
import { writeToSwipedRightListAsync, writeToSwipedLeftListAsync, writeToMatchedListAsync } from '../database/writeData';
import { auth } from '../database/RTDB';
import { getID } from '../database/ID';

var noProfiles = false;


export default class Profiles extends React.Component {

  constructor(props) {
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
    var ids = await getNextUsersAsync(this.state.profiles);
    console.log("IDS = " + ids);


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
  onSwiped = async (isLiked) => {
    if (isLiked) {
      console.log("SWIPED RIGHT");

      // Adding uid to swiped right list
      writeToSwipedRightListAsync(getID(auth.currentUser.email), this.state.profiles[0].id);

      // Getting list of swiped right users
      var theirSwipedRightList = await getSwipeRightListAsync(this.state.profiles[0].id);
      
      // Verifying if users swiped right on each other
      // If they did. They both add the other into their list of matches
      if(theirSwipedRightList.includes(getID(auth.currentUser.email))) {
        writeToMatchedListAsync(getID(auth.currentUser.email), this.state.profiles[0].id);
        writeToMatchedListAsync(this.state.profiles[0].id, getID(auth.currentUser.email));
        console.log("USERS MATCHED!");
      }

      console.log("Profile Liked!");

      // check their swiped right list for your name

    }
    else {
      writeToSwipedLeftListAsync(getID(auth.currentUser.email), this.state.profiles[0].id);

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

        

        {/* Cards Stack */}
        <View style={{ flex: 1 }}>
          <View style={styles.contentContainer}>
            <View style={styles.cards}>
              {
                profiles.reverse().map((profile) => (
                  <Card key={profile.id} profile={profile}></Card>
                ))
              }
            </View>
          </View>
        </View>



        {/* Like and Dislike Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => {
            // add swipe left function
            this.onSwiped(false);
          }}>
            {renderIcon("times", 55, Colors.red)}
          </TouchableOpacity>


          {/* Test next user algorithm */}
          {/*<View>
            <TouchableOpacity
              onPress={() => 
                getNextUsersAsync(profiles)
              }>
              <Text>NEXT USERS</Text>
            </TouchableOpacity>
            </View>*/}


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
