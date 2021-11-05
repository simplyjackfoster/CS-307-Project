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
import Messages from './Messages';



/*
 * This is the screen where the user can view their matches.
 */
var testUUid = "foste205"
//const [showProfile] = React.useState(true)
var matched = 'true'
export default ( {navigation} ) => {
  //const [count, setCount] = useState(0);
  //<Button title={"X"} onPress={() => matched = false}></Button>
  //const showMatch = ({ matched }) => {
  if (matched != 'true') {
    return (<View style={styles.noMatchContainer}>
			<Text>You have no matches</Text>
		</View>);
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <View style={styles.buttonStyle}>
          <Button title={"📱"} onPress={() => navigation.navigate('Messages')}></Button>
        </View>
        <View style={styles.buttonStyle}>
          <Button title="X" onPress={() => navigation.navigate('Messages')}></Button>
        </View> */}
        <MatchItem id={"foste205"} />
        <MatchItem id={"thylan"} />
        <MatchItem id={"mfinder"} />
      </View>
    </ScrollView>

  );
  
}



// styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 40,
  },

  buttonStyle: {
    alignItems: 'flex-start'
  },

  noMatchContainer: {
    flex: 1,
    fontSize: 50,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  

});
