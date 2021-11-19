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



/*
 * This is the screen where the user can view their matches.
 */
var testUid = "foste205"
//const [showProfile] = React.useState(true)
var matched = true;
export default ( {navigation} ) => {

  const viewProfile = () => {
    // remove the uid from the match list in the database
    console.log("Pressed");
    navigation.push("ViewProfile")
  }

  if (!matched) {
    return (
      <View style={styles.noMatchContainer}>
        <Text>You have no matches</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View>
        <MatchItem id={"foste205"} func={viewProfile}/>
        <MatchItem id={"thylan"} func={viewProfile}/>
        <MatchItem id={"mfinder"} func={viewProfile}/>
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

  

});
