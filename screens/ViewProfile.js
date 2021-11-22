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
  BackHandler
} from 'react-native';
import Colors from "../constants/Colors";
import MatchItem from '../components/MatchItem';
import Card from '../components/Card';
import { MatchInteractContext } from '../context';
import { HeaderBackButton } from 'react-navigation';

/*
 * This is the screen where the user can view their matches.
 */
var user;
export default ( {navigation} ) => {
  const { matchToken, setMatchToken } = React.useContext(MatchInteractContext);
  //Prevents null errors from displaying upon back navigation
  if (matchToken != null) {
    //makes a copy of the user string
    user = JSON.parse(JSON.stringify(matchToken));
  }
  console.log("Viewing user: " + matchToken);
  return (
    <ScrollView style={styles.container}>
      <View style= {matchToken ? (
        ({/* nothing */})
        ) :
        ({display: 'none'}) 
        }>
        <Card id={user}></Card>
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

  footer: {
    flex: 0.15,
    alignSelf: 'center',
    paddingTop: 5,
    paddingHorizontal: 300,
    paddingBottom: 25,
    backgroundColor: Colors.lightGray,
  },

});
