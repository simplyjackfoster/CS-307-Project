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
export default ( {navigation} ) => {
  const { matchToken, setMatchToken } = React.useContext(MatchInteractContext);
  var user = matchToken;
  console.log("Viewing user: " + matchToken);
  return (
    <ScrollView style={styles.container}>
      <View style= {matchToken ? (
        <Card id={user}></Card>
        ) :
        ({display: 'none'}) 
        }>
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
