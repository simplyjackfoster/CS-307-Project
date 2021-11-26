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



var noProfiles = false;

export default class Profiles extends React.Component<ProfilesProps, ProfilesState> {

  constructor(props: ProfilesProps) {
    super(props);
		const { profiles } = props;
    this.state = { profiles };
  }


	
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
    this.setState({ profiles });
  } // onSwiped()




	render () {
    const { profiles: [...profiles] } = this.state;


    if (noProfiles) {
      return (
        <View style={styles.container}>
          <View style={{alignSelf: 'center'}}>
            <Text style={{fontSize: 25}}>No More Profiles</Text>
          </View>
        </View>
      );
    }



		return (
			<View style={styles.container}>

        {/* Cards Stack */}
        <View style={{flex: 1}}>
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
            console.log("Dislike pressed");
            // add swipe left function
            this.onSwiped(false);
          }}>
            {renderIcon("times", 55, Colors.red)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            console.log("Like pressed");
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
