import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Alert,
  useState,
  useEffect,
  ScrollView,
  Button 
} from 'react-native';
import Colors from "../constants/Colors";
import MatchItem from '../components/MatchItem';
import Card from '../components/Card';


/*
 * This is the screen where the user can view their matches.
 */
var testUid = "foste205"
//const [showProfile] = React.useState(true)
var matched = true;
export default ( {navigation} ) => {

  return (
    <ScrollView style={styles.container}>
      <View>
        <Card id={"foste205"}></Card>
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
